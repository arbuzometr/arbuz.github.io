addEvent('load', window, countMelonByCirc);

var circHor = document.querySelector('#js-circumference-horizontal');
addEvent('change', circHor, countMelonByCirc);
addEvent('keyup', circHor, countMelonByCirc);

var circVer = document.querySelector('#js-circumference-vertical');
addEvent('change', circVer, countMelonByCirc);
addEvent('keyup', circVer, countMelonByCirc);

var w = document.querySelector('#js-mass');
addEvent('change', w, countMelonByCirc);
addEvent('keyup', w, countMelonByCirc);


function addEvent(evnt, elem, func) {
    if (elem.addEventListener) { // W3C DOM
        elem.addEventListener(evnt, func, false);
    } else if (elem.attachEvent) { // IE DOM
        elem.attachEvent("on" + evnt, func);
    } else {
        elem[evnt] = func;
    }
}

function countMelonByCirc() {
    var cHorizontal = Number(document.querySelector('#js-circumference-horizontal').value);
    var cVertical = Number(document.querySelector('#js-circumference-vertical').value);
    var mass = Number(document.querySelector('#js-mass').value);

    /* count average circumference */
    var circumference = 0;
    if (cHorizontal !== 0 && isNumeric(cHorizontal) && cVertical !== 0  && isNumeric(cVertical)) {
        circumference = (cHorizontal + cVertical) / 2;
    } else if (cHorizontal !== 0 && isNumeric(cHorizontal)) {
        circumference = cHorizontal;
    }

    if (circumference !== 0) {
        var idealMass = getIdealMass(circumference);
        document.querySelector('#js-ideal-mass').value = idealMass;
        document.querySelector('#js-ideal-mass-max').innerHTML = 'Если реальный вес арбуза меньше <b>' +
            getIdealMassMax(idealMass) + 'кг</b>, то скорее всего он переспел';

        var ripenessPercent = getRipenessByCircumferencePercent(mass, idealMass);
        if (mass !== 0 && isNumeric(ripenessPercent)) {
            document.querySelector('#js-ripeness-percent').innerHTML = 'Индекс спелости: ' + ripenessPercent + '%';
            document.querySelector('#js-ripeness-range').value = ripenessPercent;
            document.querySelector('.visual').classList.remove('invisible');
        }
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
    return percent > 0 ? percent : 0 ;
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}