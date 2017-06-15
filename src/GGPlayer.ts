import {EventEmitter} from "events";
import {PlayerEvents} from "./PlayerEvents";
import {GGView} from "./Views/GGView";
import {GgVideo} from "./Video/GGVideo";
import {GGClipView} from "./Views/GGClipView";
import {GgVideoFactory} from "./Video/GGVideoFactory";


export class GGPlayer extends EventEmitter {

    private playing: boolean;
    private muted: boolean;
    private videoTime: number;
    private volume: number;
    private fullscreen: boolean;
    private view: GGView;
    private video: GgVideo;
    private parentElement: Element;
    private currentQualityLevel;

    constructor(parent: Element) {
        super();
        this.parentElement = parent;
        this.muted = false;
        this.playing = false;
        this.fullscreen = false;
    }

    setPlayerView(view: GGView): void {
        console.log('set player view');
        this.view = view
    };


    initVideo(videoUrl: string): void {
        let view = new GGClipView(this.parentElement, this);
        view.load().then(() => {
            this.setPlayerView(view);
            this.setVideo(new GgVideoFactory().createVideo(videoUrl, document.querySelector('.video'), this));
        });

    }

    setVideo(video:GgVideo):void{
        console.log('set video');
        console.dir(video);
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
        this.currentQualityLevel = level;
        this.emit(PlayerEvents.CHANGE_QUALITY, level);
    }
}