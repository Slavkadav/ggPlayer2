import { GGView } from "./GGView";
import { GGPlayer } from "../GGPlayer";
import { GGPlayerEvents } from "../GGPlayerEvents";

export class GGClipView extends GGView {

    private playButton: Element;
    private volumeBar: Element;
    private muteToggle: Element;
    private isDragging: boolean;
    private clipPlayer: Element;
    private fullscreenButton: Element;
    //protected templateUrl: string = './html/template.html';
    protected template = `

    `;

    constructor(placeHolder: Element, player: GGPlayer) {
        super(placeHolder, player);
    }


    protected bind() {
        this.clipPlayer = this.placeHolder.querySelector('.video-player') as Element;
        this.playButton = this.placeHolder.querySelector('.play-pause') as Element;
        this.playButton.addEventListener('click', () => this.playToggle());
        this.volumeBar = this.placeHolder.querySelector('.sound-block') as Element;
        this.volumeBar.addEventListener('click', (e) => this.moveAt(e));
        let handle = <HTMLElement>this.volumeBar.querySelector('.handle');
        handle.addEventListener('mousedown', (e) => this.moveSeekHandle(e));
        document.addEventListener('mouseup', () => {
            this.isDragging = false;
        }
        );


        this.muteToggle = this.placeHolder.querySelector('.mute-unmute') as Element;
        this.muteToggle.addEventListener('click', () => this.player.muteToggle());

        this.player.on(GGPlayerEvents.PLAY, () => this.playButton.classList.add('active'));

        this.player.on(GGPlayerEvents.PAUSE, () => this.playButton.classList.remove('active'));

        this.player.on(GGPlayerEvents.MUTE_TOGGLE, () => this.muteToggle.classList.toggle('mute'));

        this.player.on(GGPlayerEvents.FULLSCREEN_CHANGE, (value) => this.fullscreenToggle(value));

        this.fullscreenButton = this.placeHolder.querySelector('.full-exitfull') as Element;

        this.fullscreenButton.addEventListener('click', () => !this.player.isFullscreen());

    }


    private moveAt(e: any) {
        if (!this.isDragging && e.type !== 'click') return;
        let sliderRange = <HTMLElement>this.volumeBar.querySelector('.slider-range');
        let rect = (this.volumeBar.querySelector('.progress-sound') as Element).getBoundingClientRect();
        let handle = <HTMLElement>this.volumeBar.querySelector('.handle');

        let handleLeft = (e.pageX - rect.left - handle.offsetWidth / 2);
        let sliderRight = (e.pageX - rect.left - handle.offsetWidth / 2);
        if (handleLeft < 0) {
            handleLeft = 0;
            sliderRight = 0;
        }
        if (sliderRight >= rect.width - handle.offsetWidth) {
            sliderRight = rect.width;
        }
        if (handleLeft >= rect.width - handle.offsetWidth) {
            handleLeft = rect.width;
        }
        if (handleLeft < rect.width / 2) {
            this.muteToggle.classList.add('half');
        }
        if (handleLeft > rect.width / 2) {
            this.muteToggle.classList.remove('half');
        }
        let volumeValue = handleLeft / rect.width;
        this.player.setVolume(volumeValue);
        handle.style.left = handleLeft / rect.width * 100 + '%';
        sliderRange.style.width = sliderRight / rect.width * 100 + '%';

    };

    private moveSeekHandle(e) {
        this.isDragging = true;
        document.addEventListener('mousemove', (e: any) => this.moveAt(e));
    }

    private playToggle() {
        if (this.player.isPlaying()) {
            this.player.pause();
        } else {
            this.player.play();
        }
    }

    private fullscreenToggle(value) {
        if (value === true) {
            if (this.clipPlayer.requestFullscreen) {
                this.clipPlayer.requestFullscreen();
            } else if (this.clipPlayer.webkitRequestFullScreen) {
                this.clipPlayer.webkitRequestFullScreen();
            }
            else{
                if(document.exitFullscreen){
                    document.exitFullscreen();
                }else if(document.webkitExitFullscreen){
                    document.webkitExitFullscreen();
                }
            }
        }

        else {
            if (document.exitFullscreen)
                document.exitFullscreen();
            else if (document.webkitExitFullscreen)
                document.webkitExitFullscreen();
        }
    }
}