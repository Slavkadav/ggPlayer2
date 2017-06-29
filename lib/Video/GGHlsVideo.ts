import Hls = require("hls.js");
import { PlayerEvents } from "../PlayerEvents";
import { GGVideo } from "./GGVideo";
import { GGPlayer } from "../GGPlayer";

export class GGVideoHLS extends GGVideo {

    private hls;
    private qualityLevels;

    constructor(videoURL: string, parentElement: Element, player: GGPlayer) {
        super(parentElement, player);
        if (Hls.isSupported()) {
            console.log('hls supported');
            this.hls = new Hls();
            this.hls.attachMedia(this.videoElement);
            this.hls.on(Hls.Events.MEDIA_ATTACHED, () => {
                this.hls.loadSource(videoURL);
                console.log('media attached');
            });
            this.hls.on(Hls.Events.MANIFEST_LOADED, (event, data) => {
                console.log('Manifest loaded');
                this.qualityLevels = data.levels;
                console.dir(data.levels);
                this.player.setQualityLevel(this.hls.currentLevel);
            });

            this.hls.on(Hls.Events.ERROR, function (event, data) {
                if (data.fatal) {
                    switch (data.type) {
                        case Hls.ErrorTypes.NETWORK_ERROR:
                            // try to recover network error
                            console.log("fatal network error encountered, try to recover");
                            this.hls.startLoad();
                            break;
                        case Hls.ErrorTypes.MEDIA_ERROR:
                            console.log("fatal media error encountered, try to recover");
                            this.hls.recoverMediaError();
                            break;
                        default:
                            // cannot recover
                            this.hls.destroy();
                            break;
                    }
                }
            });

            this.player.on(PlayerEvents.CHANGE_QUALITY, (level) => {
                console.log('quality changed by player');
                this.setQuality(level);
            });

            this.hls.on(Hls.Events.LEVEL_SWITCHED, (event, data) => {
                this.player.setQualityLevel(data.level);
            });
        }
        else {
            alert('Ваш браузер не поддерживает HLS');
        }
    }


    play(): void {
        this.videoElement.play();
    }

    pause(): void {
        this.videoElement.pause();
    }

    muteChange(): void {
        this.videoElement.muted = this.player.isMuted();
    }

    setFullscreen(): void {
        this.videoElement.requestFullscreen();
    }

    changeVolume(value: number): void {
        this.videoElement.volume = value;
    }


    private setQuality(level: any) {
        console.log('try to set level ' + level);
        console.log('current level: ' + this.hls.currentLevel);
        if (level < this.qualityLevels.length && level >= 0) {
            console.log('set user quality ' + level);
            this.hls.currentLevel = level;
            console.dir(this.qualityLevels[level]);
        }
        else {
            console.log('set auto quality');
            this.player.setAutoQuality(true);
            this.hls.currentLevel = -1;
        }
    }
}