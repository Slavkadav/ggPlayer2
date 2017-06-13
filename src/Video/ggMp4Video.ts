import {GgVideo} from "./ggVideo";
import {GgPlayer} from "../GgPlayer";
import {PlayerEvents} from "../PlayerEvents";
/**
 * Created by ggdev on 05.06.17.
 */

export class GgMp4Video extends GgVideo{


    constructor(videoURL:string,parentElement:Element,player:GgPlayer){ // TODO: Coding Style
        super(parentElement,player);
        this.videoElement.src = videoURL;

        this.addPlayerListeners();
    }
    play(): void {
        this.videoElement.play();
    }

    pause(): void {
        this.videoElement.pause();
    }

    mute(): void {
        this.videoElement.muted = this.player.isMuted();
    }

    changeVolume(value:number): void {
        this.videoElement.volume = value;
    }
    setFullscreen(): void {
        this.videoElement.requestFullscreen();
    }

    seek(value:number){
        this.videoElement.currentTime = value;
    }

    private addPlayerListeners() {

    }
}