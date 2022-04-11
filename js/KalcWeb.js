//Teclas
const keys = document.querySelectorAll(".buttons .numbers button:not(#clear)");
const clear = document.querySelector("#clear");

//Operações
const ops = document.querySelectorAll(".buttons .operators button:not(#backspace)");
const backspace = document.querySelector('#backspace');

//Visor
const screen = document.querySelector(".screen");

//error Message
const errorMessage = "ERROR";

// Eventos teclas 
keys.forEach(function(key){
	key.addEventListener("click", function(){
		const keyValue = key.getAttribute("data-val");
		insertValue(keyValue);
	});
});

//Eventos operações
ops.forEach(function(op){
	op.addEventListener("click", function() {
		if (op.innerText == "="){
			showResult(screen.innerText);
		}else {
			const opValue = op.getAttribute("data-val");
			insertValue(opValue);
		}
	});
});

clear.addEventListener("click", function(){
	screen.innerText = "0";
});

backspace.addEventListener('click', function (){
	if(screen.innerText == errorMessage) {
		clear.click();
		return;
	}

	const text = screen.innerText.substr(0, screen.innerText.length-1);
	screen.innerText = (text == '' ? '0' : text);
});

// Inserir operação 
const insertValue = function(value) {

	if (screen.innerText.length  > 13) return;

	if(screen.innerText == errorMessage){
		clear.click();
		// insertValue(value);
		return;
	}

	if(screen.innerText == '0' && !inArray(value, [",", "+", "-", "*", "/"])){
		screen.innerText = value;
		return;
	}

	screen.innerText += value;
};

// Executar operação
const showResult = function(operation) {
	if(screen.innerText == errorMessage) {
		clear.click();
		return;
	}

	operation = operation.replaceAll(',','.');
	console.log(operation);
	const restult = eval(operation);
	screen.innerText = (restult == 'Infinity') ? errorMessage : restult;
}

// Verifica se um elemento está dentro de um array
const inArray = function (needle, haystack) {
    var length = haystack.length;
    for(var i = 0; i < length; i++) {
        if(haystack[i] == needle) return true;
    }
    return false;
}