import {Component, Input, OnInit} from '@angular/core';
import {Starship} from '../services/starship.service';

@Component({
  selector: 'app-starship-details',
  templateUrl: './starship-details.component.html',
  styleUrls: ['./starship-details.component.scss']
})
export class StarshipDetailsComponent implements OnInit {

  @Input()
  starship?: Starship;

  constructor() { }

  ngOnInit(): void {
  }

  icon(model: string): string {
    // an example, this can be beefed up a lot to be configurable.
    switch (model){
      case 'YT-1300 light freighter':
        return '/assets/ship-icons/falcon.png';
      case 'DS-1 Orbital Battle Station':
        return '/assets/ship-icons/deathstar.png';
    }
    return '';
  }
}
