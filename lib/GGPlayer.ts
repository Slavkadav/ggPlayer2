import {EventEmitter} from "events";
import {PlayerEvents} from "./PlayerEvents";
import {GGView} from "./Views/GGView";
import {GGVideo} from "./Video/GGVideo";
import {GGClipView} from "./Views/GGClipView";
import {GGVideoFactory} from "./Video/GGVideoFactory";
import {GGStreamView} from "./Views/GGStreamView"

export class GGPlayer extends EventEmitter {

    private playing: boolean;
    private muted: boolean;
    private videoTime: number;
    private volume: number;
    private fullscreen: boolean;
    private view: GGView;
    private video: GGVideo;
    private parentElement: Element;
    private currentQualityLevel;
    private console : HTMLElement;
    private autoQuality : boolean;

    constructor(parent: Element) {
        super();
        this.parentElement = parent;
        this.muted = false;
        this.playing = false;
        this.fullscreen = false;
        this.autoQuality = true;
    }

    setPlayerView(view: GGView): void {
        this.view = view
    };


    initVideo(videoUrl: string): void {
        let view = new GGStreamView(this.parentElement, this);
        view.loadT()
        .then(() => {
            this.setPlayerView(view);
            this.setVideo(new GGVideoFactory().createVideo(videoUrl, this.parentElement.querySelector('#_video'), this));
        })
        .catch(()=>console.log.bind(console));
    }

    setVideo(video:GGVideo):void{
        this.video = video;
    }

    public play(): void {

        this.playing = true;
        this.emit(PlayerEvents.PLAY);
    }

    public pause(): void {
        this.playing = false;
        this.emit(PlayerEvents.PAUSE);
    }

    public muteToggle(): void {
        this.muted = !this.muted;
        this.emit(PlayerEvents.MUTE_TOGGLE);
    }

    seek(value: number): void {
        this.emit(PlayerEvents.SEEK, value);
        this.videoTime = value;
    }

    setVolume(value: number): void {
        this.emit(PlayerEvents.CHANGE_VOLUME, value);
        this.volume = value;
    }

    setFullscreen(value: boolean): void {
        this.fullscreen = value;
        this.emit(PlayerEvents.FULLSCREEN_CHANGE, value);
    }

    isPlaying(): boolean {
        return this.playing;
    }

    isPaused(): boolean {
        return !this.playing;
    }

    isMuted(): boolean {
        return this.muted;
    }

    setQualityLevel(level: number) {
        console.log('Выбран уровень качества ' + level);
        this.currentQualityLevel = level;
        this.emit(PlayerEvents.CHANGE_QUALITY, level);
    }

    isFullscreen() : boolean{
        return this.fullscreen;
    }

    isAutoQuality():boolean{
        return this.autoQuality;
    }

    setAutoQuality(value:boolean){
        this.autoQuality = value;
    }
}