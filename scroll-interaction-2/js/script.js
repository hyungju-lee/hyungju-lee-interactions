(function () {

    var yOffset = 0;
    var currentScene = 0;
    var relativeYOffset = 0;
    var scrollRatio = 0;
    var acc = 0.1;
    var delayedYOffset = 0;
    var prevScrollHeight = 0;
    var enterNewScene = false;
    var rafId;
    var rafState;
    var canvasHeightRatio;
    var canvasWidthRatio;
    var canvasScaleRatio;

    var sceneInfo = [
        {
            type: 'sticky',
            heightNum: 4,
            scrollHeight: 0,
            objs: {
                scene: document.querySelector('#scroll-interaction-0'),
                canvas: document.querySelector('#first-canvas'),
                context: document.querySelector('#first-canvas').getContext('2d'),
                imagesPath: [
                    './image/bg01.jpg',
                    './image/bg02.jpg',
                ],
                images: [],
                videoPath: [],
                videoImages: [],
            },
            values: {
                imageSequence: {
                    first: {
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
                    second: {
                        // canvas tag and image width 1920 , height 1080 기준
                        SX: [0, 0, { start: 0.33, end: 0.66 }],
                        SY: [0, 0, { start: 0.33, end: 0.66 }],
                        SW: [0, 0, { start: 0.33, end: 0.66 }],
                        SH: [0, 0, { start: 0.33, end: 0.66 }],
                        DX: [0, 0, { start: 0.33, end: 0.66 }],
                        DY: [0, 0, { start: 0.33, end: 0.66 }],
                        DW: [0, 0, { start: 0.33, end: 0.66 }],
                        DH: [0, 0, { start: 0.33, end: 0.66 }],
                    },
                },
                canvasScale: [0, 0, { start: 0.66, end: 1 }],
            },
        },
        {
            type: 'sticky',
            heightNum: 4,
            scrollHeight: 0,
            objs: {
                scene: document.querySelector('#scroll-interaction-1'),
                canvas: document.querySelector('#second-canvas'),
                context: document.querySelector('#second-canvas').getContext('2d'),
                imagesPath: [],
                images: [],
                videoPath: './image/video-1/',
                videoImages: [],
            },
            values: {
                videoImageCount: 631,
                videoSequence: [0, 630, { start: 0, end: 1 }],
            }
        }
    ]

    var initImage = function () {
        var imgElem;
        for (var i = 0; i < sceneInfo.length; i++) {
            for (var j = 0; j < sceneInfo[i].objs.imagesPath.length; j++) {
                imgElem = new Image();
                imgElem.src = sceneInfo[i].objs.imagesPath[j];
                sceneInfo[i].objs.images.push(imgElem);
            }
        }
    }

    var initVideo = function () {
        var videoElem;
        for (var i = 0; i < sceneInfo.length; i++) {
            for (var j = 1; j < sceneInfo[i].values.videoImageCount + 1; j++) {
                var videoElem = new Image();
                var num = j < 10? '0000' + j : j < 100? '000' + j : j < 1000? '00' + j :'0' + j;
                videoElem.src = sceneInfo[i].objs.videoPath + 'scene' + num +'.jpg';
                sceneInfo[i].objs.videoImages.push(videoElem);
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
        // 전체 캔버스 비율 설정
        canvasHeightRatio = innerHeight / sceneInfo[0].objs.canvas.height;
        canvasWidthRatio = innerWidth / sceneInfo[0].objs.canvas.width;
        canvasScaleRatio = canvasHeightRatio > canvasWidthRatio ? canvasHeightRatio : canvasWidthRatio;
        // 첫번째 씬 첫번째 이미지 설정
        var leftPx = innerWidth < 500 ? innerWidth * 0.1 : innerWidth * 0.15;
        sceneInfo[0].values.imageSequence.first.SW[0] = sceneInfo[0].values.imageSequence.first.DW[0] = innerWidth * 0.2 < 400? 400 : innerWidth * 0.2;
        sceneInfo[0].values.imageSequence.first.SW[1] = sceneInfo[0].values.imageSequence.first.DW[1] = innerWidth / canvasScaleRatio;
        sceneInfo[0].values.imageSequence.first.SH[0] = sceneInfo[0].values.imageSequence.first.DH[0] = innerHeight * 0.15 < 150? 150 : innerHeight * 0.15;
        sceneInfo[0].values.imageSequence.first.SH[1] = sceneInfo[0].values.imageSequence.first.DH[1] = innerHeight / canvasScaleRatio;
        sceneInfo[0].values.imageSequence.first.SX[1] = sceneInfo[0].values.imageSequence.first.DX[1] = (sceneInfo[0].objs.canvas.width * canvasScaleRatio - innerWidth) / 2 / canvasScaleRatio;
        sceneInfo[0].values.imageSequence.first.SX[0] = (sceneInfo[0].objs.canvas.width * canvasScaleRatio) / 2;
        sceneInfo[0].values.imageSequence.first.DX[0] = ((sceneInfo[0].objs.canvas.width * canvasScaleRatio - innerWidth) / 2) / canvasScaleRatio + leftPx / canvasScaleRatio;
        sceneInfo[0].values.imageSequence.first.DY[0] = sceneInfo[0].objs.canvas.height - sceneInfo[0].values.imageSequence.first.DH[0] - (sceneInfo[0].objs.canvas.height * canvasScaleRatio - innerHeight) / 2 / canvasScaleRatio;
        sceneInfo[0].values.imageSequence.first.DY[1] = ((sceneInfo[0].objs.canvas.height * canvasScaleRatio - innerHeight) / 2) / canvasScaleRatio;
        // 첫번째 씬 두번째 이미지 설정
        sceneInfo[0].values.canvasScale[0] = canvasScaleRatio;
        sceneInfo[0].values.canvasScale[1] = innerHeight / innerWidth > 1 ? canvasScaleRatio * 0.2 : canvasScaleRatio * 0.4;
        sceneInfo[0].values.imageSequence.second.SX[0] = sceneInfo[0].values.imageSequence.second.DX[0] = (sceneInfo[0].objs.canvas.width * canvasScaleRatio - innerWidth) / 2 / canvasScaleRatio;
        sceneInfo[0].values.imageSequence.second.SX[1] = sceneInfo[0].values.imageSequence.second.DX[1] = 0;
        sceneInfo[0].values.imageSequence.second.SY[0] = sceneInfo[0].values.imageSequence.second.SH[1] =
            sceneInfo[0].values.imageSequence.second.DY[0] = sceneInfo[0].values.imageSequence.second.DH[1] =
                ((sceneInfo[0].objs.canvas.height * canvasScaleRatio - innerHeight) / 2 + innerHeight) / canvasScaleRatio;
        sceneInfo[0].values.imageSequence.second.SY[1] = sceneInfo[0].values.imageSequence.second.SH[0] =
            sceneInfo[0].values.imageSequence.second.DY[1] = sceneInfo[0].values.imageSequence.second.DH[0] =
                ((sceneInfo[0].objs.canvas.height * canvasScaleRatio - innerHeight) / 2) / canvasScaleRatio;
        sceneInfo[0].values.imageSequence.second.SW[0] = sceneInfo[0].values.imageSequence.second.DW[0] =((sceneInfo[0].objs.canvas.width * canvasScaleRatio - innerWidth) / 2 + innerWidth) / canvasScaleRatio;
        sceneInfo[0].values.imageSequence.second.SW[1] = sceneInfo[0].values.imageSequence.second.DW[1] = 1920;
    }

    var currentSection = function () {
        delayedYOffset = yOffset = pageYOffset;
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

    var smoothScroll = function () {
        yOffset = pageYOffset;
        delayedYOffset = delayedYOffset + (yOffset - delayedYOffset) * acc;
        relativeYOffset = delayedYOffset - prevScrollHeight;
        scrollRatio = relativeYOffset / (sceneInfo[currentScene].scrollHeight);
        scrollCurrentSection();
        rafId = requestAnimationFrame(smoothScroll);
        if (Math.abs(yOffset - delayedYOffset) < 1) {
            cancelAnimationFrame(rafId);
            rafState = false;
        }
    }

    var scrollCurrentSection = function () {
        enterNewScene = false;
        prevScrollHeight = 0;
        for (var i = 0; i < currentScene; i++) {
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }
        if (delayedYOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
            enterNewScene = true;
            if (currentScene < sceneInfo.length - 1) {
                currentScene++;
            }
        }
        if (delayedYOffset < prevScrollHeight) {
            enterNewScene = true;
            if (currentScene === 0) return;
            currentScene--;
        }
        document.body.setAttribute("id", "show-scene-" + currentScene);
        if (enterNewScene) return;
        drawCanvas();
    }

    var calcValues = function (values) {
        var rv;
        if (values[2].start === 0 && values[2].end === 1) {
            var scrollStart = sceneInfo[currentScene].scrollHeight * values[2].start;
            var scrollEnd = sceneInfo[currentScene].scrollHeight * values[2].end;
            if (relativeYOffset >= scrollStart && relativeYOffset <= scrollEnd) {
                rv = scrollRatio * (values[1] - values[0]) + values[0];
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
                sceneInfo[0].objs.context.clearRect(0, 0, 1920, 1080);
                var sx = calcValues(sceneInfo[0].values.imageSequence.first.SX);
                var sy = calcValues(sceneInfo[0].values.imageSequence.first.SY);
                var sw = calcValues(sceneInfo[0].values.imageSequence.first.SW);
                var sh = calcValues(sceneInfo[0].values.imageSequence.first.SH);
                var dx = calcValues(sceneInfo[0].values.imageSequence.first.DX);
                var dy = calcValues(sceneInfo[0].values.imageSequence.first.DY);
                var dw = calcValues(sceneInfo[0].values.imageSequence.first.DW);
                var dh = calcValues(sceneInfo[0].values.imageSequence.first.DH);
                var sx2 = calcValues(sceneInfo[0].values.imageSequence.second.SX);
                var sy2 = calcValues(sceneInfo[0].values.imageSequence.second.SY);
                var sw2 = calcValues(sceneInfo[0].values.imageSequence.second.SW);
                var sh2 = calcValues(sceneInfo[0].values.imageSequence.second.SH);
                var dx2 = calcValues(sceneInfo[0].values.imageSequence.second.DX);
                var dy2 = calcValues(sceneInfo[0].values.imageSequence.second.DY);
                var dw2 = calcValues(sceneInfo[0].values.imageSequence.second.DW);
                var dh2 = calcValues(sceneInfo[0].values.imageSequence.second.DH);
                var canvasScaleNum = calcValues(sceneInfo[0].values.canvasScale);
                sceneInfo[0].objs.context.drawImage(sceneInfo[0].objs.images[0], sx, sy, sw, sh, dx, dy, dw, dh);
                sceneInfo[0].objs.context.drawImage(sceneInfo[0].objs.images[1], sx2, sy2, sw2, sh2, dx2, dy2, dw2, dh2);
                sceneInfo[0].objs.canvas.style.transform = 'translate3d(-50%,-50%,0) scale('+ canvasScaleNum +')';
                break;
            case 1:
                // var vNum = Math.round(calcValues(sceneInfo[1].values.videoSequence));
                // sceneInfo[1].objs.context.drawImage(sceneInfo[1].objs.videoImages[vNum], 0, 0);



                break;


            default :
                break;
        }
    }

    var initFunc = function () {
        initImage();
        initVideo();
        initSectionHeight();
        currentSection();
        initCanvasValues();
    }

    var resizeFunc = function () {
        initSectionHeight();
        currentSection();
        initCanvasValues();
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
            if (!rafState) {
                rafId = requestAnimationFrame(smoothScroll);
                rafState = true;
            }
        })
    })
})()