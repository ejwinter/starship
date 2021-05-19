import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {ResultPage} from './result-page';
import {map, take, tap} from 'rxjs/operators';

export interface Pilot {
  name: string;
  homeworld?: string;

  homeworldDetails?: { name: string };
}

export interface Film {
  title: string;
  release_date: Date;
}

export interface Starship {
  name: string;
  model: string;
  pilots: string[];
  films: string[];
  manufacturer: string;
  crew: string;
  passengers: string;
  hyperdrive_rating: string;
  pilotDetails: Pilot[];
  filmDetails: Film[];
}

export class StarshipRequest {
  page = 1;
  pageSize = 10;
  search?: string = undefined;
}

@Injectable({
  providedIn: 'root'
})
export class StarshipService {

  static readonly STARSHIP_URL = 'https://swapi.dev/api/starships';

  constructor(
    private http: HttpClient
  ) { }

  searchStarships(starshipRequest: StarshipRequest): Observable<ResultPage<Starship>> {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('page', '' + starshipRequest.page);
    if (starshipRequest.search) {
      httpParams = httpParams.append('search', starshipRequest.search);
    }
    return this.http.get<ResultPage<Starship>>(StarshipService.STARSHIP_URL, {params: httpParams})
      .pipe(tap(page => {
        page.results.forEach(starship => {
          starship.pilotDetails = [];
          starship.pilots.forEach(pilotUrl => {
            this.http.get<Pilot>(pilotUrl)
              .pipe(take(1))
              .subscribe(pilot => {
                starship.pilotDetails.push(pilot);
                if (pilot.homeworld){
                  this.http.get<{name: string}>(pilot.homeworld)
                    .pipe(take(1))
                    .subscribe(world => pilot.homeworldDetails = world);
                }
              });
          });
          starship.filmDetails = [];
          starship.films.forEach(filmUrl => {
            this.http.get<Film>(filmUrl)
              .pipe(take(1))
              .subscribe(film => starship.filmDetails.push(film));
          });
        });
      }));
  }

  getPage(pageToLoad: string): Observable<ResultPage<Starship>> {
    return this.http.get<ResultPage<Starship>>(pageToLoad);
  }
}
