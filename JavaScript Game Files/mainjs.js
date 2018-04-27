img = {}, aud = {}, msg = {}, zombies = [], bullets = [], lives = [], obs = [];

currentScore = 0;
highScore = 0;

if(localStorage.getItem("highScore") == 0) {
	localStorage.setItem("highScore", highScore);
}

data = new Date();

alert(data.getFullYear() + "/" + data.getMonth() + 1 + "/" + data.getDate());
name = prompt("Cum te cheama?");
var reg = new RegExp(/^[a-zA-Z]+$/);
if(reg.test(name))
	alert("bun nume");
else alert("prost nume");

language = "ro";

function loader(xml) {
	this.getImage = function(id) {
		var img = xml.find("images").find("#" + id);
		return img.text();
	}
	
	this.getAudio = function(id) {
		var audio = xml.find("audio").find("#" + id);
		return audio.text();
	}
	
	this.getMessage = function(id, lg) {
		var msg = xml.find("#" + lg).find("#" + id);
		return msg.text();
	}
	
	var k=this;
	
	this.parseResources = function(xml) {
		var resources = xml.find("resources").children();
		resources.each(function() {
			if(this.nodeName == "images") {
				var images = $(this).children();
				images.each(function() {
					img[this.id] = k.getImage(this.id);
				});
			}
			if(this.nodeName == "audio") {
				var audios = $(this).children();
				audios.each(function() {
					aud[this.id] = k.getImage(this.id);
				});
			}
		});
	}
	
	this.parseMessages = function(xml) {
		var messages = xml.find("lang").children();
		messages.each(function() {
			if(this.nodeName == "messages") {
				var lg = this.id;
				var msgs = $(this).children();
				msgs.each(function() {
					msg[this.id + lg] = k.getMessage(this.id, lg);
				});
			}
		});
	}
	
	this.parseSettings = function(xml) {
		
	}
}

$(document).ready(function() {
	$.ajax({
		url: "resources.xml",
		type: "GET",
		dataType: "xml",
		success: function(xml) {
			var xml = $(xml);
			var load = new loader(xml);
			load.parseResources(xml);
		},
		error: function() {
			alert("Eroare la parsarea resurselor");
		}
	});
	
	$.ajax({
		url: "messages.xml",
		type: "GET",
		dataType: "xml",
		success: function(xml) {
			var xml = $(xml);
			var load = new loader(xml);
			load.parseMessages(xml);
		},
		error: function() {
			alert("Eroare la parsarea mesajelor");
		}
	});
	
	$.ajax({
		url: "settings.xml",
		type: "GET",
		dataType: "xml",
		success: function(xml) {
			var xml = $(xml);
			var load = new loader(xml);
			load.parseSettings(xml);
		},
		error: function() {
			alert("Eroare la parsarea setarilor");
		}
	});
	
	background = document.getElementById("background");
	backcontext = background.getContext("2d");
	info = document.getElementById("info");
	infotext = info.getContext("2d");
	player = new player();
	
	setTimeout(function () {
		firstTime = 1;
		back = new Image();
		back.src = img["back"];
		backcontext.drawImage(back, 0, 0, mapWidth, mapHeight+mapYoffset);
		showMenu();
	}, 1000);
});

function deleteMenu() {
	document.body.removeChild(startBtn.sprite);
	document.body.removeChild(helpBtn.sprite);
	document.body.removeChild(optionsBtn.sprite);
	document.body.removeChild(highScoresBtn.sprite);
	
	document.body.removeChild(startBtn.p);
	document.body.removeChild(helpBtn.p);
	document.body.removeChild(optionsBtn.p);
	document.body.removeChild(highScoresBtn.p);
	inMenu = 0;
}

