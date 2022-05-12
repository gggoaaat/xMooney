import React, { forwardRef, useRef, useState, useMemo, Suspense, useEffect, useLayoutEffect } from 'react'
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Html, useProgress, OrbitControls } from '@react-three/drei'
import { Physics, usePlane, useSphere, useBox } from "@react-three/cannon";
import * as THREE from "three";
import { Leva, folder, useControls } from 'leva'
import { useKeyState } from 'use-key-state'

import { TextureLoader } from 'three/src/loaders/TextureLoader'
import Box from "./assets/Box";
import Floor from "./assets/Floor";
import Warehouse from "../components/assets/Warehouse";
import objectStich from './ObjectStich';
import TimeOfDay from './TimeOfDay';
import Character from './Character';
// import { useRenderRoot } from 'leva/dist/declarations/src/components/Leva';

const positions = [
    [0, 2, 3],
    [-1, 5, 16],
    [-2, 5, -10],
    [0, 12, 3],
    [-10, 5, 16],
    [8, 5, -10]
];

function Box2({ position }) {
    const [ref] = useBox(() => ({
        mass: 10,
        position: position,
        args: [2, 2, 2]
    }));

    return (
        <mesh ref={ref} castShadow>
            <boxBufferGeometry attach="geometry" args={[2, 2, 2]} />
            <meshStandardMaterial color="white" />
        </mesh>
    );
}
const Ball = ({ position, color }) => {
    const [ballRef] = useSphere(() => ({ mass: 1, position: position }));
  
  
    return (
      <mesh ref={ballRef} position={position} receiveShadow castShadow>
        <sphereBufferGeometry args={[1, 36, 36]} />
        <meshPhysicalMaterial
          color={color}
         
        />
      </mesh>
    );
  };

  
function GetBall(props) {
    // const ballRef = useRef();
    const [ballRef] = useSphere(() => ({
        mass: 1,
        // position: props.position,
        // rotation: [0, 0, 0],
        // receiveShadow: true,
        // type: "Static"
    }))

    const [active, setActive] = useState(false);
    const [hover, setHover] = useState(false);
    const ObjectStich = objectStich()


    useFrame(({ clock }) => {
        if (hover) {
            if (ballRef.current && ballRef.current.position)
                ballRef.current.position.y += 1;
        }
        // else {
        //     if (ballRef.current && ballRef.current.position)
        //         if (ballRef.current.position.y >= 0) {
        //             ballRef.current.position.y += -0.1;
        //         }
        // }
    });

    return (
        <mesh ref={ballRef}
            
            position={props.position}
            receiveShadow={true}
            castShadow={true}
            {...props}
            onPointerOver={() => {
                setHover(true);
            }}
            onPointerOut={() => {
                setHover(false);
            }}
        >
            <sphereBufferGeometry
                // attach="geometry"
                args={[1, 36, 36]}
            />
            <meshLambertMaterial
                color={"rgb(10, 50, 80)"}
            ></meshLambertMaterial>
        </mesh>
    )
}

const GetPlane = () => {

    const [ref, api] = usePlane(() => ({
        mass: 1,
        position: [0, 0, 0],
        rotation: [-Math.PI / 2, 0, 0],
        type: "Static"
    }))
    // useFrame(({ mouse }) => {
    //       api.rotation.set(-Math.PI / 2, 0, 0);
    //   });

    return (
        <mesh
            receiveShadow={true}
            scale={1}
            ref={ref}
        >
            <planeBufferGeometry
                attach="geometry"
                args={[200, 200, 5, 200]}
            />
            <meshStandardMaterial
                attach="material"
                side={THREE.DoubleSide}
                map={useLoader(TextureLoader, '/textures/grass3.jpg')}
                bumpMap={useLoader(TextureLoader, '/textures/grass3.jpg')}
                roughnessMap={useLoader(TextureLoader, '/textures/grass3.jpg')}
                bumpScale={1}
                metalness={-.5}
                roughness={101}
            />

        </mesh>
    )
}

