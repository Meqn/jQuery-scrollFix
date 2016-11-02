/**
 * jQuery.scrollFix 滚动固定在某个位置的jQuery插件
 * by: mengqing723@gmail.com
 * date: 2016/10/26
*/

;(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports === 'object' && exports) {
        module.exports = factory;
    } else {
        factory(jQuery);
    }
}(function ($) {

    $.fn.scrollFix = function(options) {
    return this.each(function() {
        
    
        var defaults = {
            top: 0,             // 固定在顶部的高度
            bottom: 0,          // 滑到startObj停靠对象的距离
            zindex: 999,        // 位置索引
            startObj: null,     // 滑到 startObj 位置时开始浮动固定，默认为空(即 当前元素)
            position: 'top',    // 滑到 startObj 顶端/底端 开始浮动固定 ('top'|'bottom')
            endObj: null,        // 滑到这个位置顶部时取消固定并继续跟随滚动
            endPos: 0,
            fixClass: 'fixed'
        }
        var opts = $.extend({}, defaults, options);
        var $this = $(this),        // 当前对象
            $startObj = opts.startObj === null ? $this : $(opts.startObj),      // 滚动到 startObj 开始浮动固定
            isEnd = opts.endObj === null ? false : true;             // 是否结束浮动固定

        var _style = $this.attr('style') ? $this.attr('style') : '';
        
        var eleHeight = (opts.position === 'top') ? 0 : $startObj.outerHeight();       // (顶部|底部) 开始浮动
        var startFix = $startObj.offset().top + eleHeight - opts.bottom;         // 滚动距离为 startFix 开始固定浮动
        var endFix = isEnd ? $(opts.endObj).offset().top - opts.top - opts.endPos - $this.outerHeight() : 0;        // 滚动距离为 endFix 结束固定浮动

        var methods = {
            fixed: function() {
                $this.css({position: 'fixed', top: opts.top + 'px', zIndex: opts.zindex})
                    .addClass(opts.fixClass);
            },
            absolute: function() {
                $this.css({position: 'absolute', top: endFix + 'px', zIndex: opts.zindex})
                    .removeClass(opts.fixClass);
            },
            default: function() {
                $this.attr('style', _style)
                    .removeClass(opts.fixClass);
            }
        }

        $(window).scroll(function(event) {
            var scrollTop = $(this).scrollTop();
            if(scrollTop > startFix) {
                if(isEnd) {
                    if(scrollTop > endFix) {
                        methods.absolute();
                    } else {
                        methods.fixed();
                        console.log('scrollTop')
                        console.log(scrollTop)
                    }
                } else {
                    methods.fixed();
                }
            } else {
                methods.default();
            }
        });


        });
    }
}));