function deleteOptionsMenu() {
	document.body.removeChild(setButton);
	document.body.removeChild(range);
	document.body.removeChild(rangeLabel);
	document.body.removeChild(txt);
	document.body.removeChild(txtLabel);
	document.body.removeChild(check);
	document.body.removeChild(check2);
	document.body.removeChild(checkLabel);
	document.body.removeChild(radioro);
	document.body.removeChild(radioen);
	document.body.removeChild(radioLabel);
	document.body.removeChild(sel);
	document.body.removeChild(selmultiple);
	document.body.removeChild(txtarea);
	
}

function showOptionsMenu() {
	inMenu = 1;
	range = document.createElement("INPUT");
	range.type = "range";
	range.min = "1";
	range.max = "2";
	range.step = "any";
	range.style.position = "absolute";
	range.style.top = 100 + mapYoffset + "px";
	range.style.left = mapWidth / 2 - 100 + "px";
	document.body.appendChild(range);
	
	rangeLabel = document.createElement("LABEL");
	rangeLabel.innerHTML = msg["rangeinput" + language];
	rangeLabel.style.position = "absolute";
	rangeLabel.style.top = 70 + mapYoffset + "px";
	rangeLabel.style.left = mapWidth / 2 - 170 + "px";
	document.body.appendChild(rangeLabel);
	
	
	txt = document.createElement("INPUT");
	txt.type = "text";
	txt.style.position = "absolute";
	txt.style.top = 200 + mapYoffset + "px";
	txt.style.left = mapWidth / 2 - 100 + "px";
	document.body.appendChild(txt);
	var txtlength = txt.value.length;
	
	txtLabel = document.createElement("LABEL");
	txtLabel.innerHTML = msg["txtinput" + language];
	txtLabel.style.position = "absolute";
	txtLabel.style.top = 170 + mapYoffset + "px";
	txtLabel.style.left = mapWidth / 2 - 70 + "px";
	document.body.appendChild(txtLabel);
	
	
	check = document.createElement("INPUT");
	check.type = "checkbox";
	check.value = "barbat";
	check.checked = true;
	check.style.position = "absolute";
	check.style.top = 300 + mapYoffset + "px";
	check.style.left = mapWidth / 2 - 70 + "px";
	document.body.appendChild(check);
	
	check2 = document.createElement("INPUT");
	check2.type = "checkbox";
	check2.value = "femeie";
	check2.checked = true;
	check2.style.position = "absolute";
	check2.style.top = 300 + mapYoffset + "px";
	check2.style.left = mapWidth / 2 - 20 + "px";
	document.body.appendChild(check2);
	
	checkLabel = document.createElement("LABEL");
	checkLabel.innerHTML = msg["checkinput" + language];
	checkLabel.style.position = "absolute";
	checkLabel.style.top = 270 + mapYoffset + "px";
	checkLabel.style.left = mapWidth / 2 - 70 + "px"
	document.body.appendChild(checkLabel);
	
	
	radioro = document.createElement("INPUT");
	radioro.checked = true;
	radioro.type = "radio";
	radioro.name = "language";
	radioro.style.position = "absolute";
	radioro.style.top = 350 + mapYoffset + "px";
	radioro.style.left = mapWidth / 2 - 70 + "px";
	document.body.appendChild(radioro);
	radioro.onclick = function() {
		language = "ro";
	}
	
	radioen = document.createElement("INPUT");
	radioen.type = "radio";
	radioen.name = "language";
	radioen.style.position = "absolute";
	radioen.style.top = 350 + mapYoffset + "px";
	radioen.style.left = mapWidth / 2 - 20 + "px";
	document.body.appendChild(radioen);
	radioen.onclick = function() {
		language = "en";
	}
	
	radioLabel = document.createElement("LABEL");
	radioLabel.innerHTML = msg["radioinput" + language];
	radioLabel.style.position = "absolute";
	radioLabel.style.top = 325 + mapYoffset + "px";
	radioLabel.style.left = mapWidth / 2 - 70 + "px";
	document.body.appendChild(radioLabel);
	
	
	sel = document.createElement("SELECT");
	sel.style.position = "absolute";
	sel.style.top = 400 + mapYoffset + "px";
	sel.style.left = mapWidth / 2 - 40 + "px";
	optbeg = document.createElement("OPTION");
	optbeg.innerHTML = msg["optbeg" + language];
	optint = document.createElement("OPTION");
	optint.innerHTML = msg["optint" + language];
	optadv = document.createElement("OPTION");
	optadv.innerHTML = msg["optadv" + language];
	document.body.appendChild(sel);
	sel.appendChild(optbeg);
	sel.appendChild(optint);
	sel.appendChild(optadv);
	
	
	selmultiple = document.createElement("SELECT");
	selmultiple.multiple = true;
	selmultiple.style.position = "absolute";
	selmultiple.style.top = 425 + mapYoffset + "px";
	selmultiple.style.left = mapWidth / 2 - 40 + "px";
	optlives = document.createElement("OPTION");
	optlives.innerHTML = msg["optlives" + language];
	optscore = document.createElement("OPTION");
	optscore.innerHTML = msg["optscore" + language];
	opthighscore = document.createElement("OPTION");
	opthighscore.innerHTML = msg["opthighscore" + language];
	document.body.appendChild(selmultiple);
	selmultiple.appendChild(optlives);
	selmultiple.appendChild(optscore);
	selmultiple.appendChild(opthighscore);
	
	txtarea = document.createElement("TEXTAREA");
	txtarea.rows = "4";
	txtarea.cols = "10";
	txtarea.style.position = "absolute";
	txtarea.style.top = 500 + mapYoffset + "px";
	txtarea.style.left = mapWidth / 2 - 40 + "px";
	document.body.appendChild(txtarea);
	
	
	setButton = document.createElement("BUTTON");
	setButton.innerHTML = "set";
	setButton.style.position = "absolute";
	setButton.style.top = 500 + mapYoffset + "px";
	setButton.style.left = mapWidth - 40 + "px";
	document.body.appendChild(setButton);
	setButton.onclick = function() {
		alert("Setarile curente:");
		alert("Viteza jocului: " + range.value);
		alert("Numele jucatorului: " + txt.value);
		alert("Tipuri de zombii alesi: " + check.value + " " + check2.value);
		if(radioro.checked)
			alert("Limba: romana");
			else alert("Limba: engleza");
		alert("Dificultatea aleasa: " + sel.options[sel.selectedIndex].value);
		alert("Informatii de afisat selectate: ");
		for(var i=0; i<selmultiple.options.length; i++)
			if(selmultiple.options[i].selected)
				alert(selmultiple.options[i].value);
		alert("Opinia ta: " + txtarea.value);
	}
}

