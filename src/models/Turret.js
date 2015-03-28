Turret = function() {
	//build
	var turret = new THREE.CubeGeometry(3, 2, 3);
	var barrel = new THREE.CylinderGeometry(.3, .3, 4.5);

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