
export class Axe {
      constructor(){
      }
     makeAxes(){
         let groupe = new THREE.Object3D();
         let geometryY = new THREE.CylinderGeometry( 0.3, 0.3, 500, 10 );
         let materialY = new THREE.MeshBasicMaterial( {color: 0x00FF00} );
         let cylinderY = new THREE.Mesh( geometryY, materialY );
         cylinderY.name = "axeY";
         cylinderY.position.y = 250;
         groupe.add(cylinderY);
         return groupe;
     }
}
