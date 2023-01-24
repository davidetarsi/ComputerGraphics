
var objectsToDraw = [];

function setObjsToDraw() {
	objectsToDraw = [
        {
            name: "tank",
            bufferInfo: bufferInfoTank,
            uniforms: {
                u_colorMult: [1, 1, 1, 0.95],
                u_texture: textures[0],
                u_world: m4.identity(),
            },
        },
        {
            name: "flagUkraine",
            bufferInfo: bufferInfoFlagU,
            uniforms: {
                u_colorMult: [1, 1, 1, 1],
                u_texture: textures[1],
                u_world: m4.identity()
            },
        },
        {
            name: "flagBelarus",
            bufferInfo: bufferInfoFlagB,
            uniforms: {
                u_colorMult: [1, 1, 1, 1],
                u_texture: textures[3],
                u_world: m4.identity()
            },
        },
        {
            name: "flagKazakistan",
            bufferInfo: bufferInfoFlagK,
            uniforms: {
                u_colorMult: [1, 1, 1, 1],
                u_texture: textures[4],
                u_world: m4.identity()
            },
        },
        {
            name: "flagE1",
            bufferInfo: bufferInfoFlagE1,
            uniforms: {
                u_colorMult: [1, 1, 1, 1],
                u_texture: textures[5],
                u_world: m4.identity()
            },
        },
        {
            name: "flagE2",
            bufferInfo: bufferInfoFlagE2,
            uniforms: {
                u_colorMult: [1, 1, 1, 1],
                u_texture: textures[6],
                u_world: m4.identity()
            },
        },
        {
            name: "flagE3",
            bufferInfo: bufferInfoFlagE3,
            uniforms: {
                u_colorMult: [1, 1, 1, 1],
                u_texture: textures[7],
                u_world: m4.identity()
            },
        },
        {
            name: "debugOriginLight",
            bufferInfo: bufferInfoCube,
            uniforms: {
                u_colorMult: [0.5, 0.5, 1, 1],
                u_texture: textures[1],
                u_world: m4.identity(),
            }
        },
        {
			name: "floor",
			bufferInfo: bufferInfoFloor,
			uniforms: {
                u_colorMult: [0.7, 0.7, 0.7, 1],
				u_texture: textures[2],
				u_world: m4.identity(),
			},
		},
        {
			name: "building",
			bufferInfo: bufferInfoBuilding,
			uniforms: {
                u_colorMult: [0.7, 0.7, 0.7, 1],
				u_texture: textures[9],
				u_world: m4.identity(),
			},
		},
        {
			name: "building2",
			bufferInfo: bufferInfoBuilding2,
			uniforms: {
                u_colorMult: [0.7, 0.7, 0.7, 1],
				u_texture: textures[9],
				u_world: m4.identity(),
			},
		},
        {
			name: "cube",
			bufferInfo: bufferInfoGameplan,
			uniforms: {
                u_colorMult: [0.5, 0.5, 0.5, 1],
				u_texture: textures[8],
				u_world: m4.identity(),
			},
		},
        {
            name: "gameplan",
            bufferInfo: bufferInfoGameplan,
            uniforms: {
                u_colorMult: [0.7, 0.7, 0.7, 1],
                u_texture: textures[2],
                u_world: m4.identity()
            },
        },
        {
            name: "house",
            bufferInfo: bufferInfoHouse,
            uniforms: {
                u_colorMult: [0.3, 0.3, 0.3, 1],
                u_texture: textures[9],
                u_world: m4.identity()
            },
        },
        {
            name: "parallelogram",
            bufferInfo: bufferInfoGameplan,
            uniforms: {
                u_colorMult: [0.8, 0.8, 0.8, 1],
                u_texture: textures[10],
                u_world: m4.identity()
            },
        },
        {
            name: "fotomia",
            bufferInfo: bufferInfoFloor,
            uniforms: {
                u_colorMult: [0.7, 0.7, 0.7, 1],
                u_texture: textures[10],
                u_world: m4.identity()
            },
        }
    ];
}

var bufferInfoTank;
var bufferInfoFlagU;
var bufferInfoFlagB;
var bufferInfoFlagK;
var bufferInfoFloor;
var bufferInfoFlagE1;
var bufferInfoFlagE2;
var bufferInfoFlagE3;
var bufferInfoBuilding;
var bufferInfoBuilding2;
var bufferInfoCube;
var bufferInfoGameplan;
var bufferInfoHouse;
var bufferInfo_foto;
var bufferInfoDebug;

