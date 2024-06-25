import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-zeal-menu',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './zeal-menu.component.html',
  styleUrls: ['./zeal-menu.component.css'], // Use styleUrls instead of styleUrl
})
export class ZealMenuComponent implements AfterViewInit {
  isMenuOpen: boolean = false;
  menuPosition: { [key: string]: string } = {};

  @ViewChild('menuButton') menuButton!: ElementRef;

  ngAfterViewInit() {
    // Ensure menuButton is initialized after view has been initialized
    if (this.isMenuOpen && this.menuButton) {
      const buttonRect = this.menuButton.nativeElement.getBoundingClientRect();
      const menuWidth = 900; // Adjust as needed
      const menuHeight = 100; // Adjust as needed
      // Adjusting the top position to move the menu higher by subtracting menuHeight from buttonRect.top
      this.menuPosition = {
        top: `${buttonRect.top - buttonRect.height - menuHeight}px`,
        left: `${buttonRect.left - (menuWidth - buttonRect.width) / 2}px`,
      };
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen && this.menuButton) {
      const buttonRect = this.menuButton.nativeElement.getBoundingClientRect();
      const menuWidth = 180; // Adjust as needed
      const menuHeight = 220; // Adjust as needed
      // Adjusting the top position to move the menu higher by subtracting menuHeight from buttonRect.top
      this.menuPosition = {
        top: `${buttonRect.top - buttonRect.height - menuHeight}px`,
        left: `${buttonRect.left - (menuWidth - buttonRect.width) / 2}px`,
      };
    }
  }
}
