import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from "rxjs";

export var META_TV_URL = "http://0.0.0.0:8080";
export var API_GET_SUBREDDIT = "/subreddit/videos";

@Injectable({
  providedIn: 'root',
})
export class MetaTvService {
  constructor(private http: HttpClient) {
  }

  public getVideoItems(subreddit: string, sort: string, after: string, count: string, limit: string): Observable<SubRedditVideosResponse> {
    const params = new HttpParams()
      .set('subreddit', subreddit)
      .set('sort', sort)
      .set('after', after)
      .set('count', count)
      .set('limit', limit);
    return this.http.get<SubRedditVideosResponse>(META_TV_URL + API_GET_SUBREDDIT, {params})
  }

  public get20HotVids(subreddit: string): Observable<SubRedditVideosResponse> {
    return this.getVideoItems(subreddit, RedditSortBins.hot, "", "20", "20")
  }
}

export interface SubRedditVideosResponse {
  items: Array<CondensedVideoItem>
}

export interface CondensedVideoItem {
  title: string,
  url: string,
  id: string,
  html: string,
  thumbnailUrl: string,
  permalink: string
}

export enum RedditSortBins {
  top = "top",
  hot = "hot",
  new = "new",
  rising = "rising",
  controvertial = "controvertial"
}
