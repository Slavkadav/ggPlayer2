import {ggView} from "./ggView";
import {ggPlayer} from "../ggPlayer";
import {PlayerEvents} from "../PlayerEvents";

export class currentGgView extends ggView {
    private readonly html: string =  // TODO: templateUrl
        `<div class="daily-clip-wrap">
            <gg-clips-carousel clips="[{&quot;id&quot;:368640,&quot;title&quot;:&quot;\u0414\u041e\u0411\u0420\u0415\u0419\u0428\u0418\u0419 \u0414\u0415\u041d\u0401\u0427\u0415\u041a&quot;,&quot;author&quot;:&quot;Jonk&quot;,&quot;link&quot;:&quot;\/clip\/368640\/&quot;,&quot;cqty&quot;:1,&quot;views&quot;:993,&quot;game&quot;:&quot;Playerunknown's Battlegrounds&quot;,&quot;streamer&quot;:&quot;BuHorPaduHa&quot;,&quot;avatar&quot;:&quot;\/files\/avatars\/av_104658_n7yA.jpg&quot;,&quot;preview&quot;:&quot;https:\/\/storage2.goodgame.ru\/clips\/previews\/18482_1496583295155.jpg&quot;,&quot;src&quot;:&quot;https:\/\/storage2.goodgame.ru\/clips\/18482_1496583295155.mp4&quot;,&quot;watched&quot;:0,&quot;created&quot;:1496583293,&quot;rating&quot;:null},{&quot;id&quot;:368757,&quot;title&quot;:&quot;PUBG - https:\/\/pubg.me\/player\/ilame_ru&quot;,&quot;author&quot;:&quot;Interio&quot;,&quot;link&quot;:&quot;\/clip\/368757\/&quot;,&quot;cqty&quot;:1,&quot;views&quot;:507,&quot;game&quot;:&quot;Playerunknown's Battlegrounds&quot;,&quot;streamer&quot;:&quot;iLame_ru&quot;,&quot;avatar&quot;:&quot;\/files\/avatars\/av_398575_Z1z4.png&quot;,&quot;preview&quot;:&quot;https:\/\/storage2.goodgame.ru\/clips\/previews\/39803_1496590328320.jpg&quot;,&quot;src&quot;:&quot;https:\/\/storage2.goodgame.ru\/clips\/39803_1496590328320.mp4&quot;,&quot;watched&quot;:0,&quot;created&quot;:1496593990,&quot;rating&quot;:null},{&quot;id&quot;:365147,&quot;title&quot;:&quot;\u0422\u0440\u0430\u043d\u0441\u043f\u043e\u0440\u0442 4:0 \u0411\u043e\u0431\u0435\u0440&quot;,&quot;author&quot;:&quot;Truhel&quot;,&quot;link&quot;:&quot;\/clip\/365147\/&quot;,&quot;cqty&quot;:0,&quot;views&quot;:375,&quot;game&quot;:&quot;Playerunknown's Battlegrounds&quot;,&quot;streamer&quot;:&quot;Miker&quot;,&quot;avatar&quot;:&quot;\/files\/avatars\/av_1_BObO.gif&quot;,&quot;preview&quot;:&quot;https:\/\/storage2.goodgame.ru\/clips\/previews\/6_1495735682679.jpg&quot;,&quot;src&quot;:&quot;https:\/\/storage2.goodgame.ru\/clips\/6_1495735682679.mp4&quot;,&quot;watched&quot;:0,&quot;created&quot;:1495735704,&quot;rating&quot;:null}]" class="ng-isolate-scope">
    <div class="info-col">

        <div class="info-block">
            <div class="description">Клипы дня</div>

            <div class="title-slider">
                <!-- ngRepeat: clip in $ctrl.titles track by clip.id --><div class="title-block pos0" ng-repeat="clip in $ctrl.titles track by clip.id">
                    <div class="title ng-binding">Транспорт 4:0 Бобер</div>
                    <div class="author">
                        Автор
                        <span class="nick ng-binding">Truhel</span>
                    </div>
                    <div class="comment-block">
                        <div class="comments ng-binding">
                            <span class="icon icon-bubble"></span> 0
                        </div>
                        <a href="/clip/368640/" class="btn btn-transparent">Комментировать</a>
                    </div>
                </div><!-- end ngRepeat: clip in $ctrl.titles track by clip.id --><div class="title-block pos1" ng-repeat="clip in $ctrl.titles track by clip.id">
                    <div class="title ng-binding">ДОБРЕЙШИЙ ДЕНЁЧЕК</div>
                    <div class="author">
                        Автор
                        <span class="nick ng-binding">Jonk</span>
                    </div>
                    <div class="comment-block">
                        <div class="comments ng-binding">
                            <span class="icon icon-bubble"></span> 1
                        </div>
                        <a href="/clip/368640/" class="btn btn-transparent">Комментировать</a>
                    </div>
                </div><!-- end ngRepeat: clip in $ctrl.titles track by clip.id --><div class="title-block pos2" ng-repeat="clip in $ctrl.titles track by clip.id">
                    <div class="title ng-binding">PUBG - https://pubg.me/player/ilame_ru</div>
                    <div class="author">
                        Автор
                        <span class="nick ng-binding">Interio</span>
                    </div>
                    <div class="comment-block">
                        <div class="comments ng-binding">
                            <span class="icon icon-bubble"></span> 1
                        </div>
                        <a href="/clip/368640/" class="btn btn-transparent">Комментировать</a>
                    </div>
                </div><!-- end ngRepeat: clip in $ctrl.titles track by clip.id -->
            </div>

        </div>


    </div>
    <div class="clip-slide-block">
        <div class="clip-player">
            <gg-video-player clip="$ctrl.list[0]" class="ng-isolate-scope"><div class="video-player" data-sound="half" data-fullscreen="false" ng-attr-data-play="{{ player.play ? 'true' : 'false' }}" data-play="false">
    <div class="video-inner">
        <gg-player-loading loading="player.loading" class="ng-isolate-scope"><div class="loader" style="display: none"><div class="load-status">Подождите, идет обработка клипа</div></div></gg-player-loading>
        <div class="video">
            <!-- ngIf: !player.loading --><gg-html5-video src="player.src" play="player.play" poster="player.poster" volume="player.volume" position="player.position" duration="player.duration" loaded="player.loaded" set-position="player.setPosition" ng-if="!player.loading" class="ng-scope ng-isolate-scope"><div class="poster-faded"></div><video ng-click="video.togglePlay()" poster="https://storage2.goodgame.ru/clips/previews/18482_1496583295155.jpg" loop="" preload="none" ng-src="https://storage2.goodgame.ru/clips/18482_1496583295155.mp4" src="https://storage2.goodgame.ru/clips/18482_1496583295155.mp4"></video></gg-html5-video><!-- end ngIf: !player.loading -->
        </div>

        <!-- ngIf: player.adult==1 -->


        <div class="top-block">
            <div class="shadow top" ng-click="player.play = !player.play"></div>
            <!-- ngIf: player.streamer --><a href="/clip/368640/channel/" target="_blank" class="info-block ng-scope" ng-if="player.streamer">
                <span class="avatar">
                    <img ng-src="/files/avatars/av_104658_n7yA.jpg" alt="" src="/files/avatars/av_104658_n7yA.jpg">
                </span>
                <span class="text-block">
                    <span class="video-name ng-binding">BuHorPaduHa играл в Playerunknown's Battlegrounds</span>
                    <span class="views ng-binding">993 просмотра</span>
                </span>
            </a><!-- end ngIf: player.streamer -->
        </div>
        <div class="status-block">
            <span class="icon icon-video-play"></span>
            <span class="icon icon-video-pause"></span>
        </div>

        <!--a href="" class="next-block">
            <span class="icon icon-skip-next"></span>
            <span class="count">5 / 103</span>
        </a-->
        <div class="bot-block">
            <div class="shadow bot"></div>
            <gg-player-panel src="player.src" play="player.play" volume="player.volume" position="player.position" duration="player.duration" loaded="player.loaded" fullscreen="player.fullscreen" set-position="player.setPosition(value)" class="ng-isolate-scope"><div class="player-control-bottom">
    <div class="progress-bar" ng-click="panel.timelineClick($event)" ng-mousemove="panel.timelineHover($event)">
        <!--div class="tip">{{ panel.formatTime(panel.position) }}</div-->
        <!-- ngIf: panel.duration -->
        <!-- ngIf: panel.duration -->
        <!-- ngIf: panel.duration -->
    </div>
    <div class="control-inner clearfix">
        <div class="player-button play-pause pull-left" ng-class="{active: panel.play}">
            <div class="state play" ng-click="panel.play=true">
                <div class="tip">Старт</div>
                <span class="icon icon-video-play"></span>
            </div>
            <div class="state pause" ng-click="panel.play=false">
                <div class="tip">Пауза</div>
                <span class="icon icon-video-pause"></span>
            </div>
        </div>
        <div class="sound-block pull-left">
            <div class="player-button mute-unmute pull-left" ng-class="panel.getVolumeClass()" ng-click="panel.toggleMute()">
                <div class="state full">
                    <div class="tip">Без звука</div>
                    <span class="icon icon-video-mute-full"></span>
                </div>
                <div class="state half">
                    <div class="tip">Без звука</div>
                    <span class="icon icon-video-mute-half"></span>
                </div>
                <div class="state unmute">
                    <div class="tip">Включить звук</div>
                    <span class="icon icon-video-unmute"></span>
                </div>
            </div>
            <gg-player-volume volume="panel.volume" class="ng-isolate-scope"><div class="sound-bar-block pull-left" ng-click="volume.click($event)">
    <div class="progress-sound">
        <div class="slider-range" style="width: 75%;"></div>
        <div class="handle" style="left:75%;"></div>
    </div>
</div></gg-player-volume>
        </div>
        <div class="timer-block">
            <span class="ng-binding">00:00</span> /
            <span class="ng-binding">--:--</span>
        </div>
        <div class="pull-right">
            <a class="player-button pull-left download" href="https://storage2.goodgame.ru/clips/18482_1496583295155.mp4" download="">
                <div class="state">
                    <div class="tip">Скачать клип</div>
                    <span class="icon icon-video-download"></span>
                </div>
            </a>
            <div class="player-button pull-left full-exitfull" ng-click="panel.fullscreen = !panel.fullscreen" ng-class="{active: panel.fullscreen}">
                <div class="state full">
                    <div class="tip">Во весь экран</div>
                    <span class="icon icon-video-fullscreen"></span>
                </div>
                <div class="state normal">
                    <div class="tip">Выход из полноэкранного режима</div>
                    <span class="icon icon-video-normalmode"></span>
                </div>
                <!--div class="exitfull">
                    <div class="tip">Обычный режим</div>
                    <span class="icon icon-video-download"></span>
                </div-->
            </div>
        </div>
    </div>
</div></gg-player-panel>
        </div>
    </div>
</div></gg-video-player>
        </div>

        <div class="slider">
            <!-- ngRepeat: clip in $ctrl.list track by clip.$index --><div class="slide ng-scope first" ng-click="$ctrl.rotate($index)" ng-class="clip.class" ng-repeat="clip in $ctrl.list track by clip.$index">
                <div class="slider-block">
                    <div class="inner-block">
                        <img src="https://storage2.goodgame.ru/clips/previews/18482_1496583295155.jpg" ng-src="https://storage2.goodgame.ru/clips/previews/18482_1496583295155.jpg" width="100%" height="100%" alt="">
                    </div>
                </div>
            </div><!-- end ngRepeat: clip in $ctrl.list track by clip.$index --><div class="slide ng-scope second" ng-click="$ctrl.rotate($index)" ng-class="clip.class" ng-repeat="clip in $ctrl.list track by clip.$index">
                <div class="slider-block">
                    <div class="inner-block">
                        <img src="https://storage2.goodgame.ru/clips/previews/39803_1496590328320.jpg" ng-src="https://storage2.goodgame.ru/clips/previews/39803_1496590328320.jpg" width="100%" height="100%" alt="">
                    </div>
                </div>
            </div><!-- end ngRepeat: clip in $ctrl.list track by clip.$index --><div class="slide ng-scope third" ng-click="$ctrl.rotate($index)" ng-class="clip.class" ng-repeat="clip in $ctrl.list track by clip.$index">
                <div class="slider-block">
                    <div class="inner-block">
                        <img src="https://storage2.goodgame.ru/clips/previews/6_1495735682679.jpg" ng-src="https://storage2.goodgame.ru/clips/previews/6_1495735682679.jpg" width="100%" height="100%" alt="">
                    </div>
                </div>
            </div><!-- end ngRepeat: clip in $ctrl.list track by clip.$index -->
        </div>
    </div></gg-clips-carousel>
        </div>
`;
    private playButton: Element;
    private volumeBar: Element;
    private muteToggle: Element;