function loadAllModels(gl) {
    
    {   //loadfloor
		const S = 2.5; 		
		const H = 0; 

		const textureCoords = [ 0,0, 1,0, 0,1, 1,1,];

		const arrays_floor = {
		   position: 	{ numComponents: 3, data: [-S,H,-S, S,H,-S, -S,H,S,  S,H,S, ], },
		   texcoord: 	{ numComponents: 2, data: textureCoords, },
		   indices: 	{ numComponents: 3, data: [0,2,1, 	2,3,1,], },
		   normal:		{numComponents: 3, data: [0,1,0,	0,1,0,	0,1,0,	0,1,0,], },
		};

		bufferInfoFloor = webglUtils.createBufferInfoFromArrays(gl, arrays_floor);
	}

    //load sky 

    texture_skybox = loadSkyboxTexture()
    let pos = 5;
    bufferInfo_skybox = webglUtils.createBufferInfoFromArrays(gl, {
       position: {
           data: new Float32Array([
               -pos, -pos, // bottom-left triangle
                pos, -pos,
               -pos,  pos,
               -pos,  pos, // top-right triangle
                pos, -pos,
                pos,  pos,
           ]),
           numComponents: 2,
       },
   });
   

    //load tank
    loadDoc('resources/obj/carro3.obj');
    const tank_array = {
        position: {numComponents: 3, data:webglVertexData[0],},
        texcoord: {numComponents: 2, data:webglVertexData[1],},
        normal: {numComponents: 3, data:webglVertexData[2],},
         }
    bufferInfoTank = webglUtils.createBufferInfoFromArrays(gl, tank_array);
    
    
    //load Ukraine flag
    
    loadDoc('resources/obj/bandiera.obj');
    const flagU_array = {
    position: {numComponents: 3, data:webglVertexData[0],},
    texcoord: {numComponents: 2, data:webglVertexData[1],},
    normal: {numComponents: 3, data:webglVertexData[2],},
    }
    bufferInfoFlagU = webglUtils.createBufferInfoFromArrays(gl, flagU_array);

    //load Belarus flag
    
    loadDoc('resources/obj/bandiera.obj');
    const flagB_array = {
    position: {numComponents: 3, data:webglVertexData[0],},
    texcoord: {numComponents: 2, data:webglVertexData[1],},
    normal: {numComponents: 3, data:webglVertexData[2],},
    }
    bufferInfoFlagB = webglUtils.createBufferInfoFromArrays(gl, flagB_array);


    //load Kazakistan flag
    
    loadDoc('resources/obj/bandiera.obj');
    const flagK_array = {
    position: {numComponents: 3, data:webglVertexData[0],},
    texcoord: {numComponents: 2, data:webglVertexData[1],},
    normal: {numComponents: 3, data:webglVertexData[2],},
    }
    bufferInfoFlagK = webglUtils.createBufferInfoFromArrays(gl, flagK_array);

    //load Enemy 1 flag
    
    loadDoc('resources/obj/bandiera.obj');
    const flagE1_array = {
    position: {numComponents: 3, data:webglVertexData[0],},
    texcoord: {numComponents: 2, data:webglVertexData[1],},
    normal: {numComponents: 3, data:webglVertexData[2],},
    }
    bufferInfoFlagE1 = webglUtils.createBufferInfoFromArrays(gl, flagE1_array);
    
    //load Enemy 2 flag
    
    loadDoc('resources/obj/bandiera.obj');
    const flagE2_array = {
    position: {numComponents: 3, data:webglVertexData[0],},
    texcoord: {numComponents: 2, data:webglVertexData[1],},
    normal: {numComponents: 3, data:webglVertexData[2],},
    }
    bufferInfoFlagE2 = webglUtils.createBufferInfoFromArrays(gl, flagE2_array);
    
    //load Enemy 3 flag
    
    loadDoc('resources/obj/bandiera.obj');
    const flagE3_array = {
    position: {numComponents: 3, data:webglVertexData[0],},
    texcoord: {numComponents: 2, data:webglVertexData[1],},
    normal: {numComponents: 3, data:webglVertexData[2],},
    }
    bufferInfoFlagE3 = webglUtils.createBufferInfoFromArrays(gl, flagE3_array);
    
    //load building

    loadDoc('resources/obj/building.obj');
    const building_array = {
    position: {numComponents: 3, data:webglVertexData[0],},
    texcoord: {numComponents: 2, data:webglVertexData[1],},
    normal: {numComponents: 3, data:webglVertexData[2],},
    }
    bufferInfoBuilding = webglUtils.createBufferInfoFromArrays(gl, building_array);
    

    //load building

    loadDoc('resources/obj/building3.obj');
    const building2_array = {
    position: {numComponents: 3, data:webglVertexData[0],},
    texcoord: {numComponents: 2, data:webglVertexData[1],},
    normal: {numComponents: 3, data:webglVertexData[2],},
    }
    bufferInfoBuilding2 = webglUtils.createBufferInfoFromArrays(gl, building2_array);
    

    //load cube and parallelogram

    loadDoc('resources/obj/cube.obj');
    const cube_array = {
    position: {numComponents: 3, data:webglVertexData[0],},
    texcoord: {numComponents: 2, data:webglVertexData[1],},
    normal: {numComponents: 3, data:webglVertexData[2],},
    }
    bufferInfoCube = webglUtils.createBufferInfoFromArrays(gl, cube_array);

    loadDoc('resources/obj/gameplan.obj');
    const gameplan_array = {
    position: {numComponents: 3, data:webglVertexData[0],},
    texcoord: {numComponents: 2, data:webglVertexData[1],},
    normal: {numComponents: 3, data:webglVertexData[2],},
    }
    bufferInfoGameplan = webglUtils.createBufferInfoFromArrays(gl, gameplan_array);

    loadDoc('resources/obj/house2.obj');

    const house_array = {
    position: {numComponents: 3, data:webglVertexData[0],},
    texcoord: {numComponents: 2, data:webglVertexData[1],},
    normal: {numComponents: 3, data:webglVertexData[2],},
    }
    bufferInfoHouse = webglUtils.createBufferInfoFromArrays(gl, house_array);

    //load parallelogram with photo
   

    /*load debug model

    loadDoc('resources/obj/bodyMesh.obj');
    const debug_array = {
    position: {numComponents: 3, data:webglVertexData[0],},
    texcoord: {numComponents: 2, data:webglVertexData[1],},
    normal: {numComponents: 3, data:webglVertexData[2],},
    }
 
   bufferInfoDebug = webglUtils.createBufferInfoFromArrays(gl, debug_array);
    */
}

