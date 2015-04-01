debugObj= function() {
    //var ARM_LENGTH = 20;
    var armGeo = new THREE.CylinderGeometry (10, 10, 10);
    var armMat = new THREE.MeshPhongMaterial({color:0x578231});
    var armL = new THREE.Mesh (armGeo, armMat);
    var armR = armL.clone();

    var armGroup = new THREE.Group();
    armGroup.add(armL);
    armGroup.add(armR);
    //armGroup.translateY (-ARM_LENGTH/2);
    return armGroup;
}

/* Inherit from THREE.Object3D */
debugObj.prototype = Object.create (THREE.Object3D.prototype);
debugObj.prototype.constructor = debugObj;