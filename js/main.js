document.querySelector('#js-circumference-horizontal').addEventListener('change', countMelonByCirc, false);
document.querySelector('#js-circumference-horizontal').addEventListener('keyup', countMelonByCirc, false);

document.querySelector('#js-circumference-vertical').addEventListener('change', countMelonByCirc, false);
document.querySelector('#js-circumference-vertical').addEventListener('keyup', countMelonByCirc, false);

document.querySelector('#js-real-weight').addEventListener('change', countMelonByCirc, false);
document.querySelector('#js-real-weight').addEventListener('keyup', countMelonByCirc, false);

function countMelonByCirc() {
    let cHorizontal = Number(document.querySelector('#js-circumference-horizontal').value);
    let cVertical = Number(document.querySelector('#js-circumference-vertical').value);
    let realWeight = Number(document.querySelector('#js-real-weight').value);

    /* count average circumference */
    var circumference = 0;
    if (cHorizontal !== 0 && cVertical !== 0) {
        circumference = (cHorizontal + cVertical) / 2;
    } else if (cHorizontal !== 0) {
        circumference = cHorizontal;
    }

    if (circumference !== 0) {
        let idealWeight = getIdealWeight(circumference);
        document.querySelector('#js-ideal-weight').value = idealWeight;
        document.querySelector('#js-ideal-weight-max').innerHTML = 'Если реальный вес арбуза меньше <b>' +
            getIdealWeightMax(idealWeight) + 'кг</b>, то скорее всего он переспел';

        let ripenessPercent = getRipenessByCircumferencePercent(realWeight, idealWeight);
        if (realWeight !== 0 && isFinite(ripenessPercent)) {
            document.querySelector('#js-ripeness-percent').innerHTML = 'Индекс спелости: ' + ripenessPercent + '%';
            document.querySelector('#js-ripeness-range').value = ripenessPercent;
            document.querySelector('.ripeness-visual').classList.remove('invisible');
        }
    }
}

// m=L^3*0.017
function getIdealWeight(circumference) {
    return (Math.pow(circumference, 3) * 0.017 / 1000).toFixed(3);
}

function getIdealWeightMax(weight) {
    return (weight * 0.9).toFixed(3);
}

function getRipenessByCircumferencePercent(realw, idealw) {
    return Math.round(100 - (realw - idealw) / (idealw / 100));
}