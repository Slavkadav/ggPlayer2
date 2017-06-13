import {GgView} from "./GgView";
import {PlayerEvents} from "../PlayerEvents";
import {GgPlayer} from "../GgPlayer";
/**
 * Created by ggdev on 05.06.17.
 */
export class MyView extends GgView {
    loadViewByTemplate(templateUrl) {
    }

    private muteButton: HTMLButtonElement;
    private pauseButton: HTMLButtonElement;
    private fullscreenButton: HTMLButtonElement;
    private videoCurrentQuality: number;
    private quality: HTMLSelectElement;
    private seekBar: HTMLInputElement;
    private playButton: HTMLButtonElement;
    private volumeBar: HTMLInputElement;
    private parentElement;

    private readonly htmlText: string =  // TODO: тут htmlText, там html
        `<div class="controls">
            <input type="range" class="seekBar" value="0">
            <button type="button" class="play">Play</button>
            <button type="button" class="pause">Pause</button>
            <button type="button" class="mute">Mute</button>
            <button type="button" class="fullscreen">Fullscreen</button>
            <input type="range" class="volumeBar" value="100"/>
            <select name="quality" class="qualitySet">
          </select>
         </div>`;

    constructor(placeHolder: Element, player:GgPlayer) {
        super(placeHolder, player);

        this.template = this.htmlText;

        this.parentElement = placeHolder;
        this.placeHolder.innerHTML = this.htmlText;
        this.init();
    }

    private init() {
        this.playButton = <HTMLButtonElement>this.parentElement.querySelector('.play');
        this.playButton.addEventListener('click', ()=>this.player.play());

        this.pauseButton = <HTMLButtonElement>this.parentElement.querySelector('.pause');
        this.pauseButton.addEventListener('click', ()=>this.player.pause());

        this.muteButton = <HTMLButtonElement>this.parentElement.querySelector('.mute');
        this.muteButton.addEventListener('click', ()=>this.player.muteToggle());

        this.seekBar = <HTMLInputElement>this.parentElement.querySelector('.seekBar');
        this.seekBar.addEventListener('change', () => this.player.seek(+this.seekBar.value));

        this.volumeBar = <HTMLInputElement>this.parentElement.querySelector('.volumeBar');
        this.volumeBar.min = '0';
        this.volumeBar.max = '1';
        this.volumeBar.step = '0.01';
        this.volumeBar.addEventListener('change', () => this.player.setVolume(+this.volumeBar.value));

        this.player.on(PlayerEvents.PLAY, () => this.videoPlay());
        this.player.on(PlayerEvents.PAUSE, () => this.videoPause());
        this.player.on(PlayerEvents.MUTE_TOGGLE, () => this.videoMuteToggle());
        this.player.on(PlayerEvents.CHANGE_VOLUME, (value) => this.changeVolume(value));
    }

    private videoPlay() {
        this.playButton.disabled = true;
        this.pauseButton.disabled = false;
    }

    private videoPause() {
        this.playButton.disabled = false;
        this.pauseButton.disabled = true;
    }

    private videoMuteToggle() {
        if (this.player.isMuted()) {
            this.muteButton.textContent = "Unmute";
        } else {
            this.muteButton.textContent = "Mute";
        }
    }


    private changeVolume(value: number) {
        this.volumeBar.value = value.toString();
    }
}