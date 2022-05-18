import {pathToLink} from "./Version";

const textureoS = THREE.ImageUtils.loadTexture(`${pathToLink}assets/img/os2.png`);
textureoS.wrapS = textureoS.wrapT =  THREE.MirroredRepeatWrapping;
textureoS.repeat.set(0.02,0.02);
textureoS.offset.y = -2.48;

const texture = THREE.ImageUtils.loadTexture(`${pathToLink}assets/img/os.jpg`);
texture.wrapS = texture.wrapT =  THREE.MirroredRepeatWrapping;
texture.repeat.set(0.02,0.02);
texture.offset.y = -2.48;

export const mlib = {
    "TextureTibia": 	new THREE.MeshPhongMaterial( { color: 0xFFFFFF, map: textureoS, combine: THREE.MixOperation, reflectivity: 0.3 , flatShading: false ,transparent: true } ),
    "TextureTalaire": 	new THREE.MeshPhongMaterial( { color: 0xFFFFFF, map: textureoS, combine: THREE.MixOperation, reflectivity: 0.3 , flatShading: false ,transparent: true } ),
    "TextureFibula": 	new THREE.MeshPhongMaterial( { color: 0xFFFFFF, map: textureoS, combine: THREE.MixOperation, reflectivity: 0.3 , flatShading: false ,transparent: true } ),
    "Texture2": new THREE.MeshPhongMaterial( { color: 0xFFFFFF, map: texture, combine: THREE.MixOperation, reflectivity: 0.3, flatShading: false } ),
    "Orange": 	new THREE.MeshLambertMaterial( { color: 0xff6600, combine: THREE.MixOperation, reflectivity: 0.3 } ),
    "Blue": 	new THREE.MeshLambertMaterial( { color: 0x001133, combine: THREE.MixOperation, reflectivity: 0.3 } ),
    "Red": 		new THREE.MeshLambertMaterial( { color: 0x660000, combine: THREE.MixOperation, reflectivity: 0.25 } ),
    "Black": 	new THREE.MeshLambertMaterial( { color: 0x000000, combine: THREE.MixOperation, reflectivity: 0.15 } ),
    "White":	new THREE.MeshPhongMaterial( { color: 0xffffff, combine: THREE.MixOperation, reflectivity: 0.25 , flatShading: false , transparent: true} ),
    "White2":	new THREE.MeshLambertMaterial( { color: 0xffffff, combine: THREE.MixOperation, reflectivity: 0.25 , flatShading: false} ),
    "Carmine": 	new THREE.MeshPhongMaterial( { color: 0x770000, specular:0xffaaaa, combine: THREE.MultiplyOperation } ),
    "Gold": 	new THREE.MeshPhongMaterial( { color: 0xaa9944, specular:0xbbaa99, shininess:50,  combine: THREE.MultiplyOperation } ),
    "Bronze":	new THREE.MeshPhongMaterial( { color: 0x150505, specular:0xee6600, shininess:10,  combine: THREE.MixOperation, reflectivity: 0.25 } ),
    "Chrome": 	new THREE.MeshPhongMaterial( { color: 0xffffff, specular:0xffffff, combine: THREE.MultiplyOperation } ),
    "Orangemetal": new THREE.MeshLambertMaterial( { color: 0xff6600, combine: THREE.MultiplyOperation } ),
    "Bluemetal": 	new THREE.MeshLambertMaterial( { color: 0x001133, combine: THREE.MultiplyOperation } ),
    "Redmetal": 	new THREE.MeshLambertMaterial( { color: 0x770000, combine: THREE.MultiplyOperation } ),
    "Greenmetal": 	new THREE.MeshLambertMaterial( { color: 0x007711, combine: THREE.MultiplyOperation } ),
    "Blackmetal":	new THREE.MeshLambertMaterial( { color: 0x222222, combine: THREE.MultiplyOperation } ),
    "Purechrome": 	new THREE.MeshLambertMaterial( { color: 0xffffff} ),
    "Darkchrome":	new THREE.MeshLambertMaterial( { color: 0x444444} ),
    "Darkerchrome":new THREE.MeshLambertMaterial( { color: 0x222222} ),
    "Darckchrome2": 	new THREE.MeshPhongMaterial( { color: 0x444444, specular:0xbbaa99, shininess:10,  combine: THREE.MultiplyOperation } ),
    "Blackglass": 	new THREE.MeshLambertMaterial( { color: 0x101016, opacity: 0.975, transparent: true } ),
    "Darkglass":	new THREE.MeshLambertMaterial( { color: 0x101046, opacity: 0.25, transparent: true } ),
    "Blueglass":	new THREE.MeshLambertMaterial( { color: 0x668899, opacity: 1, transparent: true } ),
    "Redglass":	new THREE.MeshLambertMaterial( { color: 0xff0000, opacity: 0.75, transparent: true } ),
    "Yellowglass":	new THREE.MeshLambertMaterial( { color: 0xffffaa, opacity: 0.75, transparent: true } ),
    "Orangeglass":	new THREE.MeshLambertMaterial( { color: 0x995500, opacity: 0.75, transparent: true } ),
    "Orangeglass 50":	new THREE.MeshLambertMaterial( { color: 0xffbb00, opacity: 0.5, transparent: true } ),
    "Redglass 50": 	new THREE.MeshLambertMaterial( { color: 0xff0000, opacity: 0.5, transparent: true } ),
    "Fullblackrough":	new THREE.MeshLambertMaterial( { color: 0x000000 } ),
    "Blackrough":		new THREE.MeshLambertMaterial( { color: 0x050505 } ),
    "Darkgrayrough":	new THREE.MeshLambertMaterial( { color: 0x090909 } ),
    "Redrough":		new THREE.MeshLambertMaterial( { color: 0x330500 } ),
    "Darkgrayshiny":	new THREE.MeshPhongMaterial( { color: 0x000000, specular: 0x050505 } ),
    "Grayshiny":		new THREE.MeshPhongMaterial( { color: 0x050505, shininess: 20 } )
};