export default function ThreeNew(props) {

    const ObjectStich = objectStich()
    const canvasRef = useRef()
    const environmentWrap = useRef()
    const landWrap = useRef()
    const OrbitControlsRef = useRef()

    function Loader() {
        const { progress } = useProgress()
        return (<Html center>{progress} % loaded</Html>)
    }

    const values = useControls({
        intensity: { value: 5, min: 0, max: 20, step: 1 },
        x: { value: 0, min: -5, max: 15, step: 1 },
        y: { value: 0, min: -5, max: 15, step: 1 },
        z: { value: 0, min: -5, max: 15, step: 1 },
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
                lb1Y: { value: 50, min: -100, max: 200, step: .01 },
                lb1Z: { value: 110, min: -100, max: 200, step: .01 }
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



    function LoadEnvironment(props) {

        const boxRef = useRef();
        var loader = new THREE.TextureLoader();

        const [active, setActive] = useState(false);
        const [hover, setHover] = useState(false);

        return (
            <>
                <group ref={environmentWrap} name="environmentWrap" position={[values.x, values.y, values.z]} rotation={[0, 0, 0]} scale="1">
                    <group ref={landWrap} name="landWrap" position={[0, 0, 0]} rotate={[0, 0, 0]} scale="1">
                        <Box
                            receiveShadow={true}
                            position={[0, 0, 0]}
                            size={[10, 10, 10]}
                            rotation={[0, Math.PI / 2.9, 0]}
                            color="white"
                            image="/xMooney_Logo_Token_1000px_x_1000px.png" />
                        <TimeOfDay {...props}
                            environmentMoon={[values.lb1X, values.lb1Y, values.lb1Z]}
                            environmentSun={[values.lb2X, values.lb2Y, values.lb2Z]}
                        ></TimeOfDay>
                        <Physics>
                            <GetBall scale={20} position={[50, 25, 50]}></GetBall>
                            <Ball position={[-50, 25, 50]}></Ball>
                            <GetPlane></GetPlane>
                            {positions.map((position, idx) => (
                                <Box2 position={position} key={idx} />
                            ))}
                        </Physics>
                        {/* <LightBulb position={[10, -1, -50]} /> */}
                        {<Floor color="white" position={[0, -20.1, 0]} size={[10, 2, 10]} scale="20" />}

                        <Warehouse receiveShadow={false} scale={[3, 3, 3]} position={[0, (2.95 * 3) - .1, 80]}></Warehouse>
                    </group>
                </group>
            </>
        );
    }

    function GetSpotLight(props) {
        const spotLight = useRef();

        console.log("spotLight")
        console.log(spotLight)
        return (<>
            <spotLight {...props}>
            </spotLight>

        </>);
    }

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xfffffff, 0.6);
    hemiLight.color.setHSL(0.6, 1, 0.6);
    hemiLight.groundColor.setHSL(0.095, 1, 0.75);

    const fov = 60;
    const aspect = 1920 / 1080;
    const near = 1.0;
    const far = 1000.0;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(25, 10, 25);

    const light = new THREE.DirectionalLight(0xffffff, 1.0);
    light.position.set(-100, 100, 100);
    light.target.position.set(0, 0, 0);
    light.castShadow = true;
    light.shadow.bias = -0.001;
    light.shadow.mapSize.width = 4096;
    light.shadow.mapSize.height = 4096;
    light.shadow.camera.near = 0.1;
    light.shadow.camera.far = 500.0;
    light.shadow.camera.near = 0.5;
    light.shadow.camera.far = 500.0;
    light.shadow.camera.left = 50;
    light.shadow.camera.right = -50;
    light.shadow.camera.top = 50;
    light.shadow.camera.bottom = -50;

    return (
        <div className="scene" id="theScene">
            <Canvas
                shadows={true}
                ref={canvasRef}
                className="canvas"

                camera={camera}
            >

                <Suspense fallback={<Loader />}>
                    <perspectiveCamera {...camera} />
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
                    {/* <Character camera={camera} scale={10} position={new THREE.Vector3(-20, -0.05, 0)} rotation={[0, 0, 0]} quaternion={new THREE.Quaternion()} /> */}
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
                    {/* <axisHelper scale={50} position={[0, 0, 0]} /> */}
                    {/* <Keyboard setUpKeyPressed={setUpKeyPressed} />  */}

                </Suspense>
            </Canvas>
            <Leva
                collapsed={true} // default = false, when true the GUI is collpased
                hidden={true} // default = false, when true the GUI is hidden
            // theme={myTheme} // you can pass a custom theme (see the styling section)
            // fill // default = false,  true makes the pane fill the parent dom node it's rendered in
            // flat // default = false,  true removes border radius and shadow
            // oneLineLabels // default = false, alternative layout for labels, with labels and fields on separate rows
            // hideTitleBar // default = false, hides the GUI header

            />

        </div>
    );
}

















