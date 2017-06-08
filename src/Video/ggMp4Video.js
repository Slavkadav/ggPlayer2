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
/**
 * Created by ggdev on 05.06.17.
 */
var GgMp4Video = (function (_super) {
    __extends(GgMp4Video, _super);
    function GgMp4Video(videoURL, parentElement, player) {
        var _this = _super.call(this, parentElement, player) || this;
        _this.videoElement.src = videoURL;
        _this.addPlayerListeners();
        return _this;
    }
    GgMp4Video.prototype.play = function () {
        this.videoElement.play();
    };
    GgMp4Video.prototype.pause = function () {
        this.videoElement.pause();
    };
    GgMp4Video.prototype.mute = function () {
        this.videoElement.muted = this.player.isMuted();
    };
    GgMp4Video.prototype.changeVolume = function (value) {
        this.videoElement.volume = value;
    };
    GgMp4Video.prototype.setFullscreen = function () {
        this.videoElement.requestFullscreen();
    };
    GgMp4Video.prototype.seek = function (value) {
        this.videoElement.currentTime = value;
    };
    GgMp4Video.prototype.addPlayerListeners = function () {
    };
    return GgMp4Video;
}(ggVideo_1.GgVideo));
exports.GgMp4Video = GgMp4Video;
//# sourceMappingURL=ggMp4Video.js.map