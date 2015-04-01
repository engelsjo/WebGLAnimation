Guard = function() {
	//build
	var mainBar = new THREE.Mesh(new THREE.CubeGeometry(4, .2, 1), new THREE.MeshPhongMaterial({color:0x535353}));
	var sideBar1 = new THREE.Mesh(new THREE.CubeGeometry(1.5, .2, 1), new THREE.MeshPhongMaterial({color:0x535353}));
	var sideBar2 = new THREE.Mesh(new THREE.CubeGeometry(1.5, .2, 1), new THREE.MeshPhongMaterial({color:0x535353}));

	//render
	var guard_render = new THREE.Group();

	sideBar1.translateX(-2.6495);
	sideBar1.translateZ(-.375);
	sideBar1.rotateZ(Math.PI/6);

	sideBar2.translateX(2.6495);
	sideBar2.translateZ(-.375);
	sideBar2.rotateZ(-Math.PI/6);

	guard_render.add(mainBar);
	guard_render.add(sideBar1);
	guard_render.add(sideBar2);
	return guard_render;
}

Guard.prototype = Object.create(THREE.Object3D.prototype);
Guard.prototype.constructor = Guard;