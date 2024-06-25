import { Component, HostListener } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

import { NavbarComponent } from './navbar/navbar.component';
import { ChatComponent } from './chat/chat.component';
// import { ZealMenuComponent } from './zeal-menu/zeal-menu.component';

// import { ThreeJsComponent } from './three-js/three-js.component';

// import { ChatComponent } from './chat/chat.component';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NavbarComponent,
    // BrowserModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'intern-project';
  showNavbar: boolean = true;

  constructor() {
    this.checkScreenWidth();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenWidth();
  }

  checkScreenWidth() {
    this.showNavbar = window.innerWidth >= 768;
  }
}
