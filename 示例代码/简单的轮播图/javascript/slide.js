
$(function(){
    var $slide = $('.h-slide'); // 轮播图模块
    var slideWidth = $slide.width(); // 单张幻灯片的宽度(即屏幕宽度)
    var length = $slide.find('.poster').length; // 幻灯片张数
    var timer; // 定时器
    var currentImageIndex = 0; // 当前是第几张幻灯片

    // 生成底部焦点并加入轮播图
    $slide.find('.indicator').remove();
    var $indicator = $('<div class="indicator"></div>');
    for(var i=0;i<length;i++){
        $indicator.append($('<a class="u-dot"></a>'));
    }
    $slide.append($indicator);

    $slide.find('.box').css("width", slideWidth * length );
    $slide.find('.poster').css("width", slideWidth );

    // 初始化第一张幻灯片
    showImages(currentImageIndex,slideWidth);

    // 注册指示器的监听事件
    $slide.find('.indicator a').on('click',function (e) {
        currentImageIndex = $slide.find('.indicator a').index(this);
        showImages(currentImageIndex,slideWidth);
    });

    // 注册定时器，定时进行切换
    $slide.on('mouseenter',function () {
        clearInterval(timer);
    });
    $slide.on('mouseleave',function () {
        timer = setInterval(function(){
            currentImageIndex++;
            if(currentImageIndex === length){
                currentImageIndex = 0;
            }
            showImages(currentImageIndex,slideWidth);
        }, 3 * 1000);
    });
    // 初始化定时器, 开始轮播
    $slide.trigger('mouseleave');

    // 注册监听窗口变化
    $(window).on('resize',function (e) {
        slideWidth = $slide.width();
        $slide.find('.box').removeClass('animate').css("width", slideWidth * length );
        $slide.find('.poster').css("width", slideWidth );
        showImages(currentImageIndex, slideWidth);
        setTimeout(function () {
            // 放在setTimeout外面会出现动画还是存在的问题, 但是此时是不需要的动画的,
            // 估计和jquery内部的事件循环有关(猜测是合并了对class的操作), 尝试放在下一个事件循环可解决
            $slide.find('.box').addClass('animate');
        });
        //$slide.find('.box').addClass('animate');
    });

    /**
     *
     * @param nextIndex int 将要变成第几张幻灯片
     * @param slideWidth int 单张幻灯片宽度
     * @description 切换幻灯片
     * */
    function showImages(nextIndex, slideWidth) {
        var nextLeft = -nextIndex * slideWidth;
        //$slide.find('.box').stop(true,false).animate({left:nextLeft},500);
        $slide.find('.box').stop(true,false).css("transform","translateX("+ nextLeft +"px)");
        $slide.find('.indicator a').removeClass('current').eq(nextIndex).addClass('current');
    }
});
