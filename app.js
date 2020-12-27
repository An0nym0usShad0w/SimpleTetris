document.addEventListener('DOMContentLoaded', ()=> {
        const grid=document.querySelector('grid');
        var currentRotation=0;
        var currentTetrisIndex=0;
        var squares=document.querySelectorAll('.grid div');

        var leftButton=document.getElementById('left-button');
        leftButton.addEventListener('click', clickedLeft);

        var rightButton=document.getElementById('right-button');
        rightButton.addEventListener('click', clickedRight);

        var leftButton=document.getElementById('rotate');
        leftButton.addEventListener('click', clickedRotate);

        function clickedLeft(){
            //console.log('clicked left')
            if(checkCanGoLeftWall()){
                moveAndDrawTetris(-1);
                currentIndexForRotation-=1;
            }

            //console.log(currentCollisionPlaces);

        }


        const areArraysEqual = (first, second) => 
        {
            if(first.length !== second.length){
            return false;
        };
            for(let i = 0; i < first.length; i++){
            if(!second.includes(first[i])){
                return false;
            };
        };
            return true;
        };

        function clickedRight(){
            //console.log('clicked right')
            if(checkCanGoRightWall())
            {
                moveAndDrawTetris(1);
                currentIndexForRotation+=1;
            }
        }

        function clickedRotate(){
            if(checkCanGoLeftWall()&&checkCanGoRightWall()){
                rotateCurrentTetris();
            }
        }

        const width=10;
        //const dfltbackgroundColor='red';

        const colors = ['orange','pink','yellow','green','violet','tomato','gray','slateblue','dodgerblue']

        var currentColor=colors[1];

        var currentIndexForRotation=0;

    function checkCanGoLeftWall(){

            var canGoLeft=true;
            var currentLolTiles =placesCurrentActiveTetris().slice();

            //console.log((currentLolTiles))

            currentLolTiles.some(element => {
                if(element%10==0){
                    canGoLeft=false;
                }
            });

            return canGoLeft;
        }

        function checkCanGoRightWall(){

            var canGoRight=true;
            var currentLolTiles =placesCurrentActiveTetris().slice();

            //console.log((currentLolTiles))

            currentLolTiles.some(element => {
                if((element+1)%10==0){
                    canGoRight=false;
                }
            });

            return canGoRight;
        }

        const tetrisCollection =
        [
            lTetronimo = [
            [1+2*width,1,1+width,2+2*width],
            [width,1+width,2+width,2*width],
            [0,1,1+width,1+2*width],
            [3,1+width,3+width,2+width]
            ],

         TTetronimo=[
            [1,width,width+1,width+2],
            [1,width+1,width+2,width*2+1],
            [width,width+1,width+2,width*2+1],
            [1,width,width+1,width*2+1]
        ],

         oTetromino = [
            [0,1,width,width+1],
            [0,1,width,width+1],
            [0,1,width,width+1],
            [0,1,width,width+1]
        ],

         zTetromino = [
            [0,width,width+1,width*2+1],
            [width+1, width+2,width*2,width*2+1],
            [0,width,width+1,width*2+1],
            [width+1, width+2,width*2,width*2+1]
            ]
        ];

        console.log('tetrinimosss:',tetrisCollection.length)

        //const randTetronimos =[lTetronimo,TTetronimo]

        // let currentTetris=tetrisCollection[1];

        //let currentPosition=2;

        let currentCollisionPlaces=[200,201,202,203,204,205,206,207,208,209]

        function draw(){

            var randomizeColor=Math.floor(Math.random()*colors.length);
            currentColor=colors[randomizeColor];

            var randOneToThree=Math.floor(Math.random()*3);
            // cRotation=currentRotation;

            // var randOneToFive=Math.floor(Math.random()*3);
            currentTetris=tetrisCollection[currentTetrisIndex];

            var randNumOnetoSeven=2//Math.floor(Math.random()*9)

            currentTetris[currentRotation].forEach(x => {
                squares[x+randNumOnetoSeven].style.backgroundColor=currentColor;
                squares[x+randNumOnetoSeven].classList.add('tetronimo');
                squares[x+randNumOnetoSeven].setAttribute('currentplace',x+randNumOnetoSeven);
            });
        }

        function unDraw(){

            var lastPlaces=[];

            getCurrentActiveTetris().forEach(element => {
                element.style.backgroundColor='';
                lastPlaces.push(element.getAttribute('currentplace'));
                element.setAttribute('currentplace',null);
                element.classList.remove('tetronimo');
            });
        }

        function remove_array_element(array, n)
        {
            var index = array.indexOf(n);
            if (index > -1) {
                array.splice(index, 1);
        }
            return array;
        }

        function checkforRowsCollide(){
            //areArraysEqual();
            var currentBlockedTiles=currentCollisionPlaces;

            const NineteethRow=[190,191,192,193,194,195,196,197,198,199]
            const EighteenRow=[180,181,182,183,184,185,186,187,188,189]

            if(currentCollisionPlaces.length>=NineteethRow.length){

                
                if(checkIfArrayContained(currentCollisionPlaces,NineteethRow)){
                        NineteethRow.forEach(element => 
                        {
                        squares[element].style.backgroundColor='';
                        squares[element].classList.remove('tetromino');
                        remove_array_element(currentCollisionPlaces,element)
                        squares[element].classList.remove('lolCollidedTetris');

                        //squares[element].setAttribute('previousHitPlace', element);
                        });
                    

                    moveEverythingDown()
                    
                }
            }
        }

        
        function moveEverythingDown(){
            var forAllCollidedTetris=Array.from(document.getElementsByClassName('lolCollidedTetris'));

            var originalPlaces=[];
            var nowtoMove=[];
            var nowtoColor=[];

            console.log(forAllCollidedTetris.length);

            forAllCollidedTetris.forEach(element => {

                originalPlaces.push(parseInt(element.getAttribute('currentplace')));
                nowtoMove.push(parseInt(element.getAttribute('currentplace'))+10)
                nowtoColor.push(element.style.backgroundColor)
                // console.log(element.style.backgroundColor);
                // console.log(element.getAttribute('currentplace'));

                element.setAttribute('currentplace',0);
                element.style.backgroundColor='';
            });

            for(i=0;i<originalPlaces.length;i++){

                remove_array_element(currentCollisionPlaces,originalPlaces[i]);
                squares[originalPlaces[i]].classList.remove('lolCollidedTetris');

            }

            for(i=0; i<originalPlaces.length;i++){

                squares[nowtoMove[i]].classList.add('lolCollidedTetris');
                squares[nowtoMove[i]].style.backgroundColor=nowtoColor[i];

                currentCollisionPlaces.push(nowtoMove[i]);

            }

            console.log(nowtoMove);
            console.log(nowtoColor)
        }

        function checkIfArrayContained(mainArray, containedArray){
            return containedArray.every(element => mainArray.includes(element));
        }

        function checkForPossibleCollision(rangeToCheck){

            var currentPlaces= Array.from(placesCurrentActiveTetris());

            var currentPossibleCollisionPlaces=[];

            for(i=0;i<currentPlaces.length;i++){
                currentPossibleCollisionPlaces[i]=currentPlaces[i]+rangeToCheck;
            }

            if(checkTwoArraysCommonElement(currentPossibleCollisionPlaces, currentCollisionPlaces)){

                return true;
            }
            else{
                return false;
            }
        }

        function getCurrentActiveTetris(){
            var allCurrentActiveTetris=  Array.from(document.getElementsByClassName('tetronimo'));

            return allCurrentActiveTetris;
        }

        function placesCurrentActiveTetris(){
            var currentActiveTetris =getCurrentActiveTetris();

            var currentPlacesForActiveTetris=[];

            currentActiveTetris.forEach(element => {
                currentPlacesForActiveTetris.push(parseInt(element.getAttribute('currentplace')));
            });

            return currentPlacesForActiveTetris;
        }

        function moveAndDrawTetris(tiles){
            currentIndexForRotation+=10;
            //this.tiles=parseInt(tiles);
            const toMoveDist=parseInt(tiles);

            var currentPlaces= placesCurrentActiveTetris();

            unDraw();
            var toGo=[];

            currentPlaces.forEach(element => {
                toGo.push(parseInt(element)+toMoveDist);
            });

            toGo.forEach(toChangeTile => {
                squares[toChangeTile].style.backgroundColor=currentColor;
                squares[toChangeTile].classList.add('tetronimo');
                squares[toChangeTile].setAttribute('currentPlace',toChangeTile);
            });
            //console.log(currentIndexForRotation)
        }
        
        draw();

        const interval = setInterval(function() {
            wholeGame();
            checkforRowsCollide();
        }

        , 150);

        function rotateCurrentTetris(){


            console.log(currentRotation)
            if(currentRotation<3){
                currentRotation++;
            }


            
            unDraw();
            draw();
            moveAndDrawTetris(currentIndexForRotation);

            if(currentRotation===3){
                currentRotation=0;
            }
        }

        function wholeGame(){

            var collided=false;

            if(collided==false){
                if(checkForPossibleCollision(10)==false){
                    //rotateCurrentTetris();
                    moveAndDrawTetris(10);
                }
                else if(checkForPossibleCollision(10)==true){
                    turnTetronimoToCollided();
                    // var randUptoTetris=Math.floor()*tetrisCollection.length;
                    currentTetrisIndex=Math.floor(tetrisCollection.length*Math.random());
                    draw();
                }
            }
        }


        function addToCollidedArray(){
            currentActivePlaces=placesCurrentActiveTetris();

            currentActivePlaces.forEach(element => {
                currentCollisionPlaces.push(element)
            });
        }

        function checkTwoArraysCommonElement(array1, array2){
            if(array1.filter(value => array2.includes(value)).length>0){
                return true;
            }
            else{
                return false;
            }
        }

        function turnTetronimoToCollided(){
            var currentTetronimos=getCurrentActiveTetris();

            addToCollidedArray();

            currentTetronimos.forEach(element => {
                element.classList.remove('tetronimo');
                //element.setAttribute('currentplace',null);

                element.classList.add('lolCollidedTetris');
                element.setAttribute('bgColor',element.style.backgroundColor);

                currentIndexForRotation=0;
            });
        }

})