function showMenu() {
	menuBtnWidth = 190;
	menuBtnHeight = 49;
	inMenu = 1;
	document.getElementById("canvas").style.zIndex = 0;
	startBtn = new function() {
		this.sprite = document.createElement("IMG");
		this.sprite.src = img["menubtn"];
		this.sprite.style.position = "absolute";
		this.y = 100 + mapYoffset;
		this.x = mapWidth / 2 - menuBtnWidth / 2;
		this.sprite.style.top = this.y +"px";
		this.sprite.style.left = this.x + "px";
		this.sprite.style.cursor = "pointer";
		this.sprite.onclick = function() {
			deleteMenu();
			startGame();
		}
		
		this.p = document.createElement("P");
		this.p.innerHTML = msg["menustart" + language];
		this.p.style.fontSize = "40px";
		this.p.style.position = "absolute";
		this.p.style.top = this.y - 40 + "px";
		this.p.style.left = this.x + 55 + "px";
		this.p.style.cursor = "pointer";
		this.p.onclick = function() {
			deleteMenu();
			startGame();
		}
	}
	helpBtn = new function() {
		this.sprite = document.createElement("IMG");
		this.sprite.src = img["menubtn"];
		this.sprite.style.position = "absolute";
		this.x = mapWidth / 2 - menuBtnWidth / 2;
		this.y = 200 + mapYoffset;
		this.sprite.style.top = this.y +"px";
		this.sprite.style.left = this.x + "px";
		this.sprite.style.cursor = "pointer";
		this.sprite.onclick = function() {
			alert(msg["help" + language]);
		}
		
		this.p = document.createElement("P");
		this.p.innerHTML = msg["menuhelp" + language];
		this.p.style.fontSize = "40px";
		this.p.style.position = "absolute";
		this.p.style.top = this.y - 40 + "px";
		this.p.style.left = this.x + 45 + "px";
		this.p.style.cursor = "pointer";
		this.p.onclick = function() {
			alert(msg["help" + language]);
		}
	}
	optionsBtn = new function() {
		this.sprite = document.createElement("IMG");
		this.sprite.src = img["menubtn"];
		this.sprite.style.position = "absolute";
		this.x = mapWidth / 2 - menuBtnWidth / 2;
		this.y = 300 + mapYoffset;
		this.sprite.style.top = this.y +"px";
		this.sprite.style.left = this.x + "px";
		this.sprite.style.cursor = "pointer";
		this.sprite.onclick = function() {
			deleteMenu();
			showOptionsMenu();
		}

		this.p = document.createElement("P");
		this.p.innerHTML = msg["menuoptions" + language];
		this.p.style.fontSize = "40px";
		this.p.style.position = "absolute";
		this.p.style.top = this.y - 40 + "px";
		this.p.style.left = this.x + 35 + "px";
		this.p.style.cursor = "pointer";
		this.p.onclick = function() {
			deleteMenu();
			showOptionsMenu();
		}
	}
	highScoresBtn = new function() {
		this.sprite = document.createElement("IMG");
		this.sprite.src = img["menubtn"];
		this.sprite.style.position = "absolute";
		this.x = mapWidth / 2 - menuBtnWidth / 2;
		this.y = 400 + mapYoffset;
		this.sprite.style.top = this.y +"px";
		this.sprite.style.left = this.x + "px";
		this.sprite.style.cursor = "pointer";
		
		this.p = document.createElement("P");
		this.p.innerHTML = msg["menuhighscores" + language];
		this.p.style.fontSize = "40px";
		this.p.style.position = "absolute";
		this.p.style.top = this.y - 40 + "px";
		this.p.style.left = this.x + 35 + "px";
		this.p.style.cursor = "pointer";
	}
	
	document.body.appendChild(startBtn.sprite);
	document.body.appendChild(helpBtn.sprite);
	document.body.appendChild(optionsBtn.sprite);
	document.body.appendChild(highScoresBtn.sprite);
	
	document.body.appendChild(startBtn.p);
	document.body.appendChild(helpBtn.p);
	document.body.appendChild(optionsBtn.p);
	document.body.appendChild(highScoresBtn.p);
}

