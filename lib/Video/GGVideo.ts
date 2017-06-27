import {GGPlayer} from "../GGPlayer";
import {PlayerEvents} from "../PlayerEvents";


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

        this.player.on(PlayerEvents.PLAY, () => this.play());
        this.player.on(PlayerEvents.PAUSE, () => this.pause());
        this.player.on(PlayerEvents.SEEK, (value) => this.seek(value));
        this.player.on(PlayerEvents.CHANGE_VOLUME, (value: number) => this.changeVolume(value));
    }


    abstract play(): void;

    abstract pause(): void;

    abstract mute(): void;

    abstract setFullscreen(): void;

    abstract changeVolume(value: number): void;

    protected seek(value: number) {
    };
}