let populate = ()=>{
	let id = 0;
	let xmlHttpRequest = new XMLHttpRequest();
	xmlHttpRequest.open("GET", "http://nardit.infinityfreeapp.com/nardi/Nusic-master/quotes.php", true);
	xmlHttpRequest.send(null);
	xmlHttpRequest.onreadystatechange = ()=>{
		if (xmlHttpRequest.readyState == 3){
			
		}
		if (xmlHttpRequest.readyState == 4){
			if (xmlHttpRequest.status == 200){
				let main_bar = document.getElementById("main_bar");
				
				let resp = JSON.parse(xmlHttpRequest.responseText);
				
				resp.forEach((item)=>{
					let header = document.createElement("div");
					header.setAttribute("class", "content_title");
					let body = document.createElement("div");
					body.setAttribute("class", "content_body");
					let footer = document.createElement("div");
					footer.setAttribute("class", "content_footer");
					let content = document.createElement("div");
					content.setAttribute("class", "content");
					
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
//console.log(document.getElementById("status_bar").style);