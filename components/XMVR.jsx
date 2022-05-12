import ThreeApp from "../threejs/ThreeApp";
import { useEffect, useRef, useState, useLayoutEffect } from "react";
// import { useThree } from "../hooks/useThree";
import { useControls } from 'leva'

export default function XMVR() {  

    const values = useControls({ intensity: { value: 5, min : 0, max : 20, step : 1 },
        x: { value: 5, min : 0, max : 20, step : 1 },
        y: { value: 5, min : 0, max : 20, step : 1 },
        z: { value: 5, min : 0, max : 20, step : 1 }
    })

    const [cnva, setCNVA] = useState();
    // const canvas = useThree(ThreeApp, { cnva, setCNVA, values});  

    return (
        <>
            <div ref={canvas} style={{ height: "100vh" } } id="hello" 
                intensity={values.intensity}
                lightX={values.x}
                lightY={values.y}
                lightZ={values.x}
            >  
                {cnva}          
            </div>
        </>
    )
}