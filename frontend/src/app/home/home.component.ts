import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faShip } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'home',
  standalone: true,
  imports: [FontAwesomeModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  faShip = faShip;
}
