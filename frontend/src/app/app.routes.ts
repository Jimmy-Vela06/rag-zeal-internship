import { Routes } from '@angular/router';

import { ZealComponent } from './zeal/zeal.component';
import { RagComponent } from './rag/rag.component';

// import { HomeComponent } from './home/home.component';

// import { TipCalculatorComponent } from './tip-calculator/tip-calculator.component';
// import { GroceryListComponent } from './grocery-list/grocery-list.component';
// import { GameComponent } from './game/game.component';
// import { WeatherComponent } from './weather/weather.component';

export const routes: Routes = [
  { path: 'zeal', title: 'zeal', component: ZealComponent },
  {
    path: 'rag',
    title: 'rag',
    component: RagComponent,
  },
];
