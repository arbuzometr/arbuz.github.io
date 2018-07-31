// button.onclick = countMelon;

document.querySelector("#input-circumference").addEventListener("change", countMelon, false);
document.querySelector("#input-circumference").addEventListener("keyup", countMelon, false);

document.querySelector("#input-weight").addEventListener("change", countMelon, false);
document.querySelector("#input-weight").addEventListener("keyup", countMelon, false);

function countMelon() {
    let circumference = document.querySelector("#input-circumference").value;
    let weight = document.querySelector("#input-weight").value;

    if (+circumference !== 0) {
        let idealWeight = getIdealWeight(circumference);
        document.querySelector("#result-weight").value = idealWeight;

        let idealWeightMax = getIdealWeightMax(idealWeight);
        document.querySelector("#result-weight-max").innerHTML = 'но не менее <b>' + idealWeightMax + 'г</b>*';
    }

    if (+weight !== 0) {
        document.querySelector("#result-circ").value = getIdealCircumference(weight);
    }

}

//L > 4.1*∛m
function getIdealCircumference(weight) {
    return Math.round(Math.cbrt(weight) * 4.1);
}
// m=L3*0.017
function getIdealWeight(circumference) {
    return Math.round(Math.pow(circumference, 3) * 0.017);
}

function getIdealWeightMax(weight) {
    return Math.round(weight - (weight / 100) * 7);
}

function getRipenessByCircumference(circumference, idealCircumference) {
    return Math.round(100 + (circumference - idealCircumference) / (idealCircumference / 100));
}

function getRipenessByWeight(weight, idealweight) {
    var str = '';
    console.log(weight, idealweight * 0.9)
    if (idealweight > weight && weight < idealweight * 0.8) {
        str = 'ПЕРЕСПЕЛЫЙ';
    } else if (idealweight > weight && weight > idealweight * 0.8) {
        str = 'СПЕЛЫЙ';
    } else {
        str = '✖ НЕСПЕЛЫЙ';
    }

    return str;
}