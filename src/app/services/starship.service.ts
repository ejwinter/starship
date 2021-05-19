import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {ResultPage} from './result-page';
import {map, take, tap} from 'rxjs/operators';

/**
 * The info about pilots we want, we have to use the homeworld string to get the homeworldDetails from SWAPI
 */
export interface Pilot {
  name: string;
  homeworld?: string;

  homeworldDetails?: { name: string };
}

/**
 * The details we need about films.
 */
export interface Film {
  title: string;
  release_date: Date;
}

/**
 * The information that is available for starships.  The Details are filled in and do not come directly from the api.  This API is quite
 * restful and you have to request nested information using the provided URLs.
 */
export interface Starship {
  name: string;
  model: string;
  /**
   * URLs for retrieving all the pilot info
   */
  pilots: string[];
  films: string[];
  manufacturer: string;
  crew: string;
  passengers: string;
  hyperdrive_rating: string;
  /**
   * The pilots as retrieved using appropriate URLS from 'pilots'
   */
  pilotDetails: Pilot[];
  filmDetails: Film[];
}

/**
 * The types of information supported by startship requests
 */
export class StarshipRequest {
  page = 1;
  pageSize = 10;
  search?: string = undefined;
}

/**
 * This will go out to swapi and request startships, it fills in reflexively grabs the data that we need for this application.
 * This isn't ideal, a more intelligent caching approach would likely be used in a 'production' setting.
 */
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
