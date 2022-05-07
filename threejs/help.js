import * as THREE from "three";


export default function Help() {

    

    function getBox(w, h, d) {
        let geometry = new THREE.BoxGeometry(w, h, d);
        let material = new THREE.MeshPhongMaterial({
            color: 'rgb(120, 120, 120)'
        });
        let mesh = new THREE.Mesh(
            geometry,
            material 
        );
        mesh.castShadow = true;
    
        return mesh;
    }
    
    function getBoxGrid(amount, separationMultiplier) {
        let group = new THREE.Group();
    
        for (let i=0; i<amount; i++) {
            let obj = getBox(1, 1, 1);
            obj.position.x = i * separationMultiplier;
            obj.position.y = obj.geometry.parameters.height/2;
            group.add(obj);
            for (let j=1; j<amount; j++) {
                let obj = getBox(1, 1, 1);
                obj.position.x = i * separationMultiplier;
                obj.position.y = obj.geometry.parameters.height/2;
                obj.position.z = j * separationMultiplier;
                group.add(obj);
            }
        }
    
        group.position.x = -(separationMultiplier * (amount-1))/2;
        group.position.z = -(separationMultiplier * (amount-1))/2;
    
        return group;
    }
    
    function getPlane(size) {
        let geometry = new THREE.PlaneGeometry(size, size);
        let material = new THREE.MeshPhongMaterial({
            color: 'rgb(120, 120, 120)',
            side: THREE.DoubleSide
        });
        let mesh = new THREE.Mesh(
            geometry,
            material
        );
        mesh.receiveShadow = true;
    
        return mesh;
    }

    function getSphere(size) {
        let geometry = new THREE.SphereGeometry(size, 24, 24);
        let material = new THREE.MeshBasicMaterial({
            color: 'rgb(255, 255, 255)'
        });
        let mesh = new THREE.Mesh(
            geometry,
            material 
        );
    
        return mesh;
    }
    
    function getPointLight(intensity) {
        let light = new THREE.PointLight(0xffffff, intensity);
        light.castShadow = true;
    
        return light;
    }
    
    function getSpotLight(intensity) {
        let light = new THREE.SpotLight(0xffffff, intensity);
        light.castShadow = true;
    
        light.shadow.bias = 0.001;
        light.shadow.mapSize.width = 2048;
        light.shadow.mapSize.height = 2048;
    
        return light;
    }
    
    function getDirectionalLight(intensity) {
        let light = new THREE.DirectionalLight(0xffffff, intensity);
        light.castShadow = true;
    
        light.shadow.camera.left = -10;
        light.shadow.camera.bottom = -10;
        light.shadow.camera.right = 10;
        light.shadow.camera.top = 10;
    
        return light;
    }
    
    function getAmbientLight(intensity) {
        let light = new THREE.AmbientLight('rgb(10, 30, 50)', intensity);
    
        return light;
    }
    
    function update(renderer, scene, camera, controls) {
        renderer.render(
            scene,
            camera
        );
    
        controls.update();
    
        requestAnimationFrame(function() {
            update(renderer, scene, camera, controls);
        })
    }

    return {
        getBox,
        getBoxGrid,
        getPlane,
        getPointLight,
        getSpotLight,
        getSphere,
        getDirectionalLight,
        getAmbientLight,
        update
    }
}

