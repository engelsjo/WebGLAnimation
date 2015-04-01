Turret = function() {
	//build
	var tur = new THREE.CubeGeometry(3, 2, 3);
	var bar = new THREE.CylinderGeometry(.3, .3, 4.5);

	var turMat = new THREE.MeshPhongMaterial({color:0x578231});
	var barMat = new THREE.MeshPhongMaterial({color:0x892423});

	var barrel = new THREE.Mesh(bar, barMat);
	var turret = new THREE.Mesh(tur, turMat);

	//render
	var turret_render = new THREE.Group();

	turret.translateZ(1);

	barrel.translateX(1.7);
	barrel.translateZ(1);
	barrel.rotateY(70);

	turret_render.add(turret);
	turret_render.add(barrel);
	return turret_render;
}

Turret.prototype = Object.create(THREE.Object3D.prototype);
Turret.prototype.constructor = Turret;