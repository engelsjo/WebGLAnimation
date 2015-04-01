Tank = function(){

	var body = new THREE.Mesh(new THREE.CubeGeometry(6, 3, 4), new THREE.MeshPhongMaterial({color:0x535353}));
	var turret = new Turret();
	var track1 = new Track();
	var track2 = new Track();
	var guard1 = new Guard();
	var guard2 = new Guard();

	tank_render = new THREE.Group();

	body.translateY(2);

	guard1.translateZ(-2.5);
	guard1.translateY(3.4);

	guard2.translateZ(2.5);
	guard2.translateY(3.4);

	track1.translateZ(-2.5);
	track2.translateZ(2.5);

	turret.translateY(3.5);

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