    constructor(placeHolder: Element, player: ggPlayer) {
        super(placeHolder, player);
        placeHolder.innerHTML = this.html;
        this.init();
    }

    private init() {
        this.playButton = this.placeHolder.querySelector('.play-pause');    // TODO: Раздели на разные функции присваивание ссылок и отдельно биндинг событий
        this.playButton.addEventListener('click', () => this.playToggle());

        this.volumeBar = this.placeHolder.querySelector('.sound-block');
        this.volumeBar.addEventListener('mousedown', (e) => this.moveSeekHandle(e));


        this.muteToggle = this.placeHolder.querySelector('.mute-unmute');
        this.muteToggle.addEventListener('click', () => this.player.muteToggle());

        this.player.on(PlayerEvents.PLAY, () => this.playButton.classList.remove('active'));
        this.player.on(PlayerEvents.PAUSE, () => this.playButton.classList.add('active'));

        this.player.on(PlayerEvents.MUTE_TOGGLE, () => this.muteToggle.classList.toggle('mute')); // TODO: А начальное состояние какое?
    }




    private moveSeekHandle(e) {   // TODO: Сделай отдельный компонент и вынеси логику отдельно
        let sliderRange = <HTMLElement>this.volumeBar.querySelector('.slider-range');
        let handle = <HTMLElement>this.volumeBar.querySelector('.handle');
        let rect = this.volumeBar.querySelector('.progress-sound').getBoundingClientRect();
        let moveAt = (e: any) => { // TODO: В новом компоненте сделай это методом класса, а не анонимной функцией
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
        moveAt(e);
        this.volumeBar.addEventListener('mousemove', (e: any) => moveAt(e));

        document.addEventListener('mouseup', (e: any) => {
            document.onmouseup = null;    // TODO: Никаких onmouseup, только эвенты!
            }
        )
    }

    private playToggle() {
        if (this.player.isPlaying()) {
            this.player.pause();
        } else {
            this.player.play();
        }
    }
}