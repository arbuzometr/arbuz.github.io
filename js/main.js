button.onclick = countMelon;

function countMelon(){
	let realWeight = document.getElementById('weight').value;

	let realCircumference = document.getElementById('circ').value;

	let idealCircumference = Math.round(Math.cbrt(realWeight) * 4.1);
	let ripeness = Math.round((realCircumference - idealCircumference) / (idealCircumference / 100) + 100);

	if(realWeight == 0) {
		document.querySelector("#errors").innerHTML = "Пожалуйста, введите вес и длину окружности арбуза";	
	} else {
		document.querySelector("#errors").innerHTML = "";	

		document.querySelector("#resume").innerHTML = ripeness > 145 ? "Кажется, арбуз переспел :(" : "";

		document.querySelector("#result").innerHTML = "<span>" + ripeness + "% спелости</span><br/>"
		+ "Идеальная длина окружности для арбуза такого веса - "+ idealCircumference + "см";	
	}
};
