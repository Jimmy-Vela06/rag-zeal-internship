import {
  Component,
  ElementRef,
  OnInit,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import * as THREE from 'three';

import { ChatComponent } from '../chat/chat.component';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

@Component({
  selector: 'app-zeal',
  standalone: true,
  imports: [CommonModule, ChatComponent],
  templateUrl: './zeal.component.html',
  styleUrl: './zeal.component.css',
})
export class ZealComponent implements OnInit, AfterViewInit {
  @ViewChild('container', { static: true }) containerRef!: ElementRef;
  private model: THREE.Group | null = null;
  private isInteracting: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initThreeJs();
    this.setupEventListeners();
  }

  private initThreeJs(): void {
    const container = this.containerRef.nativeElement;

    const scene = new THREE.Scene();
    scene.background = null;

    const fov = 20;
    const aspect = 1;
    const near = 0.1;
    const far = 1000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 1, 5);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(300, 300);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5).normalize();
    scene.add(directionalLight);

    // Load the glTF model (scene.gltf)
    const loader = new GLTFLoader();
    loader.load(
      'assets/model/scene.gltf',
      (gltf) => {
        gltf.scene.scale.set(2, 2, 2);
        gltf.scene.position.y += 1;
        scene.add(gltf.scene);
        this.model = gltf.scene;
        console.log('Model loaded:', gltf.scene);
      },
      undefined,
      (error) => {
        console.error('Error loading GLTF model:', error);
      }
    );

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.target.set(0, 1, 0);
    controls.update();

    const animate = () => {
      requestAnimationFrame(animate);

      if (this.model && !this.isInteracting) {
        const time = Date.now() * 0.001;
        this.model.rotation.z = Math.sin(time) * 0.5;
        this.model.position.x = Math.sin(time) * 0.2;
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate();
  }

  private setupEventListeners(): void {
    const stopInteraction = this.stopInteraction.bind(this);
    document.addEventListener('mousedown', stopInteraction);
    document.addEventListener('keydown', stopInteraction);
    document.addEventListener('mouseup', stopInteraction);
    document.addEventListener('keyup', stopInteraction);
  }

  private stopInteraction(event: MouseEvent | KeyboardEvent): void {
    this.isInteracting = true;

    if (this.model) {
      this.model.position.set(0, 1, 0);
      this.model.rotation.set(0, 0, 0);
    }
  }
}
