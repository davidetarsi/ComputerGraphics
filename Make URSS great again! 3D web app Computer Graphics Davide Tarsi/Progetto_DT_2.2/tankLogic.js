// --------------STATO DEL TANK-------------------//


//-------------------VARIABILI-------------------//
// (DoStep fa evolvere queste variabili nel tempo)
var px,py,pz,facing = 0; 	// posizione e orientamento
var sterzo; // stato interno
var vx,vy,vz; 				// velocita' attuale
var key;

var posMaxX;
var posMaxZ;
var posMinX;
var posMinZ;

//-------------------COSTANTI-------------------//
var velSterzo, velRitornoSterzo, accMax, grip, 
attrito, attritoX, attritoY, attritoZ; // attriti



//-------------------INIZIALIZZAZIONE STATO TANK-------------------//

function tankInit(){
	
    // POSIZIONE E ORIENTAMENTO
	px = 0; py = 1.5; pz = 20;
	facing = 0; //per vedere la parte frontale o posteriore del tank --> 0: posteriore, 180: anteriore
	
	sterzo = 0; 	// stato
	vx = vy = vz = 0;      			// velocita' attuale
	// inizializzo la struttura di controllo
	key=[false, false, false, false, false];

	velSterzo = 1;
	//velSterzo=3.4;	// A
	//velSterzo=2.26;    // A
	velRitornoSterzo=0.8; // B, sterzo massimo = A*B / (1-B)

	accMax = 0.006; //se aumenta, aumenta la velocità del TANK

	// attriti: percentuale di velocita' che viene mantenuta
	// 1 = no attrito
	// <<1 = attrito grande
	attritoZ = 0.991;  	// piccolo attrito sulla Z (nel senso di rotolamento delle ruote)
	attritoX = 0.8;  	// grande attrito sulla X (per non fare slittare il tank)
	attritoY = 1.0;  	// attrito sulla y nullo

	// Nota: vel max = accMax*attritoZ / (1-attritoZ)
	
	grip = 0.45; // quanto il facing TANK si adegua velocemente allo sterzo
}

//-------------------FUNZIONE TANK DO STEP-------------------//

function tankDoStep(){
    
    if (morte ===false){
    // calcolo il nuovo stato interno
    tankDoStepInternal();

    // calcolo la nuova posizione
    tankDoStepExternal();

    // controllo collisioni
    checkFlag();
    }

}


//-------------------FUNZIONE TANK DO STEP INTERNAL-------------------//

function tankDoStepInternal(){
    
    var vxm, vym, vzm; // velocita' cingoli

    // da vel frame mondo a vel frame macchina
	var cosf = Math.cos(facing*Math.PI/180.0);
	var sinf = Math.sin(facing*Math.PI/180.0);
	vxm = +cosf*vx - sinf*vz;
	vym = vy;
	vzm = +sinf*vx + cosf*vz;
    
    // calcolo lo sterzo
    if (key[1]) sterzo -= velSterzo; // sinistra
    if (key[3]) sterzo += velSterzo; // destra
    sterzo *= velRitornoSterzo; // ritorno a sterzo nullo

    //calcolo accellerazione
    if (key[0]) vzm+=accMax; // accelerazione in avanti
	if (key[2]) vzm-=accMax; // accelerazione indietro
    

    // calcolo l'attrito
    vxm *= attritoX;
    vym *= attritoY;
    vzm *= attritoZ;

    // calcolo la rotazione del tank
    facing = facing - (vzm*grip)*sterzo;

    // calcolo la velocita' finale
    vx = + cosf*vxm + sinf*vzm;
	vy = vym;
	vz = -sinf*vxm + cosf*vzm;
    

}

//-------------------FUNZIONE TANK DO STEP EXTERNAL-------------------//

function tankDoStepExternal(){  //DA VERIFICAREEEEEE

    // calcolo la nuova posizione
    px += vx;
    py += vy;
    pz += vz;

    var pos = 125;   //*3.9 per raggiungere il limite del tavolo

    //imposto i limiti del campo di gioco
    posMaxX = pos;
    posMaxZ = pos;
    posMinX = -pos;
    posMinZ = -pos;

    //controllo che il tank non esca dai limiti del campo di gioco
    if(px > posMaxX){
        px = posMaxX;
        morte = true;
    }
    if(px < posMinX){
        px = posMinX;
        morte = true;
    }
    if(pz > posMaxZ){
        pz = posMaxZ;
        morte = true;
    }
    if(pz < posMinZ){
        pz = posMinZ;
        morte = true;
    }




}

