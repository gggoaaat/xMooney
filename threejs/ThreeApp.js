import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as shader from "./Shaders/Shader";

import help from './help'

export default class Sketch {

    constructor(selector) {
        console.log(selector);
        this.container = selector;
        this.scene = new THREE.Scene();
        this.enableFog = false;

        if (this.enableFog) {
            this.scene.fog = new THREE.FogExp2(0xffffff, 0.2);
        }

        const threeHelp = help()
        let plane = threeHelp.getPlane(30);
        let directionalLight = threeHelp.getDirectionalLight(1);
        let sphere = threeHelp.getSphere(0.05);
        let boxGrid = threeHelp.getBoxGrid(10, 1.5);
        let helper = new THREE.CameraHelper(directionalLight.shadow.camera);
        let ambientLight = threeHelp.getAmbientLight(10);

        plane.name = 'plane-1';

        plane.rotation.x = Math.PI / 2;
        directionalLight.position.x = 13;
        directionalLight.position.y = 10;
        directionalLight.position.z = 10;
        directionalLight.intensity = 2;

        this.scene.add(plane);
        directionalLight.add(sphere);
        this.scene.add(directionalLight);
        this.scene.add(boxGrid);
        this.scene.add(helper);
        this.scene.add(ambientLight);

        if (this.levaObject) {
            directionalLight.intensity(this.levaObject.intensity)
            directionalLight.position = this.levaObject.light;
        }

        this.camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth/window.innerHeight,
            1,
            1000
        );

        this.camera.position.x = 1;
        this.camera.position.y = 2;
        this.camera.position.z = 5;

        this.camera.lookAt(new THREE.Vector3(0, 0, 0));

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.shadowMap.enabled = true;
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor('rgb(120, 120, 120)');
	    this.container.appendChild(this.renderer.domElement);

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);

        threeHelp.update(this.renderer, this.scene, this.camera, this.controls)
        // 
        // this.width = this.container.offsetWidth;
        // this.height = this.container.offsetHeight;
        // this.renderer = new THREE.WebGLRenderer();
        // this.renderer.setPixelRatio(window.devicePixelRatio);
        // this.renderer.setSize(this.width, this.height);
        // this.renderer.setClearColor(0xeeeeee, 1);
        // this.renderer.outputEncoding = THREE.sRGBEncoding;

        // this.container.appendChild(this.renderer.domElement);

        // this.camera = new THREE.PerspectiveCamera(
        //     70,
        //     window.innerWidth / window.innerHeight,
        //     0.001,
        //     1000
        // );

        // // let frustumSize = 10;
        // // let aspect = window.innerWidth / window.innerHeight;
        // // this.camera = new THREE.OrthographicCamera( frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, -1000, 1000 );
        // this.camera.position.set(0, 0, 2);
        // this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        // this.time = 0;

        // this.isPlaying = true;

        // this.addObjects();
        // this.resize();
        //this.render();
        // this.setupResize();
        // this.settings();
    }


    settings() {
        let that = this;
        this.settings = {
            progress: 0,
        };
        this.gui = new dat.GUI();
        this.gui.add(this.settings, "progress", 0, 1, 0.01);
    }

    setupResize() {
        window.addEventListener("resize", this.resize.bind(this));
    }

    resize() {
        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;
        this.renderer.setSize(this.width, this.height);
        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix();
    }

    addObjects() {
        let that = this;
        this.material = new THREE.ShaderMaterial({
            extensions: {
                derivatives: "#extension GL_OES_standard_derivatives : enable",
            },
            side: THREE.DoubleSide,
            uniforms: {
                time: { type: "f", value: 0 },
                resolution: { type: "v4", value: new THREE.Vector4() },
                uvRate1: {
                    value: new THREE.Vector2(1, 1),
                },
            },
            // wireframe: true,
            // transparent: true,
            vertexShader: shader.vertex,
            fragmentShader: shader.fragment,
        });

        this.geometry = new THREE.PlaneGeometry(1, 1, 1, 1);

        this.plane = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.plane);
    }

    stop() {
        this.isPlaying = false;
    }

    play() {
        if (!this.isPlaying) {
            this.render();
            this.isPlaying = true;
        }
    }

    render() {
        if (!this.isPlaying) return;
        this.time += 0.05;
        this.material.uniforms.time.value = this.time;
        requestAnimationFrame(this.render.bind(this));
        this.renderer.render(this.scene, this.camera);
    }
}