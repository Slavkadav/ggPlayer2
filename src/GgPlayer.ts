import {EventEmitter} from "events";
import {PlayerEvents} from "./PlayerEvents";
import {GgView} from "./Views/GgView";
import {GgVideo} from "./Video/ggVideo";
import {GgCurrentView} from "./Views/currentGgView";
import {GgVideoFactory} from "./Video/ggVideoFactory";  // TODO: Все классы называются gg..., а этот почему-то не такой


export class GgPlayer extends EventEmitter {  // TODO: Название класса должно начинаться с большой буквы!

    private playing: boolean;
    private muted: boolean;
    private videoTime: number;
    private volume: number;
    private fullscreen: boolean;
    private view: GgView;
    private video: GgVideo;
    private parentElement: Element;
    private currentQualityLevel;

    constructor(parent: Element) {
        super();
        this.parentElement = parent; // TODO: Никаких селекторов, пускай передается уже ссылка на элемент
        this.muted = false;
        this.playing = false;
        this.fullscreen = false;
    }

    setPlayerView(view: GgView): void {
        this.view = view
    }; // TODO: Coding Style


    initVideo(videoUrl: string): void {
        this.setPlayerView(new GgCurrentView(this.parentElement, this));              // TODO: Почему тут setPlayerView(),
        this.setVideo(new GgVideoFactory().createVideo(videoUrl, document.querySelector('.video'), this)); // TODO: а тут просто присваивание?
    }

    setVideo(video:GgVideo):void{
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