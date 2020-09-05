(function () {

    var yOffset = 0;
    var currentScene = 0;
    var relativeYOffset = 0;
    var scrollRatio = 0;
    var prevScrollHeight = 0;
    var enterNewScene = false;

    var sceneInfo = [
        {
            type: 'sticky',
            heightNum: 6,
            scrollHeight: 0,
            objs: {
                scene: document.querySelector('#scroll-interaction-0'),
                canvas: document.querySelector('#first-canvas'),
                context: document.querySelector('#first-canvas').getContext('2d'),
                imagesPath: [
                    './image/bg01.jpg',
                ],
                images: [],
            },
            values: {
                imageSequence: {
                    // canvas tag and image width 1920 , height 1080 기준
                    SX: [0, 0, { start: 0, end: 0.33 }],
                    SY: [0, 0, { start: 0, end: 0.33 }],
                    SW: [0, 0, { start: 0, end: 0.33 }],
                    SH: [0, 0, { start: 0, end: 0.33 }],
                    DX: [0, 0, { start: 0, end: 0.33 }],
                    DY: [0, 0, { start: 0, end: 0.33 }],
                    DW: [0, 0, { start: 0, end: 0.33 }],
                    DH: [0, 0, { start: 0, end: 0.33 }],
                },

            },
        },
        {
            type: 'sticky',
            heightNum: 2,
            scrollHeight: 0,
            objs: {
                scene: document.querySelector('#scroll-interaction-1'),
                canvas: document.querySelector('#second-canvas'),
                context: document.querySelector('#second-canvas').getContext('2d'),
                imagesPath: [
                    './image/bg01.jpg',
                ],
                images: [],
            }
        }
    ]

    var initImage = function () {
        var imgElem;
        for (var i = 0; i < sceneInfo.length; i++) {
            for (var j = 0; j < sceneInfo[i].objs.imagesPath.length; j++) {
                imgElem = new Image();
                imgElem.src = sceneInfo[i].objs.imagesPath[j];
                imgElem.width = sceneInfo[i].objs.canvas.width;
                imgElem.height = sceneInfo[i].objs.canvas.height;
                sceneInfo[i].objs.images.push(imgElem);
            }
        }
    }

    var initSectionHeight = function () {
        for (var i = 0; i < sceneInfo.length; i++) {
            sceneInfo[i].scrollHeight = innerHeight * sceneInfo[i].heightNum;
            sceneInfo[i].objs.scene.style.height = sceneInfo[i].scrollHeight + 'px';
        }
    }

    var initCanvasValues = function () {
        var hRatio = innerHeight / sceneInfo[0].objs.canvas.height;
        var wRatio = innerWidth / sceneInfo[0].objs.canvas.width;
        var scaleRatio = hRatio > wRatio ? hRatio : wRatio;
        var leftPx = innerWidth < 500 ? innerWidth * 0.1 : innerWidth * 0.15;
        sceneInfo[0].values.imageSequence.DW[0] = innerWidth * 0.2 < 400? 400 : innerWidth * 0.2;
        sceneInfo[0].values.imageSequence.DH[0] = innerHeight * 0.15 < 150? 150 : innerHeight * 0.15;
        sceneInfo[0].values.imageSequence.DW[1] = innerWidth / scaleRatio;
        sceneInfo[0].values.imageSequence.DH[1] = innerHeight / scaleRatio;
        sceneInfo[0].values.imageSequence.SX[0] = (1920 / 2 - innerWidth / 2) / scaleRatio;
        sceneInfo[0].values.imageSequence.SX[1] = (sceneInfo[0].objs.canvas.width * scaleRatio - innerWidth) / 2 / scaleRatio;
        sceneInfo[0].values.imageSequence.SW[0] = sceneInfo[0].values.imageSequence.DW[0];
        sceneInfo[0].values.imageSequence.SH[0] = sceneInfo[0].values.imageSequence.DH[0];
        sceneInfo[0].values.imageSequence.SW[1] = sceneInfo[0].values.imageSequence.DW[1];
        sceneInfo[0].values.imageSequence.SH[1] = sceneInfo[0].values.imageSequence.DH[1];
        sceneInfo[0].values.imageSequence.DX[0] = ((sceneInfo[0].objs.canvas.width * scaleRatio - innerWidth) / 2) / scaleRatio + leftPx / scaleRatio;
        sceneInfo[0].values.imageSequence.DY[0] = sceneInfo[0].objs.canvas.height - sceneInfo[0].values.imageSequence.DH[0] - ((sceneInfo[0].objs.canvas.height * scaleRatio - innerHeight) / 2) / scaleRatio;
        sceneInfo[0].values.imageSequence.DX[1] = ((sceneInfo[0].objs.canvas.width * scaleRatio - innerWidth) / 2) / scaleRatio;
        sceneInfo[0].values.imageSequence.DY[1] = ((sceneInfo[0].objs.canvas.height * scaleRatio - innerHeight) / 2) / scaleRatio;
    }

    var currentSection = function () {
        yOffset = pageYOffset;
        var totalScrollHeight = 0;
        for (var i = 0; i < sceneInfo.length; i++) {
            totalScrollHeight += sceneInfo[i].scrollHeight;
            if (totalScrollHeight >= yOffset) {
                currentScene = i;
                break;
            }
        }
        document.body.setAttribute("id", "show-scene-" + currentScene);
        relativeYOffset = yOffset - (totalScrollHeight - sceneInfo[currentScene].scrollHeight);
        scrollRatio = relativeYOffset / (sceneInfo[currentScene].scrollHeight);
    }

    var scrollCurrentSection = function () {
        yOffset = pageYOffset;
        enterNewScene = false;
        prevScrollHeight = 0;
        for (var i = 0; i < currentScene; i++) {
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }
        if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
            enterNewScene = true;
            if (currentScene < sceneInfo.length - 1) {
                currentScene++;
            }
        }
        if (yOffset < prevScrollHeight) {
            enterNewScene = true;
            if (currentScene === 0) return;
            currentScene--;
        }
        document.body.setAttribute("id", "show-scene-" + currentScene);
        relativeYOffset = yOffset - prevScrollHeight;
        scrollRatio = relativeYOffset / (sceneInfo[currentScene].scrollHeight);
        if (enterNewScene) return;

        drawCanvas();
    }

    var calcValues = function (values) {
        var rv;
        if (values[2].start === 0 && values[2].end === 1) {
            rv = scrollRatio * (values[1] - values[0]) + values[0];
        } else {
            var scrollStart = sceneInfo[currentScene].scrollHeight * values[2].start;
            var scrollEnd = sceneInfo[currentScene].scrollHeight * values[2].end;
            if (relativeYOffset >= scrollStart && relativeYOffset <= scrollEnd) {
                rv = (relativeYOffset - scrollStart) / (scrollEnd - scrollStart)  * (values[1] - values[0]) + values[0];
            } else {
                switch (true) {
                    case (relativeYOffset < scrollStart) :
                        rv = values[0];
                        break;
                    case (scrollEnd < relativeYOffset) :
                        rv = values[1];
                        break;
                    default :
                        break;
                }
            }
        }
        return rv;
    }

    var drawCanvas = function () {
        switch (currentScene) {
            case 0:
                var hRatio = innerHeight / sceneInfo[0].objs.canvas.height;
                var wRatio = innerWidth / sceneInfo[0].objs.canvas.width;
                var scaleRatio = hRatio > wRatio ? hRatio : wRatio;
                sceneInfo[0].objs.context.clearRect(0, 0, 1920, 1080);
                var sx = calcValues(sceneInfo[0].values.imageSequence.SX);
                var sy = calcValues(sceneInfo[0].values.imageSequence.SY);
                var sw = calcValues(sceneInfo[0].values.imageSequence.SW);
                var sh = calcValues(sceneInfo[0].values.imageSequence.SH);
                var dx = calcValues(sceneInfo[0].values.imageSequence.DX);
                var dy = calcValues(sceneInfo[0].values.imageSequence.DY);
                var dw = calcValues(sceneInfo[0].values.imageSequence.DW);
                var dh = calcValues(sceneInfo[0].values.imageSequence.DH);
                sceneInfo[0].objs.context.drawImage(sceneInfo[0].objs.images[0], sx, sy, sw, sh, dx, dy, dw, dh);
                sceneInfo[0].objs.canvas.style.transform = 'translate3d(-50%,-50%,0) scale('+ scaleRatio +')';
                break;
            case 1:



                break;


            default :
                break;
        }
    }

    var initFunc = function () {
        initImage();
        initCanvasValues();
        initSectionHeight();
        currentSection();
    }

    var resizeFunc = function () {
        initCanvasValues();
        initSectionHeight();
        currentSection();
        drawCanvas();
    }

    initFunc();
    window.addEventListener('load', function () {
        drawCanvas();
        window.addEventListener('resize', function () {
            resizeFunc();
        })
        window.addEventListener('scroll', function () {
            scrollCurrentSection();
        })
    })
})()