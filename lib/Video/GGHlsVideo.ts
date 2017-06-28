import Hls = require("hls.js");
import {PlayerEvents} from "../PlayerEvents";
import {GGVideo} from "./GGVideo";
import {GGPlayer} from "../GGPlayer";

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

            this.hls.on(Hls.Events.ERROR, (event, data) => {
                let errorType = data.type;
                let errorDetails = data.details;
                let errorFatal = data.fatal;

                console.log('Type: ' + errorType);
                console.log('Details: ' + errorDetails);
                console.log('errorFatal: ' + errorFatal);
            });

           this.player.on(PlayerEvents.CHANGE_QUALITY, (level)=>{
               console.log('quality changed by player');
               this.setQuality(level);
               console.dir(this.hls);
            });
        
           this.hls.on(Hls.Events.LEVEL_SWITCHED, (event,data)=>{
               this.player.setQualityLevel(data.level);
               this.player.setAutoQuality(true);
               console.log('quality auto changed');
               console.dir(this.hls);
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
        if(level < this.qualityLevels.length && level >=0){
            this.hls.currentLevel = level;
        }
        else {
            this.hls.currentLevel = -1;
        }
    }
}