import { useEffect, useRef } from "react";

export const useThree = (ThreeClass, levaObject) => {
    const canvas = useRef(null);    

    if(canvas.current)
    canvas.current.levaObject = levaObject;

    useEffect(() => {
        new ThreeClass(canvas.current);
    }, []);
    return canvas;
};