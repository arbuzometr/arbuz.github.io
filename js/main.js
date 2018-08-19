addEvent('load', window, countMelonByCirc);

var circHor = document.getElementById('js-circumference-horizontal');
addEvent('change', circHor, countMelonByCirc);
addEvent('keyup', circHor, countMelonByCirc);

var circVer = document.getElementById('js-circumference-vertical');
addEvent('change', circVer, countMelonByCirc);
addEvent('keyup', circVer, countMelonByCirc);

var m = document.getElementById('js-mass');
addEvent('change', m, countMelonByCirc);
addEvent('keyup', m, countMelonByCirc);

function countMelonByCirc() {
    var ch = Number(document.getElementById('js-circumference-horizontal').value);
    var cv = Number(document.getElementById('js-circumference-vertical').value);
    var mass = Number(document.getElementById('js-mass').value);

    /* count average circumference */
    var circumference = 0;
    if (ch !== 0 && isNumeric(ch) && cv !== 0 && isNumeric(cv)) {
        circumference = (ch + cv) / 2;
    } else if (ch !== 0 && isNumeric(ch)) {
        circumference = ch;
    }

    if (circumference !== 0) {

        /*show ideal mass m=L^3*0.017*/
        var idealMass = (Math.pow(circumference, 3) * 0.017 / 1000).toFixed(3);

        var im = document.getElementById('js-ideal-mass');
        im.innerHTML = idealMass;

        /*get ripeness*/
        var ripenessPercent = getRipenessByCircumferencePercent(mass, idealMass);

        if (mass !== 0 && isNumeric(ripenessPercent)) {

            document.getElementById('js-ripeness-percent').innerHTML = 'Индекс спелости: ' + ripenessPercent + '%';
            document.getElementById('js-ripeness-range').value = ripenessPercent;

            /* show visual chart */
            var visual = document.querySelector('.visual');


            if (visual.classList) {
                visual.classList.remove('invisible');
            } else {
                visual.className = visual.className.replace(new RegExp('(^|\\b)' + 'invisible'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
            }
        }
    }
}

function getRipenessByCircumferencePercent(m, idealm) {
    var percent = Math.round(100 - (m - idealm) / (idealm / 100));
    return percent > 0 ? percent : 0;
}

function addEvent(evnt, elem, func) {
    if (elem.addEventListener) { // W3C DOM
        elem.addEventListener(evnt, func, false);
    } else if (elem.attachEvent) { // IE DOM
        elem.attachEvent("on" + evnt, func);
    } else {
        elem[evnt] = func;
    }
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}