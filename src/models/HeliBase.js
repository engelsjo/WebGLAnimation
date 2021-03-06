HeliBase = function() {

	//similar to build function
	var stand_large1 = new THREE.Mesh(new THREE.CylinderGeometry(.5, .5, 6), new THREE.MeshPhongMaterial({color:0x9494B8}));
	var stand_small1 = new THREE.Mesh(new THREE.CylinderGeometry(.5, .5, 1.5), new THREE.MeshPhongMaterial({color:0x9494B8}));
	var stand_large2 = new THREE.Mesh(new THREE.CylinderGeometry(.5, .5, 6), new THREE.MeshPhongMaterial({color:0x9494B8}));
	var stand_small2 = new THREE.Mesh(new THREE.CylinderGeometry(.5, .5, 1.5), new THREE.MeshPhongMaterial({color:0x9494B8}));
	var ski1 = new THREE.Mesh(new THREE.CylinderGeometry(.5, .5, 1.5), new THREE.MeshPhongMaterial({color:0x9494B8}));
	var ski2 = new THREE.Mesh(new THREE.CylinderGeometry(.5, .5, 1.5), new THREE.MeshPhongMaterial({color:0x9494B8}));
	var main_frame = new THREE.Mesh(new THREE.CubeGeometry(4.5, 4, 8), new THREE.MeshPhongMaterial({color:0xFF0000}));
	var windshield = new THREE.Mesh(new THREE.CylinderGeometry(2, 2, 4.25), new THREE.MeshPhongMaterial({color:0x9494B8}));
	var rear = new THREE.Mesh(new THREE.CylinderGeometry(2, .5, 8), new THREE.MeshPhongMaterial({color:0xFF0000}));

	//similar to render function
	var base_render = new THREE.Group();

	var x_vals = [-2, 2];

	// ********** FIRST STAND of Helicopter ***********
	//leg one
	stand_large1.translateY(.25);
	stand_large1.translateX(x_vals[0]);
	stand_large1.rotateX(THREE.Math.degToRad(90));

	//front ski1
	ski1.translateZ(2.8);
	ski1.translateY(.75 * Math.sin(45));
	ski1.translateX(x_vals[0]);
	ski1.rotateX(THREE.Math.degToRad(45));

	//vert stand 1
	stand_small1.translateY(1);
	stand_small1.translateX(x_vals[0]);

	//********** SECOND STAND of Helicopter ***********
	//leg two
	stand_large2.translateY(.25);
	stand_large2.translateX(x_vals[1]);
	stand_large2.rotateX(THREE.Math.degToRad(90));

	//front ski2
	ski2.translateZ(2.8);
	ski2.translateY(.75 * Math.sin(45));
	ski2.translateX(x_vals[1]);
	ski2.rotateX(THREE.Math.degToRad(45));

	//vert stand 2
	stand_small2.translateY(1);
	stand_small2.translateX(x_vals[1]);

	//********** Main Frame of Helicopter ***********
	main_frame.translateY(3.75);

	//********** WINDSHIELD of Helicopter ***********
	windshield.translateY(3.75);
	windshield.translateZ(4);
	windshield.rotateZ(THREE.Math.degToRad(90));

	//********** REAR of Helicopter ***********
	rear.translateY(3.75);
	rear.translateZ(-8);
	rear.rotateX(THREE.Math.degToRad(90)); 

	//add all parts to render group
	base_render.add(stand_large1);
	base_render.add(stand_small1);
	base_render.add(ski1);
	base_render.add(stand_large2);
	base_render.add(stand_small2);
	base_render.add(ski2);
	base_render.add(main_frame);
	base_render.add(windshield);
	base_render.add(rear);
	return base_render;
}

HeliBase.prototype = Object.create(THREE.Object3D.prototype);
HeliBase.prototype.constructor = HeliBase;