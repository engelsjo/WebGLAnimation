Tank = function(){

	var body = new THREE.Mesh(new THREE.CubeGeometry(3, 6, 4), new THREE.MeshPhongMaterial({color:0x535353}));
	var turret = new THREE.Mesh(new Turret(), new THREE.MeshPhongMaterial({color:0x535353}));
	var track1 = new THREE.Mesh(new Track(), new THREE.MeshPhongMaterial({color:0x535353}));
	var track2 = new THREE.Mesh(new Track(), new THREE.MeshPhongMaterial({color:0x535353}));
	var guard1 = new THREE.Mesh(new Guard(), new THREE.MeshPhongMaterial({color:0x535353}));
	var guard2 = new THREE.Mesh(new Guard(), new THREE.MeshPhongMaterial({color:0x535353}));

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