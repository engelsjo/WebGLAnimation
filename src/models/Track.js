Track = function(){

	var tread = new THREE.CubeGeometry(.1, .2, 1);
	var wheel = new THREE.CylinderGeometry(.5, .5, 1);

	this.distance_travelled = 0;
	this.update = function(dist){
		this.distance_travelled += dist;
	};

	track_render = new THREE.Group();

	wheel.translateX(-1.5);
	wheel.translateZ(0.5);

	track_render.add(wheel);
	for(var i = 1; i < 3; i++) {
		wheel.translateX(-.6);
		wheel.translateZ(.8);
		wheel.rotateX(90);
		track_render.add(wheel);
		wheel.rotateX(-90);
	}

	for(var i = 1; i < 4; i++) {
		wheel.translateX(1);
		wheel.rotateX(90);
		track_render.add(wheel);
		wheel.rotateX(-90);
	}

	for(var i = 1; i < 3; i++) {
		wheel.translateX(.6);
		wheel.translateZ(.8);
		wheel.rotateX(90);
		track_render.add(wheel);
		wheel.rotateX(-90);
	}

	var numTracks = 100;
	var distInc = (12.4 + M_PI) / numTracks;
	var dist_trav = distance_travelled;

   	while(dist_trav > distInc)
		dist_trav -= distInc;
	while(dist_trav < 0)
		dist_trav += distInc;

	for(var i = 0; i < numTracks; i++) {
		var dist = distInc * i + dist_trav;
		if(dist <= 3.0) {
			tread.translateX(dist - 1.5);
			track_render.add(tread);
		}
		else if(dist - 3.0 <= M_PI * 53.13/360.0) {
			dist -= 3.0;
			var theta = 270 + 180 * dist / (M_PI*0.5);
			tread.translateX(1.5 + cos(theta * M_PI/180.0) * .5);
			tread.translateZ(.5 + sin(theta * M_PI/180.0) * .5);
			tread.rotateY(theta * M_PI/180.0);
			track_render.add(tread);
		}
		else if(dist - 3.0 - M_PI * 53.13/360.0 <= 2.0) {
			dist -= 3.0 + M_PI * 53.13/360.0;
			var theta = 270 + 53.13;
			tread.translateX(1.5 + cos(theta * M_PI/180.0) * .5 + 1.2/2.0 * dist);
			tread.translateZ(.5 + sin(theta * M_PI/180.0) * .5 + 1.6/2.0 * dist);
			tread.rotateY(theta * M_PI/180.0);
			track_render.add(tread);
		}
		else if(dist - 5.0 - M_PI * 53.13/360.0 <= M_PI * 126.87/360.0) {
			dist -= 5.0 + M_PI * 53.13/360.0;
			var theta = 270 + 53.13 + 180 * dist / (M_PI*0.5);
			thread.translateX(1.5 + cos(theta * M_PI/180.0) * .5 + 1.2);
			thread.translateZ(.5 + sin(theta * M_PI/180.0) * .5 + 1.6);
			thread.rotateY(theta * M_PI/180.0);
			track_render.add(tread);
		}
		else if(dist - 5.0 - M_PI * 1.0/2.0 <= 5.4) {
			dist -= 5.4 + M_PI * 1.0/2.0;
			var theta = 270 + 180;
			thread.translateX(1.5 + cos(theta * M_PI/180.0) * .5 + 1.2 - dist);
			thread.translateZ(.5 + sin(theta * M_PI/180.0) * .5 + 1.6);
			thread.rotateY(theta * M_PI/180.0);
			track_render.add(tread);
		}
		else if(dist - 10.4 - M_PI * 1.0/2.0 <= M_PI * 126.87/360.0) {
			dist -= 10.4 + M_PI * 1.0/2.0;
			var theta = 270 + 180 + 180 * dist / (M_PI*0.5);
			thread.translateX(1.5 + cos(theta * M_PI/180.0) * .5 + 1.2 - 5.4);
			thread.translateZ(.5 + sin(theta * M_PI/180.0) * .5 + 1.6);
			thread.rotateY(theta * M_PI/180.0);
			track_render.add(tread);
		}
		else if(dist - 10.4 - M_PI * 306.87/360.0 <= 2.0) {
			dist -= 10.4 + M_PI * 306.87/360.0;
			var theta = 270 + 180 + 126.87;
			thread.translateX(1.5 + cos(theta * M_PI/180.0) * .5 + 1.2 - 5.4 + 1.2/2.0 * dist);
			thread.translateZ(.5 + sin(theta * M_PI/180.0) * .5 + 1.6 - 1.6/2.0 * dist);
			thread.rotateY(theta * M_PI/180.0);
			track_render.add(tread);
		}
		else {
			dist -= 12.4 + M_PI * 306.87/360.0;
			var theta = 270 + 180 + 126.87 + 180 * dist / (M_PI*0.5);
			thread.translateX(1.5 + cos(theta * M_PI/180.0) * .5 + 1.2 - 5.4);
			thread.translateZ(.5 + sin(theta * M_PI/180.0) * .5 + 1.6);
			thread.rotateY(theta * M_PI/180.0);
			track_render.add(tread);
		}
	}


	return track_render;

}

Track.prototype = Object.create(THREE.Object3D.prototype);
Track.prototype.constructor = Track;