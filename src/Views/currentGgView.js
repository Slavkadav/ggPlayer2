"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var GgView_1 = require("./GgView");
var PlayerEvents_1 = require("../PlayerEvents");
var GgCurrentView = (function (_super) {
    __extends(GgCurrentView, _super);
    function GgCurrentView(placeHolder, player) {
        var _this = _super.call(this, placeHolder, player) || this;
        _this.html = "<div class=\"daily-clip-wrap\">\n            <gg-clips-carousel clips=\"[{&quot;id&quot;:368640,&quot;title&quot;:&quot;\u0414\u041E\u0411\u0420\u0415\u0419\u0428\u0418\u0419 \u0414\u0415\u041D\u0401\u0427\u0415\u041A&quot;,&quot;author&quot;:&quot;Jonk&quot;,&quot;link&quot;:&quot;/clip/368640/&quot;,&quot;cqty&quot;:1,&quot;views&quot;:993,&quot;game&quot;:&quot;Playerunknown's Battlegrounds&quot;,&quot;streamer&quot;:&quot;BuHorPaduHa&quot;,&quot;avatar&quot;:&quot;/files/avatars/av_104658_n7yA.jpg&quot;,&quot;preview&quot;:&quot;https://storage2.goodgame.ru/clips/previews/18482_1496583295155.jpg&quot;,&quot;src&quot;:&quot;https://storage2.goodgame.ru/clips/18482_1496583295155.mp4&quot;,&quot;watched&quot;:0,&quot;created&quot;:1496583293,&quot;rating&quot;:null},{&quot;id&quot;:368757,&quot;title&quot;:&quot;PUBG - https://pubg.me/player/ilame_ru&quot;,&quot;author&quot;:&quot;Interio&quot;,&quot;link&quot;:&quot;/clip/368757/&quot;,&quot;cqty&quot;:1,&quot;views&quot;:507,&quot;game&quot;:&quot;Playerunknown's Battlegrounds&quot;,&quot;streamer&quot;:&quot;iLame_ru&quot;,&quot;avatar&quot;:&quot;/files/avatars/av_398575_Z1z4.png&quot;,&quot;preview&quot;:&quot;https://storage2.goodgame.ru/clips/previews/39803_1496590328320.jpg&quot;,&quot;src&quot;:&quot;https://storage2.goodgame.ru/clips/39803_1496590328320.mp4&quot;,&quot;watched&quot;:0,&quot;created&quot;:1496593990,&quot;rating&quot;:null},{&quot;id&quot;:365147,&quot;title&quot;:&quot;\u0422\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442 4:0 \u0411\u043E\u0431\u0435\u0440&quot;,&quot;author&quot;:&quot;Truhel&quot;,&quot;link&quot;:&quot;/clip/365147/&quot;,&quot;cqty&quot;:0,&quot;views&quot;:375,&quot;game&quot;:&quot;Playerunknown's Battlegrounds&quot;,&quot;streamer&quot;:&quot;Miker&quot;,&quot;avatar&quot;:&quot;/files/avatars/av_1_BObO.gif&quot;,&quot;preview&quot;:&quot;https://storage2.goodgame.ru/clips/previews/6_1495735682679.jpg&quot;,&quot;src&quot;:&quot;https://storage2.goodgame.ru/clips/6_1495735682679.mp4&quot;,&quot;watched&quot;:0,&quot;created&quot;:1495735704,&quot;rating&quot;:null}]\" class=\"ng-isolate-scope\">\n    <div class=\"info-col\">\n\n        <div class=\"info-block\">\n            <div class=\"description\">\u041A\u043B\u0438\u043F\u044B \u0434\u043D\u044F</div>\n\n            <div class=\"title-slider\">\n                <!-- ngRepeat: clip in $ctrl.titles track by clip.id --><div class=\"title-block pos0\" ng-repeat=\"clip in $ctrl.titles track by clip.id\">\n                    <div class=\"title ng-binding\">\u0422\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442 4:0 \u0411\u043E\u0431\u0435\u0440</div>\n                    <div class=\"author\">\n                        \u0410\u0432\u0442\u043E\u0440\n                        <span class=\"nick ng-binding\">Truhel</span>\n                    </div>\n                    <div class=\"comment-block\">\n                        <div class=\"comments ng-binding\">\n                            <span class=\"icon icon-bubble\"></span> 0\n                        </div>\n                        <a href=\"/clip/368640/\" class=\"btn btn-transparent\">\u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C</a>\n                    </div>\n                </div><!-- end ngRepeat: clip in $ctrl.titles track by clip.id --><div class=\"title-block pos1\" ng-repeat=\"clip in $ctrl.titles track by clip.id\">\n                    <div class=\"title ng-binding\">\u0414\u041E\u0411\u0420\u0415\u0419\u0428\u0418\u0419 \u0414\u0415\u041D\u0401\u0427\u0415\u041A</div>\n                    <div class=\"author\">\n                        \u0410\u0432\u0442\u043E\u0440\n                        <span class=\"nick ng-binding\">Jonk</span>\n                    </div>\n                    <div class=\"comment-block\">\n                        <div class=\"comments ng-binding\">\n                            <span class=\"icon icon-bubble\"></span> 1\n                        </div>\n                        <a href=\"/clip/368640/\" class=\"btn btn-transparent\">\u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C</a>\n                    </div>\n                </div><!-- end ngRepeat: clip in $ctrl.titles track by clip.id --><div class=\"title-block pos2\" ng-repeat=\"clip in $ctrl.titles track by clip.id\">\n                    <div class=\"title ng-binding\">PUBG - https://pubg.me/player/ilame_ru</div>\n                    <div class=\"author\">\n                        \u0410\u0432\u0442\u043E\u0440\n                        <span class=\"nick ng-binding\">Interio</span>\n                    </div>\n                    <div class=\"comment-block\">\n                        <div class=\"comments ng-binding\">\n                            <span class=\"icon icon-bubble\"></span> 1\n                        </div>\n                        <a href=\"/clip/368640/\" class=\"btn btn-transparent\">\u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C</a>\n                    </div>\n                </div><!-- end ngRepeat: clip in $ctrl.titles track by clip.id -->\n            </div>\n\n        </div>\n\n\n    </div>\n    <div class=\"clip-slide-block\">\n        <div class=\"clip-player\">\n            <gg-video-player clip=\"$ctrl.list[0]\" class=\"ng-isolate-scope\"><div class=\"video-player\" data-sound=\"half\" data-fullscreen=\"false\" ng-attr-data-play=\"{{ player.play ? 'true' : 'false' }}\" data-play=\"false\">\n    <div class=\"video-inner\">\n        <gg-player-loading loading=\"player.loading\" class=\"ng-isolate-scope\"><div class=\"loader\" style=\"display: none\"><div class=\"load-status\">\u041F\u043E\u0434\u043E\u0436\u0434\u0438\u0442\u0435, \u0438\u0434\u0435\u0442 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0430 \u043A\u043B\u0438\u043F\u0430</div></div></gg-player-loading>\n        <div class=\"video\">\n            <!-- ngIf: !player.loading --><div class=\"poster-faded\"></div><!-- end ngIf: !player.loading -->\n        </div>\n\n        <!-- ngIf: player.adult==1 -->\n\n\n        <div class=\"top-block\">\n            <div class=\"shadow top\" ng-click=\"player.play = !player.play\"></div>\n            <!-- ngIf: player.streamer --><a href=\"/clip/368640/channel/\" target=\"_blank\" class=\"info-block ng-scope\" ng-if=\"player.streamer\">\n                <span class=\"avatar\">\n                    <img ng-src=\"/files/avatars/av_104658_n7yA.jpg\" alt=\"\" src=\"/files/avatars/av_104658_n7yA.jpg\">\n                </span>\n                <span class=\"text-block\">\n                    <span class=\"video-name ng-binding\">BuHorPaduHa \u0438\u0433\u0440\u0430\u043B \u0432 Playerunknown's Battlegrounds</span>\n                    <span class=\"views ng-binding\">993 \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u0430</span>\n                </span>\n            </a><!-- end ngIf: player.streamer -->\n        </div>\n        <div class=\"status-block\">\n            <span class=\"icon icon-video-play\"></span>\n            <span class=\"icon icon-video-pause\"></span>\n        </div>\n\n        <!--a href=\"\" class=\"next-block\">\n            <span class=\"icon icon-skip-next\"></span>\n            <span class=\"count\">5 / 103</span>\n        </a-->\n        <div class=\"bot-block\">\n            <div class=\"shadow bot\"></div>\n            <gg-player-panel src=\"player.src\" play=\"player.play\" volume=\"player.volume\" position=\"player.position\" duration=\"player.duration\" loaded=\"player.loaded\" fullscreen=\"player.fullscreen\" set-position=\"player.setPosition(value)\" class=\"ng-isolate-scope\"><div class=\"player-control-bottom\">\n    <div class=\"progress-bar\" ng-click=\"panel.timelineClick($event)\" ng-mousemove=\"panel.timelineHover($event)\">\n        <!--div class=\"tip\">{{ panel.formatTime(panel.position) }}</div-->\n        <!-- ngIf: panel.duration -->\n        <!-- ngIf: panel.duration -->\n        <!-- ngIf: panel.duration -->\n    </div>\n    <div class=\"control-inner clearfix\">\n        <div class=\"player-button play-pause pull-left\" ng-class=\"{active: panel.play}\">\n            <div class=\"state play\" ng-click=\"panel.play=true\">\n                <div class=\"tip\">\u0421\u0442\u0430\u0440\u0442</div>\n                <span class=\"icon icon-video-play\"></span>\n            </div>\n            <div class=\"state pause\" ng-click=\"panel.play=false\">\n                <div class=\"tip\">\u041F\u0430\u0443\u0437\u0430</div>\n                <span class=\"icon icon-video-pause\"></span>\n            </div>\n        </div>\n        <div class=\"sound-block pull-left\">\n            <div class=\"player-button mute-unmute pull-left\" ng-class=\"panel.getVolumeClass()\" ng-click=\"panel.toggleMute()\">\n                <div class=\"state full\">\n                    <div class=\"tip\">\u0411\u0435\u0437 \u0437\u0432\u0443\u043A\u0430</div>\n                    <span class=\"icon icon-video-mute-full\"></span>\n                </div>\n                <div class=\"state half\">\n                    <div class=\"tip\">\u0411\u0435\u0437 \u0437\u0432\u0443\u043A\u0430</div>\n                    <span class=\"icon icon-video-mute-half\"></span>\n                </div>\n                <div class=\"state unmute\">\n                    <div class=\"tip\">\u0412\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u0437\u0432\u0443\u043A</div>\n                    <span class=\"icon icon-video-unmute\"></span>\n                </div>\n            </div>\n            <gg-player-volume volume=\"panel.volume\" class=\"ng-isolate-scope\"><div class=\"sound-bar-block pull-left\" ng-click=\"volume.click($event)\">\n    <div class=\"progress-sound\">\n        <div class=\"slider-range\" style=\"width: 75%;\"></div>\n        <div class=\"handle\" style=\"left:75%;\"></div>\n    </div>\n</div></gg-player-volume>\n        </div>\n        <div class=\"timer-block\">\n            <span class=\"ng-binding\">00:00</span> /\n            <span class=\"ng-binding\">--:--</span>\n        </div>\n        <div class=\"pull-right\">\n            <a class=\"player-button pull-left download\" href=\"https://storage2.goodgame.ru/clips/18482_1496583295155.mp4\" download=\"\">\n                <div class=\"state\">\n                    <div class=\"tip\">\u0421\u043A\u0430\u0447\u0430\u0442\u044C \u043A\u043B\u0438\u043F</div>\n                    <span class=\"icon icon-video-download\"></span>\n                </div>\n            </a>\n            <div class=\"player-button pull-left full-exitfull\" ng-click=\"panel.fullscreen = !panel.fullscreen\" ng-class=\"{active: panel.fullscreen}\">\n                <div class=\"state full\">\n                    <div class=\"tip\">\u0412\u043E \u0432\u0435\u0441\u044C \u044D\u043A\u0440\u0430\u043D</div>\n                    <span class=\"icon icon-video-fullscreen\"></span>\n                </div>\n                <div class=\"state normal\">\n                    <div class=\"tip\">\u0412\u044B\u0445\u043E\u0434 \u0438\u0437 \u043F\u043E\u043B\u043D\u043E\u044D\u043A\u0440\u0430\u043D\u043D\u043E\u0433\u043E \u0440\u0435\u0436\u0438\u043C\u0430</div>\n                    <span class=\"icon icon-video-normalmode\"></span>\n                </div>\n                <!--div class=\"exitfull\">\n                    <div class=\"tip\">\u041E\u0431\u044B\u0447\u043D\u044B\u0439 \u0440\u0435\u0436\u0438\u043C</div>\n                    <span class=\"icon icon-video-download\"></span>\n                </div-->\n            </div>\n        </div>\n    </div>\n</div></gg-player-panel>\n        </div>\n    </div>\n</div></gg-video-player>\n        </div>\n\n        <div class=\"slider\">\n            <!-- ngRepeat: clip in $ctrl.list track by clip.$index --><div class=\"slide ng-scope first\" ng-click=\"$ctrl.rotate($index)\" ng-class=\"clip.class\" ng-repeat=\"clip in $ctrl.list track by clip.$index\">\n                <div class=\"slider-block\">\n                    <div class=\"inner-block\">\n                        <img src=\"https://storage2.goodgame.ru/clips/previews/18482_1496583295155.jpg\" ng-src=\"https://storage2.goodgame.ru/clips/previews/18482_1496583295155.jpg\" width=\"100%\" height=\"100%\" alt=\"\">\n                    </div>\n                </div>\n            </div><!-- end ngRepeat: clip in $ctrl.list track by clip.$index --><div class=\"slide ng-scope second\" ng-click=\"$ctrl.rotate($index)\" ng-class=\"clip.class\" ng-repeat=\"clip in $ctrl.list track by clip.$index\">\n                <div class=\"slider-block\">\n                    <div class=\"inner-block\">\n                        <img src=\"https://storage2.goodgame.ru/clips/previews/39803_1496590328320.jpg\" ng-src=\"https://storage2.goodgame.ru/clips/previews/39803_1496590328320.jpg\" width=\"100%\" height=\"100%\" alt=\"\">\n                    </div>\n                </div>\n            </div><!-- end ngRepeat: clip in $ctrl.list track by clip.$index --><div class=\"slide ng-scope third\" ng-click=\"$ctrl.rotate($index)\" ng-class=\"clip.class\" ng-repeat=\"clip in $ctrl.list track by clip.$index\">\n                <div class=\"slider-block\">\n                    <div class=\"inner-block\">\n                        <img src=\"https://storage2.goodgame.ru/clips/previews/6_1495735682679.jpg\" ng-src=\"https://storage2.goodgame.ru/clips/previews/6_1495735682679.jpg\" width=\"100%\" height=\"100%\" alt=\"\">\n                    </div>\n                </div>\n            </div><!-- end ngRepeat: clip in $ctrl.list track by clip.$index -->\n        </div>\n    </div></gg-clips-carousel>\n        </div>\n";
        placeHolder.innerHTML = _this.html;
        _this.init();
        return _this;
    }
    GgCurrentView.prototype.init = function () {
        var _this = this;
        this.clipPlayer = this.placeHolder.querySelector('.clip-player');
        this.playButton = this.placeHolder.querySelector('.play-pause');
        this.playButton.addEventListener('click', function () { return _this.playToggle(); });
        this.volumeBar = this.placeHolder.querySelector('.sound-block');
        this.volumeBar.addEventListener('click', function (e) { return _this.moveAt(e); });
        var handle = this.volumeBar.querySelector('.handle');
        handle.addEventListener('mousedown', function (e) { return _this.moveSeekHandle(e); });
        document.addEventListener('mouseup', function (e) {
            _this.isDragging = false;
        });
        this.muteToggle = this.placeHolder.querySelector('.mute-unmute');
        this.muteToggle.addEventListener('click', function () { return _this.player.muteToggle(); });
        this.player.on(PlayerEvents_1.PlayerEvents.PLAY, function () { return _this.playButton.classList.add('active'); });
        this.player.on(PlayerEvents_1.PlayerEvents.PAUSE, function () { return _this.playButton.classList.remove('active'); });
        this.player.on(PlayerEvents_1.PlayerEvents.MUTE_TOGGLE, function () { return _this.muteToggle.classList.toggle('mute'); });
        this.player.on(PlayerEvents_1.PlayerEvents.FULLSCREEN_CHANGE, function (value) { return _this.fullscreenToggle(value); });
        this.fullscreenButton = this.placeHolder.querySelector('.state');
        this.fullscreenButton.addEventListener('click', function () { return _this.player.setFullscreen(true); });
    };
    GgCurrentView.prototype.moveAt = function (e) {
        if (!this.isDragging && e.type !== 'click')
            return;
        var sliderRange = this.volumeBar.querySelector('.slider-range');
        var rect = this.volumeBar.querySelector('.progress-sound').getBoundingClientRect();
        var handle = this.volumeBar.querySelector('.handle');
        var handleLeft = (e.pageX - rect.left - handle.offsetWidth / 2);
        var sliderRight = (e.pageX - rect.left - handle.offsetWidth / 2);
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
        var volumeValue = handleLeft / rect.width;
        this.player.setVolume(volumeValue);
        handle.style.left = handleLeft / rect.width * 100 + '%';
        sliderRange.style.width = sliderRight / rect.width * 100 + '%';
    };
    ;
    GgCurrentView.prototype.moveSeekHandle = function (e) {
        var _this = this;
        this.isDragging = true;
        document.addEventListener('mousemove', function (e) { return _this.moveAt(e); });
    };
    GgCurrentView.prototype.playToggle = function () {
        if (this.player.isPlaying()) {
            this.player.pause();
        }
        else {
            this.player.play();
        }
    };
    GgCurrentView.prototype.fullscreenToggle = function (value) {
        if (value === true) {
            if (this.clipPlayer.requestFullscreen) {
                this.clipPlayer.requestFullscreen();
            }
            else if (this.clipPlayer.webkitRequestFullScreen) {
                this.clipPlayer.webkitRequestFullScreen();
            }
        }
        else {
            if (document.exitFullscreen)
                document.exitFullscreen();
            else if (document.webkitExitFullscreen)
                document.webkitExitFullscreen();
        }
    };
    return GgCurrentView;
}(GgView_1.GgView));
exports.GgCurrentView = GgCurrentView;
//# sourceMappingURL=currentGgView.js.map