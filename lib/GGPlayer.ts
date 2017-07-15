import {EventEmitter} from "events";
import {GGPlayerEvents} from "./GGPlayerEvents";
import {GGView} from "./Views/GGView";
import {GGVideo} from "./Video/GGVideo";
import {GGVideoFactory} from "./Video/GGVideoFactory";
import {GGStreamView} from "./Views/GGStreamView"
import {GGStreamApi} from "./GGStreamApi";


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
    private channelKey: string;
    private autoQuality: boolean;
    private streamInterface: GGStreamApi;
    public autoplay: boolean;
    isReady: boolean;

    constructor(parent: Element, channelKey: string) {
        super();
        this.parentElement = parent;
        this.muted = false;
        this.playing = false;
        this.fullscreen = false;
        this.autoQuality = true;
        this.channelKey = channelKey;
        this.streamInterface = new GGStreamApi(channelKey);


    }


    setPlayerView(view: GGView): void {
        this.view = view;
    };


    init(): void {
        let videoUrl = `https://hls.goodgame.ru/hls/${this.channelKey}.smil`;
        let view = new GGStreamView(this.parentElement, this);
        this.streamInterface.load()
            .then(() => view.loadTemplate())
            .then(() => {
                this.setPlayerView(view);
                this.setVideo(new GGVideoFactory().createVideo(videoUrl, this.parentElement.querySelector('#_video'), this));
            })
            .catch(() => console.log.bind(console));
    }

    setVideo(video: GGVideo): void {
        this.video = video;
    }

    public play(): void {

        this.playing = true;
        this.emit(GGPlayerEvents.PLAY);
    }

    public pause(): void {
        this.playing = false;
        this.emit(GGPlayerEvents.PAUSE);
    }

    public muteToggle(): void {
        this.muted = !this.muted;
        this.emit(GGPlayerEvents.MUTE_TOGGLE);
    }

    seek(value: number): void {
        this.emit(GGPlayerEvents.SEEK, value);
        this.videoTime = value;
    }

    setVolume(value: number): void {
        this.emit(GGPlayerEvents.CHANGE_VOLUME, value);
        this.volume = value;
    }

    setFullscreen(value: boolean): void {
        this.fullscreen = value;
        this.emit(GGPlayerEvents.FULLSCREEN_CHANGE, value);
    }

    isPlaying(): boolean {
        return this.playing;
    }


    isMuted(): boolean {
        return this.muted;
    }

    setQualityLevel(level: number) {
        console.log('Player set quality level ' + level);
        this.currentQualityLevel = level;
        this.emit(GGPlayerEvents.CHANGE_QUALITY, level);
    }

    isFullscreen(): boolean {
        return this.fullscreen;
    }

    isAutoQuality(): boolean {
        return this.autoQuality;
    }

    readyToStream(){
        this.isReady = true;
        this.emit(GGPlayerEvents.STREAM_BEGIN);
    }

    setAutoQuality(value: boolean) {
        this.autoQuality = value;
    }

    isStreamOnline(): boolean {
        return this.streamInterface.isOnline();
    }

    isAdult(): boolean {
        console.log('stream interface');
        console.dir(this.streamInterface);
        return this.streamInterface.isAdult();
    }

    hasAnnouncement(): boolean {
        return this.streamInterface.hasAnnouncement();
    }

    getStreamStartDate() {
        return this.streamInterface.getStreamStartTime();
    }

    streamPoster() {
        return this.streamInterface.getBroadcastPoster();
    }

    channelPoster() {
        return this.streamInterface.getChannelPoster();
    }



}