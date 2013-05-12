;(function() {
    window.yuki = window.yuki || {};
})();

/*
0. 检查是否是 color
1. 统一格式: 大写, 去掉 #
2. 将可以简化的简化为3位
3. 去重
4. 添加 #
 */

/*
Example:
var a = ['123', 'ebe', '#DDD', 'dddddd', '', 'ggg', '#DDDDDD', 'E1D0A8', '#e1d0A8'];
yuki.cleanColors(a); // ["#123", "#EBE", "#DDD", "#E1D0A8"]
 */
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
    function cleanColors(color) {
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
    yuki.cleanColors = cleanColors;
})(yuki);



(function(yuki) {
    // 将 hex 转化为不带 # 的 6 位大写 hex
    function formatSingleHex(hex) {
        var result;
        if(!/^#?([\da-f]{3}){1,2}$/i.test(hex)) {
            return;
        }
        if(hex.charAt(0) === '#') {
            hex = hex.slice(1);
        }
        if(hex.length === 3) {
            // hex = hex.charAt(0) + hex.charAt(0) + hex.charAt(1) + hex.charAt(1) + hex.charAt(2) + hex.charAt(2);
            hex = hex.replace(/^([\da-f])([\da-f])([\da-f])$/i, '$1$1$2$2$3$3');
        }
        return hex.toUpperCase();
    }

    function formatHexArray(hexArray) {
        var result = [];
        for(var i = 0, iLen = hexArray.length; i < iLen; i++) {
            result.push( formatSingleHex(hexArray[i]) );
        }
        return result;
    }

    // 将不带 # 的 6 位 hex 转化为 rgb 数组
    function hexToRgb(hex) {
        var rgb = [];
        rgb.push(parseInt(hex.slice(0, 2), 16));
        rgb.push(parseInt(hex.slice(2, 4), 16));
        rgb.push(parseInt(hex.slice(4, 6), 16));
        return rgb;
    }
    function rgbToHsv(rgb) {
        var r = rgb[0] / 255,
            g = rgb[1] / 255,
            b = rgb[2] / 255,
            min = Math.min(r, g, b),
            max = Math.max(r, g, b),
            h,
            s,
            v;
        if(max === min) {
            h = 0;
        } else if(max === r && g >= b) {
            h = 60 * (g - b) / (max - min);
        } else if(max === r && g < b) {
            h = 60 * (g - b) / (max - min) + 360;
        } else if(max === g) {
            h = 60 * (b - r) / (max - min) + 120;
        } else if(max === b) {
            h = 60 * (r - g) / (max - min) + 240;
        }
        if(max === 0) {
            s = 0;
        } else {
            s = (max - min) / max;
        }
        v = max;
        return [h, s, v];
    }

    function rgbToHsl(rgb) {
        var r = rgb[0] / 255,
            g = rgb[1] / 255,
            b = rgb[2] / 255,
            min = Math.min(r, g, b),
            max = Math.max(r, g, b),
            h,
            s,
            l;
        if(max === min) {
            h = 0;
        } else if(max === r && g >= b) {
            h = 60 * (g - b) / (max - min);
        } else if(max === r && g < b) {
            h = 60 * (g - b) / (max - min) + 360;
        } else if(max === g) {
            h = 60 * (b - r) / (max - min) + 120;
        } else if(max === b) {
            h = 60 * (r - g) / (max - min) + 240;
        }

        l = (max + min) / 2;

        if(l === 0) {
            s = 0;
        } else if(l <= 0.5) {
            s = (max - min) / (max + min);
        } else {
            s = (max - min) / (2 - max - min);
        }
        return [h, s, l];
    }
    function rgbToCmyk(rgb) {
        var r = rgb[0] / 255,
            g = rgb[1] / 255,
            b = rgb[2] / 255,
            c,
            m,
            t,
            k;
        c = (1 - r);
        m = (1 - g);
        y = (1 - b);
        if(Math.min(c, m, y) === 1) {
            return [0, 0, 0, 1];
        } else {
            k = Math.min(c, m, y);
            c = (c - k) / (1 - k);
            m = (m - k) / (1 - k);
            y = (y - k) / (1 - k);
        }
        return [c, m, y, k];
    }

    var colors = [];
    function makeColorsArray(hexArray) {
        for (var i = hexArray.length - 1; i >= 0; i--) {
            // hex: 6位 大写 不含# 
            colors[i] = {};
            colors[i].hex = hexArray[i];
            colors[i].hexNum = parseInt(hexArray[i], 16);
            colors[i].rgb = hexToRgb(hexArray[i]);
            colors[i].hsv = rgbToHsv(colors[i].rgb);
            colors[i].hsl = rgbToHsl(colors[i].rgb);
            colors[i].cmyk = rgbToCmyk(colors[i].rgb);
            colors[i].red = colors[i].rgb[0];
            colors[i].green = colors[i].rgb[1];
            colors[i].blue = colors[i].rgb[2];
            colors[i].hue = colors[i].hsv[0];
            colors[i].hsvSaturation = colors[i].hsv[1];
            colors[i].value = colors[i].hsv[2];
            colors[i].hslSaturation = colors[i].hsl[1];
            colors[i].luminance = colors[i].hsl[2];
        };
    }
    
    function sortColors(hexArray, sortType, reverse) {
        if(Object.prototype.toString.call(hexArray) !== '[object Array]') {
            return hexArray;
        }
        switch(sortType) {
            case 'hexNum':
                sortType = 'hexNum';
                break;
            case 'hex':
                sortType = 'hex';
                break;
            case 'red':
            case 'r':
                sortType = 'red';
                break;
            case 'green':
            case 'g':
                sortType = 'green';
                break;
            case 'blue':
            case 'b':
                sortType = 'blue';
                break;
            case 'hue':
            case 'h':
                sortType = 'hue';
                break;
            case 'hslSaturation':
            case 's':
                sortType = 'hslSaturation';
                break;
            case 'hsvSaturation':
                sortType = 'hsvSaturation';
                break;
            case 'luminance':
            case 'l':
                sortType = 'luminance';
                break;
            case 'value':
            case 'v':
                sortType = 'value';
                break;
            default:
                sortType = 'hexNum';
        }
        reverse = reverse || false;

        var sortedColors,
            compareColor = (function() {
                if(reverse) {
                    return function(a, b) {
                        return a[sortType] - b[sortType];
                    }
                } else {
                    return function(a, b) {
                        return -(a[sortType] - b[sortType]);
                    }
                }
            })(),
            result = [];
        
        // 传入的 hexArray 是被 clean 过的带有 # 的简写 大写 hex
        // 现在需要转化为不带 # 的统一 6 位大写
        hexArray = formatHexArray(hexArray);

        makeColorsArray(hexArray);
        sortedColors = colors.sort(compareColor);
        for(var i = 0, iLen = sortedColors.length; i < iLen; i++) {
            result.push('#' + sortedColors[i].hex);
        }
        return result;
    }
    yuki.sortColors = sortColors;
})(yuki);