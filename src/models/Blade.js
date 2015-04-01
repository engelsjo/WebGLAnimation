Blade = function(){
	var center = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 1), new THREE.MeshPhongMaterial({color:0x9494B8}));

	var blade1 = new THREE.Mesh(new THREE.CubeGeometry(16, .25, 1), new THREE.MeshPhongMaterial({color:0x9494B8}));
	var blade2 = new THREE.Mesh(new THREE.CubeGeometry(16, .25, 1), new THREE.MeshPhongMaterial({color:0x9494B8}));

	//carry out transformations
	var blade_render = new THREE.Group();

	//center of the blade
	center.translateY(.5);

    //blade 1 portion
    blade1.translateY(1);
    
    //blade 2 portion
    blade2.translateY(1);
    blade2.rotateY(90);

	blade_render.add(center);
	blade_render.add(blade1);
	blade_render.add(blade2);
	return blade_render;
}

Blade.prototype = Object.create(THREE.Object3D.prototype);
Blade.prototype.constructor = Blade;