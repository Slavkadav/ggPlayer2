import {GGPlayer} from "../GGPlayer";
import {GGPlayerEvents} from "../GGPlayerEvents";


export abstract class GGVideo {
    protected parentElement: Element;
    protected player: GGPlayer;
    protected videoElement: HTMLVideoElement;

    constructor(parentElement: Element, player: GGPlayer) {


        this.parentElement = parentElement;
        this.player = player;
        this.videoElement = document.createElement('video');

        this.videoElement.style.width = "100%";
        this.videoElement.style.height = "100%";

        this.parentElement.appendChild(this.videoElement);

        this.player.on(GGPlayerEvents.PLAY, () => this.play());
        this.player.on(GGPlayerEvents.PAUSE, () => this.pause());
        this.player.on(GGPlayerEvents.SEEK, (value) => this.seek(value));
        this.player.on(GGPlayerEvents.CHANGE_VOLUME, (value: number) => this.changeVolume(value));
        this.player.on(GGPlayerEvents.MUTE_TOGGLE, () => this.muteChange());
    }


    abstract play(): void;

    abstract pause(): void;

    abstract muteChange(): void;

    abstract setFullscreen(): void;

    abstract changeVolume(value: number): void;

    protected seek(value: number) {
    };
}