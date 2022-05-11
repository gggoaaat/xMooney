import * as THREE from "three";

export default function GetMaterial(props) {

    var selectedMaterial;
  
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
        materialOptions.roughness = +props.roughness;
        materialOptions["map-repeat"] = props["map-repeat"];
        
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