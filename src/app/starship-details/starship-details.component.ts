import {Component, Input, OnInit} from '@angular/core';
import {Starship} from '../services/starship.service';

/**
 * A component that will show many details about a starship.
 */
@Component({
  selector: 'app-starship-details',
  templateUrl: './starship-details.component.html',
  styleUrls: ['./starship-details.component.scss']
})
export class StarshipDetailsComponent implements OnInit {

  /**
   * The starship we want to display the details about.
   */
  @Input()
  starship?: Starship;

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * If available it will find an icon of the given ship model.  Defaults to '' if no icon could be found.
   * @param model the model of the ship we want to retrieve the icon for.
   */
  icon(model: string): string {
    if (model) {
      switch (model) {
        case 'YT-1300 light freighter':
          return '/assets/ship-icons/falcon.png';
        case 'DS-1 Orbital Battle Station':
          return '/assets/ship-icons/deathstar.png';
      }
    }
    return '';
  }
}
