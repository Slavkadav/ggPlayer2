import {GgView} from "./GgView";
import {GgPlayer} from "../GgPlayer";
import {PlayerEvents} from "../PlayerEvents";
import {isUndefined} from "util";

export class GgCurrentView extends GgView {


    private playButton: Element;
    private volumeBar: Element;
    private muteToggle: Element;
    private isDragging: boolean;
    private clipPlayer: Element;
    private fullscreenButton: Element;


    constructor(placeHolder: Element, player: GgPlayer) {
        super(placeHolder, player);


//         this.template =
//             `
//             <div class="daily-clip-wrap">
//     <div class="clip-player">
//         <div class="video-player" data-sound="half" data-fullscreen="false" data-play="false">
//             <div class="video-inner">
//                 <div class="video">
//                     <!-- ngIf: !player.loading -->
//                     <div class="poster-faded"></div>
//                     <!-- end ngIf: !player.loading -->
//                 </div>
//                 <div class="status-block">
//                     <span class="icon icon-video-play"></span>
//                     <span class="icon icon-video-pause"></span>
//                 </div>
//                 <div class="bot-block">
//                     <div class="shadow bot"></div>
//
//                     <div class="player-control-bottom">
//                         <div class="control-inner clearfix">
//                             <div class="player-button play-pause pull-left">
//                                 <div class="state play">
//                                     <div class="tip">Старт</div>
//                                     <span class="icon icon-video-play"></span>
//                                 </div>
//                                 <div class="state pause">
//                                     <div class="tip">Пауза</div>
//                                     <span class="icon icon-video-pause"></span>
//                                 </div>
//                             </div>
//                             <div class="sound-block pull-left">
//                                 <div class="player-button mute-unmute pull-left">
//                                     <div class="state full">
//                                         <div class="tip">Без звука</div>
//                                         <span class="icon icon-video-mute-full"></span>
//                                     </div>
//                                     <div class="state half">
//                                         <div class="tip">Без звука</div>
//                                         <span class="icon icon-video-mute-half"></span>
//                                     </div>
//                                     <div class="state unmute">
//                                         <div class="tip">Включить звук</div>
//                                         <span class="icon icon-video-unmute"></span>
//                                     </div>
//                                 </div>
//                                     <div class="sound-bar-block pull-left">
//                                         <div class="progress-sound">
//                                             <div class="slider-range" style="width: 75%;"></div>
//                                             <div class="handle" style="left:75%;"></div>
//                                         </div>
//                                     </div>
//                             </div>
//                             <div class="pull-right">
//                                 <div class="player-button pull-left full-exitfull">
//                                     <div class="state full">
//                                         <div class="tip">Во весь экран</div>
//                                         <span class="icon icon-video-fullscreen"></span>
//                                     </div>
//                                     <div class="state normal">
//                                         <div class="tip">Выход из полноэкранного режима</div>
//                                         <span class="icon icon-video-normalmode"></span>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//
//     </div>
//
// </div>
//             `;

        this.templateUrl = './html/template.html';

        this.loadTemplate();
        this.init();
    }


    private init() {
        this.clipPlayer = this.placeHolder.querySelector('.video-player');


        this.playButton = this.placeHolder.querySelector('.play-pause');
        this.playButton.addEventListener('click', () => this.playToggle());

        this.volumeBar = this.placeHolder.querySelector('.sound-block');
        this.volumeBar.addEventListener('click', (e) => this.moveAt(e));
        let handle = <HTMLElement>this.volumeBar.querySelector('.handle');
        handle.addEventListener('mousedown', (e) => this.moveSeekHandle(e));
        document.addEventListener('mouseup', (e: any) => {
                this.isDragging = false;
            }
        );

        this.muteToggle = this.placeHolder.querySelector('.mute-unmute');
        this.muteToggle.addEventListener('click', () => this.player.muteToggle());

        this.player.on(PlayerEvents.PLAY, () => this.playButton.classList.add('active'));
        this.player.on(PlayerEvents.PAUSE, () => this.playButton.classList.remove('active'));

        this.player.on(PlayerEvents.MUTE_TOGGLE, () => this.muteToggle.classList.toggle('mute'));

        this.player.on(PlayerEvents.FULLSCREEN_CHANGE, (value) => this.fullscreenToggle(value));

        this.fullscreenButton = this.placeHolder.querySelector('.full-exitfull');
        this.fullscreenButton.addEventListener('click', () => this.player.setFullscreen(true));
    }


    moveAt(e: any) {
        if (!this.isDragging && e.type !== 'click') return;
        let sliderRange = <HTMLElement>this.volumeBar.querySelector('.slider-range');
        let rect = this.volumeBar.querySelector('.progress-sound').getBoundingClientRect();
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
        }

        else {
            if (document.exitFullscreen)
                document.exitFullscreen();
            else if (document.webkitExitFullscreen)
                document.webkitExitFullscreen();
        }
    }
}