import {Component, OnInit} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {MetaTvService} from "./services/metatv.service";
import {YoutubeHelper} from "./youtube/youtube.helper";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MetaTvService, YoutubeHelper]
})
export class AppComponent implements OnInit {
  currently_playing_video: SafeResourceUrl = this.trustResourceUrl("https://www.youtube.com/embed/8rJqhQIQbv4");

  constructor(private sanitizer: DomSanitizer, private metaApi: MetaTvService, private youtubeHelper: YoutubeHelper) {
    this.youtubeHelper.init();
  }

  ngOnInit() {
    this.youtubeHelper.listen();
    this.metaApi.get20HotVids("lofi").subscribe(response => {
        // this.currently_playing_video = this.trustResourceUrl(response.items[0].url);
      },
      error => {
        console.log(error)
      }
    );
  }

  private trustResourceUrl(link: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(link);
  }
}
