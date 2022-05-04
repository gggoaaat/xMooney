import {
    Button, Divider, FormControl, FormLabel, Input, Link, Text, Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from "@chakra-ui/react";
import {
    ArrowRightIcon,
    ArrowLeftIcon,
    ChevronRightIcon,
    ChevronLeftIcon
} from "@chakra-ui/icons";
import { m } from "framer-motion";
import Moralis from "moralis";
import { useState, useEffect } from "react";
import { useERC20Balances, useMoralis, useMoralisWeb3Api } from "react-moralis";
import Image from "next/image";
import gameHouse from "../assets/game/house.png"
import gameBuilding from "../assets/game/ezgif.com-gif-maker (1).gif"
import CustomContainer from "./CustomContainer";
import IsoMap from "./Isometric2";

export default function Land({ user }) {
    let isoMap;
    const [selectedObject, setSelectedObject] = useState({
        image: "currentAsset"
    });

    const [isomap, setIsomap] = useState(IsoMap);
    const [imgSource, setImageSource] = useState(gameHouse);
    const [currentObject, setCurrentObject] = useState(gameBuilding);
    
    console.log(currentObject)

    useEffect(() => {

        //   const isomap = IsoMap();

        (function () {

            // isometric map settings
            var params = {
                screen: { width: 640, height: 550 },
                map: { width: 10, height: 10 },
                tile: { width: 64, height: 32 },
                selectedObject: selectedObject,
                gameAssets: 'gameAssets'
            }

            // create map
            // const isoMap = new IsoMap2();
            isoMap = new isomap(params);
            isoMap.create();

            // draw shape
            // isoMap.drawPrism({ x: 5, y: 6 });
            // isoMap.drawPrism({ x: 8, y: 7 });
             isoMap.drawImg({ x: 5, y: 6 });
             isoMap.drawImg({ x: 8, y: 7 });

        })();

    }, [isoMap]);


    function updateObject(props) {
        // console.log(isoMap);
        console.log(props);
        switch(props.id)
        {
            case "gameHouse":
                setCurrentObject(gameHouse);
                break;
            case "gameBuilding":
                setCurrentObject(gameBuilding);
                break;
        }        

        console.log(currentObject)
    }
    
    // console.log(data)

    return (
        <CustomContainer>
            <div id="gameAssets">
                
                {currentObject == gameHouse &&
                <Image id="currentAsset" className="activeObject" src={currentObject} alt="Game House" /> }
                
                {currentObject == gameBuilding &&
                <Image id="currentAsset" className="activeObject" src={currentObject} alt="Game Building" /> }
                
                <Image id="gameHouse" className="assetImg" src={gameHouse} alt="Game House" onClick={() => updateObject({ id: "gameHouse" })} />
                <Image id="gameBuilding" className="assetImg" src={gameBuilding} alt="Game Building" onClick={() => updateObject({ id: "gameBuilding" })} />

                {/* <video id="Movie1" width="50" height="100%" autoplay loop muted controls>
                <source 
                    src="/skyscraper_1.hevc.mp4" 
                    type='video/mp4; codecs="hvc1"' />
                <source 
                    src="/skyscraper_1.webm" 
                    type="video/webm" />
                </video> */}
            </div>

            <canvas id="canvas" className="center" />
        </CustomContainer>
    )
}