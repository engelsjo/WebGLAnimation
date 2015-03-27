var Cone = function (Ndiv) {
    var geometry = new THREE.BufferGeometry();

    var vertexArr = new Float32Array(3 * (Ndiv + 1));
    var angle = 0;
    var dAngle = 2 * Math.PI / Ndiv;
    for (var k = 0; k < Ndiv; k++) {
        vertexArr[3 * k] = 0.5 * Math.cos(angle);
        vertexArr[3 * k + 1] = 0.5 * Math.sin(angle);
        vertexArr[3 * k + 2] = 0.0;
        angle += dAngle;
    }
    vertexArr[3 * Ndiv] = 0;
    /* tip of the cone at (0,0,1) */
    vertexArr[3 * Ndiv + 1] = 0;
    vertexArr[3 * Ndiv + 2] = 1;
    geometry.addAttribute('position', new THREE.BufferAttribute(vertexArr, 3));

    /* similar to glNormalPointer */
    var normalArr = new Float32Array(vertexArr.length);
    angle = 0;
    var norm = new THREE.Vector3();
    for (var k = 0; k < Ndiv; k++) {
        norm.x = Math.cos(angle);
        norm.y = Math.sin(angle);
        norm.z = 1;
        norm.normalize();
        normalArr[3 * k] = norm.x;
        normalArr[3 * k + 1] = norm.y;
        normalArr[3 * k + 2] = norm.z;
        angle += dAngle;
    }
    normalArr[3 * Ndiv] = 0;
    normalArr[3 * Ndiv + 1] = 0;
    normalArr[3 * Ndiv + 2] = 1;
    geometry.addAttribute('normal', new THREE.BufferAttribute(normalArr, 3));


    var indexArr = new Uint32Array(Ndiv * 3);
    for (var k = 0; k < Ndiv; k++) {
        indexArr[3 * k] = Ndiv;
        indexArr[3 * k + 1] = k;
        indexArr[3 * k + 2] = (k + 1) % Ndiv;
    }
    geometry.addAttribute('index', new THREE.BufferAttribute(indexArr, 1));

    geometry.computeBoundingSphere();
    return geometry;
}