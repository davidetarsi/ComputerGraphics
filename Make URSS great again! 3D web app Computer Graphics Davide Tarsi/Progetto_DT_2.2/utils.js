//---------------------------UTILITIES MATEMATICHE------------------------------------//


function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function degToRad(d) {
	return d * Math.PI / 180;
}

function radToDeg(r) {
	return r * 180 / Math.PI;
}

function isPowerOf2(value) {
		return (value & (value - 1)) === 0;
}

//---------------------FUNCTIONS TO LOAD .OBJ FILES---------------------------------//


var webglVertexData = [
	    [],   // positions
	    [],   // texcoords
	    [],   // normals
];

function getObjToDraw(objsToDraw, name){

	return objsToDraw.find(x => x.name === name);
}

function loadDoc(url) {
	var xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {
		
		if (xhttp.readyState == 4) {
			parseOBJ(xhttp.responseText);
	   }
	};
	xhttp.open("GET", url, false);
	xhttp.send(null);
}

function parseOBJ(text) {

	webglVertexData = [
	    [],   // positions
	    [],   // texcoords
	    [],   // normals
	];
	
	const objPositions = [[0, 0, 0]];
  	const objTexcoords = [[0, 0]];
  	const objNormals = [[0, 0, 0]];
 
	const objVertexData = [
	    objPositions,
	    objTexcoords,
	    objNormals,
	  ];

	  // same order as `f` indices

	  //f 1/2/3 -> 1 2 3
	function addVertex(vert) {
		const ptn = vert.split('/');
		ptn.forEach((objIndexStr, i) => {
		  if (!objIndexStr) {
		    return;
		  }
		  const objIndex = parseInt(objIndexStr);
		  const index = objIndex + (objIndex >= 0 ? 0 : objVertexData[i].length);
		  //webglVertexData pubblica
		  //console.log(i);
		  webglVertexData[i].push(...objVertexData[i][index]);
		});
	}

	const keywords = {
	    v(parts) {
	      objPositions.push(parts.map(parseFloat));
	    },
	    vn(parts) {
	      objNormals.push(parts.map(parseFloat));
	    },
	    vt(parts) {
	      // should check for missing v and extra w?
	      objTexcoords.push(parts.map(parseFloat));
	    },
	    f(parts) {
	      const numTriangles = parts.length - 2;
	      for (let tri = 0; tri < numTriangles; ++tri) {
	        addVertex(parts[0]);
	        addVertex(parts[tri + 1]);
	        addVertex(parts[tri + 2]);
	      }
	    },
	  };

	//	\w* = almeno una lettere o un numero
	// ?:x = meccia gli spazi singoli bianchi (anche più di uno)
	// . = classi di caratteri, meccia ogni singolo carattere tranne i terminatori di linea
	const keywordRE = /(\w*)(?: )*(.*)/;
	const lines = text.split('\n');
	//let identifica una variabile in un determinato blocco di codice
	for (let lineNo = 0; lineNo < lines.length; ++lineNo) {
	const line = lines[lineNo].trim();
	if (line === '' || line.startsWith('#')) {
		//la riga è vuota o è un commento
	  continue;
	}
	//ritorna la stringa 
	const m = keywordRE.exec(line);
	//console.log(m);
	if (!m) {
	  continue;
	}
	const [, keyword, unparsedArgs] = m;
	const parts = line.split(/\s+/).slice(1);
	const handler = keywords[keyword];
	//console.log(parts);
	if (!handler) {
	  //console.warn('unhandled keyword:', keyword, 'at line', lineNo + 1);
	  continue;
	}

	handler(parts, unparsedArgs); //gestisce gli argomenti che non hai gestito
	}

}

//----------------FUNZIONE PER CARICARE LE TEXTURE TUTTE INSIEME----------------------//

var textures = [];

function loadTextures() {

	textures[0] = loadTextureFromImg("resources/textures/tank.jpg");
	textures[1] = loadTextureFromImg("resources/textures/ukraine.jpg");
	textures[2] = loadTextureFromImg("resources/textures/map2.jpg");
	textures[3] = loadTextureFromImg("resources/textures/belarus.jpg");
	textures[4] = loadTextureFromImg("resources/textures/kazakistan.jpg");
	textures[5] = loadTextureFromImg("resources/textures/usa.jpg");
	textures[6] = loadTextureFromImg("resources/textures/germany.jpg");
	textures[7] = loadTextureFromImg("resources/textures/poland.jpg");
	textures[8] = loadTextureFromImg("resources/textures/rovere-scuro.jpg");
	textures[9] = loadTextureFromImg("resources/textures/wall2.jpg");
	textures[10] = loadTextureFromImg("resources/textures/fotomia4.jpeg");
}
//using a URL, an image is loaded and associated to a texture

