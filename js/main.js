// button.onclick = countMelon;

document.querySelector("#input-circumference-horizontal").addEventListener("change", countMelonByCirc, false);
document.querySelector("#input-circumference-horizontal").addEventListener("keyup", countMelonByCirc, false);

document.querySelector("#input-circumference-vertical").addEventListener("change", countMelonByCirc, false);
document.querySelector("#input-circumference-vertical").addEventListener("keyup", countMelonByCirc, false);

document.querySelector("#input-real-weight").addEventListener("change", countMelonByCirc, false);
document.querySelector("#input-real-weight").addEventListener("keyup", countMelonByCirc, false);

function countMelonByCirc() {
    let cHorizontal = Number(document.querySelector("#input-circumference-horizontal").value);
    let cVertical = Number(document.querySelector("#input-circumference-vertical").value);
    let realWeight = Number(document.querySelector("#input-real-weight").value);

    /* counting average circumference */
    var circumference = 0;
    if (cHorizontal !== 0 && cVertical !== 0) {
        circumference = (cHorizontal + cVertical) / 2;
    } else if (cHorizontal !== 0) {
        circumference = cHorizontal;
    }

    if (circumference !== 0) {
        let idealWeight = getIdealWeight(circumference);
        document.querySelector("#result-weight").value = idealWeight;
        document.querySelector("#result-weight-max").innerHTML = 'Если реальный вес арбуза меньше <b>' +
            getIdealWeightMax(idealWeight) + 'кг</b>, то скорее всего он переспел';

        let ripenessPercent = getRipenessByCircumferencePercent(realWeight, idealWeight);
        if (realWeight !== 0 && isFinite(ripenessPercent)) {
            document.querySelector("#ripeness-percent").innerHTML = 'Индекс спелости: ' + ripenessPercent + '%';
            document.querySelector("#ripeness-resume").innerHTML = getRipenessByCircumference(realWeight, idealWeight);
        }
    }
}

function countMelonByWeight() {
    let weight = Number(document.querySelector("#input-weight").value);

    if (weight !== 0) {
        document.querySelector("#result-circ").value = getIdealCircumference(weight);
    }
}

//L > 4.1*∛m
function getIdealCircumference(weight) {
    return Math.round(Math.cbrt(weight) * 4.1 * 10);
}

function getRipenessByWeight(circumference, idealCircumference) {
    return Math.round(100 + (circumference - idealCircumference) / (idealCircumference / 100));
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

function getRipenessByCircumference(weight, idealweight) {

    var str = '';
    if (weight < idealweight * 0.9 && weight > idealweight * 0.8) {
        str = '<div class="result result_overripe">Скорее всего переспелый</div>';
    } else if (weight <= idealweight * 0.8) {
        str = '<div class="result result_overripe">Переспелый</div>';
    } else if (weight >= idealweight * 0.9 && weight <= idealweight) {
        str = '<div class="result result_ripe">Спелый</div>';
    } else {
        str = '<div class="result result_notripe">Неспелый</div>';
    }

    return str;
}