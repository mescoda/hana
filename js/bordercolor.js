;(function() {
    var borderColorArsenal = [
            '#DDD',
            '#DCDCDC',
            '#D7D7D7',
            '#666666',
            '#CCCCCC',
            '#D6D6D6',
            '#FAFAFA',
            '#EBEBEB',
            '#E1D0A8',
            '#AFDCF8'
        ],
        borderColorContent = document.querySelector('.bordercolor-content'),
        borderColorBlock,
        i,
        iLen,
        cleanColorArray;
    
    function generateBlock(num, color) {
        var div = document.createElement('div'),
            span = document.createElement('span');
        div.style.borderColor = color;
        span.textContent = color;
        div.appendChild(span);
        return div;
    }

    cleanColorArray = yuki.cleanColors(borderColorArsenal);
    
    for (i = 0, iLen = borderColorArsenal.length; i < iLen; i++) {
        borderColorContent.appendChild(generateBlock(i, borderColorArsenal[i]));
    }
})();