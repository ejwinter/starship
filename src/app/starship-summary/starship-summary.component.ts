import {Component, Input, OnInit} from '@angular/core';
import {Starship} from '../services/starship.service';

@Component({
  selector: 'app-starship-summary',
  templateUrl: './starship-summary.component.html',
  styleUrls: ['./starship-summary.component.scss']
})
export class StarshipSummaryComponent implements OnInit {

  @Input()
  starship?: Starship;
  showDetail = false;

  constructor() { }

  ngOnInit(): void {
  }
}