function startGame() {
	document.getElementById("canvas").style.zIndex = 1;
	player.sprite.style.display = "block";
	player.sprite.style.top = player.y +"px";
	player.sprite.style.left = player.x + "px";
	document.body.insertBefore(player.sprite, document.getElementById("background"));
	showInfo();
	if(firstTime) {
		upPM = setInterval(updatePlayerMovement, spriteFrameUpdate);
		upZM = setInterval(updateZombieMovement, spriteFrameUpdate);
		upPS = setInterval(updatePlayerShoot, 1);
		upBM = setInterval(updateBulletMovement, 1);
		gZ = setInterval(generateZombies, 4000);
		uT = setInterval(updateTime, 1);
		firstTime = 0;
	}
	generateObstacles();
	inMenu = 0;
}

function updateTime() {
	currentTime += 1;
}

function resetGame() {
	player.lives = 3;
	player.x = mapWidth / 2;
	player.y = mapHeight / 2;
	player.originX = player.x + player.sprite.width / 2;
	player.originY = player.y + player.sprite.height / 2;
	player.sprite.style.top = player.x;
	player.sprite.style.left = player.y;
	currentScore = 0;
	while(zombies.length) {
		document.body.removeChild(zombies[0].sprite);
		zombies.splice(0, 1);
	}
	while(bullets.length) {
		document.body.removeChild(bullets[0].sprite);
		bullets.splice(0, 1);
	}
	while(lives.length) {
		document.body.removeChild(lives[0].sprite);
		lives.splice(0, 1);
	}
	showInfo();
}

