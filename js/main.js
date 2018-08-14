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
    var cHorizontal = Number(document.getElementById('js-circumference-horizontal').value);
    var cVertical = Number(document.getElementById('js-circumference-vertical').value);
    var mass = Number(document.getElementById('js-mass').value);

    /* count average circumference */
    var circumference = 0;
    if (cHorizontal !== 0 && isNumeric(cHorizontal) && cVertical !== 0 && isNumeric(cVertical)) {
        circumference = (cHorizontal + cVertical) / 2;
    } else if (cHorizontal !== 0 && isNumeric(cHorizontal)) {
        circumference = cHorizontal;
    }

    if (circumference !== 0) {

        /*show ideal weight*/
        var idealMass = getIdealMass(circumference);

        document.getElementById('js-ideal-mass').value = idealMass;
        document.getElementById('js-ideal-mass-max').innerHTML = 'Если реальный вес арбуза меньше <b>' +
            getIdealMassMax(idealMass) + 'кг</b>, то скорее всего он переспел';

        /*get ripeness*/
        var ripenessPercent = getRipenessByCircumferencePercent(mass, idealMass);

        if (mass !== 0 && isNumeric(ripenessPercent)) {

            document.getElementById('js-ripeness-percent').innerHTML = 'Индекс спелости: ' + ripenessPercent + '%';
            document.getElementById('js-ripeness-range').value = ripenessPercent;

            /* show visual chart */
            var visual = document.querySelector('.visual');

            if (visual.classList.contains('invisible')) {
                visual.classList.remove('invisible');
                visual.setAttribute('data-animate', 'zoom-in');;
            }
        }
    }
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
// m=L^3*0.017
function getIdealMass(circumference) {
    return (Math.pow(circumference, 3) * 0.017 / 1000).toFixed(3);
}

function getIdealMassMax(m) {
    return (m * 0.9).toFixed(3);
}

function getRipenessByCircumferencePercent(m, idealm) {
    var percent = Math.round(100 - (m - idealm) / (idealm / 100));
    return percent > 0 ? percent : 0;
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}