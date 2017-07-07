import {GGView} from "./GGView";
import {GGPlayer} from "../GGPlayer";
import {GGPlayerEvents} from "../GGPlayerEvents";
import {clearInterval} from "timers";

export class GGStreamView extends GGView {
    private announceBlock: HTMLElement;
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


    protected bind() {  //TODO: адекватное название метода
        this.playerBlock = this.placeHolder.querySelector("#html5player");

        this.clipPlayer = this.placeHolder.querySelector('#tplggplayer');

        this.clipPlayer.addEventListener('mouseover', () => this.cursorMove());
        this.clipPlayer.addEventListener('mousemove', () => this.cursorMove());

        this.playButton = this.placeHolder.querySelector('#_smallPlayBtn');
        this.playButton.addEventListener('click', () => this.playToggle());


        this.volumeBar = this.placeHolder.querySelector('.slider-wrap');
        this.volumeBar.addEventListener('click', (e) => this.changeVolume(e));

        this.qualitySwitch = this.placeHolder.querySelector('#_qualitySwitch');
        this.qualitySwitch.addEventListener('click', () => this.qualitySwitch.classList.toggle('active'));


        this.qualityLetter = this.qualitySwitch.querySelector('.quality');


        let qualityLevels = this.qualitySwitch.querySelector('.quality-list').children;
        qualityLevels[0].addEventListener('click', () => {
            this.player.setQualityLevel(-1);
            this.player.setAutoQuality(true);
        });

        for (let i = 1; i < qualityLevels.length; i++) {
            qualityLevels[i].addEventListener('click', () => {
                this.player.setQualityLevel(qualityLevels.length - i - 1);
                this.player.setAutoQuality(false);
            });
        }

        this.fullscreenButton = this.placeHolder.querySelector('#_fullscreenBtn');
        this.fullscreenButton.addEventListener('click',
            () => this.player.setFullscreen(!this.player.isFullscreen()));


        this.muteToggle = this.placeHolder.querySelector('#_muteBtn');
        this.muteToggle.addEventListener('click', () => this.player.muteToggle());

        let volumeHandle = this.volumeBar.querySelector('.ui-slider-handle') as HTMLElement;
        volumeHandle.ondragstart = () => false;
        volumeHandle.ondrag = () => false;
        volumeHandle.addEventListener('mousedown', (e) => this.moveSeekHandle(e));
        document.addEventListener('mouseup', () => this.isDragging = false);

        if (this.player.isAdult()) {
            this.playerBlock.classList.add('adult-warning');
            this.playerBlock.querySelector('#_warningBtn').addEventListener('click',
                () => this.playerBlock.classList.remove('adult-warning'));
        }

        console.log('check to announce');
        console.log(this.player.hasAnnouncement());
        console.log(this.player.isStreamOnline());


        this.subscribeToPlayerEvents();


        if (this.player.hasAnnouncement() && !this.player.isStreamOnline()) {
            console.log('show announce');
            this.announceBlock = this.placeHolder.querySelector(".announce-block") as HTMLElement;
            this.showAnnouncement();
        }
        else if (!this.player.isStreamOnline()) {
            console.log('show poster');
            this.showPoster(true);
        }
    }


    private showPoster(value:boolean) {
        let poster = this.playerBlock.querySelector('#_poster') as HTMLElement;
        let video = this.playerBlock.querySelector('#_video') as HTMLElement;

        if(value) {
            poster.style.backgroundImage = 'url(' + this.player.channelPoster() + ')';
            poster.classList.remove('off');
            poster.classList.add('on');
           // poster.style.height = '100%';

            this.clipPlayer.classList.add('offline');

            video.classList.remove('on');
            video.classList.add('off');
        }
        else {
            poster.classList.add('off');
            poster.classList.remove('on');

            this.clipPlayer.classList.remove('offline');

            video.classList.add('on');
            video.classList.remove('off');
        }
    }





    private subscribeToPlayerEvents() {

        this.player.on(GGPlayerEvents.PAUSE, () => {
            this.playButton.classList.remove('active')
        });

        this.player.on(GGPlayerEvents.PLAY, () => {
            this.playButton.classList.add('active')
        });

        this.player.on(GGPlayerEvents.MUTE_TOGGLE, () => {
            this.muteChange();
        });

        this.player.on(GGPlayerEvents.FULLSCREEN_CHANGE, (value) => this.fullscreenToggle(value));

        this.player.on(GGPlayerEvents.CHANGE_QUALITY, (level: number) => this.qualitySet(level))
    }

    private changeVolume(e: any) {
        if (!this.isDragging && e.type !== 'click') return;
        let sliderRange = this.volumeBar.querySelector('.slider-range-value') as HTMLElement;
        let rect = this.volumeBar.querySelector('.slider-range').getBoundingClientRect();

        let handle = this.volumeBar.querySelector('.ui-slider-handle') as HTMLElement;

        let handleLeft = (e.pageX - rect.left - handle.offsetWidth / 2);
        let sliderRight = (e.pageX - rect.left - handle.offsetWidth / 2);
        if (handleLeft < 0) {
            handleLeft = 0;
            sliderRight = 0;
            this.muteToggle.classList.add('active')
        }
        if (sliderRight >= rect.width - handle.offsetWidth) {
            sliderRight = rect.width;
        }
        if (handleLeft >= rect.width - handle.offsetWidth) {
            handleLeft = rect.width;
        }
        this.muteToggle.classList.remove('active');
        let volumeValue = handleLeft / rect.width;
        this.player.setVolume(volumeValue);
        handle.style.left = handleLeft / rect.width * 100 + '%';
        sliderRange.style.width = sliderRight / rect.width * 100 + '%';
        this.volumeValue = handle.style.left;
    };

    private moveSeekHandle(e) {
        this.isDragging = true;
        document.addEventListener('mousemove',
            (e: any) => this.changeVolume(e));
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


    private showAnnouncement() {
        let startTime = this.player.getStreamStartDate();
        if (Date.now() > startTime.getTime()) return;

        let anounceBlock = this.placeHolder.querySelector(".announce-block") as HTMLElement;
        anounceBlock.style.display = 'block';

        let imgBlock = anounceBlock.querySelector('.img-block') as HTMLElement;
        let blured = anounceBlock.querySelector('.blured') as HTMLElement;

        imgBlock.setAttribute('style', `background: url('//goodgame.ru/${this.player.streamPoster()}') no-repeat; background-size: cover;`);
        blured.setAttribute('style', `background: url('//goodgame.ru/${this.player.streamPoster()}') no-repeat; background-size: cover;`);


        this.countTime(startTime);
    }

    private countTime(startTime: Date) {
        let timeRemains;
        let hours = this.announceBlock.querySelector('.hours');
        let minutes = this.announceBlock.querySelector('.minutes');
        let seconds = this.announceBlock.querySelector('.seconds');


        let x = setInterval(() => {
            if (Date.now() >= startTime.getTime()) clearInterval(x);
            timeRemains = new Date(startTime.getTime() - Date.now());
            hours.textContent = timeRemains.getUTCHours();
            minutes.textContent = timeRemains.getUTCMinutes();
            seconds.textContent = timeRemains.getUTCSeconds();
        }, 1000);
    }
}