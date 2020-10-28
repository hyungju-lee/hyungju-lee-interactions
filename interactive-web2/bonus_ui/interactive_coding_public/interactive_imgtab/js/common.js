var tabGallery = function(){
    var galleryWrap = $('.grallery_box');
    var viewGallery = galleryWrap.find('.view_gallery .img');
    var btnList = galleryWrap.find('.btn_wrap a');
    var moveBg = galleryWrap.find('.move_bg')

    btnList.on('click',function(){

        var obj = $(this);
        var idx = btnList.index(this);
        var moveBgWidth = btnList.eq(idx).outerWidth();
        var pos = obj.position().left;

        if(obj.hasClass('active')){
           return false;
        }else {
            btnList.removeClass('active');
            viewGallery.removeClass('active');

            obj.addClass('active');
            viewGallery.eq(idx).addClass('active');
            moveBg.css({'left': pos + 'px', 'width': moveBgWidth + 'px'});
        }

    });
};

$(function(){
    tabGallery();
});