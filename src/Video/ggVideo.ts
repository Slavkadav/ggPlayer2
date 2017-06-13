import {GgPlayer} from "../GgPlayer";
import {PlayerEvents} from "../PlayerEvents";


export abstract class GgVideo { // TODO: Coding Style
    protected parentElement: Element;
    protected player: GgPlayer;
    protected videoElement: HTMLVideoElement;

    constructor(parentElement: Element, player: GgPlayer) {
        this.parentElement = parentElement;
        this.player = player;
        this.videoElement = document.createElement('video');
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