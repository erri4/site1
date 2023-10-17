
let clos = function(){
	document.querySelector('#help_cont').innerHTML = `
		<div id="unvisible">
				
		</div>
	`;
	document.querySelector('#helper').disabled = false;
}

let random = function(){
	let rand = Math.floor(Math.random() * (1 - 0 + 1) + 0)
	let list = ["right", "left"]
	return list[rand]
}

let color = function(){
	let rand = Math.floor(Math.random() * (4 - 0 + 1) + 0)
	let list = ["red", "green", "black", "green", "black"]
	return list[rand]
}

let time = 30;
let score_right = 0;
let score_left = 0;

let rando_colo = function(){
	let rando = random();
	let colo = color();
	document.querySelector(`#div_${rando}`).classList.add(`${colo}`);
	setTimeout(() => document.querySelector(`#div_${rando}`).classList.remove(`${colo}`), 1000)
}

let start = function(){
	document.querySelector("#start_button").disabled = true;
	document.querySelector("#score_right").innerHTML = `${score_right}`;
	document.querySelector("#score_left").innerHTML = `${score_left}`;
	document.querySelector("#time").innerHTML = `${time}`;
	let interval = setInterval(rando_colo, 500)
	let timer = setInterval(() => {
			document.querySelector("#time").innerHTML = time;
			time -= 1;
		}, 1000);
	setTimeout(() => {
		clearInterval(interval);
		clearInterval(timer);
		let left = document.querySelector("#left").value;
		let right = document.querySelector("#right").value;
		if (left === ""){
			left = "anonymous"
		}
		if (right === ""){
			right = "anonymous"
		}
		localStorage.setItem("user", `${left}: ${score_left},<br> ${right}: ${score_right} <br><br> ${localStorage.getItem("user")}`)
		document.body.innerHTML = `<h1>history
		</h1><br>
		<div class="history">${localStorage.getItem("user")}</div><div><a href="https://erri4.github.io/site1/game2/site2.html" target="_self"><button>play again</button></a></div>`
	}, Number(`${time}000`))
	document.querySelector("#start_button").disabled = true;
}

let on_get_score = function(){
	if (event.key === "0" || event.key === "1"){
		if (event.key === "0"){
			if (document.querySelector("#div_right").classList.contains("green")){
				score_right += 10;
				document.querySelector("#div_right").classList.remove("green");
				document.querySelector("#score_right").innerHTML = `your score: ${score_right}`;
			}
			else if (document.querySelector("#div_right").classList.contains("red")){
				score_right -= 10;
				document.querySelector("#div_right").classList.remove("red");
				document.querySelector("#score_right").innerHTML = `your score: ${score_right}`;
			}
			else if (document.querySelector("#div_right").classList.contains("black")){
				score_right -= 5;
				document.querySelector("#score_right").innerHTML = `your score: ${score_right}`;
			}
		}
		else if (event.key === "1"){
			if (document.querySelector("#div_left").classList.contains("green")){
				score_left += 10;
				document.querySelector("#div_left").classList.remove("green");
				document.querySelector("#score_left").innerHTML = `your score: ${score_left}`;
			}
			else if (document.querySelector("#div_left").classList.contains("red")){
				score_left -= 10;
				document.querySelector("#div_left").classList.remove("red");
				document.querySelector("#score_left").innerHTML = `your score: ${score_left}`;
			}
			else if (document.querySelector("#div_left").classList.contains("black")){
				score_left -= 5;
				document.querySelector("#score_left").innerHTML = `your score: ${score_left}`;
			}
		}
	}
}
