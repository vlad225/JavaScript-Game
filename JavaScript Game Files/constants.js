joc = new function() {
	spriteFrameUpdate = 100;
	//player
	idleFrames = 10;
	runFrames = 8;
	shootFrames = 4;
	shootRunFrames = 8;
	//la comun
	deathFrames = 9;
	//zombie
	zombieAttackFrames = 8;
	zombieWalkFrames = 10;

	probGenLife = 0.25;

	mapWidth = 600;
	mapHeight = 600;
	mapXoffset = 0;
	mapYoffset = 100;

	attackWidth = 60;
	walkWidth = 50;
	deathWidth = 80;

	mouseX = 0;
	mouseY = 0;

	previousTime = 0;
	currentTime = previousTime;
	reloadTime = 100;
	bulletTravelTime = 5;

	moveSteps = 100;

	door1x = 0;
	door1y = mapYoffset;

	door2x = mapWidth - walkWidth;
	door2y = mapYoffset;

	door3x = 0;
	door3y = mapHeight;

	lifeTimeOut = 5000;
}