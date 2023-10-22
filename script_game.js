
let clos = function(){
	x_speed = dx;
	y_speed = dy;
	document.querySelector('#help_cont').innerHTML = `
		<div id="unvisible">
			
		</div>
	`;
	document.querySelector('#helper').disabled = false;
}

let times = 0;
let w = window.innerWidth;
let h = window.innerHeight;
let request1;
let request2;
let dx = 5;
let dy = 5;
let xl = 50;
let x = 0;
let y = 0;
let x_speed = 0;
let y_speed = 0;
let score_right = 0;
document.addEventListener("keyup", () => {
	window.cancelAnimationFrame(request2);
	request2 = '';
});
document.addEventListener("keydown", (e) => {
	let left = document.querySelector("#left");
	if (x_speed && y_speed) {
		 if (e.key === "ArrowUp"){
			if (xl > 10){
				request2 = window.requestAnimationFrame(() => {
					xl -= 40;
					left.style.top = `${xl}px`;
				});
			}
		} 
		else if (e.key === "ArrowDown"){
			if (xl + 140 < window.innerHeight){
				request2 = window.requestAnimationFrame(() => {
					xl += 40;
					left.style.top = `${xl}px`;
				});
			}
		}
	}
});

function isTouchLeft(ball) {
	let left = document.querySelector("#left");
	left.style.right = "90px";
	
	let posr = String(left.style.right).split("p");
	posr = Number(posr[0]);
	let left_down = xl + 100;
	let ball_left = String(ball.style.left).split("p");
	ball_left = Number(ball_left[0]);
	let ball_top = String(ball.style.top).split("p");
	ball_top = Number(ball_top[0]);
	let ball_down = ball_top + 50;
	if (ball_left <= posr && ball_left >= posr - 40){
		if (xl == ball_top){
			times ++;
			document.querySelector("#times_div").innerHTML = `you stoped the ball ${times} times`;
			if (times % 10 === 0){
				if (x_speed > 0){
					x_speed ++;
				}
				if (x_speed < 0){
					x_speed -= 1;
				}
				if (dx > 0){
					dx ++;
				}
				if (dx < 0){
					dx -= 1;
				}
				if (y_speed > 0){
					y_speed ++;
				}
				if (y_speed < 0){
					y_speed -= 1;
				}
				if (dy > 0){
					dy ++;
				}
				if (dy < 0){
					dy -= 1;
				}
			}
			return true;
		}
		else if (xl > ball_top){
			if (ball_down > xl){
				if (xl >= ball_top){
					times ++;
					document.querySelector("#times_div").innerHTML = `you stoped the ball ${times} times`;
					if (times % 10 === 0){
						if (x_speed > 0){
							x_speed ++;
						}
						if (x_speed < 0){
							x_speed -= 1;
						}
						if (dx > 0){
							dx ++;
						}
						if (dx < 0){
							dx -= 1;
						}
						if (y_speed > 0){
							y_speed ++;
						}
						if (y_speed < 0){
							y_speed -= 1;
						}
						if (dy > 0){
							dy ++;
						}
						if (dy < 0){
							dy -= 1;
						}
					}
					return true;
				}
			}
		}
		else if (xl < ball_top){
			if (ball_top < left_down){
				if (xl <= ball_top){
					times ++;
					document.querySelector("#times_div").innerHTML = `you stoped the ball ${times} times`;
					if (times % 10 === 0){
						if (x_speed > 0){
							x_speed ++;
						}
						if (x_speed < 0){
							x_speed -= 1;
						}
						if (dx > 0){
							dx ++;
						}
						if (dx < 0){
							dx -= 1;
						}
						if (y_speed > 0){
							y_speed ++;
						}
						if (y_speed < 0){
							y_speed -= 1;
						}
						if (dy > 0){
							dy ++;
						}
						if (dy < 0){
							dy -= 1;
						}
					}
					return true;
				}
			}
		}
	}
	return false;
}

function animate() {
	let ball = document.querySelector("#ball");
	let html = document.querySelector("html");
	let body = document.querySelector("body");
	x += x_speed;
	y += y_speed;
	ball.style.left = `${x}px`;
	ball.style.top = `${y}px`;
	if (window.innerHeight !== h || window.innerWidth !== w){
		if (x_speed && y_speed){
			x = 0;
			y = 0;
			ball.style.left = `${x}px`;
			ball.style.top = `${y}px`;
			h = window.innerHeight;
			w = window.innerWidth;
		}
	}
	if (x + 59 > window.innerWidth || x < -1) {
		if (x + 59 > window.innerWidth) {
			x_speed = -x_speed;
			dx = -dx;
		}
		if (x < -1) {
			score_right ++;
			document.querySelector("#right_score").innerHTML = `the ball get in to your side ${score_right} times`;
			x = window.innerWidth / 2;
			x_speed = -x_speed
			dx = -dx;
			y = 0;
			times = 0;
			document.querySelector("#times_div").innerHTML = "";
		}
	}
	if (y + 64 > window.innerHeight || y < 0) {
		y_speed = -y_speed;
		dy = -dy
	}
	if(x_speed < 0){
		if(isTouchLeft(ball)){
			x_speed = -x_speed;
			dx = -dx;
		}
	}

	request1 = window.requestAnimationFrame(animate);
}

let change = function(t) {
	if (t) {
		document.querySelector("#btn_con").innerHTML = `
			<button id="start" onclick="
				x_speed = dx;
				y_speed = dy;
				change(false);
			">
				continue
			</button>
			`
	}
	if (!t) {
		document.querySelector("#btn_con").innerHTML = `
			<button id="stop" onclick="
				x_speed = 0;
				y_speed = 0;
				change(true);
			">
				stop
			</button>
			`
	}
}

let start = function() {
	document.querySelector('#right_score').innerHTML = '';
	window.cancelAnimationFrame(request1);
	x = 0;
	y = 0;
	ball.style.visibility = "hidden";
	left.style.visibility = "hidden";
	ball.style.left = `${x}px`;
	ball.style.top = `${y}px`;
	document.querySelector("#visible").innerHTML = 3;
	setTimeout(() => {
		clearInterval(timer);
		x_speed = Math.abs(dx);
		y_speed = Math.abs(dy);
		dx = Math.abs(dx);
		dy = Math.abs(dy);
		ball.style.visibility = "visible";
		left.style.visibility = "visible";
		visible.style.visibility = "hidden";
		animate();
		document.querySelector("#btn_cont").innerHTML = `
		<div id="btn_con">
	  		<button id="stop" onclick="
				x_speed = 0;
				y_speed = 0;
				change(true);">
				stop
			</button>
  		</div>
		<button id="restart" onclick="
			score_right = 0;
			document.querySelector('#right_score').innerHTML = '';
			times = 0;
			document.querySelector('#times_div').innerHTML = '';
			start();
  		">
			restart
		</button>
		`
	}, 3000);
	visible.style.visibility = "visible";
	let timer = setInterval(() => {
		document.querySelector("#visible").innerHTML -= 1;
	}, 1000);
}

