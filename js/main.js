button.onclick = countMelon;

circ.addEventListener("change", countMelon, false);
circ.addEventListener("keyup", countMelon, false);

// weight.addEventListener("change", countMelon, false);
// weight.addEventListener("keyup", countMelon, false);

function countMelon() {
    let realL = document.getElementById('circ').value;
    let realM = document.getElementById('weight').value;

    let idealM = getIdealWeight(realL);


    // let idealL = getIdealCircumference(realM);
    if (+realM !== 0) {
        let ripenessByWeight = getRipenessByWeight(realM, idealM);
        document.querySelector("#result-ripeness").innerHTML = ripenessByWeight;

        // let ripenessByCircumference = getRipenessByCircumference(realL, idealL);
        // document.querySelector("#result-ripeness-circ").innerHTML = "1 формула: <b>" + ripenessByCircumference + "% спелости</b>";
    }
    // document.querySelector("#result-circ-brief").value = idealL;
    // document.querySelector("#result-сirc-full").innerHTML = "L > 4.1*&#8731;m,<br/> где m – масса арбуза, L – обхват арбуза <br/>" +
    //     "для веса - " + realM + "гр<br/>" +
    //     " идеальный обхват - <b>" + idealL + "см</b>";

    document.querySelector("#result-weight-brief").value = idealM;
    document.querySelector("#result-weight-full").innerHTML = "m=L<sup>3</sup>*0.017,<br/> где m – масса арбуза, L – обхват арбуза <br/>" +
        "для обхвата - " + realL + "см<br/>" +
        " идеальный вес - <b>" + idealM + "гр</b>";
}
// };
//L > 4.1*∛m
function getIdealCircumference(weight) {
    return Math.round(Math.cbrt(weight) * 4.1);
}
// m=L3*0.017
function getIdealWeight(circumference) {
    return Math.round(Math.pow(circumference, 3) * 0.017);
}

function getRipenessByCircumference(circumference, idealCircumference) {
    return Math.round(100 + (circumference - idealCircumference) / (idealCircumference / 100));
}

function getRipenessByWeight(weight, idealweight) {
    var str;
    if (idealweight > weight && weight < idealweight * 0.8) {
        str = 'ПЕРЕСПЕЛЫЙ';
    } else if (idealweight > weight && weight > idealweight * 0.8) {
        str = 'СПЕЛЫЙ';
    } else {
        str = "✖ НЕСПЕЛЫЙ";
    }

    return str;
}