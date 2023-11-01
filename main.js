import './css/main.css'
import './css/main.sass'
import * as THREE from'three';
import gsap from './node_modules/gsap';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { HDRCubeTextureLoader } from 'three/addons/loaders/HDRCubeTextureLoader.js';
import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader.js';

     // Set up the scene, camera, and renderer
     const scene = new THREE.Scene();
     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
     const renderer = new THREE.WebGLRenderer();
     renderer.setSize(window.innerWidth, window.innerHeight);
     const sceneContainer = document.getElementById('scene-container');
     sceneContainer.appendChild(renderer.domElement);

     // Create a rotating cube
     const geometry = new THREE.BoxGeometry();
     const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
     const cube = new THREE.Mesh(geometry, material);
     scene.add(cube);

     camera.position.z = 5;

     let isRotating = true;
     let clickCount = 0;
     let hiddenDivVisible = false;

     // Toggle rotation function
     const toggleRotation = () => {
         isRotating = !isRotating;
     };

     // Handle button click to toggle rotation and hide canvas
     const button = document.getElementById('control-button');
     button.addEventListener('click', () => {
         toggleRotation();
         clickCount++;
         if (clickCount === 3) {
             // Apply transition effect by reducing opacity
             sceneContainer.style.opacity = 0;
             // Show the "Show Canvas" button
             document.getElementById('show-canvas-button').style.display = 'block';
             // Toggle hidden div visibility
             if (hiddenDivVisible) {
                 document.getElementById('hidden-div').style.display = 'none';
                 hiddenDivVisible = false;
             } else {
                 document.getElementById('hidden-div').style.display = 'grid';
                 hiddenDivVisible = true;
             }
         }
     });

     // Handle "Show Canvas" button click to transition back to the canvas
     const showCanvasButton = document.getElementById('show-canvas-button');
     showCanvasButton.addEventListener('click', () => {
         // Show the canvas by increasing opacity with a delay
         sceneContainer.style.opacity = 1;
         // Hide the "Show Canvas" button
         showCanvasButton.style.display = 'none';
         // Toggle hidden div visibility
         if (hiddenDivVisible) {
             document.getElementById('hidden-div').style.display = 'none';
             hiddenDivVisible = false;
         } else {
             document.getElementById('hidden-div').style.display = 'block';
             hiddenDivVisible = true;
         }
         // Restart the rotation animation
         isRotating = true;
         // Reset the clickCount to enable further transitions
         clickCount = 0;
     });

     // Handle window resize
     window.addEventListener('resize', () => {
         const newWidth = window.innerWidth;
         const newHeight = window.innerHeight;
         camera.aspect = newWidth / newHeight;
         camera.updateProjectionMatrix();
         renderer.setSize(newWidth, newHeight);
     });

     // Animation function
     const animate = () => {
         requestAnimationFrame(animate);

         if (isRotating) {
             cube.rotation.x += 0.01;
             cube.rotation.y += 0.01;
         }

         renderer.render(scene, camera);
     };

     animate();