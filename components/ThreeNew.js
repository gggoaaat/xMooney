import React, { forwardRef, useRef, useState, useMemo, Suspense, useEffect, useLayoutEffect } from 'react'
import { Leva, folder, useControls } from 'leva'
import styled from 'styled-components';
import * as THREE from "three";
import {
    Canvas,
    useFrame,
    useLoader,
    // Camera
} from "@react-three/fiber";
import { TextureLoader } from 'three/src/loaders/TextureLoader'
// import { Group } from "three";
// import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import Box from "./assets/Box";
//import OrbitControls from "../components/OrbitControls";
// import LightBulb from "./assets/Light";
import Floor from "./assets/Floor";
//import { useGLTF, useAnimations, Html, useProgress, useFBX, Cloud, Stars, Sky, Image, Cylinder, OrbitControls, Environment, useGLTF, Float, TransformControls, QuadraticBezierLine, Backdrop, ContactShadows } from '@react-three/drei'
import { useGLTF, useAnimations, Html, useProgress, useFBX, Sky, OrbitControls } from '@react-three/drei'
import {
    GLTFLoader
} from 'three/examples/jsm/loaders/GLTFLoader';
// import five from "./assets/five.png";
// import Draggable from "./Draggable";
// import { cookieStorageManager, position } from '@chakra-ui/react';
// import { WebGL1Renderer } from 'three';
import Warehouse from "../components/assets/Warehouse";
import Robot from "../components/assets/Robot";
import Keyboard from "../components/keyboard";
// import { Camera } from 'three';
// import AsicMiner from "./assets/AsicMiner";
// import GpuMiner from "./assets/GpuMiner";
// import Shelf from "./assets/Shelf";
// import Spaceman from "./assets/Spaceman";
// import Ship from "./assets/Ship";
import { useKeyState } from 'use-key-state'
import { useSwipeable } from 'react-swipeable';




