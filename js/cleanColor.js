/*
0. 检查是否是 color
1. 统一格式: 大写, 去掉 #
2. 将可以简化的简化为3位
3. 去重
 */

/*
Example:
var a = ['123', 'ebe', '#DDD', 'dddddd', '', 'ggg', '#DDDDDD', 'E1D0A8', '#e1d0A8'];
yuki.cleanColor(a); // ["#123", "#EBE", "#DDD", "#E1D0A8"]
 */

;(function() {
    window.yuki = window.yuki || {};
})();

(function(yuki) {
    var rColorHex = /^#?([\da-f]{3}){1,2}$/i;
    function formatColor(color) {
        if(/^#([\da-f]{3}){1,2}$/i.test(color)) {
            color = color.slice(1);
        }
        return color.toUpperCase();
    }
    function simplifyColor(color) {
        if(/^([\dA-F])\1([\dA-F])\2([\dA-F])\3/.test(color)) {
            return color.charAt(0) + color.charAt(2) + color.charAt(4);
        }
        return color;
    }
    function cleanColor(color) {
        if(typeof color === 'string') {
            if(rColorHex.test(color)) {
                return '#' + simplifyColor( formatColor(color) );    
            } else {
                return '';
            }
        }
        var result = [],
            temp;
        for(var i = 0, iLen = color.length; i < iLen; i++) {
            if(rColorHex.test(color[i])) {
                temp = simplifyColor( formatColor(color[i]) );
                if(result.indexOf('#' + temp) === -1) {
                    result.push('#' + temp);
                }
            }
        }
        return result;
    }
    yuki.cleanColor = cleanColor;
})(yuki);