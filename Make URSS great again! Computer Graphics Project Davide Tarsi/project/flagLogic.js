//---------------------VARIABILI PER LA LOGICA DEL GIOCO---------------------//

var flagsCaptured = 0;
var endGame = false;
pxFlag = 0;
pzFlag = 0;
var enFlag1Position = [35,0,50];
var enFlag2Position = [-75,0,80];
var enFlag3Position = [50,0,-40];
var buildingPosition = [-35,0,-80];
var buildingPosition2 = [-70,0, 40];
var housePosition = [50,4,-20];

//---------------------FUNZIONE PER CATTURARE LE 3 BANDIERE---------------------//
//---------------------E CHECK VITTORIA---------------------------------------//

var radius = 4;

function checkFlag(){
    
    //check if near good flag
    if (px > pxFlag -radius
        && px < pxFlag + radius 
        && pz > pzFlag - radius
        && pz < pzFlag + radius){
    

        if (flagsCaptured == 2){
            console.log("Hai catturato la bandiera!");
            console.log("Bandiera n. " + (flagsCaptured+1) + " catturata");
            console.log("Hai vinto!");
            endGame = true;
            alert("Hai vinto!\nPremi il tasto 'Retry' per cominciare una nuova partita!");
            flagsCaptured = 4;
        }

        if (flagsCaptured < 3){
            console.log("Hai catturato la bandiera!");
            console.log("Bandiera n. " + (flagsCaptured+1) + " catturata");
            flagsCaptured++;
            flagInit();
        }
    }
     
    //check if near enFlag 1
    if (px > enFlag1Position[0] - radius
        && px < enFlag1Position[0] + radius
        && pz > enFlag1Position[2] - radius
        && pz < enFlag1Position[2] + radius){

        morte = true;
    }

    //check if near enFlag 2
    if (px > enFlag2Position[0] - radius
        && px < enFlag2Position[0] + radius
        && pz > enFlag2Position[2] - radius
        && pz < enFlag2Position[2] + radius){

        morte = true;
    }

    //check if near enFlag 3
    if (px > enFlag3Position[0] - radius
        && px < enFlag3Position[0] + radius
        && pz > enFlag3Position[2] - radius
        && pz < enFlag3Position[2] + radius){

        morte = true;
    }

    

}

//----------------------FUNZIONE DI INIZIALIZZAZIONE BANDIERA--------------//


function flagInit(){
    randomPosition();
    checkIfNearEnemy();
}

function checkIfNearEnemy(){
    //not near enFlag 1
    if (pxFlag > enFlag1Position[0] - 10 
        && pxFlag < enFlag1Position[0] + 10 
        && pzFlag > enFlag1Position[2] - 10 
        && pzFlag < enFlag1Position[2] + 10){
        randomPosition();
    }

    //not near enFlag 2
    if (pxFlag > enFlag2Position[0] - 10
        && pxFlag < enFlag2Position[0] + 10
        && pzFlag > enFlag2Position[2] - 10
        && pzFlag < enFlag2Position[2] + 10){
        randomPosition();
    }

    //not near enFlag 3
    if (pxFlag > enFlag3Position[0] - 10
        && pxFlag < enFlag3Position[0] + 10
        && pzFlag > enFlag3Position[2] - 10
        && pzFlag < enFlag3Position[2] + 10){
        randomPosition();
    }

    //not near building
    if (pxFlag > buildingPosition[0] - 10
        && pxFlag < buildingPosition[0] + 10
        && pzFlag > buildingPosition[2] - 10
        && pzFlag < buildingPosition[2] + 10){
        randomPosition();
    }

    //not near building 2
    if (pxFlag > buildingPosition2[0] - 10
        && pxFlag < buildingPosition2[0] + 10
        && pzFlag > buildingPosition2[2] - 10
        && pzFlag < buildingPosition2[2] + 10){
        randomPosition();
    }

    //not near house

    if (pxFlag > housePosition[0] - 10
        && pxFlag < housePosition[0] + 10
        && pzFlag > housePosition[2] - 10
        && pzFlag < housePosition[2] + 10){
        randomPosition();
    }

    
}

function randomPosition(){
    pxFlag = getRndInteger(-100, 100);
    pzFlag = getRndInteger(-100, 100);
}




