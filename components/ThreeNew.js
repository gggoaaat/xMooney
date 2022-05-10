import React, { forwardRef, useRef, useState, useMemo, Suspense, useEffect, useLayoutEffect } from 'react'
import { Leva, folder, useControls } from 'leva'
import styled from 'styled-components';
import * as THREE from "three";
import {
    Canvas,
    useFrame,
    useLoader,
    useThree,
    Camera
} from "@react-three/fiber";
import { TextureLoader } from 'three/src/loaders/TextureLoader'
// import { Group } from "three";
// import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import Box from "./assets/Box";
//import OrbitControls from "../components/OrbitControls";
// import LightBulb from "./assets/Light";
import Floor from "./assets/Floor";
//import { useGLTF, useAnimations, Html, useProgress, useFBX, Cloud, Stars, Sky, Image, Cylinder, OrbitControls, Environment, useGLTF, Float, TransformControls, QuadraticBezierLine, Backdrop, ContactShadows } from '@react-three/drei'
import { PerspectiveCamera, useGLTF, useAnimations, Html, useProgress, useFBX, Sky, OrbitControls } from '@react-three/drei'
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
import { useRaribleLazyMint } from 'react-moralis';
import { Vector3 } from 'three';
// import { Camera } from 'three';




export default function ThreeNew() {

    const cameraWrap = useRef();
    const defaultCamera = useRef();
    const robotRef = useRef();
    const canvasRef = useRef()
    const cameraAndBotWrap = useRef()
    const environmentWrap = useRef()

    // function Camera(props) {
    //     const ref = useRef()
    //     const { setDefaultCamera } = useThree()
    //     // This makes sure that size-related calculations are proper
    //     // Every call to useThree will return this camera instead of the default camera 
    //     useEffect(() => void setDefaultCamera(ref.current), [])
    //     return <perspectiveCamera ref={camera} {...props} />
    // }

    function Loader() {
        const { progress } = useProgress()
        return (<Html center>{progress} % loaded</Html>)
    }

    // const [action, setAction] = useState("Run Forward");

    const keys = useKeyState().keyStateQuery

    let cameraValues = [0, 0, 0]

    const OrbitControlsRef = useRef()
    const primitiveBot = useRef()


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

    function Robot(props) {

        const model = useLoader(
            GLTFLoader,
            '/robot2/scene.gltf'
        )

        // Here's the animation part
        // ************************* 
        let mixer
        controlAnimation(2);
        let _currentPosition = new THREE.Vector3();
        let _currentLookat = new THREE.Vector3();

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
        function _CalculateIdealOffset(object) {
            const idealOffset = new THREE.Vector3(-15, 20, -30);
            idealOffset.applyQuaternion(new THREE.Quaternion(object.position.x, object.position.y, object.position.z, 1));
            idealOffset.add(object.position);
            return idealOffset;
        }

        function _CalculateIdealLookat(object) {
            const idealLookat = new THREE.Vector3(0, 10, 50);
            idealLookat.applyQuaternion(new THREE.Quaternion(object.position.x, object.position.y, object.position.z, 1));
            idealLookat.add(object.position);
            return idealLookat;
        }


        useThree(({ camera }) => {
            if (primitiveBot.current)
                camera.rotation.set(primitiveBot.current.position.x, primitiveBot.current.position.y, primitiveBot.current.position.z);
        });

        useFrame((state, delta) => {
            mixer?.update(delta)
            const speed = .5
            const pivotSpeed = .05
            mixer.clipAction(model.animations[lastanimation]).fadeOut()
            const idealOffset = _CalculateIdealOffset(primitiveBot.current);
            const idealLookat = _CalculateIdealLookat(primitiveBot.current);
            // const t = 0.05;
            // const t = 4.0 * timeElapsed;
            const t = 1.0 - Math.pow(0.001, state.clock.elapsedTime);
            // this._camera.position.copy(this._currentPosition);
            // this._camera.lookAt(this._currentLookat);
            // console.log(canvasRef.current.camera)
            _currentPosition.lerp(idealOffset, t);
            _currentLookat.lerp(idealLookat, t)
            // state.camera.position = _currentPosition
            // state.camera.lookAt(this._currentLookat);

            console.log(_currentPosition)
            // OrbitControlsRef.position = _currentPosition
            let x1 = cameraAndBotWrap.current.position.x - 10
            let z1 = cameraAndBotWrap.current.position.z + 52

            // environmentWrap.current.rotate.x -= 1

            defaultCamera.current.lookAt(new THREE.Vector3(x1, 1, z1))
            // defaultCamera.current.lookAt( primitiveBot.current.position)
            //OrbitControlsRef.current.lookAt.x = primitiveBot.current
            // OrbitControlsRef.current.target = new THREE.Vector3(x1, 1, z1)
            // OrbitControlsRef.current.target = cameraAndBotWrap.current.position
            // console.log("LookAt")
            // console.log(OrbitControlsRef.current.target)
            let thisParams = { enabled: true, speed: 11, interval: 0, x: 150, y: -100, radius: 20 };
            let dualpress = false;
            if (keys.pressed('ArrowUp')) {
                mixer.clipAction(model.animations[3]).play().fadeIn()
                lastanimation = 3
                if (keys.pressed('ArrowLeft')) {
                    // cameraWrap.current.position.x += speed;
                    // cameraWrap.current.rotation.x =  cameraWrap.current.position.x -= (1 * Math.PI) / 180 * 45 //primitiveBot.current.position.x * Math.cos(0) + 1
                    //cameraAndBotWrap.current.position.x += speed;
                    // cameraAndBotWrap.current.rotation.y = Math.PI / 180 * 45
                    // environmentWrap.current.position.x = environmentWrap.current.position.x * Math.sin(thisParams.interval) + 0
                    // // environmentWrap.current.position.y = (cameraAndBotWrap.current.position.y)
                    // environmentWrap.current.position.z = environmentWrap.current.position.z / Math.cos(thisParams.interval) + 0
                    environmentWrap.current.rotateY(-pivotSpeed)
                    // primitiveBot.current.position.x += speed;
                    // primitiveBot.current.rotation.y = Math.PI / 180 * 45
                    dualpress = true;
                }

                if (keys.pressed('ArrowRight')) {
                    // cameraWrap.current.position.x -= speed;
                    // primitiveBot.current.position.x -= speed;
                    // primitiveBot.current.rotation.y = (Math.PI * 3) / 180 * 225
                    //cameraAndBotWrap.current.position.x -= speed;
                    // cameraAndBotWrap.current.rotation.y = (Math.PI * 3) / 180 * 225
                    environmentWrap.current.rotateY(pivotSpeed)
                    dualpress = true;
                }

                // thisParams.interval += thisParams.speed;
                // cameraWrap.current.position.z += speed;                   
                // cameraWrap.current.rotation.x = primitiveBot.current.position.x * Math.sin(thisParams.interval) + 1
                // primitiveBot.current.position.z += speed
                // primitiveBot.current.rotation.y = 0;
                // cameraAndBotWrap.current.position.z += speed;
                // environmentWrap.current.position.x += 1
                if(dualpress == false)
                environmentWrap.current.position.z -= speed
                // cameraAndBotWrap.current.rotation.y = 0

                

            }
            else if (keys.pressed('ArrowDown')) {
                mixer.clipAction(model.animations[3]).play().fadeIn()
                lastanimation = 3               
                if (keys.pressed('ArrowLeft')) {
                    // cameraWrap.current.position.x += speed;
                    // primitiveBot.current.position.x += speed;
                    // primitiveBot.current.rotation.y = (3 * Math.PI) / 180 * 45
                    environmentWrap.current.rotateY(pivotSpeed)
                    dualpress = true;
                }
                if (keys.pressed('ArrowRight')) {
                    //   cameraWrap.current.position.x -= speed;
                    // primitiveBot.current.position.x -= speed;
                    // primitiveBot.current.rotation.y = (Math.PI / 180 * 225)
                    environmentWrap.current.rotateY(-pivotSpeed)
                    dualpress = true
                }
                // cameraWrap.current.position.z -= speed;
                // cameraWrap.current.position.x -= (3 * Math.PI) / 180 * 45 //primitiveBot.current.position.x * Math.sin(thisParams.interval) + 1

                // primitiveBot.current.position.z -= speed;                    
                // primitiveBot.current.rotation.y = Math.PI / 1
                // cameraAndBotWrap.current.position.z -= speed;
                // environmentWrap.current.position.x -= 1
                if(dualpress == false)
                environmentWrap.current.position.z += speed
                // cameraAndBotWrap.current.rotation.y = Math.PI / 1

                
            }
            else if (keys.pressed('ArrowLeft')) {
                //  cameraWrap.current.position.x += speed;
                // primitiveBot.current.position.x += speed;
                // primitiveBot.current.rotation.y = Math.PI / 2
                cameraAndBotWrap.current.position.x += speed;
                // cameraAndBotWrap.current.rotation.y = Math.PI / 2
                // environmentWrap.current.rotateY(.005)
                // /environmentWrap.current.position.x -= 1
                // environmentWrap.current.position.z += 1
                mixer.clipAction(model.animations[3]).play().fadeIn()
                lastanimation = 3
            }
            else if (keys.pressed('ArrowRight')) {
                //  cameraWrap.current.position.x -= speed;
                // primitiveBot.current.position.x -= speed;
                // primitiveBot.current.rotation.y = (3 * Math.PI) / 2
                cameraAndBotWrap.current.position.x -= speed;
                // cameraAndBotWrap.current.rotation.y = (3 * Math.PI) / 2
                
                // environmentWrap.current.position.x += 1
                // environmentWrap.current.rotateY(-.1)
                // environmentWrap.current.rotation.y = (3 * Math.PI) / 2
                mixer.clipAction(model.animations[3]).play().fadeIn()
                lastanimation = 3
            }
            else {
                mixer.clipAction(model.animations[2]).play().fadeIn()
                // mixer.stopAllAction()
            }

            // OrbitControlsRef.current.target.x = primitiveBot.current.position.x
            // OrbitControlsRef.current.target.y = primitiveBot.current.position.y
            // OrbitControlsRef.current.target.z = primitiveBot.current.position.z

            // cameraValues = [primitiveBot.current.position.x, 0, primitiveBot.current.position.z]
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
                ref={primitiveBot}
                object={model.scene}
                {...props}
            />
        )


    }

    function CharacterAndCamera(props) {
        return (<group name="CameraAndBot" ref={cameraAndBotWrap} {...props} dispose={null}>
            <OrbitControls
                //[100, 60, 75]
                //  position={[100, 60, 75]}
                ref={OrbitControlsRef}
                target={[0, 0, 0]}
                // target0={new THREE.Vector3(0, 10, 0)}
                maxPolarAngle={(Math.PI / 2) * 0.9}
                autoRotate={false}
                minDistance={50}
                maxDistance={300}
            // enablePan={false}

            />
            <group name="Camera" ref={cameraWrap} position={[10, 1, 5]} >
                <PerspectiveCamera ref={defaultCamera} fov={42} makeDefault position={[-15, 10, -30]} rotation={[Math.PI / 4, (Math.PI) / 2 * 90, Math.PI / 4]} />
            </group>
            <group position={[0, 0, 0]} rotation={[0, 0, 0]}>
                <Robot ref={robotRef} scale={20} position={[-20, 5, 0]} rotation={[0, 0, 0]}> </Robot>
            </group>
        </group>)
    }

    function LoadEnvironment(props) {

        var loader = new THREE.TextureLoader();
        return (
            <>
                <group ref={environmentWrap} position={[values.x, values.y, values.z]} scale="1">
                <Box receiveShadow={true} position={[5, 10, -8]} size={[10, 10, 10]} rotation={[0, Math.PI / 2.9, 0]} color="white" image="/xMooney_Logo_Token_1000px_x_1000px.png" />
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



                    {/* <group name="CameraAndBot" ref={cameraAndBotWrap} {...props} dispose={null}>
                        <group name="Camera" ref={cameraWrap} position={[10, 1, 5]} rotation={[-100, (Math.PI*4/2), 10]}>
                            <PerspectiveCamera ref={defaultCamera} fov={60}  makeDefault position={[-10, 0, -10]} />
                        </group>
                        <group position={[0, 0, 0]} rotation={[0, 0, 0]}>
                            <Robot ref={robotRef} scale={20} position={[-20, 0, 0]} rotation={[0, 0, 0]}> </Robot>
                        </group>
                    </group> */}


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
            <Canvas
                shadows={true}
                ref={canvasRef}
                className="canvas"

                camera={{
                    position: [-100, 50, -75],
                }}
            >
                {/* <Camera position={[0, 0, 10]} /> */}
                {/* <Camera></Camera> */}
                {/* <PerspectiveCamera ref={PerspectiveCameraRef} fov={75} position={[100, 50, 20]} /> */}
                <Suspense fallback={<Loader />}>
                    {/* <Camera ref={Camera} position={[0, 0, 0]} /> */}
                    {/* <PerspectiveCamera ref={PerspectiveCameraRef} manual position={[10,20,10]}>
                    </PerspectiveCamera> */}
                    <CharacterAndCamera />
                    <LoadEnvironment />
                    
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

















