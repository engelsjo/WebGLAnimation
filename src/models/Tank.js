Tank = function(){

	var body = new THREE.CubeGeometry(6, 3, 4);
	var turret = new Turret();
	var track1 = new Track();
	var track2 = new Track();
	var guard1 = new Guard();
	var guard2 = new Guard();

	this.turret_position = 0;
	this.update = function(r, l, t){
		track1.update(r);
		track2.update(l);
		this.turret_position += t;
		while(this.turret_position > 360)
			this.turret_position -= 360;
		while(this.turret_position < 0)
			this.turret_position += 360;
	};

	tank_render = new THREE.Group();

	body.translateZ(2);

	guard1.translateY(-2.5);
	guard1.translateZ(3.4);

	guard2.translateY(-2.5);
	guard2.translateZ(8.4);

	track1.translateY(-2.5);
	track2.translateY(2.5);

	//TODO put the slope piece in here

	turret.translateZ(3.5);
	turret.rotateZ(this.turret_position);

	tank_render.add(body);
	tank_render.add(guard1);
	tank_render.add(guard2);
	tank_render.add(track1);
	tank_render.add(track2);
	tank_render.add(turret);

	return tank_render;

}

Tank.prototype = Object.create(THREE.Object3D.prototype);
Tank.prototype.constructor = Tank;