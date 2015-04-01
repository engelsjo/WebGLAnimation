require([], function(){
	// detect WebGL
	if( !Detector.webgl ){
		Detector.addGetWebGLMessage();
		throw 'WebGL Not Available'
	} 
	// setup webgl renderer full page
	var renderer	= new THREE.WebGLRenderer();
    var CANVAS_WIDTH = 600, CANVAS_HEIGHT = 400;
	renderer.setSize( CANVAS_WIDTH, CANVAS_HEIGHT );
    var gbox = document.getElementById('graphicsbox');
    var pauseAnim = false;
    //document.body.appendChild(gbox);
	gbox.appendChild( renderer.domElement );

	// setup a scene and camera
	var scene	= new THREE.Scene();
	var camera	= new THREE.PerspectiveCamera(60, CANVAS_WIDTH / CANVAS_HEIGHT, 0.01, 1000);
	camera.up.set (1, 0, 0);
	camera.position.x = 0;
    	camera.position.y = 0;
	camera.position.z = 100;

    //declare all global variables
    var auto_pilot = true;
    var rear_rpm = 0;

	// declare the rendering loop
	var onRenderFcts= [];

	// handle window resize events
	var winResize	= new THREEx.WindowResize(renderer, camera)

	//////////////////////////////////////////////////////////////////////////////////
	//		default 3 points lightning					//
	//////////////////////////////////////////////////////////////////////////////////
	
	var ambientLight= new THREE.AmbientLight( 0x202020 )
	scene.add( ambientLight)
	var frontLight	= new THREE.DirectionalLight(0xffffff, 1);
	frontLight.position.set(10, 35, 0.0)
	scene.add( frontLight )
    scene.add ( new THREE.DirectionalLightHelper (frontLight, 1));
	var backLight	= new THREE.SpotLight('white', 1, 0, Math.PI / 6);
    backLight.castShadow = true;
	backLight.position.set(-4, 20, 10)
	scene.add( backLight )
    scene.add ( new THREE.SpotLightHelper (backLight, 0.2));

    // TEXTURE setup
    //var path = "textures/MAK/" TODO: work here
    /* The image names can be ANYTHING, but the the order of the SIX images
       in the array will be used as follows:
       the 1st image => Positive X axis
       the 2nd image => Negative X axis
       the 3rh image => Positive Y axis
       the 4th image => Negative Y axis
       the 5th image => Positive Z axis
       the 6th image => Negative Z axis
     */

    /* TODO: work here
    var images = [path + "posx.png", path + "negx.png",
        path + "posy.png", path + "negy.png",
        path + "posz.png", path + "negz.png"];
        */
    //var cubemap = THREE.ImageUtils.loadTextureCube( images );
	//////////////////////////////////////////////////////////////////////////////////
	//		add an object and make it move					//
	//////////////////////////////////////////////////////////////////////////////////	
    //add the helicopter cfs
    var helibase_cf = new THREE.Matrix4();
    var heli_blade_cf = new THREE.Matrix4();
    var heli_rear_cf = new THREE.Matrix4();

    //set the initial place of the helicopter
    helibase_cf.makeTranslation(0, 75, 40);
    heli_blade.multiply(new THREE.Matrix4().makeTranslation(0, 0, 5.75), new THREE.Matrix4().makeRotationZ(THREE.Math.degToRad(45)));
    heli_rear_cf.multiply(new THREE.Matrix4().makeTranslation(-11, -1.2, 3.75), new THREE.Matrix4().scale(new Vector3(.25, .25, .25)), new THREE.Matrix4().makeRotationX(THREE.Math.degToRad(90)));
    
    //init the models for the helicopter
    var helibase = new HeliBase();
    var top_blade = new Blade();
    var rear_blade = new Blade();

    helibase.add(top_blade);
    helibase.add(rear_blade);
    scene.add(helibase);
    scene.add (new THREE.AxisHelper(4));

    /* Load the first texture image */
    //TODO: work here
    //var stone_tex = THREE.ImageUtils.loadTexture("textures/stone256.jpg");
    /* for repeat to work, the image size must be 2^k */

    /* repeat the texture 4 times in both direction */
    //TODO work here
    //stone_tex.repeat.set(4,4);
    //stone_tex.wrapS = THREE.RepeatWrapping;
    //stone_tex.wrapT = THREE.RepeatWrapping;

    /* Load the second texture image */
    //TODO
    //var wood_tex = THREE.ImageUtils.loadTexture("textures/wood256.jpg");

    /* mirror repeat the texture 2 times, without
     * mirror repeat the seam between the left
     * and right edge of the texture will be
     * visible */
     //TODO
    //wood_tex.repeat.set(2,2);
    //wood_tex.wrapS = THREE.MirroredRepeatWrapping;
    //wood_tex.wrapT = THREE.MirroredRepeatWrapping;
    var groundPlane = new THREE.PlaneBufferGeometry(150, 150, 10, 10);
    /* attach the texture as the "map" property of the material */
    var groundMat = new THREE.MeshPhongMaterial({color:0x1d6438, ambient:0x1d6438, map:stone_tex});
    var ground = new THREE.Mesh (groundPlane, groundMat);
    ground.rotateX(THREE.Math.degToRad(-90));
    scene.add (ground);

    var sphereGeo = new THREE.SphereGeometry(8, 30, 20);
    /* attach the texture as the "map" property of the material */
    //var sphereMat = new THREE.MeshBasicMaterial ({envMap:cubemap});
    //var sphere = new THREE.Mesh (sphereGeo, sphereMat);
    //sphere.position.x = 10;
    //sphere.position.y = 10;
    //sphere.position.z = 10;
    scene.add(sphere);

    camera.lookAt(new THREE.Vector3(0, 5, 0));

	onRenderFcts.push(function(delta, now){
        if (pauseAnim) return;
        if (auto_pilot){
            var rps = .125;
            rear_rpm = 0;
            var rotations = rps * delta / 1000;
            var delta_degrees = -(rotations * 360);

            var tran = new THREE.Vector3();
            var quat = new THREE.Quaternion();
            var rot = new THREE.Quaternion();
            var vscale = new THREE.Vector3();
            helibase_cf.copy(new THREE.Matrix4().makeRotationZ(THREE.Math.degToRad(delta_degrees)).multiply(helibase_cf));
            
            helibase_cf.decompose(tran, quat, vscale);
            helibase.position.copy(tran);
            helibase.quaternion.copy(quat);


            //wheel_cf.multiply(new THREE.Matrix4().makeRotationZ(THREE.Math.degToRad(delta * 72)));
            //wheel_cf.decompose(tran, quat, vscale);
            //wheel.position.copy(tran);
            //wheel.quaternion.copy(quat);
        }
	});
	
	//////////////////////////////////////////////////////////////////////////////////
	//		Camera Controls							//
	//////////////////////////////////////////////////////////////////////////////////
	var mouse	= {x : 0, y : 0};
	document.addEventListener('mousemove', function(event){
		mouse.x	= ((event.clientX - renderer.domElement.offsetLeft) / renderer.domElement.width ) * 2 - 1;
		mouse.y	= 1 - ((event.clientY - renderer.domElement.offsetTop) / renderer.domElement.height);
	}, false);

    document.addEventListener('keypress', function(event){
        var key = String.fromCharCode(event.keyCode || event.charCode);
        if (key == 'p') {
            pauseAnim ^= true; /* toggle it */
        }
    }, false);

	onRenderFcts.push(function(delta, now){
		camera.position.x += (mouse.x*30 - camera.position.x) * (delta*3);
		camera.position.y += (mouse.y*30 - camera.position.y) * (delta*3);
		camera.lookAt( scene.position )
	});

	//////////////////////////////////////////////////////////////////////////////////
	//		render the scene						//
	//////////////////////////////////////////////////////////////////////////////////
	onRenderFcts.push(function(){
		renderer.render( scene, camera );		
	});
	
	//////////////////////////////////////////////////////////////////////////////////
	//		Rendering Loop runner						//
	//////////////////////////////////////////////////////////////////////////////////
	var lastTimeMsec= null
	requestAnimationFrame(function animate(nowMsec){
		// keep looping
		requestAnimationFrame( animate );
		// measure time
		lastTimeMsec	= lastTimeMsec || nowMsec-1000/60
		var deltaMsec	= Math.min(200, nowMsec - lastTimeMsec)
		lastTimeMsec	= nowMsec
		// call each update function
		onRenderFcts.forEach(function(f){
			f(deltaMsec/1000, nowMsec/1000)
		})
	})
});