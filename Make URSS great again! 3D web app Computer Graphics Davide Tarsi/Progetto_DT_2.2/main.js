//--------------------INIZIALIZZAZIONE VARIABILI--------------------//
//--------------------DA FARE NELL'INDEX----------------------------//


//--------------------FUNZIONE UPATE--------------------//

function update(time){  
    if (nStep*SAMPLING_STEP<=timeNow){ //skip the frame if the call is too early
        nStep++;
        tankDoStep();
        window.requestAnimationFrame(update);
        return;
    }
    timeNow=time;
    if (restart == true){
		tankInit();
		flagInit();
		restart = false;
        settings.pov = degToRad(80);
        render();
        flagsCaptured = 0;
	}
    
    render();

    window.requestAnimationFrame(update);  //to get the next frame
}


//---------------------FUNZIONE RENDER--------------------//

//matrici globali per la camera
var lightWorldMatrix, lightProjectionMatrix, projectionMatrix, cameraMatrix, viewMatrix;

function render(time){
    time*=0.01;
    //gl.enable(gl.CULL_FACE); 	//se è disabilitato, riesco a vedere dentro al cubo, se no no
    gl.enable(gl.DEPTH_TEST);

    // first draw from the POV of the light
    lightWorldMatrix = m4.lookAt(
        [settings.x_light, settings.y_light, settings.z_light],          			// position
        [settings.x_targetlight, settings.y_targetlight, settings.z_targetlight], 	// target
        settings.up,                                              					// up
    );

    lightProjectionMatrix = m4.perspective(
            degToRad(settings.fovLight),
            settings.width_projLight / settings.height_projLight,
            1,  	// near: top of the frustum
            700);   // far: bottom of the frustum


	// -----------------------------------------------------------
    // draw to the depth texture
	
    gl.bindFramebuffer(gl.FRAMEBUFFER, depthFramebuffer);
    gl.viewport(0, 0, depthTextureSize, depthTextureSize);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    drawScene( lightProjectionMatrix, lightWorldMatrix, m4.identity(), lightWorldMatrix, colorProgramInfo);
    
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    //gl.clearColor(0, 0, 0, 1); //setta tutto a nero se 0,0,0,1
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


    let textureMatrix = m4.identity();
    textureMatrix = m4.translate(textureMatrix, 0.5, 0.5, 0.5);
    textureMatrix = m4.scale(textureMatrix, 0.5, 0.5, 0.5);
    textureMatrix = m4.multiply(textureMatrix, lightProjectionMatrix);
    textureMatrix = m4.multiply(textureMatrix, m4.inverse(lightWorldMatrix));

	// -------------------------------------------------------------------
	//matrici di vista
	
	projectionMatrix = m4.perspective(settings.fov, settings.aspect, 1, 2000);

	var targetTank = [px, py, pz];
	
	camera = [px +(settings.D*Math.sin(degToRad(facing))), py+14, pz+(settings.D*Math.cos(degToRad(facing)))]; //posteriore alla macchina

	//cambiaCamera = true --> camera anteriore
	if(cambiaCamera){
		camera = [px +(-settings.D*Math.sin(degToRad(facing))), py+14, (pz+(-settings.D*Math.cos(degToRad(facing))))];	
	}
	//permette di muoversi nella scena (esempio con la drag del mouse)
	if(cameraLibera){
		camera = [settings.D*Math.sin(settings.PHI)*Math.cos(settings.THETA),
                    settings.D*Math.sin(settings.PHI)*Math.sin(settings.THETA),
                    settings.D*Math.cos(settings.PHI)];
                    
	}
	
    cameraMatrix = m4.lookAt(camera, targetTank, settings.up);
    viewMatrix = m4.inverse(cameraMatrix);

    drawScene( projectionMatrix, cameraMatrix, textureMatrix, lightWorldMatrix, shadowProgramInfo);
    if (morte === false){
        drawSkybox(gl, skyProgramInfo, viewMatrix, projectionMatrix);
    } else {
        gl.clearColor(0, 0, 0, 1); //setta tutto a nero se 0,0,0,1
    }
    
}	


//---------------------FUNZIONE DRAW SCENE--------------------//

