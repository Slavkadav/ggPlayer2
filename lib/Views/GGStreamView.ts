import { GGView } from "./GGView";
import { GGPlayer } from "../GGPlayer";
import { PlayerEvents } from "../PlayerEvents";

export class GGStreamView extends GGView {


    private playButton: Element;
    private volumeBar: Element;
    private muteToggle: Element;
    private isDragging: boolean;
    private clipPlayer: Element;
    private fullscreenButton: Element;
    private qualityLetter: Element;
    private timer;
    protected template = `     
        <div id="tplggplayer" class="player-block" style="background-color: #000000;" tabindex="1">
                <div id="_poster" class="off" style="background-image: url(&quot;https://hls.goodgame.ru/previews/32399.jpg&quot;);"></div>
                <div id="_video" class="on">
                    
                </div>

                <div id="_bigPlayBtn" class="play-block" style="display: none;">
                    <img src="/images/ggplayer/big-play.svg" alt="">
                </div>
                <div class="control-block">
                    <div id="_smallPlayBtn" class="player-control play-wrap">
                        <div rel="play" class="on">
                            <div class="play-btn">
                                <img src="/images/ggplayer/play.svg" width="14" height="29" alt="">
                                <div class="popup-block">Старт</div>
                            </div>
                        </div>
                        <div rel="stop" class="off">
                            <div class="play-btn">
                                <img src="/images/ggplayer/pause.svg" alt="">
                                <div class="popup-block">Пауза</div>
                            </div>
                        </div>
                    </div>
                    <div id="_muteBtn" class="player-control sound-wrap">
                        <div class="on">
                            <div class="play-btn">
                                <img src="/images/ggplayer/mute.svg" alt="">
                                <div class="popup-block">Включить звук</div>
                            </div>
                        </div>
                        <div class="off">
                            <div class="play-btn">
                                <img src="/images/ggplayer/unmute.svg" alt="">
                                <div class="popup-block">Без звука</div>
                            </div>
                        </div>
                    </div>
                    <div class="slider-wrap">
                        <div class="popup-block">Регулировать громкость</div>
                        <div class="clickable">
                            <div class="slider-range ui-slider">
                                <div class="slider-range-value" style="width: 100%;"></div>
                                <div class="slider-value ui-slider-handle" style="left: 100%;">
                                    <img src="/images/ggplayer/grip.svg" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="_fullscreenBtn" class="player-control screen-wrap">
                        <div class="on">
                            <div class="play-btn">
                                <img src="/images/ggplayer/fullscreen.svg" alt="">
                                <div class="popup-block">Во весь экран</div>
                            </div>
                        </div>
                        <div class="off">
                            <div class="play-btn">
                                <img src="/images/ggplayer/normal-mode.svg" alt="">
                                <div class="popup-block">Обычный режим</div>
                            </div>
                        </div>
                    </div>
                    <div id="_qualitySwitch" class="player-control quality-wrap" style="display: block;">
                        <div class="quality-block">
                            <div class="icon">
                                <img src="/images/ggplayer/quality.svg" alt="">
                                <span class="quality">М(A)</span>
                            </div>
                            <div class="popup-block">Качество видео. Нажмите, чтобы сменить</div>
                            <ul class="quality-list">
                                <li><a data-letter="A" style="display: block;" rel="auto">Авто</a></li>
                                <li><a data-letter="И" rel="premium" class="">Исходное</a></li>
                                <li><a data-letter="В" rel="720">Высокое</a></li>
                                <li><a data-letter="С" rel="480">Среднее</a></li>
                                <li><a data-letter="М" rel="240">Мобильное</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
        </div>
    `;
    private qualitySwitch: Element;
    private volumeValue: string;

    constructor(placeHolder: Element, player: GGPlayer) {
        super(placeHolder, player);
        console.dir(player);
        console.dir(placeHolder);
    }


