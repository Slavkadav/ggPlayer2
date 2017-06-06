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
var ggVideo_1 = require("./ggVideo");
var PlayerEvents_1 = require("../PlayerEvents");
/**
 * Created by ggdev on 05.06.17.
 */
var ggMp4Video = (function (_super) {
    __extends(ggMp4Video, _super);
    function ggMp4Video(videoURL, parentElement, player) {
        var _this = _super.call(this, parentElement, player) || this;
        _this.videoElement.src = videoURL;
        _this.addPlayerListeners();
        return _this;
    }
    ggMp4Video.prototype.play = function () {
        this.player.play();
    };
    ggMp4Video.prototype.pause = function () {
        this.player.pause();
    };
    ggMp4Video.prototype.mute = function () {
        this.player.muteToggle();
    };
    ggMp4Video.prototype.changeVolume = function (value) {
        this.player.setVolume(value);
    };
    ggMp4Video.prototype.setFullscreen = function () {
        this.player.setFullscreen(true);
    };
    ggMp4Video.prototype.seek = function (value) {
        this.videoElement.currentTime = value;
    };
    ggMp4Video.prototype.addPlayerListeners = function () {
        var _this = this;
        this.player.on(PlayerEvents_1.PlayerEvents.PLAY, function () { return _this.videoElement.play(); });
        this.player.on(PlayerEvents_1.PlayerEvents.PAUSE, function () { return _this.videoElement.pause(); });
        this.player.on(PlayerEvents_1.PlayerEvents.SEEK, function (value) { return _this.seek(value); });
        this.player.on(PlayerEvents_1.PlayerEvents.CHANGE_VOLUME, function (value) { return _this.videoElement.volume = value; });
    };
    return ggMp4Video;
}(ggVideo_1.ggVideo));
exports.ggMp4Video = ggMp4Video;
//# sourceMappingURL=ggMp4Video.js.map