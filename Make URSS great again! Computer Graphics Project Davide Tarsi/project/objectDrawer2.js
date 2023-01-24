//funzioni per disegnare ogni oggetto
//ORDINE CORRETTO DI APPLICAZIONE DELLE TRASFORMAZIONI DELLE MATRICI: 
//translate, rotate, scale


function drawTank(programInfo){
    var objToDraw = getObjToDraw(objectsToDraw, "tank");

	tankMatrix = m4.translation(px,py,pz);
    tankMatrix = m4.yRotate(tankMatrix, degToRad(facing));
	tankMatrix = m4.scale(tankMatrix, 1.5, 1.5, 1.5);
	objToDraw.uniforms.u_world = tankMatrix;
   
    webglUtils.setBuffersAndAttributes(gl, programInfo, objToDraw.bufferInfo);
	webglUtils.setUniforms(programInfo, objToDraw.uniforms);
	webglUtils.drawBufferInfo(gl, objToDraw.bufferInfo);
}

function drawFlagBelarus(programInfo){
    var objToDraw = getObjToDraw(objectsToDraw, "flagBelarus");

    flagMatrix = m4.translation(pxFlag, -0.2, pzFlag);
    flagMatrix = m4.scale(flagMatrix, 0.2, 0.2, 0.2);
    objToDraw.uniforms.u_world = flagMatrix;

    webglUtils.setBuffersAndAttributes(gl, programInfo, objToDraw.bufferInfo);
    webglUtils.setUniforms(programInfo, objToDraw.uniforms);
    webglUtils.drawBufferInfo(gl, objToDraw.bufferInfo);
}


function drawFlagUkraine(programInfo){
    var objToDraw = getObjToDraw(objectsToDraw, "flagUkraine");

    flagMatrix = m4.translation(pxFlag, -0.2, pzFlag);
    flagMatrix = m4.scale(flagMatrix, 0.2, 0.2, 0.2);
    objToDraw.uniforms.u_world = flagMatrix;

    webglUtils.setBuffersAndAttributes(gl, programInfo, objToDraw.bufferInfo);
    webglUtils.setUniforms(programInfo, objToDraw.uniforms);
    webglUtils.drawBufferInfo(gl, objToDraw.bufferInfo);
}


function drawFlagKazakistan(programInfo){
    var objToDraw = getObjToDraw(objectsToDraw, "flagKazakistan");

    flagMatrix = m4.translation(pxFlag, -0.2, pzFlag);
    flagMatrix = m4.scale(flagMatrix, 0.2, 0.2, 0.2);
    objToDraw.uniforms.u_world = flagMatrix;

    webglUtils.setBuffersAndAttributes(gl, programInfo, objToDraw.bufferInfo);
    webglUtils.setUniforms(programInfo, objToDraw.uniforms);
    webglUtils.drawBufferInfo(gl, objToDraw.bufferInfo);
}

function drawEnemiesFlags(programInfo){
    var objToDraw = getObjToDraw(objectsToDraw, "flagE1");

    flagE1Matrix = m4.translation(enFlag1Position[0], enFlag1Position[1], enFlag1Position[2]);
    flagE1Matrix = m4.scale(flagE1Matrix, 0.2, 0.2, 0.2);
    objToDraw.uniforms.u_world = flagE1Matrix;
    
    webglUtils.setBuffersAndAttributes(gl, programInfo, objToDraw.bufferInfo);
    webglUtils.setUniforms(programInfo, objToDraw.uniforms);
    webglUtils.drawBufferInfo(gl, objToDraw.bufferInfo);

    var objToDraw = getObjToDraw(objectsToDraw, "flagE2");

    flagE2Matrix = m4.translation(enFlag2Position[0], enFlag2Position[1], enFlag2Position[2]);
    flagE2Matrix = m4.scale(flagE2Matrix, 0.2, 0.2, 0.2);
    objToDraw.uniforms.u_world = flagE2Matrix;
    
    webglUtils.setBuffersAndAttributes(gl, programInfo, objToDraw.bufferInfo);
    webglUtils.setUniforms(programInfo, objToDraw.uniforms);
    webglUtils.drawBufferInfo(gl, objToDraw.bufferInfo);

    var objToDraw = getObjToDraw(objectsToDraw, "flagE3");

    flagE3Matrix = m4.translation(enFlag3Position[0], enFlag3Position[1], enFlag3Position[2]);
    flagE3Matrix = m4.scale(flagE3Matrix, 0.2, 0.2, 0.2);
    objToDraw.uniforms.u_world = flagE3Matrix;
    
    webglUtils.setBuffersAndAttributes(gl, programInfo, objToDraw.bufferInfo);
    webglUtils.setUniforms(programInfo, objToDraw.uniforms);
    webglUtils.drawBufferInfo(gl, objToDraw.bufferInfo);
}


