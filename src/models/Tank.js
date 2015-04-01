Tank = function(){

	var body = new THREE.CubeGeometry(3, 6, 4);
	var turret = new Mesh(new Turret(), new MeshPhongMaterial({color:0x535353}));
	var track1 = new Mesh(new Track(), new MeshPhongMaterial({color:0x535353}));
	var track2 = new Mesh(new Track(), new MeshPhongMaterial({color:0x535353}));
	var guard1 = new Mesh(new Guard(), new MeshPhongMaterial({color:0x535353}));
	var guard2 = new Mesh(new Guard(), new MeshPhongMaterial({color:0x535353}));

	tank_render = new THREE.Group();

	body.translateY(2);

	guard1.translateZ(-2.5);
	guard1.translateY(3.4);

	guard2.translateZ(-2.5);
	guard2.translateY(8.4);

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