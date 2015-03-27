var Cube = function(length, width, height, material){
	var geometry = new THREE.BufferGeometry();

    var vertexArr = new Float32Array(24);
    var normalArr = new Float32Array(24);
    var indexArr = new Float32Array(24)
    
    //adding vertex the hard and brutal way
    vertexArr[0] = -.5 * width;
    vertexArr[1] = -.5 * height;
    vertexArr[2] = .5 * length;
    vertexArr[3] = .5 * width;
    vertexArr[4] = -.5 * height;
    vertexArr[5] = .5 * length;
    vertexArr[6] = .5 * width;
    vertexArr[7] = .5 * height;
    vertexArr[8] = .5 * length;
    vertexArr[9] = -.5 * width;
    vertexArr[10] = .5 * height;
    vertexArr[11] = .5 * length;
    vertexArr[12] = -.5 * width;
    vertexArr[13] = .5 * height;
    vertexArr[14] = -.5 * length;
    vertexArr[15] = .5 * width;
    vertexArr[16] = .5 * height;
    vertexArr[17] = -.5 * length;
    vertexArr[18] = .5 * width;
    vertexArr[19] = -.5 * height;
    vertexArr[20] = -.5 * length;
    vertexArr[21] = -.5 * width;
    vertexArr[22] = -.5 * height;
    vertexArr[23] = -.5 * length;
    geometry.addAttribute('position', new THREE.BufferAttribute(vertexArr, 3));

    //adding the normals the hard and brutal way
    vertexArr[0] = -1 / Math.sqrt(3);
    vertexArr[1] = -1 / Math.sqrt(3);
    vertexArr[2] = 1 / Math.sqrt(3);
    vertexArr[3] = 1 / Math.sqrt(3);
    vertexArr[4] = -1 / Math.sqrt(3);
    vertexArr[5] = 1 / Math.sqrt(3);
    vertexArr[6] = 1 / Math.sqrt(3);
    vertexArr[7] = 1 / Math.sqrt(3);
    vertexArr[8] = 1 / Math.sqrt(3);
    vertexArr[9] = -1 / Math.sqrt(3);
    vertexArr[10] = 1 / Math.sqrt(3);
    vertexArr[11] = 1 / Math.sqrt(3);
    vertexArr[12] = -1 / Math.sqrt(3);
    vertexArr[13] = 1 / Math.sqrt(3);
    vertexArr[14] = -1 / Math.sqrt(3);
    vertexArr[15] = 1 / Math.sqrt(3);
    vertexArr[16] = 1 / Math.sqrt(3);
    vertexArr[17] = -1 / Math.sqrt(3);
    vertexArr[18] = 1 / Math.sqrt(3);
    vertexArr[19] = -1 / Math.sqrt(3);
    vertexArr[20] = -1 / Math.sqrt(3);
    vertexArr[21] = -1 / Math.sqrt(3);
    vertexArr[22] = -1 / Math.sqrt(3);
    vertexArr[23] = -1 / Math.sqrt(3);
    geometry.addAttribute('normal', new THREE.BufferAttribute(normalArr, 3));

    //add the indices..
    for(var k = 0; k < 4; k++){ //front face
    	indexArr[k] = k;
    }

    for (var k = 4; k < 8; k++){ //back face
    	indexArr[k] = k;
    }

    var top_index = [5, 4, 3, 2];
    for (var k = 0; k < 4; k++){ //top face
    	indexArr[k + 8] = top_index[k]
    }

    var bott_index = [1, 0, 7, 6];
    for (var k = 0; k < 4; k++){ //bottom face
    	indexArr[k + 12] = bott_index[k]
    }

    var right_index = [2, 1, 6, 5];
    for (var k = 0; k < 4; k++){ //right face
    	indexArr[k + 16] = right_index[k]
    }

    var left_index = [7, 0, 3, 4];
    for (var k = 0; k < 4; k++){ //left face
    	indexArr[k + 20] = left_index[k]
    }

    geometry.addAttribute('index', new THREE.BufferAttribute(indexArr, 1));

    geometry.computeBoundingSphere();
    return geometry;

}