document.querySelector(":root").style["--width"] = `${window.innerWidth}px`;
document.querySelector(":root").style["--height"] = `${window.innerHeight}px`;
//document.body.style.width = "var(--width)";
//document.body.style.height = "var(--height)";
if (localStorage.getItem("user") === "" || localStorage.getItem("user") === null){
	localStorage.setItem("user", "{}");
}

let clos = function(){
	document.querySelector('#help_cont').innerHTML = `
		<div id="unvisible">
				
		</div>
	`;
	document.querySelector('#helper').disabled = false;
}

let name_score = {};
let sortable = [];
let obj;
let usr = ``;
let time_out;
let time = 30;
let time_interval = 3
let rand = function(){
	let random = Math.floor(Math.random() * (9 - 1 + 1)) + 1;
	return `btn${random}`;
}

let func_btn = function(){
	let btn = document.querySelectorAll(".btn");
	let random = rand();
	document.querySelector(`#${random}`).classList.add("red");
	time_out = setTimeout(() => document.querySelector(`#${random}`).classList.remove("red"), Number(`${time_interval}000`))
}

let score = 0;
let on_get_score = function(btn){
	if (time !== 30){
		if (document.querySelector(`#btn${btn}`).classList.contains("red")){
			score += 10;
			document.querySelector(`#btn${btn}`).classList.remove("red");
			document.querySelector("#score").innerHTML = `score:${score}`;
		}
		else {
			score -= 5;
			document.querySelector("#score").innerHTML = `score:${score}`;
		}
	}
}

let start = function(){
	document.querySelector("#score").innerHTML = `score:${score}`;
	document.querySelector("#time").innerHTML = `time:${time}`;
	document.querySelector("#start_button").disabled = true;
	let interval = setInterval(func_btn, 500)
	let timer = setInterval(() => {
		document.querySelector("#time").innerHTML = `time:${time}`;
		time -= 1;
		if (time === 20 || time === 10){
			time_interval = Number(`${time}`) / 10
		}
	}, 1000);
	setTimeout(() => {
		clearTimeout(time_out);
		clearInterval(interval);
		clearInterval(timer);
		let name = String(document.querySelector("#name").value)
		if (name === ""){
			name = "anonymous"
		}
		name_score = {};
		if (localStorage.getItem("user") !== '{}'){
			name_score = JSON.parse(localStorage.getItem("user"));
			if (String(localStorage.getItem("user").split(name)) !== String([localStorage.getItem("user")])){
				if (Number(name_score[`${name}`]) <= score){
					name_score[`${name}`] = `${score}`;
				}
			}
			else {
				name_score[`${name}`] = `${score}`;
			}
		}
		else {
			name_score[`${name}`] = `${score}`;
		}
		sortable = [];
		for (let val in name_score) {
			sortable.push([val, name_score[val]]);
		}
		sortable.sort((a, b) => {
			return b[1] - a[1];
		});
		obj = Object.fromEntries(sortable);
		localStorage.setItem("user", JSON.stringify(obj));
		usr = ``;
		for (let val in obj) {
			usr += `${val}: ${obj[val]}<br>`;
		}document.body.innerHTML = `<div id="btn1"></div>
  <div id="btn2"></div>
  <div id="btn3"></div>
  <div id="btn4"></div>
  <div id="btn5"></div>
  <div id="btn6"></div>
  <div id="btn7"></div>
  <div id="btn8"></div>
  <div id="btn9"></div>
  <br><div><h1>history:</h1>
  </div><div class="history">${usr}</div>
  <div id="game_over"><a href="https://erri4.github.io/site1/game1/site.html" target="_self">
  <button>play again</button></a></div>`;
}, Number(`${time}000`))
}
