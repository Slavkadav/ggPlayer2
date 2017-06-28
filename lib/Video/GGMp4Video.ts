import {GGVideo} from "./GGVideo";
import {GGPlayer} from "../GGPlayer";
import {PlayerEvents} from "../PlayerEvents";
/**
 * Created by ggdev on 05.06.17.
 */

export class GGMp4Video extends GGVideo {


    constructor(videoURL: string, parentElement: Element, player: GGPlayer) {
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

    muteChange(): void {
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