function drawScene(projectionMatrix, cameraMatrix, textureMatrix, lightWorldMatrix, programInfo){

    const viewMatrix = m4.inverse(cameraMatrix);
    gl.useProgram(programInfo.program);

    // Setup all the needed attributes.
    if (shadowOpt == true){
        webglUtils.setUniforms(programInfo, {
            u_view: viewMatrix,
            u_projection: projectionMatrix,
            u_bias: bias,   
            u_textureMatrix: textureMatrix,
            u_projectedTexture: depthTexture, 
            u_reverseLightDirection: lightWorldMatrix.slice(8, 11),
            //u_lightDirection: m4.normalize([-1, 3, 5]),
            u_lightIntensity: settings.lightIntensity,  
            u_shadowIntensity: settings.shadowIntensity
        });
    } else {
        textureMatrix = m4.identity();
        textureMatrix = m4.scale(textureMatrix, 0, 0, 0);
        webglUtils.setUniforms(programInfo, {
            u_view: viewMatrix,
            u_projection: projectionMatrix,
            u_bias: bias,   //da dichiarare nell'index
            u_textureMatrix: textureMatrix,
            u_reverseLightDirection: lightWorldMatrix.slice(8,11),
            //u_lightDirection: m4.normalize([-1, 3, 5]),
            //u_lightIntensity: settings.lightIntensity   // da dichiarare
        });
    }

    drawTank(programInfo);
    if (endGame==false){
        drawEnemiesFlags(programInfo);
        if (flagsCaptured === 0){
            drawFlagBelarus(programInfo);
        } else if (flagsCaptured === 1){
            drawFlagUkraine(programInfo);
        } else {
            drawFlagKazakistan(programInfo);
        }
    }

    drawFloor(programInfo);
    drawBuilding(programInfo);
    drawBuilding2(programInfo);
    drawBase(programInfo);
    drawTable(programInfo);
    drawHouse(programInfo);
    //drawParallelogram(programInfo);
    drawFoto(programInfo);
    //drawDebugOriginLight(programInfo);
    //drawDebugTargetLight(programInfo);

    
    //------------------Stringa che descrive lo status nella partita--------//
    //------------------e le istruzioni per giocare------------------------//

    var string;
    var stringState = "Stato: ";
    let string2 = stringState + "In gioco";
    
	if (flagsCaptured === 1 ) {
		string2 = stringState + "Hai catturato: " + flagsCaptured + " bandiera su 3.";
	}
	if (flagsCaptured === 2 ) {
		string2 = stringState + "Hai catturato: " + flagsCaptured + " bandiere su 3.";
	}
	if (flagsCaptured > 2 ) {
		string2 = stringState + "Obiettivo raggiunto! Bravo, hai catturato: 3 bandiere su 3.";
	}
    if (morte === true) {
        string2 = stringState +  "Sei morto! Premi il tasto 'Ricomincia' per ricominciare la partita!";
    }


    //DA RIVEDERE CON EVENTI MOBILE
    if( !(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ){
            string = ["Usa i tasti W, A, S o D per muoverti nell'arena " +
                  "e prova a raccogliere tutte e 3 le bandiere " +
                  "per rifondare l'URRS! " +
                  "Stai per&ograve attento a non caturare quelle nemiche della NATO, " +
                  "e mi raccomando, non uscire dalla plancia di gioco! "] +
                ["Usa i tasti 'Aumenta/ Diminuisci cv' per aumentare o " +
                 "diminuire il campo visivo, " +
                "il tasto 'cambia camera' per cambiare la visuale " +
                "e gli slider per cambiare l'origine della luce e gestire " +
                "la luminosit&agrave della scena." +
                "\n" + "\n"];
    } else {
    string = ["Usa i tasti posti a sinistra e destra del campo da gioco " +
			"per muoverti in avanti (A) o indietro (R) oppure per sterzare (Dx/Sx). " +
            "e prova a raccogliere tutte e 3 le bandiere " +
            "per rifondare l'URRS! " +
            "Stai per&ograve attento a non caturare quelle nemiche della NATO, " +
            "e mi raccomando, non uscire dalla plancia di gioco! "]; 
    }
	document.getElementById('text').innerHTML = string;
    document.getElementById('textActive').innerHTML = string2;

}

/* function drawTextInfo(){
    if( (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ) {
    ctx.drawImage(wasd_keys, 80, 330);
    ctx.drawImage(freccie, 540, 330);  
    //ctx.drawImage(button1, 300, 450);
	//ctx.drawImage(button3, 440, 450);  
    ctx.drawImage(image_menu, 871.5, 17);
    } 
    else{ctx.drawImage(image_menu, 871.5, 200);}
	//testo
	ctx.font = '14pt Calibri';
	ctx.fillStyle = 'blue';
	ctx.fillText("Prova a raccogliere tutte", 880, 50);
	ctx.fillText("le cartelle ", 880, 70);
    ctx.font = '14pt Calibri';
	ctx.fillStyle = 'red';
	ctx.font = '12pt Calibri';
	ctx.fillStyle = 'purple';
	ctx.fillText("Attenzione evita i virus rotanti per ", 880, 140);
	ctx.fillText("non rimetterci i circuiti", 880, 160);
	ctx.font = '10pt Calibri';
	ctx.fillStyle = 'black';
	ctx.fillText("----------------------------------------------------------", 871, 270);
	ctx.font = '16pt Calibri';
	ctx.fillStyle = 'red';
	ctx.fillText("	             CONTROLLI 		", 870, 290);
	ctx.font = '13pt Calibri';
	ctx.fillStyle = 'black';
    ctx.fillText("          Controllo movimento", 880, 310);
    ctx.font = '12pt Calibri';
	ctx.fillText("          W avanti            A sinistra", 880, 330); 
	ctx.fillText("          S indietro          D destra", 880, 350); 
    ctx.font = '13pt Calibri';
    ctx.fillText("Controllo movimento camera", 880, 380);
	ctx.fillText("con le freccie direzionali ⇑⇓⇒⇐", 880, 400); 
    ctx.fillText("o con il movimento del mouse", 880, 420);
	ctx.font = '13pt Calibri';
	ctx.fillText("Puoi avvicinare e allontare la", 880, 440); 
    ctx.fillText("camera con la rotella del mouse", 880, 460); 
}
*/
//---------------------CHIAMATA FUNZIONI--------------------//
//---------------------E AVVIO PROGRAMMA--------------------//
//------------------------NELL'INDEX-------------------//