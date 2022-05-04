export default function Isometric() {

    const IsoMap = (function () {

        /**
         * @desc constructor
         * @param object $params - initial parameters
         */

        let selectedObject = {};
        let assetObjects;
               
        function IsoMap(params) {

            this.canvas = document.getElementById('canvas');
            this.canvas.onmousedown = (e) => { px = e.x; py = e.y; canvas.onmousemove = (e) => { ox -= (e.x - px); oy -= (e.y - py); px = e.x; py = e.y; } }

            this.canvas.onmouseup = () => { canvas.onmousemove = null; }
            this.canvas.onwheel = (e) => {
                let bfzx, bfzy, afzx, afzy;[bfzx, bfzy] = StoW(e.x, e.y); scx -= 10 * scx / e.deltaY; scy -= 10 * scy / e.deltaY;
                [afzx, afzy] = StoW(e.x, e.y);
                ox += (bfzx - afzx);
                oy += (bfzy - afzy);
            }
            this.context = canvas.getContext('2d');

            // tiles color
            this.color = '#15B89A';

            // canvas area details
            this.screen = {
                width: params.screen.width,
                height: params.screen.height
            };

            // size of isometric map
            this.map = {
                width: params.map.width,
                height: params.map.height
            };

            // size of single tile
            this.tile = {
                width: params.tile.width,
                height: params.tile.height
            }

            // initial position of isometric map
            this.position = {
                x: 350,
                y: this.tile.height
            }

            this.selectedObject = params.selectedObject
        }
        let mytext;
        /**
         * @desc draw isometric map
         */
        IsoMap.prototype.create = function () {
            // set canvas size
            this.canvas.setAttribute('width', this.screen.width);
            this.canvas.setAttribute('height', this.screen.height);

            // tiles drawing loops
            for (let i = 0; i < this.map.width; i++) {
                for (let j = 0; j < this.map.height; j++) {
                    // calculate coordinates
                    let x = (i - j) * this.tile.width / 2 + this.position.x;
                    let y = (i + j) * this.tile.height / 2 + this.position.y;
                    // draw single tile
                    this.drawTile(this.color, x, y);
                }
            }

            // tiles drawing loops
            for (let i = 0; i < this.map.width; i++) {
                let x = (i - this.map.height) * this.tile.width / 2 + this.position.x;
                let yy = (i + this.map.height) * this.tile.height / 2 + this.position.y;
                this.drawTile("#000", x, yy);
            }

            for (let i = 0; i < (this.map.height + 1); i++) {
                let xd = (this.map.width - i) * this.tile.width / 2 + this.position.x;
                let yyy = (i + this.map.width) * this.tile.height / 2 + this.position.y;
                this.drawTile("#000", xd, yyy);
            }

            // add event listeners
            this.addListeners();
        };

        IsoMap.prototype.setObject = function (selectedObject) {
            // set canvas size            
            this.selectedObject = selectedObject;
        };
        /**
         * @desc draw single tile
         * @param int $x - position x on canvas area
         * @param int $y - position y on canvas area
         */
        IsoMap.prototype.drawTile = function (color, x, y) {
            let tileWidth = this.tile.width;
            let tileHeight = this.tile.height;

            // begin
            this.context.beginPath();

            // move to start point
            this.context.moveTo(x - tileWidth / 2, y);

            /**
             * create four lines
             * --------------------------------------------
             *    step 1  |  step 2  |  step 3  |  step 4
             * --------------------------------------------
             *    /       |  /       |  /       |  /\  
             *            |  \       |  \/      |  \/
             * --------------------------------------------
             */
            this.context.lineTo(x - tileWidth, y + tileHeight / 2);
            this.context.lineTo(x - tileWidth / 2, y + tileHeight);
            this.context.lineTo(x, y + tileHeight / 2);
            this.context.lineTo(x - tileWidth / 2, y);

            // draw path
            this.context.stroke();

            // fill tile
            this.context.fillStyle = color;
            this.context.fill();
        }

        /**
         * @desc draw single shape - prism
         * @param object $isometricPosition - position on map { x: value, y: value }
         */
        IsoMap.prototype.drawPrism = function (isometricPosition) {
            let screenPosition = this.convertIsometricToScreen(isometricPosition.x, isometricPosition.y);
            let x = screenPosition.x;
            let y = screenPosition.y;
            let tileWidth = this.tile.width;
            let tileHeight = this.tile.height;

            // top
            this.context.beginPath();

            this.context.moveTo(x - tileWidth / 2, y - tileHeight);
            this.context.lineTo(x - tileWidth, y - tileHeight / 2);
            this.context.lineTo(x - tileWidth / 2, y);
            this.context.lineTo(x, y - tileHeight / 2);
            this.context.lineTo(x - tileWidth / 2, y - tileHeight);

            this.context.fillStyle = '#555555';
            this.context.fill();

            // left
            this.context.beginPath();

            this.context.moveTo(x - tileWidth, y - tileHeight / 2);
            this.context.lineTo(x - tileWidth, y + tileHeight / 2);
            this.context.lineTo(x - tileWidth / 2, y + tileHeight);
            this.context.lineTo(x - tileWidth / 2, y);
            this.context.lineTo(x - tileWidth, y - tileHeight / 2);

            this.context.fillStyle = '#444444';
            this.context.fill();

            // right
            this.context.beginPath();

            this.context.moveTo(x - tileWidth / 2, y);
            this.context.lineTo(x, y - tileHeight / 2);
            this.context.lineTo(x, y + tileHeight / 2);
            this.context.lineTo(x - tileWidth / 2, y + tileHeight);
            this.context.lineTo(x - tileWidth / 2, y);

            this.context.fillStyle = '#777777';
            this.context.fill();
        }

        IsoMap.prototype.drawImg = function (isometricPosition) {
            let screenPosition = this.convertIsometricToScreen(isometricPosition.x, isometricPosition.y);
            let x = screenPosition.x;
            let y = screenPosition.y;
            let tileWidth = this.tile.width;
            let tileHeight = this.tile.height;

            let img2 = document.getElementById(this.selectedObject.image);
            //  console.log(img2);
            //console.log(img2.width, img2.height);
            this.context.drawImage(img2, x - (tileWidth + img2.width) / 2, y - (tileHeight - (img2.width / 2)));
        }



        // IsoMap.prototype.drawCoordinates = function (isometricPosition) {
        //     let screenPosition = this.convertIsometricToScreen(isometricPosition.x, isometricPosition.y);
        //     let x = screenPosition.x;
        //     let y = screenPosition.y;
        //     let tileWidth = this.tile.width;
        //     let tileHeight = this.tile.height;

        //     // let img2 = document.getElementById(this.selectedObject.image);
        //     // console.log(img2);
        //     // this.context.drawImage(img2, x - (tileWidth * 2) / 2, y - (tileHeight * 0.45));
        // }

        let newCoords = "";

        IsoMap.prototype.drawCoords = function (message) {
            try {
                if (this.context) {
                    this.context.fillStyle = '#fff';
                    this.context.fillRect(5, 20, 140, 50);
                    this.context.font = "30px Arial";
                    this.context.fillStyle = '#000';
                    this.context.fillText(newCoords, 10, 50);
                }

            } catch (error) {
                console.log(error)
            }

        }
        /**
         * @desc init map listeners
         */

        IsoMap.prototype.addListeners = function () {
            let self = this;

            let offset = { x: -32, y: -8 }

            this.canvas.addEventListener('mousedown', function onMouseDown(event) {
                let mousePosition = getMousePosition(event);

                let isometricPosition = self.convertScreenToIsometricOffset(offset, mousePosition.x, mousePosition.y);

                if (isOnMap(isometricPosition, self.map)) {
                    //self.drawPrism(isometricPosition);
                    self.drawImg(isometricPosition);
                }

            }, false);


            this.canvas.addEventListener('mousemove', function (e) {
                let mousePosition = getMousePosition(e);

                let isometricPosition = self.convertScreenToIsometricOffset(offset, mousePosition.x, mousePosition.y);

                //   console.log(isometricPosition.x, isometricPosition.y)

                const __x = isometricPosition.x;
                const __y = isometricPosition.y;
                newCoords = "x: " + __x + " y:" + __y
                if (isOnMap(isometricPosition, self.map)) {
                    self.drawCoords(newCoords);
                }
            }, false);
        }

        IsoMap.prototype.convertScreenToIsometric = function (x, y) {
            x = ((x - this.position.x) / this.tile.width);
            y = (y - this.position.y) / this.tile.height;

            let isoX = Math.floor(y + x)
            let isoY = Math.floor(y - x)

            return { x: isoX, y: isoY };
        };

        IsoMap.prototype.convertScreenToIsometricOffset = function (offset, x, y) {
            x = ((x - (this.position.x + offset.x)) / this.tile.width);
            y = (y - (this.position.y + (offset.y))) / this.tile.height;

            let isoX = Math.floor(y + x)
            let isoY = Math.floor(y - x)

            return { x: isoX, y: isoY };
        };


        IsoMap.prototype.convertIsometricToScreen = function (x, y) {
            let screenX = ((x - y) * this.tile.width / 2) + this.position.x;
            let screenY = ((x + y) * this.tile.height / 2) + this.position.y;

            return { x: screenX, y: screenY };
        };

        function getMousePosition(event) {
            let canvas = event.target;
            let rect = canvas.getBoundingClientRect();

            return {
                x: event.clientX - rect.left,
                y: event.clientY - rect.top
            };
        };

        function isOnMap(position, map) {
            if (position.x >= 0 && position.x < map.width
                && position.y >= 0 && position.y < map.height) {
                return true;
            } else {
                return false;
            }
        };

        return IsoMap;
    })();

    return IsoMap;
}


