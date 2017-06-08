import Hls = require("hls.js");
import {PlayerEvents} from "../PlayerEvents";
import {GgVideo} from "./ggVideo";
import {GgPlayer} from "../GgPlayer";

export class GgVideoHLS extends GgVideo {
    play(): void {
        this.videoElement.play();
    }

    pause(): void {
        this.videoElement.pause();
    }

    mute(): void {
        this.videoElement.muted = this.player.isMuted();
    }

    setFullscreen(): void {
        this.videoElement.requestFullscreen();
    }

    changeVolume(value: number): void {
        this.videoElement.volume = value;
    }

    private hls;
    private qualityLevels;

    constructor(videoURL: string, parentElement: Element, player: GgPlayer) {
        super(parentElement, player);
        if (Hls.isSupported) {
            this.hls = new Hls();
            //this.hls.autoLevelEnabled = false;
            this.hls.attachMedia(this.videoElement);
            this.hls.on(Hls.Events.MEDIA_ATTACHED, () => this.hls.loadSource(videoURL));
            this.hls.on(Hls.Events.MANIFEST_LOADED, (event, data) => {
                this.qualityLevels = data.levels;
                console.log('manifest loaded');
            });

            this.player.on(PlayerEvents.CHANGE_QUALITY, (level)=>this.setQuality(level));
        }
        else {
            alert('Ваш браузер не поддерживает HLS');
        }
    }

    set quality(value: number) {
        if (value < this.qualityLevels.length && value >= 0) {
            this.hls.currentLevel = value;
        }
        else {
            this.hls.currentLevel = -1;
        }
    }

    private setQuality(level: any) {
        if(level < this.qualityLevels.length && level >=0){
            this.hls.currentLevel = level;
        }
        else {
            this.hls.currentLevel = -1;
        }
    }
}