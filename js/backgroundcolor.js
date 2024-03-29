;(function() {
    var backgroundColorArsenal = [
            '#83BF73',
            '#7BC9B6',
            '#231437',
            '#EDB330',
            '#719BC0',
            '#BC6E7E',
            '#EEB594',
            '#414A1F',
            '#D3D8A2',
            '#71AA24',
            '#3C8540',
            '#64363C',
            '#F596AA',
            '#CA7A2C',
            '#EE3032',
            '#C59258',
            '#3F66A0',
            '#C7D39D',
            '#17BCC0',
            '#593618',
            '#E87285',
            '#191618',
            '#38A84A',
            '#E5D63B',
            '#9796B7',
            '#1A4F8B',
            '#AED7DB',
            '#D4D12C',
            '#F9964B',
            '#F9EFB7',
            '#FFD9EF',
            '#DC2765',
            '#E8E4DE',
            '#D94F03',
            '#8BAC5C',
            '#7C4825',
            '#FBE9CC',
            '#CCC0AF',
            '#CEDFF4',
            '#F6EFD5',
            '#2F9767',
            '#DDAA5B',
            '#ECD016',
            '#645299',
            '#1DAAE2',
            '#9F5A22',
            '#122B52',
            '#B8C8D3',
            '#A32128',
            '#B9D56C',
            '#F4F6F7',
            '#55C1BA',
            '#F16F6F',
            '#0099CC',
            '#7BC256',
            '#44951D',
            '#FDF2DC',
            '#867B62',
            '#EEEEEE',
            '#FAFAFA',
            '#66C7F7',
            '#EFEFEF',
            '#E5E5E5',
            '#AFAFAF',
            '#0A99AE',
            '#E83119',
            '#434343',
            '#F2F6E4',
            '#90B11F',
            '#369',
            '#FEF200',
            '#6CBFEE',
            '#3594CB',
            '#AFDCF8',
            '#91CFA1',
            '#3E80BC',
            '#BC3E3E',
            '#19232C',
            '#4EA9F4',
            '#5BD77B',
            '#F6E06A',
            '#EFA154',
            '#ED4676',
            '#161616',
            '#B6B6B6'
            /*
            rgb(78, 169, 244)
            rgb(247, 222, 113)
            rgb(236, 71, 119)
             */
        ],
        backgroundColorContent = document.querySelector('.backgroundcolor-content'),
        backgroundColorBlock,
        baseLinkClass = 'link',
        styleElem,
        cssText = '',
        i,
        iLen,
        j,
        jLen,
        cleanedColorArray = [],
        sortedColorArray = [];
    function generateBlock(num, color) {
        var div = document.createElement('div'),
            span = document.createElement('span');
        div.style.backgroundColor = color;
        // div.title = color;
        span.textContent = color;
        div.appendChild(span);
        return div;
    }
    cleanedColorArray = yuki.cleanColors(backgroundColorArsenal);
    sortedColorArray = yuki.sortColors(cleanedColorArray, 'l');
    for(i = 0, iLen = sortedColorArray.length; i < iLen; i++) {
        backgroundColorContent.appendChild( generateBlock(i, sortedColorArray[i]) );
    }

    /*backgroundColorBlock = backgroundColorContent.getElementsByTagName('div');
    for(j = 0, jLen = backgroundColorBlock.length; j < jLen; j++) {
        backgroundColorBlock[j].addEventListener('click', function() {
            var color = this.getElementsByTagName('span')[0].textContent;
            // clipboardData.setData(color);
            console.log(color);
        }, false);
    }*/
})();