(function() {
    var flatbuttonColorArsenal = [
            // [backgroundColor, textColor]
            ['#F66169', '#FAEFDE'],
            ['#444', '#EEE'],
            ['#EA0000', '#FFFEFE']
        ],
        flatbuttonContent = document.querySelector('.flatbutton-content'),
        i,
        iLen;
    function generateElement(num, css) {
        var a = document.createElement('a');
        a.setAttribute('href', '#');
        a.textContent = 'button';
        a.style.backgroundColor = css[0];
        a.style.color = css[1];
        return a;
    }
    for(i = 0, iLen = flatbuttonColorArsenal.length; i < iLen; i++) {
        flatbuttonContent.appendChild( generateElement(i, flatbuttonColorArsenal[i]) );
    }
})();