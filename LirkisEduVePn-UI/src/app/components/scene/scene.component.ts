// @ts-ignore

import {Component, AfterViewInit, ElementRef, ViewChild} from '@angular/core';
// import 'aframe';
import 'aframe-environment-component';
import 'aframe-physics-extras';
import 'aframe-extras';
import 'aframe-event-set-component';
import 'super-hands';

import './js/components/toggleInfo.component.js';
import './js/components/clkMultiEventHandler.component.js';
import './js/components/clkSingleEventHandler.component.js';
import './js/components/collisionDetectorEventHandler.component.js';
import './js/components/petriNetSim.component.js';


@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.css']
})
export class SceneComponent  {
  // items = [
  //   { id: 'museum', uri: '../assets/3dModels/museum_final.glb' },
  //   { id: 'navmesh', uri: '../assets/3dModels/navMesh.glb' },
  //   { id: 'coin', uri: '../assets/3dModels/coin.glb'},
  //   { id: 'svMartin', uri: '../assets/3dModels/svMartin.glb' },
  //   { id: 'blava', uri: '../assets/3dModels/blava.glb' },
  //   { id: 'crown', uri: '../assets/3dModels/crown.glb'},
  //   { id: 'cup', uri: '../assets/3dModels/cup.glb' },
  //   { id: 'apple_coat', uri: '../assets/3dModels/apple_coat.glb' },
  //   { id: 'sword', uri: '../assets/3dModels/sword.glb'},
  //   { id: 'mace', uri: '../assets/3dModels/mace.glb' },
  //   { id: 'book', uri: '../assets/3dModels/book.glb'}
  // ];

  // assetsLoaded = false;
  //
  // onAssetsLoaded() {
  //   this.assetsLoaded = true;
  // }


}
