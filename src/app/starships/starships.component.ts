import {Component, OnInit} from '@angular/core';
import {StarshipService} from '../services/starship.service';
import {Subscription, throwError} from 'rxjs';
import {MessageService} from 'primeng/api';
import {catchError} from 'rxjs/operators';

/**
 *
 */
@Component({
  selector: 'app-starships',
  templateUrl: './starships.component.html',
  styleUrls: ['./starships.component.scss'],
  providers: [MessageService]
})
export class StarshipsComponent implements OnInit {

  starshipPage$ = this.starshipService.searchStarships({page: 1, pageSize: 10})
    .pipe(catchError(error => {
      this.messageService.add({severity: 'error', summary: 'Error getting starships.', detail: error.message});
      return throwError(error);
    }));

  private readonly subscriptions: Subscription[] = [];
  searchTerm?: string;

  /**
   *
   * @param starshipService the service to get starships using requests
   * @param messageService a service that could be used to show toast messages, I got a little lazy not handling errors but to
   * demonstrate how here.
   */
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
