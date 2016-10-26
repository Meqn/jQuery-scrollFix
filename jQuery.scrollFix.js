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
            top: 0,         // 固定在顶部的高度
            bottom: 0,      // 停靠在底部的位置
            endObj: ''      // 滑到这个位置顶部时开始跟随滚动
        }
        var opts = $.extend({}, defaults, options);
        var $this = $(this),
            isEnd = (opts.endObj !== '' || opts.endObj !== undefined) ? true : false;
        var eleTop = $this.offset().top - opts.top,
            endTop = isEnd ? ($(opts.endObj).offset().top - opts.bottom - opts.top) : 0;
        var maxY = endTop - $(this).outerHeight();

        var methods = {
            fixed: function() {
                $this.css({position: 'fixed', top: opts.top + 'px'});
            },
            absolute: function() {
                $this.css({position: 'absolute', top: (maxY - eleTop) + 'px'});
            },
            none: function() {
                $this.removeAttr('style');
            }
        }

        $(window).scroll(function(event) {
            var scrollTop = $(this).scrollTop();
            if(scrollTop > eleTop) {
                if(isEnd) {
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