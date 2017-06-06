import {EventEmitter} from "events";
import {PlayerEvents} from "./PlayerEvents";
import {ggView} from "./Views/ggView";
import {ggVideo} from "./Video/ggVideo";
import {ggMp4Video} from "./Video/ggMp4Video";
import {MyView} from "./Views/MyView";
import {currentGgView} from "./Views/currentGgView";


export class ggPlayer extends EventEmitter{

    private playing : boolean;
    private muted: boolean;
    private videoTime: number;
    private volume: number;
    private fullscreen: boolean;
    private view : ggView;
    private video :ggVideo;
    private parentElement:Element;

    constructor(parent: string) {
        super();
        this.parentElement = document.querySelector("." + parent);
        this.muted = false;
        this.playing = false;
        this.fullscreen = false;
    }

    setPlayerView(view : ggView):void{this.view=view};


    initVideo(videoUrl:string):void{
        this.setPlayerView(new currentGgView(this.parentElement,this));
        this.video = new ggMp4Video(videoUrl,document.querySelector('.video'),this);
    }

    public play():void{
        this.playing = true;
        this.emit(PlayerEvents.PLAY);
    }

    public pause():void{
        this.playing = false;
        this.emit(PlayerEvents.PAUSE);
    }

    public muteToggle():void{
        this.emit(PlayerEvents.MUTE_TOGGLE);
        this.muted = !this.muted;
    }

    seek(value:number):void{
        this.emit(PlayerEvents.SEEK,value);
        this.videoTime = value;
    }

    setVolume(value:number):void{
        this.emit(PlayerEvents.CHANGE_VOLUME,value);
        this.volume = value;
    }

    setFullscreen(value:boolean):void{
        this.fullscreen = value;
        this.emit(PlayerEvents.FULLSCREEN_CHANGE,value);
    }

    isPlaying():boolean{
        return this.playing;
    }

    isPaused():boolean{
        return !this.playing;
    }

    isMuted():boolean{
        return this.muted;
    }
}