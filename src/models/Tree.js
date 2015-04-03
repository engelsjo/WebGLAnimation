Tree = function(){
	var top = new THREE.Mesh(new THREE.SphereGeometry(7.5, 25, 25), new THREE.MeshPhongMaterial({color:0x006600}));
    var trunk = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 15, 25, 25), new THREE.MeshPhongMaterial({color:0X663300}));

	//carry out transformations
	var tree_render = new THREE.Group();

    top.translateY(15);

	tree_render.add(top);
	tree_render.add(trunk);
	return tree_render;
}

Tree.prototype = Object.create(THREE.Object3D.prototype);
Tree.prototype.constructor = Tree;