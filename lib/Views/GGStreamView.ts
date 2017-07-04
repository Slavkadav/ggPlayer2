import {GGView} from "./GGView";
import {GGPlayer} from "../GGPlayer";
import {PlayerEvents} from "../PlayerEvents";

export class GGStreamView extends GGView {


    private playButton: Element;
    private volumeBar: Element;
    private muteToggle: Element;
    private isDragging: boolean;
    private clipPlayer: Element;
    private fullscreenButton: Element;
    private qualityLetter: Element;
    private timer;
    private playerBlock: Element;
    protected template: string = `
<div id="html5player" style="display: block" class="">
    <div id="tplggplayer" class="player-block" style="background-color: #000000;" tabindex="1">
        <div id="_poster" class="off"></div>
        <div id="_video" class="on">

        </div>
        <div class="warning">
            <div class="inner-block">
                <img src="https://goodgame.ru/images/svg/18.svg">
                <div class="text">Здесь ругаются взрослые дяди</div>
                <a id="_warningBtn" class="btn btn-blue">Cделать хорошо</a>
            </div>
        </div>
        
        <div class="announce-block" style="display: none;">
                <div class="inner-block">
                    <div class="title">Все будет круто</div>
                    <div class="img-block" style="background: url('//goodgame.ru/images/channel-logo.jpg') no-repeat; background-size: cover;"></div>
                    <div class="timer-block" style="visibility: visible">
                        <span class="hours"></span>
                        <span class="dots">:</span>
                        <span class="minutes"></span>
                        <span class="dots">:</span>
                        <span class="seconds"></span>
                    </div>
                </div>
            <div class="blured" style="background: url('//goodgame.ru/images/channel-logo.jpg') no-repeat; background-size: cover;"></div>
        </div>
        
        <div class="control-block">
            <div id="_smallPlayBtn" class="player-control play-wrap">
                <div rel="play" class="on">
                    <div class="play-btn">
                        <img src="https://goodgame.ru/images/ggplayer/play.svg" width="14" height="29" alt="">
                        <div class="popup-block">Старт</div>
                    </div>
                </div>
                <div rel="stop" class="off">
                    <div class="play-btn">
                        <img src="https://goodgame.ru/images/ggplayer/pause.svg" alt="">
                        <div class="popup-block">Пауза</div>
                    </div>
                </div>
            </div>
            <div id="_muteBtn" class="player-control sound-wrap">
                <div class="on">
                    <div class="play-btn">
                        <img src="https://goodgame.ru/images/ggplayer/mute.svg" alt="">
                        <div class="popup-block">Включить звук</div>
                    </div>
                </div>
                <div class="off">
                    <div class="play-btn">
                        <img src="https://goodgame.ru/images/ggplayer/unmute.svg" alt="">
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
                            <img src="https://goodgame.ru/images/ggplayer/grip.svg" alt="">
                        </div>
                    </div>
                </div>
            </div>
            <div id="_fullscreenBtn" class="player-control screen-wrap">
                <div class="on">
                    <div class="play-btn">
                        <img src="https://goodgame.ru/images/ggplayer/fullscreen.svg" alt="">
                        <div class="popup-block">Во весь экран</div>
                    </div>
                </div>
                <div class="off">
                    <div class="play-btn">
                        <img src="https://goodgame.ru/images/ggplayer/normal-mode.svg" alt="">
                        <div class="popup-block">Обычный режим</div>
                    </div>
                </div>
            </div>
            <div id="_qualitySwitch" class="player-control quality-wrap" style="display: block;">
                <div class="quality-block">
                    <div class="icon">
                        <img src="https://goodgame.ru/images/ggplayer/quality.svg" alt="">
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
</div>
    `;
    private qualitySwitch: Element;
    private volumeValue: string;

    constructor(placeHolder: Element, player: GGPlayer) {
        super(placeHolder, player);
    }


