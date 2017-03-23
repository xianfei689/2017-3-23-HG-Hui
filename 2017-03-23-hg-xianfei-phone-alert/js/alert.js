;
/**
 * [description]
 * ##############################################
 *
 * @Author                                                                             Copyright    xianfei
 * @Title                                         ######
 * @DateTime                                               2016-11-16T11:10:09+0800
 * @description           for hg  develop   公共组件   弹出框组件  简单版本
 *
 * ##############################################
 * @param       {[type]} $          [description]
 * @param       {[type]} document   [description]
 * @return      {[type]}            [description]
 */
// 分类
//   confirm   /  alert  /tip                              --------->  type
//    success  /fail  /warn /                           --------->  theme
//    alertConfirm  ------>callback
//    confirm
(function($, document) {
    var Popup = $.Popup = function(options) {
        var _ = this;
        _.init(options);
    }
    Popup.prototype = {
        init: function(options) {
            var _ = this;
            _.opts = $.extend({}, {
                type: "confirm",
                theme: "warn",
                arg: "40",
                content: "xxx",
                totalMoney: 0,
                totalLen: 0,
                confirm: function() {},
                cancel: function() {},
                reset: function() {},
                buy: function(totalMoney, totalLen) {},
                timeout: 1000
            }, options);

            var domBuffer = ""
            if (_.opts.type == "tip") {
                domBuffer += '<div class="zui-ui-shade" id="zui-ui-shade"></div><div class="zui-tip-div">\
                                <div class="zui-tip1  zui-tip"><span>里程转换器</span><span id="zui-close">X</span></div>\
                                <div class="zui-tip2  zui-tip">请输入您消费的现金价格</div>\
                                <div class="zui-tip3  zui-tip">\
                                    <input type="tel" class="zui-price" id="zui-price">\
                                    <input type="button" name="calc" id="calcMile" value="开始计算" class="zui-calc">\
                                </div>\
                                  <div class="zui-tip4  zui-tip">您需要支付的里程数为</div>\
                                  <div class="zui-tip5  zui-tip">\
                                      <input type="text" class="zui-length" id="zui-length">\
                                  </div>\
                                  <div class="zui-tip6  zui-tip">\
                                        <input type="button" value="重置" class="zui-reset" id="zui-reset">\
                                        <input type="button" value="去买单" class="zui-buy" id="zui-buy">\
                                  </div>\
                        </div>';
                var _tip = $(domBuffer).appendTo($("body"))
                _.tip = _tip
                _.bindTipCallBack()

            } else if (_.opts.type == "alert") {

            } else if (_.opts.type == "confirm") {

            }

        },

        bindTipCallBack: function() {
            var _ = this;
            $("#zui-close").unbind().bind("click", function() {
                _.tip.remove()
            })
            $("#zui-reset").unbind().bind("click", function() {
                // _.tip.remove()
                totalMoney = 0;
                totalLen = 0;
                $("#zui-price").val(null);
                $("#zui-length").val(null);
                _.opts.reset()

            })

            $("#zui-buy").unbind().bind("click", function() {
                if ((isNaN(Number($("#zui-price").val().trim()))) || ($("#zui-price").val().trim()) == "") {
                    totalMoney = 0;
                    totalLen = 0;
                }
                _.tip.remove()
                _.opts.buy(totalMoney, totalLen)

            })
            $("#calcMile").unbind().bind("click", function() {
                var price = Number($("#zui-price").val().trim());
                if (!isNaN(price)) {
                    totalMoney = price;
                    totalLen = Math.ceil(price) * 40;
                    $("#zui-length").val(totalLen);

                } else {
                    totalMoney = 0;
                    totalLen = 0;
                    $("#zui-length").val(null);
                }
            })
        }
    }
})($, document);
