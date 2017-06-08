import {ggVideo} from "./ggVideo";
import {ggPlayer} from "../ggPlayer";
import {PlayerEvents} from "../PlayerEvents";
/**
 * Created by ggdev on 05.06.17.
 */

export class ggMp4Video extends ggVideo{


    constructor(videoURL:string,parentElement:Element,player:ggPlayer){ // TODO: Coding Style
        super(parentElement,player);
        this.videoElement.src = videoURL;

        this.addPlayerListeners();
    }
    play(): void {
        this.player.play();
    }

    pause(): void {
        this.player.pause();
    }

    mute(): void {
        this.player.muteToggle();
    }

    changeVolume(value:number): void {
        this.player.setVolume(value);
    }
    setFullscreen(): void {
        this.player.setFullscreen(true);
    }

    seek(value:number){
        this.videoElement.currentTime = value;
    }

    private addPlayerListeners() {
        this.player.on(PlayerEvents.PLAY, ()=>this.videoElement.play());
        this.player.on(PlayerEvents.PAUSE, ()=>this.videoElement.pause());
        this.player.on(PlayerEvents.SEEK, (value)=>this.seek(value));
        this.player.on(PlayerEvents.CHANGE_VOLUME,(value:number)=>this.videoElement.volume=value)
    }
}