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
					id.setAttribute("display", "hidden");
					let header = document.createElement("div");
					header.setAttribute("class", "content_title");
					let body = document.createElement("div");
					body.setAttribute("class", "content_body");
					let footer = document.createElement("div");
					footer.setAttribute("class", "content_footer");
					let content = document.createElement("div");
					content.setAttribute("class", "content");
					
					id.innerText = item.id;
					header.innerText = item.header;
					body.innerText = item.body;
					footer.innerText = item.footer;
					
					content.appendChild(header);
					content.appendChild(body);
					content.appendChild(footer);
					
					main_bar.appendChild(content);
				});
			}
		}
	}; 
};
populate();

let load = ()=>{
	let main_bar = document.getElementById("main_bar");
	
	let content_title = document.getElementsByClassName("content_title");
	let content_body = document.getElementsByClassName("content_body");
	let content_footer = document.getElementsByClassName("content_footer");
	
	let editBtn = document.createElement("button");
	editBtn.setAttribute("class", "btn");
	editBtn.addEventListener("click", ()=>{
		for(var i = 0; i < content_title.length(); i++){
			content_title[i].setAttribute("contenteditable", "true");
		}
		
		content_body.forEach((item)=>{
			item.setAttribute("contenteditable", "true");
		});
		
		content_footer.forEach((item)=>{
			item.setAttribute("contenteditable", "true");
		});
	});
	let txt = document.createTextNode("edit");
	editBtn.appendChild(txt);
	//alert(editBtn);
	main_bar.appendChild(editBtn);
};

load();