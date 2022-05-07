import { useEffect, useRef, useState } from "react";

export const useThree = (ThreeClass, cnvaUS) => {    
         
    const canvas = useRef(null);

    if(canvas.current)
    {
        canvas.current.cnvaUS = cnvaUS;
    }

    useEffect(() => {        
        new ThreeClass(canvas.current);
    });
    
    return canvas;
};