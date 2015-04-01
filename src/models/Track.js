Track = function(){

	var trd = new THREE.CubeGeometry(.1, .2, 1);
	var whl = new THREE.CylinderGeometry(.5, .5, 1);

	var trdMat = new THREE.MeshPhongMaterial({color:0x578231});
	var whlMat = new THREE.MeshPhongMaterial({color:0x233843});

	var tread = new THREE.Mesh(trd, trdMat);
	var wheel = new THREE.Mesh(whl, whlMat);


	track_render = new THREE.Group();
	
	for(var i = 0; i < 3; i++) {
		var wl = wheel.clone();
		wl.translateX(-1.5 - .6 * i);
		wl.translateY(0.5 + .8 * i);
		wl.rotateX(Math.PI/2);
		track_render.add(wl);
	}

	for(var i = 1; i < 4; i++) {
		var wl = wheel.clone();
		wl.translateX(-1.5 + i);
		wl.translateY(0.5);
		wl.rotateX(Math.PI/2);
		track_render.add(wl);
	}

	for(var i = 1; i < 3; i++) {
		var wl = wheel.clone();
		wl.translateX(1.5 + .6 * i);
		wl.translateY(0.5 + .8 * i);
		wl.rotateX(Math.PI/2);
		track_render.add(wl);
	}

	var numTracks = 100;
	var distInc = (12.4 + Math.PI) / numTracks;


	for(var i = 0; i < numTracks; i++) {
		var dist = distInc * i;
		var td = tread.clone();
		if(dist <= 3.0) {
			td.translateX(dist - 1.5);
			track_render.add(td);
		}
		else if(dist - 3.0 <= Math.PI * 53.13/360.0) {
			dist -= 3.0;
			var theta = 270 + 180 * dist / (Math.PI*0.5);
			td.translateX(1.5 + Math.cos(theta * Math.PI/180.0) * .5);
			td.translateY(.5 + Math.sin(theta * Math.PI/180.0) * .5);
			td.rotateZ(theta * Math.PI/180.0);
			track_render.add(td);
		}
		else if(dist - 3.0 - Math.PI * 53.13/360.0 <= 2.0) {
			dist -= 3.0 + Math.PI * 53.13/360.0;
			var theta = 270 + 53.13;
			td.translateX(1.5 + Math.cos(theta * Math.PI/180.0) * .5 + 1.2/2.0 * dist);
			td.translateY(.5 + Math.sin(theta * Math.PI/180.0) * .5 + 1.6/2.0 * dist);
			td.rotateZ(theta * Math.PI/180.0);
			track_render.add(td);
		}
		else if(dist - 5.0 - Math.PI * 53.13/360.0 <= Math.PI * 126.87/360.0) {
			dist -= 5.0 + Math.PI * 53.13/360.0;
			var theta = 270 + 53.13 + 180 * dist / (Math.PI*0.5);
			td.translateX(1.5 + Math.cos(theta * Math.PI/180.0) * .5 + 1.2);
			td.translateY(.5 + Math.sin(theta * Math.PI/180.0) * .5 + 1.6);
			td.rotateZ(theta * Math.PI/180.0);
			track_render.add(td);
		}
		else if(dist - 5.0 - Math.PI * 1.0/2.0 <= 5.4) {
			dist -= 5.4 + Math.PI * 1.0/2.0;
			var theta = 270 + 180;
			td.translateX(1.5 + Math.cos(theta * Math.PI/180.0) * .5 + 1.2 - dist);
			td.translateY(.5 + Math.sin(theta * Math.PI/180.0) * .5 + 1.6);
			td.rotateZ(theta * Math.PI/180.0);
			track_render.add(td);
		}
		else if(dist - 10.4 - Math.PI * 1.0/2.0 <= Math.PI * 126.87/360.0) {
			dist -= 10.4 + Math.PI * 1.0/2.0;
			var theta = 270 + 180 + 180 * dist / (Math.PI*0.5);
			td.translateX(1.5 + Math.cos(theta * Math.PI/180.0) * .5 + 1.2 - 5.4);
			td.translateY(.5 + Math.sin(theta * Math.PI/180.0) * .5 + 1.6);
			td.rotateZ(theta * Math.PI/180.0);
			track_render.add(td);
		}
		else if(dist - 10.4 - Math.PI * 306.87/360.0 <= 2.0) {
			dist -= 10.4 + Math.PI * 306.87/360.0;
			var theta = 270 + 180 + 126.87;
			td.translateX(1.5 + Math.cos(theta * Math.PI/180.0) * .5 + 1.2 - 5.4 + 1.2/2.0 * dist);
			td.translateY(.5 + Math.sin(theta * Math.PI/180.0) * .5 + 1.6 - 1.6/2.0 * dist);
			td.rotateZ(theta * Math.PI/180.0);
			track_render.add(td);
		}
		else {
			dist -= 12.4 + Math.PI * 306.87/360.0;
			var theta = 270 + 180 + 126.87 + 180 * dist / (Math.PI*0.5);
			td.translateX(1.5 + Math.cos(theta * Math.PI/180.0) * .5 + 1.2 - 5.4);
			td.translateY(.5 + Math.sin(theta * Math.PI/180.0) * .5 + 1.6);
			td.rotateZ(theta * Math.PI/180.0);
			track_render.add(td);
		}
	}


	return track_render;

}

Track.prototype = Object.create(THREE.Object3D.prototype);
Track.prototype.constructor = Track;