function drawFloor(programInfo) {
	
	var objToDraw = getObjToDraw(objectsToDraw, "floor");

	let matrix = m4.identity();
	matrix = m4.translate(matrix,0,0,0);
	matrix = m4.scale(matrix,50,50,50);
	objToDraw.uniforms.u_world = matrix;
	
	webglUtils.setBuffersAndAttributes(gl, programInfo, objToDraw.bufferInfo);
	webglUtils.setUniforms(programInfo, objToDraw.uniforms);
	webglUtils.drawBufferInfo(gl, objToDraw.bufferInfo);
}

function drawBuilding(programInfo) {
	
	var objToDraw = getObjToDraw(objectsToDraw, "building");

	let matrix = m4.identity();
	matrix = m4.translate(matrix,buildingPosition[0],buildingPosition[1]-1,buildingPosition[2]);
    matrix = m4.scale(matrix,0.1,0.1,0.1);
	objToDraw.uniforms.u_world = matrix;
	
	webglUtils.setBuffersAndAttributes(gl, programInfo, objToDraw.bufferInfo);
	webglUtils.setUniforms(programInfo, objToDraw.uniforms);
	webglUtils.drawBufferInfo(gl, objToDraw.bufferInfo);

    
}

function drawBuilding2(programInfo) {
	
	var objToDraw = getObjToDraw(objectsToDraw, "building");

	let matrix = m4.identity();
	matrix = m4.translate(matrix,buildingPosition2[0],buildingPosition2[1]-1,buildingPosition2[2]);
    matrix = m4.scale(matrix,0.1,0.1,0.1);
	objToDraw.uniforms.u_world = matrix;

	
	webglUtils.setBuffersAndAttributes(gl, programInfo, objToDraw.bufferInfo);
	webglUtils.setUniforms(programInfo, objToDraw.uniforms);
	webglUtils.drawBufferInfo(gl, objToDraw.bufferInfo);
    
    
}

function drawBase(programInfo){
    var objToDraw = getObjToDraw(objectsToDraw, "gameplan");

    let matrix = m4.identity();
    matrix = m4.translate(matrix,0,-2.3,0);
    matrix = m4.scale(matrix,125,10,125);
    objToDraw.uniforms.u_world = matrix;

    webglUtils.setBuffersAndAttributes(gl, programInfo, objToDraw.bufferInfo);
    webglUtils.setUniforms(programInfo, objToDraw.uniforms);
    webglUtils.drawBufferInfo(gl, objToDraw.bufferInfo);


}

function drawTable(programInfo){
    var objToDraw = getObjToDraw(objectsToDraw, "cube");

    let matrix = m4.identity();
    matrix = m4.translate(matrix,0,-14,0);
    matrix = m4.scale(matrix,500,50,500);
    objToDraw.uniforms.u_world = matrix;

    webglUtils.setBuffersAndAttributes(gl, programInfo, objToDraw.bufferInfo);
    webglUtils.setUniforms(programInfo, objToDraw.uniforms);
    webglUtils.drawBufferInfo(gl, objToDraw.bufferInfo);


}

function drawHouse(programInfo){
    var objToDraw = getObjToDraw(objectsToDraw, "house");

    houseMatrix = m4.identity();
    houseMatrix = m4.translate(houseMatrix,housePosition[0],housePosition[1],housePosition[2]);
    houseMatrix = m4.scale(houseMatrix,10,10,10);
    objToDraw.uniforms.u_world = houseMatrix;

    webglUtils.setBuffersAndAttributes(gl, programInfo, objToDraw.bufferInfo);
    webglUtils.setUniforms(programInfo, objToDraw.uniforms);
    webglUtils.drawBufferInfo(gl, objToDraw.bufferInfo);


}


