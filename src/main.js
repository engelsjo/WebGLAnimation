require([], function(){
    // detect WebGL
    if( !Detector.webgl ){
        Detector.addGetWebGLMessage();
        throw 'WebGL Not Available'
    } 
    // setup webgl renderer full page
    var renderer    = new THREE.WebGLRenderer();
    var CANVAS_WIDTH = 600, CANVAS_HEIGHT = 400;
    renderer.setSize( CANVAS_WIDTH, CANVAS_HEIGHT );
    var gbox = document.getElementById('graphicsbox');
    var pauseAnim = false;
    //document.body.appendChild(gbox);
    gbox.appendChild( renderer.domElement );

    //GLOBALS
    var rear_rpm = 50;
    var rpm = 50;
    var auto_pilot = true;
    var left_speed = 0;
    var right_speed = 0;

    // setup a scene and camera
    var scene   = new THREE.Scene();
    var camera  = new THREE.PerspectiveCamera(60, CANVAS_WIDTH / CANVAS_HEIGHT, 0.01, 1000);
    camera.up.set (0, 0, -1); /* use the Z axis as the upright direction */
    camera.position.x = 0;
    camera.position.y = 50;
    camera.position.z = 50;

//    scene.add (new THREE.GridHelper(10, 1));
    // declare the rendering loop
    var onRenderFcts= [];

    // handle window resize events
    var winResize   = new THREEx.WindowResize(renderer, camera)

    //////////////////////////////////////////////////////////////////////////////////
    //      default 3 points lightning                  //
    //////////////////////////////////////////////////////////////////////////////////
    
    var ambientLight= new THREE.AmbientLight( 0x202020 )
    scene.add( ambientLight)
    var frontLight  = new THREE.DirectionalLight(0xffffff, 1);
    frontLight.position.set(10, 35, 0.0)
    scene.add( frontLight )
    //scene.add ( new THREE.DirectionalLightHelper (frontLight, 1));
    var backLight   = new THREE.SpotLight('white', 1, 0, Math.PI / 6);
    backLight.castShadow = true;
    backLight.position.set(-4, 20, 10)
    scene.add( backLight )
    //scene.add ( new THREE.SpotLightHelper (backLight, 0.2));

    // TEXTURE setup
    var path = "textures/"
    /* The image names can be ANYTHING, but the the order of the SIX images
       in the array will be used as follows:
       the 1st image => Positive X axis
       the 2nd image => Negative X axis
       the 3rh image => Positive Y axis
       the 4th image => Negative Y axis
       the 5th image => Positive Z axis
       the 6th image => Negative Z axis
     */

    var images = [path + "posx.png", path + "negx.png",
        path + "posy.png", path + "negy.png",
        path + "posz.png", path + "negz.png"];

    var cubemap = THREE.ImageUtils.loadTextureCube( images );
    //////////////////////////////////////////////////////////////////////////////////
    //      add an object and make it move                  //
    //////////////////////////////////////////////////////////////////////////////////  
    
    //**********      set up the helicopter cf ***********
    var helibase_cf = new THREE.Matrix4();
    var heli_blade_cf = new THREE.Matrix4();
    var heli_rear_cf = new THREE.Matrix4();
    helibase_cf.makeTranslation(10, 15, 0);
    heli_blade_cf.multiply(new THREE.Matrix4().makeTranslation(0, 5.75, 0), new THREE.Matrix4().makeRotationY(THREE.Math.degToRad(60)));    
    heli_rear_cf.multiply(new THREE.Matrix4().makeRotationZ(THREE.Math.degToRad(90)), new THREE.Matrix4().makeTranslation(3.75, 1, -11));
    heli_rear_cf.multiply(new THREE.Matrix4().scale(new THREE.Vector3(.25, .25, .25)));

    var helibase = new HeliBase();
    var blade = new Blade();
    var rear_blade = new Blade();

    helibase.add(blade);
    helibase.add(rear_blade)
    scene.add(helibase);
    scene.add (new THREE.AxisHelper(4));


    //************** Tank stuff *****************
    var tank_cf = new THREE.Matrix4(); 

    var tank = new Tank();
    scene.add(tank);


    /* Load the first texture image */
    var grass_tex = THREE.ImageUtils.loadTexture("textures/grass.jpg");
    /* for repeat to work, the image size must be 2^k */

    /* repeat the texture 4 times in both direction */
    grass_tex.repeat.set(4,4);
    grass_tex.wrapS = THREE.RepeatMirroredWrapping;
    grass_tex.wrapT = THREE.RepeatMirroredWrapping;

    var groundPlane = new THREE.PlaneBufferGeometry(150, 150, 10, 10);
    /* attach the texture as the "map" property of the material */
    var groundMat = new THREE.MeshPhongMaterial({color:0x1d6438, ambient:0x1d6438, map:grass_tex});
    var ground = new THREE.Mesh (groundPlane, groundMat);
    ground.rotateX(THREE.Math.degToRad(-90));
    scene.add (ground);

    var sphereGeo = new THREE.SphereGeometry(8, 30, 20);
    /* attach the texture as the "map" property of the material */
    var sphereMat = new THREE.MeshBasicMaterial ({envMap:cubemap});
    var sphere = new THREE.Mesh (sphereGeo, sphereMat);
    sphere.position.x = 50;
    sphere.position.y = 50;
    sphere.position.z = 50;
    scene.add(sphere);

    onRenderFcts.push(function(delta, now){
        if (pauseAnim) return;
        var tran = new THREE.Vector3();
        var quat = new THREE.Quaternion();
        var rot = new THREE.Quaternion();
        var vscale = new THREE.Vector3();


        //######################## HELICOPTER ANIMATION ####################

        if(auto_pilot){
            var rps = .125;
            var rotations = rps * delta;
            delta_degrees = -(rotations * 360);
            //post multiply to rotate around the cf of the world
            helibase_cf.multiply(new THREE.Matrix4().makeRotationY(THREE.Math.degToRad(delta_degrees)), helibase_cf);

        }
        //calculate the big blade spin
        var rps = rpm / 60.0 * 25;
        var rotations = rps * delta;
        var theta = -(rotations * 360);
        heli_blade_cf.multiply(heli_blade_cf, new THREE.Matrix4().makeRotationY(THREE.Math.degToRad(theta)));

        //calc the small blade spin
        rps = rear_rpm / 60.0 * 25;
        rotations = rps * delta;
        theta = -(rotations * 360);
        heli_rear_cf.multiply(heli_rear_cf, new THREE.Matrix4().makeRotationY(THREE.Math.degToRad(theta)));

        //tie the updated cf to its object
        helibase_cf.decompose(tran, quat, vscale);
        helibase.position.copy(tran);
        helibase.quaternion.copy(quat);

        heli_blade_cf.decompose (tran, quat, vscale);
        blade.position.copy(tran);
        blade.quaternion.copy(quat);

        heli_rear_cf.decompose(tran, quat, vscale);
        rear_blade.position.copy(tran);
        rear_blade.quaternion.copy(quat);
        rear_blade.scale.set(vscale.x, vscale.y, vscale.z);

        //######################## TANK ANIMATION ##########################

        var dist = (right_speed + left_speed) * delta/100.0;

        if(left_speed == right_speed) {
            tank_cf.multiply(tank_cf, new THREE.Matrix4().makeTranslation(30*dist, 0, 0));
        }
        else if(-left_speed == right_speed) {
            var theta = 180 * right_speed * delta / (Math.PI * 2.5);
            tank_cf.multiply(tank_cf, new THREE.Matrix4().makeRotationY(THREE.Math.degToRad(theta)));
        }
        else if(left_speed == 0) {
            var theta = 180 * right_speed * delta / (Math.PI * 2.5);
            tank_cf.multiply(tank_cf, new THREE.Matrix4().makeTranslation(2.5*Math.sin(theta), 0, 0));
            tank_cf.multiply(tank_cf, new THREE.Matrix4().makeRotationY(THREE.Math.degToRad(theta)));
        }
        else if (right_speed == 0) {
            var theta = 180 * left_speed * delta / (Math.PI * 2.5);
            tank_cf.multiply(tank_cf, new THREE.Matrix4().makeTranslation(2.5*Math.sin(theta), 0, 0));
            tank_cf.multiply(tank_cf, new THREE.Matrix4().makeRotationY(THREE.Math.degToRad(-theta)));
        }
        else if(left_speed < right_speed){
            var rat = (left_speed * 1.0)/right_speed;
            var r = 2.5 * (rat+1)/(rat-1);
            var theta = 180 * dist / (Math.PI * r);
            tank_cf.multiply(tank_cf, new THREE.Matrix4().makeTranslation(r*Math.sin(theta), 0, 0));
            tank_cf.multiply(tank_cf, new THREE.Matrix4().makeRotationY(THREE.Math.degToRad(-theta)));
        }
        else {
            var rat = (right_speed * 1.0)/left_speed;
            var r = 2.5 * (rat+1)/(rat-1);
            var theta = -180 * dist / (Math.PI * r);

            tank_cf.multiply(tank_cf, new THREE.Matrix4().makeTranslation(-r*Math.sin(theta), 0, 0));
            tank_cf.multiply(tank_cf, new THREE.Matrix4().makeRotationY(THREE.Math.degToRad(-theta)));
        }


        tank_cf.decompose(tran, quat, vscale);
        tank.position.copy(tran);
        tank.quaternion.copy(quat);
    });
    
    //////////////////////////////////////////////////////////////////////////////////
    //      Camera Controls                         //
    //////////////////////////////////////////////////////////////////////////////////
    var mouse   = {x : 0, y : 0};
    document.addEventListener('mousemove', function(event){
        mouse.x = ((event.clientX - renderer.domElement.offsetLeft) / renderer.domElement.width ) * 2 - 1;
        mouse.y = 1 - ((event.clientY - renderer.domElement.offsetTop) / renderer.domElement.height);
    }, false);

    document.addEventListener('keypress', function(event){
        var key = String.fromCharCode(event.keyCode || event.charCode);
        if (key == 'p') {
            pauseAnim ^= true; /* toggle it */
        }

	else if (key == 'w') {
		left_speed += 1;
	}
	
	else if (key == 's') {
		left_speed -= 1;
	}
	
	else if (key == 'e') {
		right_speed += 1;
	}

	else if (key == 'd') {
		right_speed -= 1;
	}
    }, false);

    onRenderFcts.push(function(delta, now){
        camera.position.x += (mouse.x*30 - camera.position.x) * (delta*3);
        camera.position.y += (mouse.y*30 - camera.position.y) * (delta*3);
        //camera.lookAt( scene.position )
    });

    //////////////////////////////////////////////////////////////////////////////////
    //      render the scene                        //
    //////////////////////////////////////////////////////////////////////////////////
    onRenderFcts.push(function(){
        renderer.render( scene, camera );       
    });
    
    //////////////////////////////////////////////////////////////////////////////////
    //      Rendering Loop runner                       //
    //////////////////////////////////////////////////////////////////////////////////
    var lastTimeMsec= null
    requestAnimationFrame(function animate(nowMsec){
        // keep looping
        requestAnimationFrame( animate );
        // measure time
        lastTimeMsec    = lastTimeMsec || nowMsec-1000/60
        var deltaMsec   = Math.min(200, nowMsec - lastTimeMsec)
        lastTimeMsec    = nowMsec
        // call each update function
        onRenderFcts.forEach(function(f){
            f(deltaMsec/1000, nowMsec/1000)
        })
    })
});