/**
 * jQuery.scrollFix 滚动固定在某个位置的jQuery插件
 * by: mengqing723@gmail.com
 * date: 2016/10/26
  */
;(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports === 'object' && module.exports) {
        module.exports = factory;
    } else {
        factory(jQuery);
    }
}(function ($) {

    $.fn.scrollFix = function(options) {
        var defaults = {
            top: 0,             // 固定在顶部的高度
            bottom: 0,          // 停靠在底部的位置
            zindex: 999,        // 位置索引
            startObj: '',       // 滑到 startObj 位置时开始浮动固定，默认为空(即 this)
            position: 'top',    // 滑到 startObj 顶端/底端 开始浮动固定 ('top'|'bottom')
            endObj: ''          // 滑到这个位置顶部时取消固定并继续跟随滚动
        }
        var opts = $.extend({}, defaults, options);
        var $this = $(this),        // 当前对象
            isStartObj = (opts.startObj === '' || opts.startObj === undefined) ? false : true,      // 是否从当前对象开始浮动
            isEndObj = (opts.endObj === '' || opts.endObj === undefined) ? false : true;            // 是否取消浮动固定
        var eleHeight = isStartObj ? (opts.position === 'top' ? 0 : $(opts.startObj).outerHeight()) : 0;       // (顶部|底部) 开始浮动
            eleTop = $this.offset().top - opts.top,
            startTop = isStartObj ? ($(opts.startObj).offset().top + eleHeight - opts.top) : eleTop,
            endTop = isEndObj ? ($(opts.endObj).offset().top - opts.bottom - opts.top) : 0;
        var maxY = endTop - $(this).outerHeight();


        var methods = {
            fixed: function() {
                $this.css({position: 'fixed', top: opts.top + 'px', zIndex: opts.zindex});
            },
            absolute: function() {
                $this.css({position: 'absolute', top: (maxY - eleTop) + 'px', zIndex: opts.zindex});
            },
            none: function() {
                $this.removeAttr('style');
            }
        }

        $(window).scroll(function(event) {
            var scrollTop = $(this).scrollTop();
            if(scrollTop > startTop) {
                if(isEndObj) {
                    if(maxY < scrollTop) {
                        methods.absolute();
                    } else {
                        methods.fixed();
                    }
                } else {
                    methods.fixed();
                }
            } else {
                methods.none();
            }
        });
        
    }
}));