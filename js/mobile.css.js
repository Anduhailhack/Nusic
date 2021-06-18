let init = ()=>{
	let heart;
	for (let i = 0; i < 15; i++){
		heart = document.createElement("div");
		heart.setAttribute("class", "heart");
		heart.style = "left: " + (Math.random() * 300) + "; top: " + (Math.random() * innerHeight + 65) + "; transform: rotateZ(" + ((Math.random() * 100) - 50) + "deg);";
		document.getElementById("status_bar").appendChild(heart);
	}
};

init();