function player() {
	this.x = mapWidth/2;
	this.y = mapHeight/2;
	this.originX = this.x+40;
	this.originY = this.y+40;
	this.lives = 3;
	this.moveSpeed = 80;
	this.moves = false;
	
	this.currentFrame = 0;
	
	this.sprite = document.createElement("IMG");
	this.sprite.id = "player";
	this.sprite.width = 80;
	this.sprite.height = 80;
	this.sprite.src = "images/player/Idle (1).png";
	this.sprite.style.position = "absolute";
	this.sprite.style.left = this.x + "px";
	this.sprite.style.top = this.y + "px";
	this.sprite.style.zIndex = 2;
}

function bullet(x, y, tX, tY) {
	this.x = x;
	this.y = y;
	
	this.moveSpeed = 250;
	
	this.targetX = tX;
	this.targetY = tY;
	
	this.sprite = document.createElement("IMG");
	this.sprite.src = img["bullet"];
	this.sprite.style.position = "absolute";
	this.sprite.style.left = this.x + "px";
	this.sprite.style.top = this.y + "px";
	this.sprite.width = 20;
	this.sprite.height = 20;
	
	this.originX = x + this.sprite.width / 2;
	this.originY = y + this.sprite.height / 2;
	
	document.body.appendChild(this.sprite);
}

function zombie(x, y) {
	this.gender = Math.floor(Math.random() * 2);
	this.x = x;
	this.y = y;
	this.originX = this.x + 40;
	this.originY = this.y + 40;
	this.hits = 1;
	this.dmg = 50;
	this.moveSpeed = 50;
	this.moves = false;
	
	this.currentFrame = 0;
	
	this.sprite = document.createElement("IMG");
	this.sprite.width = 80;
	this.sprite.height = 80;
	this.sprite.style.position = "absolute";
	this.sprite.style.left = this.x + "px";
	this.sprite.style.top = this.y + "px";
	
	document.body.appendChild(this.sprite);
}

function getMousePos(event){
	mouseX = event.pageX;
	mouseY = event.pageY;
}

addEventListener("mousemove", getMousePos);

function collision(object1, object2) {
	if(object1.originX - object1.sprite.width / 2 < object2.originX + object2.sprite.width / 2)
		if(object1.originX + object1.sprite.width / 2 > object2.originX - object2.sprite.width / 2)
			if(object1.originY + object1.sprite.height / 2 > object2.originY - object2.sprite.height / 2)
				if(object1.originY - object1.sprite.height / 2 < object2.originY + object2.sprite.height / 2)
					return true;
	return false;
}

function moveObject(object, toX, toY) {
	var sum = Math.abs(toX - object.originX) + Math.abs(toY - object.originY);
	
	var raport1 = (toX - object.originX) / sum;
	var raport2 = (toY - object.originY) / sum;
	
	object.x += object.moveSpeed / 10 * raport1;
	object.y += object.moveSpeed / 10 * raport2;
}

