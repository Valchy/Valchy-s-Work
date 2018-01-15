var splitter;
function init(){
		splitter=data.split("\n");
		var scene = new THREE.Scene();
		var unite = new THREE.Object3D();
        var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 20000);
		var camPos = new THREE.Vector3(unite.position.x-137,unite.position.y+50,unite.position.z+70);
        camera.position.set(camPos.x,camPos.y,camPos.z);
        var webGLRenderer = new THREE.WebGLRenderer({alpha: true});
        webGLRenderer.setSize(window.innerWidth, window.innerHeight);
		
		var light = new THREE.PointLight( 0xffffff, 0.9 );
		camera.add( light );
		scene.add(camera);
		
		var controls = new THREE.OrbitControls( camera,webGLRenderer.domElement );
		controls.addEventListener( 'change', render );
		
		document.getElementById("WebGl-output").appendChild(webGLRenderer.domElement);
		var s;
		for(var i = 1; i < 3; i++)
		{
			s = splitter[i].split(" ");
			camera.position.set(-3.22*s[5]-s[6]/2,0,0);
			var geometry_half_cylinder = new THREE.CylinderGeometry(s[5],s[5],s[6], 16, 8, false, 0, Math.PI);
			var material_half_cylinder = new THREE.MeshLambertMaterial({color: 0x000000, side: THREE.DoubleSide, wireframe:true});
			var halfCylinder = new THREE.Mesh(geometry_half_cylinder,material_half_cylinder);
			halfCylinder.rotation.x += Math.PI/2;
			halfCylinder.position.x = s[1];
			halfCylinder.position.y = s[2];
			halfCylinder.position.z = s[3];
			unite.add(halfCylinder);
			
		}		
		
		for(var i=3;i<splitter.length-2;i++)
		{
			s = splitter[i].split(" ");
			function calculateColor(){
				var r = Math.floor(s[25]/(256*256));
				var g = Math.floor(s[25]/256) % 256;
				var b = s[25] % 256;
				var c = "rgb("+r+","+g+","+b+")";
				var a = c.substring(4,c.length-1);
				aa = a.toString().split(",");
				var b = aa.map(function(x){                      
				x = parseInt(x).toString(16);      
				return (x.length==1) ? "0"+x : x; 
				});
				var ttt = "#"+b.join("");
				return ttt;
			}
			
			var sphere_color = calculateColor();
			var material_sphere = new THREE.MeshPhysicalMaterial( { color: sphere_color } );
			var geometry_sphere = new THREE.SphereBufferGeometry(s[5],32,16);
			var mesh = new THREE.Mesh( geometry_sphere, material_sphere );
					mesh.position.y = s[2];
					mesh.position.z = s[3];
					mesh.position.x = s[1];
					unite.add(mesh);
					
		}
		s=splitter[splitter.length-1].split(" ");
		var geometry = new THREE.BoxGeometry( s[7], s[6], s[5],8,8,1 );
		var box_material=new THREE.MeshLambertMaterial({color: 0x000000, side: THREE.DoubleSide, wireframe:true});
		var box=new THREE.Mesh(geometry,box_material);
		box.position.x=s[1];
		box.position.y=s[2];
		box.position.z=s[3];
		box.rotation.y+=Math.PI/2;
		unite.add(box)
		var cylinderPOS=new THREE.Vector3();
		cylinderPOS=halfCylinder.getWorldPosition();
		unite.position.x=cylinderPOS.x;
		unite.position.y=cylinderPOS.y;
		unite.position.z=cylinderPOS.z;
		unite.rotation.y -= Math.PI/4;
		scene.add(unite);

		window.addEventListener( 'resize', onWindowResize, false );
		function onWindowResize() {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			webGLRenderer.setSize(window.innerWidth,window.innerHeight);
			render();
		}
		
        function render() {
			camera.lookAt(scene.position);
			unite.updateMatrix();
            webGLRenderer.render(scene, camera);
        }
		
		function animate() {
        requestAnimationFrame( animate );
        controls.update();                  
		}
		
		render();
		animate();;
}

window.onload=init;