import {Component, Input, OnInit} from '@angular/core';
import {Starship} from '../services/starship.service';

/**
 * Display high-level summary information about a starship.
 */
@Component({
  selector: 'app-starship-summary',
  templateUrl: './starship-summary.component.html',
  styleUrls: ['./starship-summary.component.scss']
})
export class StarshipSummaryComponent implements OnInit {

  /**
   * The starship we want to display summary information about.
   */
  @Input()
  starship?: Starship;

  /**
   * Set to true if we should be rendering a modal with details about the starship.
   */
  showDetail = false;

  constructor() { }

  ngOnInit(): void {
  }
}