function loadTextureFromImg(imageSrc) {
    var texture = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, texture);
	 
	// Fill the texture with a 1x1 blue pixel.
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
				  new Uint8Array([0, 0, 0, 255]));

	// Asynchronously load an image
	var textureImage = new Image();
	textureImage.src = imageSrc;
	textureImage.addEventListener('load', function() {
		  // Now that the image has loaded make copy it to the texture.
		  gl.bindTexture(gl.TEXTURE_2D, texture);
		  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, textureImage);
		  
		  // Check if the image is a power of 2 in both dimensions.
		  if (isPowerOf2(textureImage.width) && isPowerOf2(textureImage.height)) {
			 // Yes, it's a power of 2. Generate mips.
			 gl.generateMipmap(gl.TEXTURE_2D);
			 gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST	);
		  } else {
			 // No, it's not a power of 2. Turn off mips and set wrapping to clamp to edge
			 gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);	//tell WebGL to not repeat the texture in S direction
			 gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);	//tell WebGL to not repeat the texture in T direction
			 gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
			 gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
			
		  } 
	});
	return texture;
}

//------------------------FUNZIONE PER CREARE LE TEXTURE PER LE LUCI---------------------//
//------------------------E IL DEPTHBUFFER-----------------------------------------------//
var depthFramebuffer;
var depthTextureSize ;
var depthTexture;
var unusedTexture;

function createLightsTexture(){

	depthTexture = gl.createTexture();
	depthTextureSize = 512;

	gl.bindTexture(gl.TEXTURE_2D, depthTexture);
	gl.texImage2D(
		gl.TEXTURE_2D,
		0, 
		gl.DEPTH_COMPONENT,
		depthTextureSize,
		depthTextureSize,
		0,
		gl.DEPTH_COMPONENT,
		gl.UNSIGNED_INT,
		null);   
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

	//create depthBuffer
	depthFramebuffer = gl.createFramebuffer();
	gl.bindFramebuffer(gl.FRAMEBUFFER, depthFramebuffer);
	// attach depthTexture to the depthFramebuffer
	gl.framebufferTexture2D(
		gl.FRAMEBUFFER, 
		gl.DEPTH_ATTACHMENT, 
		gl.TEXTURE_2D, 
		depthTexture, 
		0);        


	// create a color texture "unusedTexture" of the same size as the depth texture (need for some browser such as Safari)
	unusedTexture = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, unusedTexture);
	gl.texImage2D(
		gl.TEXTURE_2D, 
		0, 
		gl.RGBA, 
		depthTextureSize, 
		depthTextureSize, 
		0, 
		gl.RGBA, 
		gl.UNSIGNED_BYTE, 
		null);
  
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

	// attach the "unusedTexture" to the depthFramebuffer
	gl.framebufferTexture2D(
		gl.FRAMEBUFFER, 
		gl.COLOR_ATTACHMENT0, 
		gl.TEXTURE_2D, 
		unusedTexture, 
		0); 
}

function loadSkyboxTexture() {
    const texture = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture)

	const faceInfos = [{target: gl.TEXTURE_CUBE_MAP_POSITIVE_X, url: "resources/textures/sky4.png",},
	{target: gl.TEXTURE_CUBE_MAP_NEGATIVE_X, url: "resources/textures/sky4.png",},
	{target: gl.TEXTURE_CUBE_MAP_POSITIVE_Y, url: "resources/textures/sky4.png",},
	{target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, url: "resources/textures/sky4.png",},
	{target: gl.TEXTURE_CUBE_MAP_POSITIVE_Z, url: "resources/textures/sky4.png",},
	{target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, url: "resources/textures/sky4.png",},
	];

    faceInfos.forEach((faceInfo) => {
        const {target, url} = faceInfo;

        // Upload the canvas to the cubemap face.
        const level = 0;
        const internalFormat = gl.RGBA;
        const width = 1024;
        const height = 1024;
        const format = gl.RGBA;
        const type = gl.UNSIGNED_BYTE;

        // setup each face so it's immediately renderable
        gl.texImage2D(target, level, internalFormat, width, height, 0, format, type, null);

        // Asynchronously load an image
        const image = new Image();
        image.src = url;
        image.addEventListener('load', function() {
            // Now that the image has loaded make copy it to the texture.
            gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
            gl.texImage2D(target, level, internalFormat, format, type, image);
            gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
        });
    });


    gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);

    return texture
}

