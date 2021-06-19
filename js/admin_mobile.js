let custom_alert = (head="", body="", foot="")=>{
	let containerOverlay = document.createElement("div");
	containerOverlay.setAttribute("id", "dialogOverlay");

	containerOverlay.style.display = "block";
    containerOverlay.style.height = window.innerHeight + "px";

	let container = document.createElement("div");
	container.setAttribute("id", "dialogbox");

	container.style.left = (window.innerWidth/2) - (550 * .5) + "px";
    container.style.top = "100px";
    container.style.display = "block";

	let dialogHead = document.createElement("div");
	dialogHead.setAttribute("id", "dialogHead");
	let dialogBody = document.createElement("div");
	dialogBody.setAttribute("id", "dialogBody");
	let dialogFoot = document.createElement("div");
	dialogFoot.setAttribute("id", "dialogFoot");

	dialogHead.innerHTML = head;
	dialogBody.innerHTML = body;
	dialogFoot.innerHTML = "<button id='okBtn' onclick='document.getElementById(\"dialogOverlay\").remove();' class='btn'> " + foot + "</button>";

	container.appendChild(dialogHead);
	container.appendChild(dialogBody);
	container.appendChild(dialogFoot);

	containerOverlay.appendChild(container);

	document.body.appendChild(containerOverlay);
};

function quoteEditor(){
	this.render = (editor)=> {
		let containerOverlay = document.createElement("div");
		containerOverlay.setAttribute("id", "dialogOverlay");

		containerOverlay.style.display = "block";
		containerOverlay.style.height = window.innerHeight + "px";

		let container = document.createElement("div");
		container.setAttribute("id", "dialogbox");

		container.style.left = (window.innerWidth/2) - (550 * .5) + "px";
		container.style.top = "100px";
		container.style.display = "block";

		let dialogHead = document.createElement("div");
		dialogHead.setAttribute("id", "dialogHead");
		let dialogBody = document.createElement("div");
		dialogBody.setAttribute("id", "dialogBody");
		let dialogFoot = document.createElement("div");
		dialogFoot.setAttribute("id", "dialogFoot");

		dialogHead.innerHTML = "<textarea id='headerTextarea' placeholder='Quote title here ...'></textarea>";
		dialogBody.innerHTML = "<textarea id='bodyTextarea' placeholder='Quote body here ...'></textarea>";
		dialogFoot.innerHTML = "<textarea id='footerTextarea' placeholder='Quote footer here ...'></textarea>" + " <br> " + "<button id='postBtn' class='btn'> Post </button>";

		container.appendChild(dialogHead);
		container.appendChild(dialogBody);
		container.appendChild(dialogFoot);

		containerOverlay.appendChild(container);

		document.body.appendChild(containerOverlay);
	};

	this.exit = ()=>{
		let container = document.getElementById("dialogOverlay");
		container.remove();
	};
};

let populate = ()=>{
	let id = 0;
	let xmlHttpRequest = new XMLHttpRequest();
	xmlHttpRequest.open("GET", "http://nardit.infinityfreeapp.com/nardi/quotes.php", true);
	xmlHttpRequest.send(null);
	xmlHttpRequest.onreadystatechange = ()=>{
		if (xmlHttpRequest.readyState == 3){
			
		}
		if (xmlHttpRequest.readyState == 4){
			if (xmlHttpRequest.status == 200){
				let main_bar = document.getElementById("main_bar");
				
				let resp = JSON.parse(xmlHttpRequest.responseText);
				
				resp.forEach((item)=>{
					let id = document.createElement("div");
					id.setAttribute("class", "hidden_id");
					let header = document.createElement("div");
					header.setAttribute("class", "content_title");
					let body = document.createElement("div");
					body.setAttribute("class", "content_body");
					let footer = document.createElement("div");
					footer.setAttribute("class", "content_footer");
					let content = document.createElement("div");
					content.setAttribute("class", "content");
					
					let editBtn = document.createElement("button");
					editBtn.setAttribute("class", "btn");
					editBtn.setAttribute("style", "margin-right: 20px;");
					let txt = document.createTextNode("edit");
					editBtn.appendChild(txt);

					let deleteBtn = document.createElement("button");
					deleteBtn.setAttribute("class", "btn");
					txt = document.createTextNode("delete");
					deleteBtn.appendChild(txt);

					deleteBtn.addEventListener("click", ()=>{
						if (confirm("Are you sure you wanna delete this post ?"))
						{
							let id_upd = id.innerText;

							let API_URL = "http://nardit.infinityfreeapp.com/nardi/delete_quotes.php"
							
							var xhr = new XMLHttpRequest();
							var params = "id=" + id_upd;
							xhr.open('POST', API_URL, true);

							xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

							xhr.onload = function() {
								if(xhr.status == 200) {
									let reply = JSON.parse(xhr.responseText);
									custom_alert("", reply.reply, "ok");
								}
							}
							xhr.send(params);

							content.remove();
						}
					});
					
					editBtn.addEventListener("click", ()=>{
						footer.setAttribute("contenteditable", "true");
						body.setAttribute("contenteditable", "true");
						header.setAttribute("contenteditable", "true");
						
						editBtn.innerText = "save";
						editBtn.addEventListener("click", ()=>{
							let id_upd = id.innerText;
							let footer_upd = footer.innerText;
							let body_upd = body.innerText;
							let header_upd = header.innerText;
							
							let API_URL = "http://nardit.infinityfreeapp.com/nardi/update_quotes.php"
							
							var xhr = new XMLHttpRequest();
							var params = "id=" + id_upd + "&header="+header_upd + "&body=" + body_upd + "&footer=" + footer_upd;
							xhr.open('POST', API_URL, true);

							xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

							xhr.onload = function() {
								if(xhr.status == 200) {
									editBtn.remove();
									let reply = JSON.parse(xhr.responseText);
									alert(reply.reply);
								}
							}
							xhr.send(params);

						});
					});
					
					id.innerText = item.id;
					header.innerText = item.header;
					body.innerText = item.body;
					footer.innerText = item.footer;
					
					content.appendChild(header);
					content.appendChild(body);
					content.appendChild(footer);
					content.appendChild(editBtn);
					content.appendChild(deleteBtn);
					
					main_bar.appendChild(content);
				});
			}
		}
	}; 
};
populate();

let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", ()=>{
	var editor = new quoteEditor();
	editor.render();

	var postBtn = document.getElementById("postBtn");
		postBtn.addEventListener("click", ()=>{
			let header = document.getElementById("headerTextarea").value;
			let body = document.getElementById("bodyTextarea").value;
			let footer = document.getElementById("footerTextarea").value;

			let container = document.getElementById("dialogOverlay");

			let API_URL = "http://nardit.infinityfreeapp.com/nardi/add_quotes.php"
								
			var xhr = new XMLHttpRequest();
			var params = "header=" + header + "&body=" + body + "&footer=" + footer;
			xhr.open('POST', API_URL, true);

			xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

			xhr.onload = function() {
				if(xhr.status == 200) {
					let reply = JSON.parse(xhr.responseText);
					custom_alert("", reply.reply, "ok");
				}
			}
			xhr.send(params);

			container.remove();
		});
});
