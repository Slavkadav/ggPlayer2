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
var currentGgView_1 = require("./Views/currentGgView");
var ggPlayer = (function (_super) {
    __extends(ggPlayer, _super);
    function ggPlayer(parent) {
        var _this = _super.call(this) || this;
        _this.parentElement = document.querySelector("." + parent);
        _this.muted = false;
        _this.playing = false;
        _this.fullscreen = false;
        return _this;
    }
    ggPlayer.prototype.setPlayerView = function (view) { this.view = view; };
    ;
    ggPlayer.prototype.initVideo = function (videoUrl) {
        this.setPlayerView(new currentGgView_1.currentGgView(this.parentElement, this));
        this.video = new ggMp4Video_1.ggMp4Video(videoUrl, document.querySelector('.video'), this);
    };
    ggPlayer.prototype.play = function () {
        this.playing = true;
        this.emit(PlayerEvents_1.PlayerEvents.PLAY);
    };
    ggPlayer.prototype.pause = function () {
        this.playing = false;
        this.emit(PlayerEvents_1.PlayerEvents.PAUSE);
    };
    ggPlayer.prototype.muteToggle = function () {
        this.emit(PlayerEvents_1.PlayerEvents.MUTE_TOGGLE);
        this.muted = !this.muted;
    };
    ggPlayer.prototype.seek = function (value) {
        this.emit(PlayerEvents_1.PlayerEvents.SEEK, value);
        this.videoTime = value;
    };
    ggPlayer.prototype.setVolume = function (value) {
        this.emit(PlayerEvents_1.PlayerEvents.CHANGE_VOLUME, value);
        this.volume = value;
    };
    ggPlayer.prototype.setFullscreen = function (value) {
        this.fullscreen = value;
        this.emit(PlayerEvents_1.PlayerEvents.FULLSCREEN_CHANGE, value);
    };
    ggPlayer.prototype.isPlaying = function () {
        return this.playing;
    };
    ggPlayer.prototype.isPaused = function () {
        return !this.playing;
    };
    ggPlayer.prototype.isMuted = function () {
        return this.muted;
    };
    return ggPlayer;
}(events_1.EventEmitter));
exports.ggPlayer = ggPlayer;
//# sourceMappingURL=ggPlayer.js.map