function updatePlayerMovement() {
	$(this).keypress(function(event) {
		if (event.which == 109) {
			player.moves = true;
		}
	});
	
	for(var i = 0; i < lives.length; i++) {
		if(collision(player, lives[i])) {
			player.lives++;
			showInfo();
			document.body.removeChild(lives[i].sprite);
			lives.splice(i, 1);
			i--;
		}
	}
	
	if(player.moves) {
		if(player.x + walkWidth > mapWidth + mapXoffset || player.y + 80 > mapHeight + mapYoffset || player.y < mapYoffset) {
			if(mouseX + walkWidth > mapWidth + mapXoffset || mouseY + 80 > mapHeight + mapYoffset || mouseY < mapYoffset) {
				player.moves = false;
				player.sprite.src = img["pi" + (player.currentFrame++ % idleFrames + 1)];
				return;
			}
		}
		
		if(Math.abs(mouseX - player.originX) < 5 && Math.abs(mouseY - player.originY) < 5) {
			player.moves = false;
			player.sprite.src = img["pi" + (player.currentFrame++ % idleFrames + 1)];
			return;
		}
		
		player.sprite.src = img["pr" + (player.currentFrame++ % runFrames + 1)];
		
		moveObject(player, mouseX, mouseY);
		
		if(mouseX < player.originX)
			player.sprite.style.transform = "scaleX(-1)";
		else
			player.sprite.style.transform = "scaleX(1)";
		
		player.sprite.style.left = player.x + "px";
		player.sprite.style.top = player.y + "px";
		player.originX = player.x + 40;
		player.originY = player.y + 40;
	} else
		player.sprite.src = img["pi" + (player.currentFrame++ % idleFrames + 1)];
	
	player.moves = false;
}

function updateZombieMovement() {
	for(var i = 0; i < zombies.length; i++) {
		if(collision(zombies[i], player)) {
			player.lives--;
			if(player.lives == 0) {
				alert(msg["loss" + language]);
				resetGame();
				return;
			}
			showInfo();
			document.body.removeChild(zombies[i].sprite);
			zombies.splice(i,1);
			i--;
			continue;
		}
		
		if(zombies[i].gender == 0)
			zombies[i].sprite.src = img["mzw" + (zombies[i].currentFrame++ % zombieWalkFrames + 1)];
		else zombies[i].sprite.src = img["fzw" + (zombies[i].currentFrame++ % zombieWalkFrames + 1)];
		
		moveObject(zombies[i], player.originX, player.originY);
		
		if(player.originX < zombies[i].originX)
			zombies[i].sprite.style.transform = "scaleX(-1)";
		else
			zombies[i].sprite.style.transform = "scaleX(1)";
		
		zombies[i].sprite.style.left = zombies[i].x + "px";
		zombies[i].sprite.style.top = zombies[i].y + "px";
		zombies[i].originX = zombies[i].x + zombies[i].sprite.width / 2;
		zombies[i].originY = zombies[i].y + zombies[i].sprite.height / 2;
	}
}

function updatePlayerShoot() {
	canvas.onclick = function() {
		if(inMenu)
			return;
		if(currentTime - previousTime > reloadTime) {
			previousTime = currentTime;
			var sum = Math.abs(mouseX - player.originX) + Math.abs(mouseY - player.originY);
			var raport1 = (mouseX - player.originX) / sum;
			var raport2 = (mouseY - player.originY) / sum;
			var bul = new bullet(player.originX, player.originY, mouseX + 1000 * raport1, mouseY + 1000 * raport2);
			bullets.push(bul);
		}
	}
}

function updateBulletMovement() {
	for(var i = 0; i < bullets.length; i++) {
		moveObject(bullets[i], bullets[i].targetX, bullets[i].targetY);
		
		bullets[i].sprite.style.left = bullets[i].x + "px";
		bullets[i].sprite.style.top = bullets[i].y + "px";
		bullets[i].originX = bullets[i].x + bullets[i].sprite.width / 2;
		bullets[i].originY = bullets[i].y + bullets[i].sprite.height / 2;
		
		if(bullets[i].originX < 0 || bullets[i].originX > mapWidth || bullets[i].originY < mapYoffset || bullets[i].originY > mapHeight + mapYoffset) {
			document.body.removeChild(bullets[i].sprite);
			bullets.splice(i, 1);
			i--;
			continue;
		}
		
		for(var j = 0; j < obs.length; j++)
			if(collision(bullets[i], obs[j])) {
				document.body.removeChild(bullets[i].sprite);
				bullets.splice(i, 1);
			}
		
		for(var j = 0; j < zombies.length; j++)
			if(collision(bullets[i], zombies[j])) {
				zombies[j].hits--;
				if(zombies[j].hits == 0) {
					var rand = Math.floor(Math.random() * 4);
					if(!rand)
						generateLife(zombies[j].originX, zombies[j].originY);
					document.body.removeChild(zombies[j].sprite);
					zombies.splice(j, 1);
					currentScore++;
					var high = localStorage.getItem("highScore");
					if(currentScore > high)
						localStorage.setItem("highScore", currentScore);
					showInfo();
				}
				document.body.removeChild(bullets[i].sprite);
				bullets.splice(i, 1);
				i--;
				break;
			}
	}
}