function drawFoto(programInfo) {
	
	var objToDraw = getObjToDraw(objectsToDraw, "fotomia");
	
	/* per farla in obliquo a mo di cartellone pubblicitario
    let matrix = m4.identity();
	matrix = m4.translate(matrix, housePosition[0], housePosition[1]+11, housePosition[2]-2);
	matrix = m4.xRotate(matrix, degToRad(90));
	matrix = m4.zRotate(matrix, degToRad(180));
	matrix = m4.xRotate(matrix, degToRad(-35));
	matrix = m4.scale(matrix, 2, 1, 2);
	objToDraw.uniforms.u_world = matrix;
    */

    let matrix = m4.identity();
	matrix = m4.translate(matrix, housePosition[0]-7.5, housePosition[1]+4, housePosition[2]-8.3);
	matrix = m4.xRotate(matrix, degToRad(90));
	matrix = m4.zRotate(matrix, degToRad(180));
	matrix = m4.scale(matrix, 1, 1, 1);
	objToDraw.uniforms.u_world = matrix;

	
	webglUtils.setBuffersAndAttributes(gl, programInfo, objToDraw.bufferInfo);
	
	webglUtils.setUniforms(programInfo, objToDraw.uniforms);
	
	webglUtils.drawBufferInfo(gl, objToDraw.bufferInfo);	
	
	/*l'altro lato eventuale del cartellone pubblicitario

    var objToDraw = getObjToDraw(objectsToDraw, "fotomia");
	
    matrix = m4.identity();
	matrix = m4.translate(matrix, housePosition[0], housePosition[1]+11, housePosition[2]+4);
	matrix = m4.xRotate(matrix, degToRad(90));
	matrix = m4.zRotate(matrix, degToRad(180));
    matrix = m4.zRotate(matrix, degToRad(180));
	matrix = m4.xRotate(matrix, degToRad(-35));
	matrix = m4.scale(matrix, 2, 1, 2);
	objToDraw.uniforms.u_world = matrix;
	
	webglUtils.setBuffersAndAttributes(gl, programInfo, objToDraw.bufferInfo);
	
	//webglUtils.setUniforms(programInfo, objToDraw.uniforms);
	
	webglUtils.drawBufferInfo(gl, objToDraw.bufferInfo);	
	*/

}


function drawSkybox(gl, skyboxProgramInfo, view, projection) {
    gl.depthFunc(gl.LEQUAL) //non so perchè è necessario per lo skybox

    const viewMatrix = m4.copy(view);

    // remove translations
    viewMatrix[12] = 0;
    viewMatrix[13] = 0;
    viewMatrix[14] = 0;

    let viewDirectionProjectionMatrix = m4.multiply(projection, viewMatrix)
    let viewDirectionProjectionInverse = m4.inverse(viewDirectionProjectionMatrix)
    gl.useProgram(skyboxProgramInfo.program);
    webglUtils.setBuffersAndAttributes(gl, skyboxProgramInfo, bufferInfo_skybox)
    webglUtils.setUniforms(skyboxProgramInfo, {
        u_viewDirectionProjectionInverse: viewDirectionProjectionInverse,
        u_skybox: texture_skybox,
    })
    webglUtils.drawBufferInfo(gl, bufferInfo_skybox)
}


function drawDebugOriginLight(programInfo){

    var objToDraw = getObjToDraw(objectsToDraw, "cube");

    let matrix = m4.identity();
    matrix = m4.translate(matrix, settings.x_light,settings.y_light, settings.z_light);
    matrix = m4.scale(matrix,10,10,10);
    objToDraw.uniforms.u_world = matrix;

    webglUtils.setBuffersAndAttributes(gl, programInfo, objToDraw.bufferInfo);
    webglUtils.setUniforms(programInfo, objToDraw.uniforms);
    webglUtils.drawBufferInfo(gl, objToDraw.bufferInfo);
}

function drawDebugTargetLight(programInfo){

    var objToDraw = getObjToDraw(objectsToDraw, "cube");

    let matrix = m4.identity();
    matrix = m4.translate(matrix, settings.x_targetlight,settings.y_targetlight, settings.z_targetlight);
    matrix = m4.scale(matrix,10,10,10);
    objToDraw.uniforms.u_world = matrix;

    webglUtils.setBuffersAndAttributes(gl, programInfo, objToDraw.bufferInfo);
    webglUtils.setUniforms(programInfo, objToDraw.uniforms);
    webglUtils.drawBufferInfo(gl, objToDraw.bufferInfo);
}