import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class YoutubeHelper {
  public player: any;

  isRestricted = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

// Call in ngOnInit()
  init() {
    const doc = window.document;
    const playerApiScript = doc.createElement('script');
    playerApiScript.type = 'text/javascript';
    playerApiScript.src = 'https://www.youtube.com/iframe_api';
    doc.body.appendChild(playerApiScript);
  }

  listen(){
    /* 3. startVideo() will create an <iframe> (and YouTube player) after the API code downloads. */
    window['onYouTubeIframeAPIReady'] = () => this.startVideo();
  }

  startVideo() {
      this.player = new window['YT'].Player('meta-tv', {
        playerVars: {
          autoplay: 1,
          modestbranding: 1,
          controls: 1,
          disablekb: 1,
          rel: 0,
          showinfo: 0,
          fs: 0,
          playsinline: 1

        },
        events: {
          'onStateChange': event => this.onPlayerStateChange,
          'onError': event => this.onPlayerError,
          'onReady': event => this.onPlayerReady,
        }
      });
  }

    /* 4. It will be called when the Video Player is ready */
    onPlayerReady(event)
    {
      if (this.isRestricted) {
        event.target.mute();
        event.target.playVideo();
      } else {
        event.target.playVideo();
      }
    }

    /* 5. API will call this function when Player State changes like PLAYING, PAUSED, ENDED */
    onPlayerStateChange(event)
    {
      console.log(event);
      switch (event.data) {
        case window['YT'].PlayerState.PLAYING:
          if (this.cleanTime() == 0) {
            console.log('started ' + this.cleanTime());
          } else {
            console.log('playing ' + this.cleanTime())
          }
          break;
        case window['YT'].PlayerState.PAUSED:
          if (this.player.getDuration() - this.player.getCurrentTime() != 0) {
            console.log('paused' + ' @ ' + this.cleanTime());
          }
          break;
        case window['YT'].PlayerState.ENDED:
          console.log('ended ');
          break;
      }
    }
    ;

    cleanTime()
    {
      return Math.round(this.player.getCurrentTime())
    }
    ;

    onPlayerError(event)
    {
      switch (event.data) {
        case 2:
          // console.log('' + this.video);
          break;
        case 100:
          break;
        case 101 || 150:
          break;
      }
    }
    ;
  }
