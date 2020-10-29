(function () {
    var svgPath = Array.prototype.slice.call(document.querySelectorAll("#interactive_svg path"));
    var wrap = document.querySelector(".wrap");
    var svgSet = function () {
        svgPath[1].style.strokeDasharray = "1550, " + svgPath[1].getTotalLength();
        svgPath[1].style.strokeDashoffset = 0;
        svgPath[2].style.strokeDasharray = "100, 5000";
        svgPath[3].style.strokeDasharray = "1550, " + svgPath[3].getTotalLength();
        svgPath[3].style.strokeDashoffset = 0;
        svgPath[4].style.strokeDasharray = "100, 5000";
        svgPath[4].style.strokeDashoffset = 0;
        wrap.style.transform = "translateY(0)";


        // svgPath.forEach(function (val, i) {
        //     val.style.strokeDasharray = val.getTotalLength() + ', ' + val.getTotalLength();
        //     val.style.strokeDashoffset = val.getTotalLength();
        // })
    }
    var drawSvg = function () {
        var winScrollTop = pageYOffset;
        var scrollHeight = document.body.scrollHeight;
        var scrollRealHeight = scrollHeight - innerHeight;
        var parallaxRatio = winScrollTop / scrollRealHeight;
        var parallaxPercent = winScrollTop / scrollRealHeight * 100;

        var svgPathX1 = 1550 + (svgPath[1].getTotalLength() - 1550) * parallaxRatio > svgPath[1].getTotalLength() ?
            svgPath[1].getTotalLength() : 1550 + (svgPath[1].getTotalLength() - 1550) * parallaxRatio < 1550 ?
                1550 : 1550 + (svgPath[1].getTotalLength() - 1550) * parallaxRatio;

        svgPath[1].style.strokeDasharray = svgPathX1 + ", " + svgPath[1].getTotalLength();
        svgPath[3].style.strokeDashoffset = -(27980 * parallaxRatio) > 0 ? 0 : -(27980 * parallaxRatio) < -27980 ? -27980 : -(27980 * parallaxRatio);
        svgPath[4].style.strokeDashoffset = -(34038 * parallaxRatio) > 0 ? 0 : -(34038 * parallaxRatio) < -34038 ? -34038 : -(34038 * parallaxRatio);
        wrap.style.transform = "translateY(-" + parallaxPercent + "px)";

        // svgPath.forEach(function (val, i) {
        //     var parallaxStartValue = val.getTotalLength();
        //     var parallaxMoveDistance = Math.max(0, Math.min(parallaxStartValue, parallaxStartValue - (parallaxStartValue * (parallaxPercent / 100)))); //패럴럭스 요소가 움직일 거리를 구합니다
        //     val.style.strokeDashoffset = parallaxMoveDistance;
        // })
    }
    var init = function () {
        svgSet();
        drawSvg();
    }
    init();
    addEventListener("scroll", function () {
        drawSvg();
    })
})()