function obstacle(x, y) {
	this.x = x;
	this.y = y;
	this.originX = this.x + 25;
	this.originY = this.y + 25;
	this.sprite = document.createElement("IMG");
	this.sprite.style.position = "absolute";
	this.sprite.style.top = this.y + "px";
	this.sprite.style.left = this.x + "px";
	this.sprite.src = img["obstacle"];
}

function generateObstacles() {
	var x = 200;
	var y = 200;
	var obs1 = new obstacle(x, y);
	obs.push(obs1);
	document.body.appendChild(obs1.sprite);
	
	var x2 = 400;
	var y2 = 300;
	var obs2 = new obstacle(x2, y2);
	obs.push(obs2);
	document.body.appendChild(obs2.sprite);
	
	var x3 = 200;
	var y3 = 500;
	var obs3 = new obstacle(x3, y3);
	obs.push(obs3);
	document.body.appendChild(obs3.sprite);
}

function destroyObstacles() {
	while(obs.length) {
		document.body.removeChild(obs[0].sprite);
		obs.splice(0, 1);
	}
}

function life(x, y) {
	this.x = x;
	this.y = y;
	
	this.sprite = document.createElement("IMG");
	this.sprite.src = img["life"];
	this.sprite.style.position = "absolute";
	this.sprite.style.left = x + "px";
	this.sprite.style.top = y + "px";
	this.sprite.width = 30;
	this.sprite.height = 30;
	
	this.originX = x + this.sprite.width / 2;
	this.originY = y + this.sprite.height / 2;
	
	document.body.appendChild(this.sprite);
}

function generateLife(x, y) {
	var l = new life(x, y);
	lives.push(l);
	setTimeout(function() {
		document.body.removeChild(lives[0].sprite);
		lives.splice(0, 1);
	}, lifeTimeOut);
}

function showInfo() {
	infotext.font = "30px Arial";
	infotext.textAlign = "center";
	infotext.clearRect(0, 0, info.width, info.height);
	infotext.fillText("Lives: " + player.lives, info.width / 2, info.height / 2);
	infotext.fillText("Score: " + currentScore, info.width / 2, info.height / 2 + 30);
	infotext.fillText("Highscore: " + localStorage.getItem("highScore"), 100, info.height / 2);
}

function generateZombies() {
	if(inMenu)
		return;
	var d = Math.floor(Math.random() * 3 + 1);
	
	switch(d) {
		case 1: {
			zomb = new zombie(door1x, door1y);
			zombies.push(zomb);
			break;
		}
		case 2: {
			zomb = new zombie(door2x, door2y);
			zombies.push(zomb);
			break;
		}
		case 3: {
			zomb = new zombie(door3x, door3y);
			zombies.push(zomb);
			break;
		}
		default: break;
	}
}

function deleteGame() {
	resetGame();
	destroyObstacles();
	playerSpr = document.getElementById("player");
	if(playerSpr != null)
		playerSpr.style.display = "none";
}

function pauseGame() {
	$(this).keypress(function(event) {
		if(event.which == 112 && inMenu == 0)
			alert("Press okay to unpause.");
	});
}

pauseGame();

function returnToMenu() {
	$(this).keypress(function(event) {
		if(event.which == 113) {
			deleteGame();
			showMenu();
			inMenu = 1;
			deleteOptionsMenu();
			
		}
	});
}

returnToMenu();