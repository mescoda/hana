/*
TODO
1. 添加其他几种情况 color 的 style: 是不是直接用两种情况好了 link hover 然后各个里面都是一堆的 css
2. link 的 textContent 随机内容
 */

(function() {
    var links = [
            /*{
                link: '#EA0000',
                visited: '',
                hover: 'FF1E00',
                active: '',
                normalTextDecoration: 'none',
                hoverTextDecoration: ''
            }*/
            /*{
                link: {
                    color: ''
                },
                hover: {
                    color: '',
                    background-color: '1px solid #DDD'
                }
            }*/
            {

            },
            {
                linkColor: '#09C',
                hoverColor: '#C36',
            },
            {
                linkColor: '#EA0000',
                hoverColor: '#FF1E00',
                linkTextDecoration: 'none',
                hoverTextDecoration: 'none'
            }
        ],
        linkContent = document.querySelector('.link-content'),
        baseLinkClass = 'link',
        styleElem,
        cssText = '';

    function _extend(alpha, bravo) {
        var result = alpha || {},
            i;
        for(i in bravo) {
            if(bravo.hasOwnProperty(i)) {
                result[i] = bravo[i];
            }
        }
        return result;
    }

    function generateLink(num, config) {
        var p = document.createElement('p'),
            a = document.createElement('a'),
            currentClass  = baseLinkClass + num,
            defaultConfig = {
                linkColor: '#3377AA',
                hoverColor: '#3377AA',
                linkTextDecoration: 'none',
                hoverTextDecoration: 'underline'
            },
            cssConfig;
        cssConfig = _extend(defaultConfig, config);

        a.setAttribute('href', '#');
        a.classList.add(currentClass);
        a.textContent = 'lorem';

        cssText += '.' + currentClass + ' { color: ' + cssConfig.linkColor 
                + '; text-decoration: ' + cssConfig.linkTextDecoration + '; } ';
        cssText += '.' + currentClass + ':hover { color: ' + cssConfig.hoverColor 
                + '; text-decoration: ' + cssConfig.hoverTextDecoration + '; } ';

        p.appendChild(a);
        return p;
    }
    
    for(var i = 0, iLen = links.length; i < iLen; i++) {
        linkContent.appendChild( generateLink(i, links[i]) );
    }

    var styleElem = document.createElement('style')
    styleElem.textContent = cssText;
    document.getElementsByTagName('head')[0].appendChild(styleElem);
    

    // use OO
    function Link() {

    }
    Link.prototype.generate = function() {

    };
    Link.prototype.appendTo = function(elem) {

    };
    for(var i in links) {
        // new Link(links[i]);
    }
})();