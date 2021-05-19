import { Component } from '@angular/core';
import {MenuItem} from 'primeng/api';
import {ButtonModule} from 'primeng/button';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'starship-explorer';
  menuItems: MenuItem[] = [];
}
