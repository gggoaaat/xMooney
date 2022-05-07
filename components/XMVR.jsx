import ThreeApp from "../threejs/ThreeApp";
import { useLayoutEffect } from "react";
import { useThree } from "../hooks/useThree";
import { folder, useControls } from 'leva'


export default function XMVR() {

    const { intensity, light } = useControls('My folder', {
        lighting: folder({
            intensity: { min: 0, max: 10 },
        }),
        something: folder({
            light: [{ min: 0, max: 20 }, { min: 0, max: 20 }, { min: 0, max: 20 }],
        }),
    })


    const levaObject = {
        intensity,
        light
    }

    const canvas = useThree(ThreeApp);

    return (
        <>
            <div ref={canvas} style={{ height: "100vh" }} />
        </>
    )
}