export default function ThreeNew() {

    function Loader() {
        const { progress } = useProgress()
        return (<Html center>{progress} % loaded</Html>)
    }

    // const [action, setAction] = useState("Run Forward");

    const keys = useKeyState().keyStateQuery
   
    function Robot(props) {

        const primitive = useRef()
        const model = useLoader(
            GLTFLoader,
            '/robot2/scene.gltf'
        )

        // Here's the animation part
        // ************************* 
        let mixer
        controlAnimation(2);

        function controlAnimation(animation) {
            if (model.animations.length) {
                mixer = new THREE.AnimationMixer(model.scene);
                console.log("mixer");
                console.log(mixer);
                // model.animations.forEach(clip => {
                //     const action = mixer.clipAction(clip)
                //     action.play();
                // });
                mixer.clipAction(model.animations[animation]).play();
            }
        }

        let lastanimation = 2
        useFrame((state, delta) => {
            mixer?.update(delta)
            const speed = .1
            mixer.clipAction(model.animations[lastanimation]).fadeOut()
            if (keys.pressed('ArrowUp')) {
            // if (keys['ArrowUp'].pressed) {
                // true while space key is pressed              

                primitive.current.position.z += speed
                primitive.current.rotation.y = 0;
                
                mixer.clipAction(model.animations[3]).play().fadeIn()
                lastanimation = 3
                if (keys.pressed('ArrowLeft')) {
                    primitive.current.position.x += speed;
                    primitive.current.rotation.y = Math.PI /180 * 45
                } 

                if (keys.pressed('ArrowRight')) {
                    primitive.current.position.x -= speed;
                    primitive.current.rotation.y = (Math.PI*3)/180 * 225
                }   
                
                
            }
            else if (keys.pressed('ArrowDown')) {
            // else if (keys['ArrowDown'].pressed) {
                // true while space key is pressed          
                // mixer.clipAction(model.animations[3]).play()    
                primitive.current.position.z -= speed;
                primitive.current.rotation.y = Math.PI / 1
                mixer.clipAction(model.animations[3]).play().fadeIn()
                lastanimation = 3
                if (keys.pressed('ArrowLeft')) {
                    primitive.current.position.x += speed;
                    primitive.current.rotation.y = (3*Math.PI)/180 * 45
                } 
                if (keys.pressed('ArrowRight')) {
                    primitive.current.position.x -= speed;
                    primitive.current.rotation.y = (Math.PI /180 * 225)   
                }                               
            }
            else if (keys.pressed('ArrowLeft')) {
            // else if (keys['ArrowLeft'].pressed) {
                // mixer.clipAction(model.animations[3]).play()
                // true while space key is pressed              
                primitive.current.position.x += speed;
                primitive.current.rotation.y = Math.PI / 2
                mixer.clipAction(model.animations[3]).play().fadeIn()
                lastanimation = 3
            }
            else if (keys.pressed('ArrowRight')) {
            // else if (keys['ArrowRight'].pressed) {
                // true while space key is pressed  
                // mixer.clipAction(model.animations[3]).play()               
                primitive.current.position.x -= speed;
                primitive.current.rotation.y = (3 * Math.PI) / 2
                mixer.clipAction(model.animations[3]).play().fadeIn()
                lastanimation = 3
            }
            // else if (keys['a'].pressed) {
            //     mixer.clipAction(model.animations[2]).play()
            // }
            else {
                mixer.stopAllAction()
            }

            // if (primitive.current.position.z <= 75 && direction == "Up") {
            //     primitive.current.position.z += speed
            // }
            // else if (primitive.current.position.z >= -75 && direction == "Down") {
            //     primitive.current.position.z -= speed
            // }
            // else if (primitive.current.position.z > 75) {
            //     direction = "Down"
            //     primitive.current.rotation.y = Math.PI / 1
            //     primitive.current.position.z -= speed
            // }
            // else if (primitive.current.position.z < -75) {
            //     direction = "Up"
            //     primitive.current.rotation.y = 0
            //     primitive.current.position.z += speed
            // }

            // console.log(primitive.current)
        })
        // *************************

        model.scene.traverse(child => {
            if (child.isMesh) {
                child.castShadow = true
                child.receiveShadow = true
                child.material.side = THREE.FrontSide
            }
        })

        return (
            <primitive
                ref={primitive}
                object={model.scene}
                {...props}
            />
        )


    }

    let lotsVars = {}

    const test = function (props) {
        // console.log(Canvas);
        Canvas.displayName = "Test"
    }();

    const values = useControls({
        intensity: { value: 5, min: 0, max: 20, step: 1 },
        x: { value: 5, min: -5, max: 15, step: 1 },
        y: { value: 5, min: -5, max: 15, step: 1 },
        z: { value: 5, min: -5, max: 15, step: 1 },
        showSpotlight: false,
        showLightbulb: true,
        showBall: false,
        showCube: false,
        character: folder(
            {
                chx: { value: 5, min: -90, max: 90, step: 0.1 },
                chy: { value: 5, min: 6, max: 70, step: 0.1 },
                chz: { value: 5, min: -90, max: 90, step: 0.1 }
            },
            { render: (get) => get('showBall') }
        ),
        ball: folder(
            {
                bx: { value: 55, min: -90, max: 90, step: 0.1 },
                by: { value: 5, min: 6, max: 70, step: 0.1 },
                bz: { value: 5, min: -90, max: 90, step: 0.1 }
            },
            { render: (get) => get('showBall') }
        ),
        cube: folder(
            {
                cx: { value: -55, min: -90, max: 90, step: 0.1 },
                cy: { value: 5, min: 5, max: 70, step: 0.1 },
                cz: { value: 55, min: -90, max: 90, step: 0.1 }
            },
            { render: (get) => get('showCube') }
        ),
        leftSpotlight: folder(
            {
                lslX: { value: 0, min: -100, max: 100, step: 1 },
                lslY: { value: 0, min: -100, max: 100, step: 1 },
                lslZ: { value: 0, min: -100, max: 100, step: 1 }
            },
            { render: (get) => get('showSpotlight') }
        ),
        rightSpotlight: folder(
            {
                rslX: { value: 0, min: -100, max: 100, step: 1 },
                rslY: { value: 0, min: -100, max: 100, step: 1 },
                rslZ: { value: 0, min: -100, max: 100, step: 1 }
            },
            { render: (get) => get('showSpotlight') }
        ),
        lightBulb1: folder(
            {
                lb1X: { value: -.09, min: -100, max: 200, step: .01 },
                lb1Y: { value: 65, min: -100, max: 200, step: .01 },
                lb1Z: { value: 150, min: -100, max: 200, step: .01 }
            },
            { render: (get) => get('showLightbulb') }
        ),
        lightBulb2: folder(
            {
                lb2X: { value: 90, min: -100, max: 200, step: .01 },
                lb2Y: { value: 72, min: -100, max: 200, step: .01 },
                lb2Z: { value: 51.5, min: -100, max: 200, step: .01 }
            },
            { render: (get) => get('showLightbulb') }
        )
    })

    // initialize objects
    function Sphere(props) {

        let sphereMaterial = getMaterial({ type: "lambert", color: "rgb(10, 50, 80)" })
        let sphere = GetSphere([3, 24, 24], null)

        // console.log("SPhere")
        // console.log(sphere)

        return RenderMeshObject(props, [sphereMaterial, sphere])
    }

    function Plane(props) {

        let planeMaterial = getMaterial({
            type: "standard",
            color: props.color, //? props.color : "rgb(10, 50, 80)",
            side: props.side,
            map: props.map,
            bumpMap: props.bumpMap,
            roughnessMap: props.roughnessMap,
            bumpScale: props.bumpScale,
            metalness: props.metalness,
            roughness: props.roughness
        });
        let plane = GetPlane([props.width, props.height], null)

        return RenderMeshObject(props, [planeMaterial, plane])
    }

    function TimeofDay() {
        const start = 8 * 60 + 5;
        const end = 9 * 60 + 17;
        const date = new Date();
        const now = date.getHours() * 60 + date.getMinutes();
        console.log(start)
        console.log(end)
        console.log(now)
        if (start <= now && now <= end) {
            return (<>
                <ambientLight color={"white"} />
                <LightBulb color={"black"} position={[-.09, 65, 52.8]} />
                <LightBulb color={"black"} position={[90, 72, 51.5]} />
                <Sky distance={450000} sunPosition={[0, 1, 0]} inclination={0} azimuth={0.25} />
            </>)
        }
        else {

            return (<>

                <LightBulb
                    intensity={0.30}
                    runCircularAnimation={{ enabled: true, speed: 0.01, interval: 0, x: 150, y: -100, radius: 20 }}
                    position={[values.lb1X, values.lb1Y, values.lb1Z]}
                    size={[3, 30, 150]}
                    color={"#F4FDFF"}
                />
                <LightBulb
                    intensity={1}
                    runCircularAnimation={{ enabled: true, speed: 0.01, interval: 0, x: 150, y: 150, z: 120, radius: 20 }}
                    position={[values.lb2X, values.lb2Y, values.lb2Z]}
                    size={[5, 30, 10]} />
                {/* <Cloud scale={100} position={[-20, 60, -20]}></Cloud> */}
                {/* <Stars></Stars> */}
            </>)
        }
    }

    function getMaterial(props) {
        var selectedMaterial;
        // var materialOptions = props;

        // materialOptions.color = props.color === undefined ? 'rgb(255, 255, 255)' : props.color;

        var materialOptions = {
            color: props.color === undefined ? 'rgb(255, 255, 255)' : props.color,
            side: props.side === undefined ? THREE.FrontSide : props.side
        };

        if (props.type == "standard") {
            materialOptions.map = props.map;
            materialOptions.bumpMap = props.bumpMap;
            materialOptions.roughnessMap = props.roughnessMap;
            materialOptions.bumpScale = +props.bumpScale;
            materialOptions.metalness = +props.metalness;
            materialOptions.roughness = +props.roughness;
        }
        switch (props.type) {
            case 'basic':
                selectedMaterial = (<meshBasicMaterial {...materialOptions}></meshBasicMaterial>)
                break;
            case 'lambert':
                selectedMaterial = (<meshLambertMaterial {...materialOptions}></meshLambertMaterial>)
                break;
            case 'phong':
                selectedMaterial = (<meshPhongMaterial {...materialOptions}></meshPhongMaterial>)
                break;
            case 'standard':
                selectedMaterial = (<meshStandardMaterial {...materialOptions}></meshStandardMaterial>)
                break;
            default:
                selectedMaterial = (<meshBasicMaterial {...materialOptions}></meshBasicMaterial>)
                break;
        }

        return selectedMaterial;
    }

    function GetPlane(props) {

        const planeBufferGeometry = useRef();

        console.log("planeBufferGeometry");
        console.log(planeBufferGeometry);

        planeBufferGeometry.displayName = props.displayName;

        return (<planeBufferGeometry args={props}></planeBufferGeometry>)
    }

    function GetSphere(props) {
        const sphereBufferGeometry = useRef();

        console.log("sphereBufferGeometry");
        console.log(sphereBufferGeometry);

        sphereBufferGeometry.displayName = props.displayName;

        return (<sphereBufferGeometry key={props.displayName} ref={sphereBufferGeometry} args={props}></sphereBufferGeometry>)
    }

    function RenderMeshObject(props, objects) {
        const mesh = useRef();

        console.log("mesh")
        console.log(mesh)
        mesh.displayName = props.displayName

        lotsVars[mesh.displayName] = mesh;
        console.log(lotsVars)



        return (
            <mesh ref={mesh} {...props}>
                {objects}
            </mesh>
        )
    }

    function LightBulb(props) {
        const mesh = useRef();

        useFrame(({ clock }) => {
            if (props.runCircularAnimation && props.runCircularAnimation.enabled) {
                let thisValue = clock.getElapsedTime() * (Math.PI * .5)
                //console.log(thisValue)

                props.runCircularAnimation.interval += props.runCircularAnimation.speed;
                if (props.runCircularAnimation.x) {
                    mesh.current.position.x = props.runCircularAnimation.x * Math.cos(props.runCircularAnimation.interval) + props.runCircularAnimation.radius// Math.PI * (mesh.current.position.x * (.001))
                }
                if (props.runCircularAnimation.z) {
                    mesh.current.position.z = props.runCircularAnimation.z * Math.sin(props.runCircularAnimation.interval) + props.runCircularAnimation.radius // Math.PI * (mesh.current.position.z * (.001))
                }

                if (props.runCircularAnimation.y) {
                    mesh.current.position.y = props.runCircularAnimation.y * Math.sin(props.runCircularAnimation.interval) + props.runCircularAnimation.radius // Math.PI * (mesh.current.position.z * (.001))
                }
            }
        })


        return (
            <mesh ref={mesh} {...props} >
                <pointLight castShadow intensity={props.intensity} />
                <sphereBufferGeometry args={props.size} />
                <meshPhongMaterial emissive={props.color ? props.color : "yellow"} />
            </mesh>
        );
    }

    function LoadEnvironment() {

        var loader = new THREE.TextureLoader();

        return (
            <>
                <group position={[values.x, values.y, values.z]} scale="1">
                    <TimeofDay ></TimeofDay>
                    {/* <Box receiveShadow={true} position={[values.cx, values.cy, values.cz]} size={[10, 10, 10]} /> */}
                    <Sphere
                        name={"Sphere_Ball"}
                        displayName={"Sphere_Ball"}
                        castShadow={true}
                        position={[values.bx, values.by, values.bz]}
                        scale={2}
                        receiveShadow={false}
                    ></Sphere>
                    {/* <CharacterFBX scale={.03} position={[-20, 0, 0]} rotation={[0, 0, 0]}></CharacterFBX> */}
                    <Robot scale={20} position={[-20, 0, 0]} rotation={[0, 0, 0]}></Robot>
                    <Plane name={"Plane_Ground"}
                        displayName={"Plane_Ground"}
                        receiveShadow={true}
                        side={THREE.DoubleSide}
                        // color= {"#ffffff"} //{colorObj}
                        width={10}
                        height={10}
                        position={[0, 0, 0]}
                        scale={20}
                        map={useLoader(TextureLoader, '/textures/grass3.jpg')}
                        bumpMap={useLoader(TextureLoader, '/textures/grass3.jpg')}
                        roughnessMap={useLoader(TextureLoader, '/textures/grass3.jpg')}
                        bumpScale={1}
                        metalness={-.5}
                        roughness={101}
                        rotation={[Math.PI / 2, 0, 0]}></Plane>
                    {/* <LightBulb position={[10, -1, -50]} /> */}
                    {<Floor color="white" position={[0, -20.1, 0]} size={[10, 2, 10]} scale="20" />}
                    <OrbitControls
                        target0={new THREE.Vector3(0, 0, 0)}
                        maxPolarAngle={(Math.PI / 2) * 0.9}
                        autoRotate={false}
                        minDistance={50}
                        maxDistance={300}
                        enablePan={false}
                        maxP
                    />
                    <Warehouse receiveShadow={false} scale={[3, 3, 3]} position={[0, (2.95 * 3) - .1, 80]}></Warehouse>
                </group>
            </>
        );
    }

    function GetSpotLight(props) {
        // props.color = props.color === undefined ? 'rgb(255, 255, 255)' : props.color;
        // var light = new THREE.SpotLight(props.color, props.intensity);
        // light.castShadow = true;
        // light.penumbra = 0.5;

        // //Set up shadow properties for the light
        // light.shadow.mapSize.width = 1024;  // default: 512
        // light.shadow.mapSize.height = 1024; // default: 512
        // light.shadow.bias = 0.001;

        const spotLight = useRef();

        console.log("spotLight")
        console.log(spotLight)
        return (<>
            <spotLight {...props}>
            </spotLight>

        </>);
    }

    function Ren(props) {

        //const Renderer = new WebGL1Renderer()

        // Renderer.setSize(window.innerWidth, window.innerHeight);
        // Renderer.shadowMap.enabled = true;
        // document.getElementById('theScene').appendChild(Renderer.domElement);

        return (<></>)
    }

    return (
        <div className="scene" id="theScene">
            {/* <div className="controls">
                <button onClick={() => setAction("Run Forward")}>Run Forward</button>
                <button onClick={() => setAction("Death")}>Death</button>
                <button onClick={() => setAction("Draw Arrow")}>Draw Arrow</button>
                <button onClick={() => setAction("Standing Idle")}>Idle</button>
            </div> */}
            <Canvas
                shadows={true}
                className="canvas"

                camera={{
                    position: [100, 60, 75]
                }}
            >
                {/* <Camera></Camera> */}
                <Suspense fallback={<Loader />}>
                    <LoadEnvironment />
                    <Box receiveShadow={true} position={[5, 10, -8]} size={[10, 10, 10]} rotation={[0, Math.PI / 2.9, 0]} color="white" image="/xMooney_Logo_Token_1000px_x_1000px.png" />
                    {/* <GetSpotLight
                        intensity={values.intensity}
                        castShadow={true}
                        penumbra={0.5}
                        shadow-mapSize-height={1024}
                        shadow-mapSize-width={1024}
                        shadow-bias={0.001}
                        position={[10, 50, 0]}
                        color={'rgb(255, 255, 255)'}
                    ></GetSpotLight> */}
                    {/* <GetSpotLight
                        intensity={values.intensity}
                        position={[values.lx, values.ly, values.lz]}
                        color={'rgb(255, 220, 180)'}
                    ></GetSpotLight>
                    <GetSpotLight
                        intensity={values.intensity}
                        position={[values.rx, values.ry, values.rz]}
                        color={'rgb(255, 220, 180)'}
                    ></GetSpotLight> */}
                    <Ren></Ren>
                    {/* <Keyboard setUpKeyPressed={setUpKeyPressed} />  */}

                </Suspense>
            </Canvas>
            <Leva
                collapsed={true} // default = false, when true the GUI is collpased
                hidden={false} // default = false, when true the GUI is hidden
            // theme={myTheme} // you can pass a custom theme (see the styling section)
            // fill // default = false,  true makes the pane fill the parent dom node it's rendered in
            // flat // default = false,  true removes border radius and shadow
            // oneLineLabels // default = false, alternative layout for labels, with labels and fields on separate rows
            // hideTitleBar // default = false, hides the GUI header

            />

        </div>
    );
}

















