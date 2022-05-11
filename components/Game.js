import { Canvas, useFrame } from "@react-three/fiber"
import React, { forwardRef, useRef, useState, useMemo, Suspense, useEffect, useLayoutEffect } from 'react'
import * as THREE from "three";
import TimeOfDay from './TimeOfDay';
import { Sky, PointerLockControls, FlyControls } from "@react-three/drei"
import { Physics } from "@react-three/cannon"
import { Ground } from "./Ground"
import { Player } from "./Player"
import { Cube, Cubes } from "./Cube"
import { Leva, folder, useControls } from 'leva'
import Warehouse from "../components/assets/Warehouse";
import objectStich from './ObjectStich';

// The original was made by Maksim Ivanow: https://www.youtube.com/watch?v=Lc2JvBXMesY&t=124s
// This demo needs pointer-lock, that works only if you open it in a new window
// Controls: WASD + left click

export default function Game() {

    var loader = new THREE.TextureLoader();



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

    function GetBall(props) {
        const boxRef = useRef();

        const [active, setActive] = useState(false);
        const [hover, setHover] = useState(false);
        const ObjectStich = objectStich()

        if (boxRef)
            useFrame(({ clock }) => {
                if (hover) {
                    if (boxRef.current && boxRef.current.position)
                        boxRef.current.position.y += 0.1;
                }
                else {
                    if (boxRef.current && boxRef.current.position)
                        if (boxRef.current.position.y >= 0) {
                            boxRef.current.position.y += -0.1;
                        }
                }
            });

        return (

            <mesh ref={boxRef}
                position={[values.bx, 20, values.bz]}
                rotation={[0, 0, 0]}
                scale={1}
                castShadow={true}
                onPointerOver={() => {
                    setHover(true);
                }}
                onPointerOut={() => {
                    setHover(false);
                }}
            >
                <sphereBufferGeometry args={[0.7, 30, 30]} attach="geometry" />
                <meshLambertMaterial wireframe  color={"rgb(10, 50, 80)"}></meshLambertMaterial>
            </mesh>
        )
    }
    const [ready, set] = useState(false)


    return (
        <>
          <div className="scene" id="theScene">
            <Canvas shadows gl={{ alpha: false }} camera={{ fov: 45 }}>
                <TimeOfDay
                    environmentLB1={[values.x, values.y, values.z]}
                    environmentLB2={[values.lb2X, values.lb2Y, values.lb2Z]}
                ></TimeOfDay>
                <ambientLight intensity={0.3} />
                <pointLight castShadow intensity={0.8} position={[100, 100, 100]} />
                <Physics gravity={[0, -9.81, 0]}>
                    <Ground />
                    <Player />
                    <Cube position={[0, 0.5, -10]} />
                    <Cubes />
                    <Warehouse receiveShadow={false} scale={[3, 3, 3]} position={[0, 0, 80]}></Warehouse>
                    <GetBall></GetBall>
                </Physics>
                <PointerLockControls position={[0,20,0]} />
            </Canvas>
        </div>
        <div className="dot" />
        <div className={`fullscreen bg ${ready ? "ready" : "notready"} ${ready && "clicked"}`}>
        <div className="stack">
          <button onClick={() => set(true)}>Click (needs fullscreen)</button>
        </div>
        
      </div>
      
        </>
    )
}
