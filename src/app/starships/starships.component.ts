import { Component, OnInit } from '@angular/core';
import {ResultPage} from '../services/result-page';
import {Starship, StarshipRequest, StarshipService} from '../services/starship.service';
import {Observable, Subscription} from 'rxjs';
import {take, tap} from 'rxjs/operators';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-starships',
  templateUrl: './starships.component.html',
  styleUrls: ['./starships.component.scss'],
  providers: [MessageService]
})
export class StarshipsComponent implements OnInit {

  starshipPage$ = this.starshipService.searchStarships({page: 1, pageSize: 10});

  private readonly subscriptions: Subscription[] = [];
  searchTerm?: string;

  constructor(
    private starshipService: StarshipService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {}

  loadPage(pageToLoad: string): void {
    this.starshipPage$ = this.starshipService.getPage(pageToLoad);
  }

  shipSearch(): void {
    this.starshipPage$ = this.starshipService.searchStarships({page: 1, pageSize: 10, search: this.searchTerm});
  }
}
