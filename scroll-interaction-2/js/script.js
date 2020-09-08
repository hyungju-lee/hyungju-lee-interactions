(function () {

    var yOffset = 0,
        currentScene = 0,
        relativeYOffset = 0,
        scrollRatio = 0,
        acc = 0.1,
        delayedYOffset = 0,
        prevScrollHeight = 0,
        enterNewScene = false,
        rafId,
        rafState,
        canvasHeightRatio,
        canvasWidthRatio,
        canvasScaleRatio;

    var sceneInfo = [
        {
            // 0
            type: 'stickyToNormal',
            heightNum: 5,
            scrollHeight: 0,
            paddingTop: 0,
            objs: {
                scene: document.querySelector('#scroll-interaction-0'),
                canvas: document.querySelector('#scroll-interaction-0 #first-canvas'),
                context: document.querySelector('#scroll-interaction-0 #first-canvas').getContext('2d'),
                text: document.querySelector('#scroll-interaction-0 .sticky-text__first'),
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
                        SX: [0, 0, { start: 0, end: 0.264 }],
                        SY: [0, 0, { start: 0, end: 0.264 }],
                        SW: [0, 0, { start: 0, end: 0.264 }],
                        SH: [0, 0, { start: 0, end: 0.264 }],
                        DX: [0, 0, { start: 0, end: 0.264 }],
                        DY: [0, 0, { start: 0, end: 0.264 }],
                        DW: [0, 0, { start: 0, end: 0.264 }],
                        DH: [0, 0, { start: 0, end: 0.264 }],
                    },
                    second: {
                        // canvas tag and image width 1920 , height 1080 기준
                        SX: [0, 0, { start: 0.264, end: 0.528 }],
                        SY: [0, 0, { start: 0.264, end: 0.528 }],
                        SW: [0, 0, { start: 0.264, end: 0.528 }],
                        SH: [0, 0, { start: 0.264, end: 0.528 }],
                        DX: [0, 0, { start: 0.264, end: 0.528 }],
                        DY: [0, 0, { start: 0.264, end: 0.528 }],
                        DW: [0, 0, { start: 0.264, end: 0.528 }],
                        DH: [0, 0, { start: 0.264, end: 0.528 }],
                    },
                },
                canvasScale: [0, 0, { start: 0.528, end: 0.8 }],
                firstTextOpacity: [1, 0, { start: 0, end: 0.2 }],
                firstTextTranslate: [0, -100, { start: 0, end: 0.2 }],
            },
        },
        {
            // 1
            type: 'sticky',
            heightNum: 4,
            scrollHeight: 0,
            objs: {
                scene: document.querySelector('#scroll-interaction-1'),
                canvas: document.querySelector('#scroll-interaction-1 #second-canvas'),
                context: document.querySelector('#scroll-interaction-1 #second-canvas').getContext('2d'),
                imagesPath: [],
                images: [],
                videoPath: './image/video-1/',
                videoImages: [],
            },
            values: {
                videoImageCount: 631,
                videoSequence: [0, 630, { start: 0, end: 1 }],
                canvasOpacityIn: [0, 1, { start: 0, end: 0.2 }],
                canvasOpacityOut: [1, 0, { start: 0.8, end: 1 }],
            }
        },
        {
            // 2
            type: 'sticky',
            heightNum: 4,
            scrollHeight: 0,
            objs: {
                scene: document.querySelector('#scroll-interaction-2'),
                canvas: document.querySelector('#scroll-interaction-2 #third-canvas'),
                context: document.querySelector('#scroll-interaction-2 #third-canvas').getContext('2d'),
                imagesPath: [],
                images: [],
                videoPath: './image/video-2/',
                videoImages: [],
            },
            values: {
                videoImageCount: 148,
                videoSequence: [0, 147, { start: 0, end: 1 }],
                canvasOpacityIn: [0, 1, { start: 0, end: 0.2 }],
                canvasOpacityOut: [1, 0, { start: 0.8, end: 1 }],
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
        for (var i = 1; i < sceneInfo[1].values.videoImageCount + 1; i++) {
            var videoElem = new Image();
            var num = i < 10? '0000' + i : i < 100? '000' + i : i < 1000? '00' + i :'0' + i;
            videoElem.src = sceneInfo[1].objs.videoPath + 'scene' + num +'.jpg';
            sceneInfo[1].objs.videoImages.push(videoElem);
        }

        var videoElem2;
        for (var j = 0; j < sceneInfo[2].values.videoImageCount; j++) {
            var videoElem2 = new Image();
            var num2 = j < 10? '000' + j : j < 100? '00' + j : j < 1000? '0' + j : j;
            videoElem2.src = sceneInfo[2].objs.videoPath + num2 +'.jpg';
            sceneInfo[2].objs.videoImages.push(videoElem2);
        }
    }

    var initSectionHeight = function () {
        for (var i = 0; i < sceneInfo.length; i++) {
            sceneInfo[i].scrollHeight = innerHeight * sceneInfo[i].heightNum;
            sceneInfo[i].objs.scene.style.height = sceneInfo[i].scrollHeight + 'px';
            if (sceneInfo[i].type === 'stickyToNormal') {
                sceneInfo[i].paddingTop = innerHeight * sceneInfo[i].heightNum - innerHeight;
                sceneInfo[i].objs.scene.style.paddingTop = sceneInfo[i].paddingTop + 'px';
                sceneInfo[i].objs.scene.querySelector('.scroll-interaction-inner').style.height = innerHeight + 'px';
            }
        }
    }

    var initCanvasValues = function () {
        // 전체 캔버스 비율 설정
        canvasHeightRatio = innerHeight / sceneInfo[0].objs.canvas.height;
        canvasWidthRatio = innerWidth / sceneInfo[0].objs.canvas.width;
        canvasScaleRatio = canvasHeightRatio > canvasWidthRatio ? canvasHeightRatio : canvasWidthRatio;
        // 첫번째 씬 첫번째 이미지 설정
        var leftPx = innerWidth >= 1200 ? (innerWidth / 2 - 600) / canvasScaleRatio : innerWidth <= 500 ? innerWidth * 0.1 / canvasScaleRatio : innerWidth * 0.15 / canvasScaleRatio;
        sceneInfo[0].values.imageSequence.first.SW[0] = sceneInfo[0].values.imageSequence.first.DW[0] = innerWidth > 400 ? 400 : innerWidth * 0.8;
        sceneInfo[0].values.imageSequence.first.SW[1] = sceneInfo[0].values.imageSequence.first.DW[1] = innerWidth / canvasScaleRatio;
        sceneInfo[0].values.imageSequence.first.SH[0] = sceneInfo[0].values.imageSequence.first.DH[0] = 140;
        sceneInfo[0].values.imageSequence.first.SH[1] = sceneInfo[0].values.imageSequence.first.DH[1] = innerHeight / canvasScaleRatio;
        sceneInfo[0].values.imageSequence.first.SX[0] = 960;
        sceneInfo[0].values.imageSequence.first.SX[1] = sceneInfo[0].values.imageSequence.first.DX[1] = ((sceneInfo[0].objs.canvas.width * canvasScaleRatio - innerWidth) / 2) / canvasScaleRatio;
        sceneInfo[0].values.imageSequence.first.DX[0] = ((sceneInfo[0].objs.canvas.width * canvasScaleRatio - innerWidth) / 2) / canvasScaleRatio + leftPx;
        sceneInfo[0].values.imageSequence.first.DY[0] = sceneInfo[0].objs.canvas.height - sceneInfo[0].values.imageSequence.first.DH[0] - (sceneInfo[0].objs.canvas.height * canvasScaleRatio - innerHeight) / 2 / canvasScaleRatio;
        sceneInfo[0].values.imageSequence.first.SY[0] = sceneInfo[0].values.imageSequence.first.SY[1] = sceneInfo[0].values.imageSequence.first.DY[1] = (sceneInfo[0].objs.canvas.height * canvasScaleRatio - innerHeight) / 2 / canvasScaleRatio;
        // 첫번째 씬 두번째 이미지 설정
        sceneInfo[0].values.canvasScale[0] = canvasScaleRatio;
        sceneInfo[0].values.canvasScale[1] = innerHeight / innerWidth > 1 ? canvasScaleRatio * 0.2 : canvasScaleRatio * 0.4;
        sceneInfo[0].values.imageSequence.second.SX[0] = sceneInfo[0].values.imageSequence.second.DX[0] = (sceneInfo[0].objs.canvas.width * canvasScaleRatio - innerWidth) / 2 / canvasScaleRatio;
        sceneInfo[0].values.imageSequence.second.SX[1] = sceneInfo[0].values.imageSequence.second.DX[1] = 0;
        sceneInfo[0].values.imageSequence.second.SY[0] = sceneInfo[0].values.imageSequence.second.DY[0] =
                ((sceneInfo[0].objs.canvas.height * canvasScaleRatio - innerHeight) / 2 + innerHeight) / canvasScaleRatio;
        sceneInfo[0].values.imageSequence.second.SY[1] = sceneInfo[0].values.imageSequence.second.DY[1] =
                ((sceneInfo[0].objs.canvas.height * canvasScaleRatio - innerHeight) / 2) / canvasScaleRatio;
        sceneInfo[0].values.imageSequence.second.SH[0] = sceneInfo[0].values.imageSequence.second.DH[0] = 1;
        sceneInfo[0].values.imageSequence.second.SH[1] = sceneInfo[0].values.imageSequence.second.DH[1] = innerHeight / canvasScaleRatio;
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

    var refreshDrawCanvas = function () {
        switch (true) {
            case (currentScene === 1 || currentScene === 2):
                sceneInfo[0].objs.context.drawImage(
                    sceneInfo[0].objs.images[0],
                    sceneInfo[0].values.imageSequence.first.SX[1],
                    sceneInfo[0].values.imageSequence.first.SY[1],
                    sceneInfo[0].values.imageSequence.first.SW[1],
                    sceneInfo[0].values.imageSequence.first.SH[1],
                    sceneInfo[0].values.imageSequence.first.DX[1],
                    sceneInfo[0].values.imageSequence.first.DY[1],
                    sceneInfo[0].values.imageSequence.first.DW[1],
                    sceneInfo[0].values.imageSequence.first.DH[1]);
                sceneInfo[0].objs.context.drawImage(sceneInfo[0].objs.images[1],
                    sceneInfo[0].values.imageSequence.second.SX[1],
                    sceneInfo[0].values.imageSequence.second.SY[1],
                    sceneInfo[0].values.imageSequence.second.SW[1],
                    sceneInfo[0].values.imageSequence.second.SH[1],
                    sceneInfo[0].values.imageSequence.second.DX[1],
                    sceneInfo[0].values.imageSequence.second.DY[1],
                    sceneInfo[0].values.imageSequence.second.DW[1],
                    sceneInfo[0].values.imageSequence.second.DH[1]);
                sceneInfo[0].objs.canvas.style.transform = 'translate3d(-50%,-50%,0) scale('+ sceneInfo[0].values.canvasScale[1] +')';
                sceneInfo[0].objs.scene.querySelector('.scroll-interaction-inner').classList.remove('sticky-elem');
                sceneInfo[0].objs.text.style.opacity = sceneInfo[0].values.firstTextOpacity[1];
                sceneInfo[0].objs.text.style.transform = 'translate3d(0,'+ sceneInfo[0].values.firstTextTranslate[1] +'%,0)';
                break;
            default:
                break;
        }
    }

    var drawCanvas = function () {
        switch (currentScene) {
            case 0:
                sceneInfo[0].objs.context.clearRect(0, 0, 1920, 1080);
                var sx = Math.round(calcValues(sceneInfo[0].values.imageSequence.first.SX)),
                    sy = Math.round(calcValues(sceneInfo[0].values.imageSequence.first.SY)),
                    sw = Math.round(calcValues(sceneInfo[0].values.imageSequence.first.SW)),
                    sh = Math.round(calcValues(sceneInfo[0].values.imageSequence.first.SH)),
                    dx = Math.round(calcValues(sceneInfo[0].values.imageSequence.first.DX)),
                    dy = Math.round(calcValues(sceneInfo[0].values.imageSequence.first.DY)),
                    dw = Math.round(calcValues(sceneInfo[0].values.imageSequence.first.DW)),
                    dh = Math.round(calcValues(sceneInfo[0].values.imageSequence.first.DH)),
                    sx2 = Math.round(calcValues(sceneInfo[0].values.imageSequence.second.SX)),
                    sy2 = Math.round(calcValues(sceneInfo[0].values.imageSequence.second.SY)),
                    sw2 = Math.round(calcValues(sceneInfo[0].values.imageSequence.second.SW)),
                    sh2 = Math.round(calcValues(sceneInfo[0].values.imageSequence.second.SH)),
                    dx2 = Math.round(calcValues(sceneInfo[0].values.imageSequence.second.DX)),
                    dy2 = Math.round(calcValues(sceneInfo[0].values.imageSequence.second.DY)),
                    dw2 = Math.round(calcValues(sceneInfo[0].values.imageSequence.second.DW)),
                    dh2 = Math.round(calcValues(sceneInfo[0].values.imageSequence.second.DH)),
                    canvasScaleNum = calcValues(sceneInfo[0].values.canvasScale),
                    firstTextOpacity = calcValues(sceneInfo[0].values.firstTextOpacity),
                    firstTextTranslate = calcValues(sceneInfo[0].values.firstTextTranslate);
                sceneInfo[0].objs.context.drawImage(sceneInfo[0].objs.images[0], sx, sy, sw, sh, dx, dy, dw, dh);
                sceneInfo[0].objs.context.drawImage(sceneInfo[0].objs.images[1], sx2, sy2, sw2, sh2, dx2, dy2, dw2, dh2);
                sceneInfo[0].objs.canvas.style.transform = 'translate3d(-50%,-50%,0) scale('+ canvasScaleNum +')';
                sceneInfo[0].objs.text.style.opacity = firstTextOpacity;
                sceneInfo[0].objs.text.style.transform = 'translate3d(0,'+ firstTextTranslate +'%,0)';
                if (yOffset >= sceneInfo[0].paddingTop) {
                    sceneInfo[0].objs.scene.querySelector('.scroll-interaction-inner').classList.remove('sticky-elem');
                } else {
                    sceneInfo[0].objs.scene.querySelector('.scroll-interaction-inner').classList.add('sticky-elem');
                }
                break;
            case 1:
                var vNum = Math.round(calcValues(sceneInfo[1].values.videoSequence)),
                    opacityCenter = (sceneInfo[1].values.canvasOpacityIn[2].end + sceneInfo[1].values.canvasOpacityOut[2].start) / 2;
                sceneInfo[1].objs.context.drawImage(sceneInfo[1].objs.videoImages[vNum], 0, 0, 1920, 1080);
                sceneInfo[1].objs.canvas.style.transform = 'translate3d(-50%,-50%,0) scale('+ canvasScaleRatio +')';
                if (scrollRatio <= opacityCenter) {
                    var opacityIn = calcValues(sceneInfo[1].values.canvasOpacityIn);
                    sceneInfo[1].objs.canvas.style.opacity = opacityIn;
                } else {
                    var opacityOut = calcValues(sceneInfo[1].values.canvasOpacityOut);
                    sceneInfo[1].objs.canvas.style.opacity = opacityOut;
                }
                break;
            case 2:
                sceneInfo[2].objs.context.clearRect(0, 0, 1920, 1080);
                sceneInfo[2].objs.context.fillRect(0, 0,1920, 1080);
                var vNum2 = Math.round(calcValues(sceneInfo[2].values.videoSequence)),
                    opacityCenter2 = (sceneInfo[2].values.canvasOpacityIn[2].end + sceneInfo[2].values.canvasOpacityOut[2].start) / 2,
                    nRatio = sceneInfo[2].objs.videoImages[vNum2].naturalHeight / sceneInfo[2].objs.videoImages[vNum2].naturalWidth,
                    sw = Math.round(sceneInfo[2].objs.videoImages[vNum2].naturalWidth),
                    sy = Math.round(sceneInfo[2].objs.videoImages[vNum2].naturalHeight),
                    dx = innerWidth > 1200 ?
                        Math.round((sceneInfo[2].objs.canvas.width * canvasScaleRatio / 2) / canvasScaleRatio - 400) :
                        Math.round((sceneInfo[2].objs.canvas.width * canvasScaleRatio - innerWidth) / 2 / canvasScaleRatio),
                    dw = innerWidth > 1200 ? 800 : Math.round(innerWidth / canvasScaleRatio),
                    dh = Math.round(dw * nRatio),
                    dy = dh < innerHeight ?
                        Math.round((sceneInfo[2].objs.canvas.height * canvasScaleRatio - innerHeight) / 2 / canvasScaleRatio + innerHeight * 0.2) :
                        Math.round((sceneInfo[2].objs.canvas.height * canvasScaleRatio - innerHeight) / 2 / canvasScaleRatio - (innerWidth * nRatio - innerHeight) / canvasScaleRatio / 2);
                sceneInfo[2].objs.context.drawImage(sceneInfo[2].objs.videoImages[vNum2], 0, 0, sw, sy, dx, dy, dw, dh)
                sceneInfo[2].objs.canvas.style.transform = 'translate3d(-50%,-50%,0) scale('+ canvasScaleRatio +')';
                if (scrollRatio <= opacityCenter2) {
                    var opacityIn2 = calcValues(sceneInfo[2].values.canvasOpacityIn);
                    sceneInfo[2].objs.canvas.style.opacity = opacityIn2;
                } else {
                    var opacityOut2 = calcValues(sceneInfo[2].values.canvasOpacityOut);
                    sceneInfo[2].objs.canvas.style.opacity = opacityOut2;
                }
                break;
            default :
                break;
        }
    }

    var initFunc = function () {
        initImage();
        initVideo();
    }

    // FF에서 로딩중일 때 브라우저 크기 변할때를 대비
    var loadInitFunc = function () {
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
        document.body.classList.remove('before-load');
        loadInitFunc();
        drawCanvas();
        refreshDrawCanvas();
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
        document.querySelector('.loading').addEventListener('transitionend', function (e) {
            document.body.removeChild(e.currentTarget);
        })
    })
})()