    protected bind() {
        this.playerBlock = this.placeHolder.querySelector("#html5player");

        this.clipPlayer = this.placeHolder.querySelector('#tplggplayer');

        this.clipPlayer.addEventListener('mouseover', () => this.cursorMove());
        this.clipPlayer.addEventListener('mousemove', () => this.cursorMove());
        console.log('clip player');
        console.dir(this.clipPlayer);

        this.playButton = this.placeHolder.querySelector('#_smallPlayBtn');
        this.playButton.addEventListener('click', () => this.playToggle());
        console.log('play button');
        console.dir(this.playButton);

        this.volumeBar = this.placeHolder.querySelector('.slider-wrap');
        this.volumeBar.addEventListener('click', (e) => this.moveAt(e));
        console.log('volume bar');
        console.dir(this.volumeBar);

        this.qualitySwitch = this.placeHolder.querySelector('#_qualitySwitch');
        this.qualitySwitch.addEventListener('click', () => this.qualitySwitch.classList.toggle('active'));
        console.log('quality switch');
        console.dir(this.qualitySwitch);

        this.qualityLetter = this.qualitySwitch.querySelector('.quality');
        console.log('quality letter');
        console.dir(this.qualityLetter);

        let qualityLevels = this.qualitySwitch.querySelector('.quality-list').children;
        qualityLevels[0].addEventListener('click', () => {
            this.player.setQualityLevel(-1);
            this.player.setAutoQuality(true);
        });

        console.log('quality levels loaded');

        for (let i = 1; i < qualityLevels.length; i++) {
            console.log(qualityLevels[i].textContent);
            qualityLevels[i].addEventListener('click', () => {
                this.player.setQualityLevel(qualityLevels.length - i - 1);
                this.player.setAutoQuality(false);
            });
        }

        this.fullscreenButton = this.placeHolder.querySelector('#_fullscreenBtn');
        this.fullscreenButton.addEventListener('click',
            () => this.player.setFullscreen(!this.player.isFullscreen()));
        console.log('fullscreen button');


        this.muteToggle = this.placeHolder.querySelector('#_muteBtn');
        this.muteToggle.addEventListener('click', () => this.player.muteToggle());
        console.log('mute toggle');

        let volumeHandle = this.volumeBar.querySelector('.ui-slider-handle') as HTMLElement;
        volumeHandle.ondragstart = null;
        volumeHandle.ondrag = null;
        volumeHandle.addEventListener('mousedown', (e) => this.moveSeekHandle(e));
        document.addEventListener('mouseup', () => this.isDragging = false);
        console.log('mouse move');

        if (this.player.isAdult()) {
            console.log('player adult');
            this.playerBlock.classList.add('adult-warning');
            console.log('add adult-warning to class list');
            this.playerBlock.querySelector('#_warningBtn').addEventListener('click',
                () => this.playerBlock.classList.remove('adult-warning'));
        }

        if (this.player.hasAnouncment()) {
            this.setAnnouncement();
        }

        console.log('all bind');
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
        this.timer = setTimeout(() => {
            this.clipPlayer.classList.remove('hover');
            this.qualitySwitch.classList.remove('active')
        }, 10000);
    }


    private setAnnouncement() {
        let startTime = this.player.getStreamStartDate();
        if (Date.now() > startTime.getTime()) return;

        let anounceBlock = this.placeHolder.querySelector(".announce-block") as HTMLElement;
        anounceBlock.style.display = 'block';

        this.countTime(startTime).then(() => this.player.play());
    }

    private async countTime(startTime: Date) {
        let announceBlock = this.placeHolder.querySelector(".announce-block") as HTMLElement;
        let timeRemains;
        let hours = announceBlock.querySelector('.hours');
        let minutes = announceBlock.querySelector('.minutes');
        let seconds = announceBlock.querySelector('.seconds');
        while (Date.now() < startTime.getTime()) {
            timeRemains = new Date(startTime.getTime() - Date.now());
            hours.textContent = timeRemains.getHours();
            minutes.textContent = timeRemains.getMinutes();
            seconds.textContent = timeRemains.getUTCSeconds();
            startTime = timeRemains;
        }
    }
}