    protected bind() {
        this.clipPlayer = this.placeHolder.querySelector("#tplggplayer");
        this.clipPlayer.addEventListener('mouseover', () => this.cursorMove());
        this.clipPlayer.addEventListener('mousemove', () => this.cursorMove());

        this.playButton = this.placeHolder.querySelector('#_smallPlayBtn');
        this.playButton.addEventListener('click', () => this.playToggle());


        this.volumeBar = this.placeHolder.querySelector('.slider-wrap');
        this.volumeBar.addEventListener('click', (e) => this.moveAt(e));

        this.qualitySwitch = this.placeHolder.querySelector('#_qualitySwitch');
        this.qualitySwitch.addEventListener('click', () => this.qualitySwitch.classList.toggle('active'));

        this.qualityLetter = this.qualitySwitch.querySelector('.quality');


        let qualityLevels = this.qualitySwitch.querySelector('.quality-list').children;
        qualityLevels[0].addEventListener('click', () => {
            this.player.setQualityLevel(-1);
            this.player.setAutoQuality(true);
        });
        for (let i = 1; i < qualityLevels.length; i++) {
            console.log(qualityLevels[i].textContent);
            qualityLevels[i].addEventListener('click', () => {
                this.player.setQualityLevel(qualityLevels.length-i-1);
                this.player.setAutoQuality(false);
            });
        }

        this.fullscreenButton = this.placeHolder.querySelector('#_fullscreenBtn');
        this.fullscreenButton.addEventListener('click',
            () => this.player.setFullscreen(!this.player.isFullscreen()));

        this.muteToggle = this.placeHolder.querySelector('#_muteBtn');
        this.muteToggle.addEventListener('click', () => this.player.muteToggle());


        let volumeHandle = this.volumeBar.querySelector('.ui-slider-handle') as HTMLElement;
        volumeHandle.ondragstart = null;
        volumeHandle.ondrag = null;
        volumeHandle.addEventListener('mousedown', (e) => this.moveSeekHandle(e));
        document.addEventListener('mouseup', () => {
            this.isDragging = false;
        });

        this.subscribeToPlayerEvents();
    }


    private subscribeToPlayerEvents() {

        this.player.on(PlayerEvents.PAUSE, () => {
            this.playButton.classList.remove('active')
        });

        this.player.on(PlayerEvents.PLAY, () => {
            this.playButton.classList.add('active')
        });

        this.player.on(PlayerEvents.MUTE_TOGGLE, () => {
            this.muteChange();
        });

        this.player.on(PlayerEvents.FULLSCREEN_CHANGE, (value) => this.fullscreenToggle(value));

        this.player.on(PlayerEvents.CHANGE_QUALITY, (level: number) => this.qualitySet(level))
    }

    private moveAt(e: any) {
        if (!this.isDragging && e.type !== 'click') return;
        let sliderRange = this.volumeBar.querySelector('.slider-range-value') as HTMLElement;
        let rect = this.volumeBar.querySelector('.slider-range').getBoundingClientRect();

        let handle = this.volumeBar.querySelector('.ui-slider-handle') as HTMLElement;

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

        let volumeValue = handleLeft / rect.width;
        this.player.setVolume(volumeValue);
        handle.style.left = handleLeft / rect.width * 100 + '%';
        sliderRange.style.width = sliderRight / rect.width * 100 + '%';
        this.volumeValue = handle.style.left;
    };

    private moveSeekHandle(e) {
        this.isDragging = true;
        document.addEventListener('mousemove',
            (e: any) => this.moveAt(e));
    }

    private playToggle() {
        if (this.player.isPlaying()) {
            this.player.pause();
        } else {
            this.player.play();
        }
    }

    private fullscreenToggle(value) {
        console.log('fullscreen toggled');
        if (value === true) {
            if (this.clipPlayer.requestFullscreen) {
                this.clipPlayer.requestFullscreen();
            } else if (this.clipPlayer.webkitRequestFullScreen) {
                this.clipPlayer.webkitRequestFullScreen();
            }
            else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
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

    private qualitySet(level: number) {
        switch (level) {
            case 0:
                this.qualityLetter.textContent = 'М';
                break;
            case 1:
                this.qualityLetter.textContent = 'С';
                break;
            case 2:
                this.qualityLetter.textContent = 'В';
                break;
            case 3:
                this.qualityLetter.textContent = 'И';
                break

        }
        if (this.player.isAutoQuality() && this.qualityLetter.textContent.length <= 2) {
            this.qualityLetter.textContent += '(А)';
        }
    }


    private muteChange() {
        this.muteToggle.classList.toggle('active');
        let sliderRange = this.volumeBar.querySelector('.slider-range-value') as HTMLElement;
        let handle = this.volumeBar.querySelector('.ui-slider-handle') as HTMLElement;
        if (this.player.isMuted()) {

            this.volumeValue = handle.style.left;
            handle.style.left = '0%';
            sliderRange.style.width = '0%';
        }
        else {
            handle.style.left = this.volumeValue;
            sliderRange.style.width = this.volumeValue;
        }
    }

    private cursorMove() {
        this.clipPlayer.classList.add('hover');
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {this.clipPlayer.classList.remove('hover'); this.qualitySwitch.classList.remove('active')}, 10000);
    }
}