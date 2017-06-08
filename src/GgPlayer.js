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
var events_1 = require("events");
var PlayerEvents_1 = require("./PlayerEvents");
var ggMp4Video_1 = require("./Video/ggMp4Video");
var currentGgView_1 = require("./Views/currentGgView"); // TODO: Все классы называются gg..., а этот почему-то не такой
var GgPlayer = (function (_super) {
    __extends(GgPlayer, _super);
    function GgPlayer(parent) {
        var _this = _super.call(this) || this;
        _this.parentElement = parent; // TODO: Никаких селекторов, пускай передается уже ссылка на элемент
        _this.muted = false;
        _this.playing = false;
        _this.fullscreen = false;
        return _this;
    }
    GgPlayer.prototype.setPlayerView = function (view) {
        this.view = view;
    };
    ; // TODO: Coding Style
    GgPlayer.prototype.initVideo = function (videoUrl) {
        this.setPlayerView(new currentGgView_1.GgCurrentView(this.parentElement, this)); // TODO: Почему тут setPlayerView(),
        this.video = new ggMp4Video_1.GgMp4Video(videoUrl, document.querySelector('.video'), this); // TODO: а тут просто присваивание?
    };
    GgPlayer.prototype.play = function () {
        this.playing = true;
        this.emit(PlayerEvents_1.PlayerEvents.PLAY);
    };
    GgPlayer.prototype.pause = function () {
        this.playing = false;
        this.emit(PlayerEvents_1.PlayerEvents.PAUSE);
    };
    GgPlayer.prototype.muteToggle = function () {
        this.muted = !this.muted;
        this.emit(PlayerEvents_1.PlayerEvents.MUTE_TOGGLE);
    };
    GgPlayer.prototype.seek = function (value) {
        this.emit(PlayerEvents_1.PlayerEvents.SEEK, value);
        this.videoTime = value;
    };
    GgPlayer.prototype.setVolume = function (value) {
        this.emit(PlayerEvents_1.PlayerEvents.CHANGE_VOLUME, value);
        this.volume = value;
    };
    GgPlayer.prototype.setFullscreen = function (value) {
        this.fullscreen = value;
        this.emit(PlayerEvents_1.PlayerEvents.FULLSCREEN_CHANGE, value);
    };
    GgPlayer.prototype.isPlaying = function () {
        return this.playing;
    };
    GgPlayer.prototype.isPaused = function () {
        return !this.playing;
    };
    GgPlayer.prototype.isMuted = function () {
        return this.muted;
    };
    GgPlayer.prototype.setQualityLevel = function (level) {
        this.currentQualityLevel = level;
        this.emit(PlayerEvents_1.PlayerEvents.CHANGE_QUALITY, level);
    };
    return GgPlayer;
}(events_1.EventEmitter));
exports.GgPlayer = GgPlayer;
//# sourceMappingURL=GgPlayer.js.map