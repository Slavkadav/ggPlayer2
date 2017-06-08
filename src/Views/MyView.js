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
/**
 * Created by ggdev on 05.06.17.
 */
var MyView = (function (_super) {
    __extends(MyView, _super);
    function MyView(placeHolder, player) {
        var _this = _super.call(this, placeHolder, player) || this;
        _this.htmlText = "<div class=\"controls\">\n            <input type=\"range\" class=\"seekBar\" value=\"0\">\n            <button type=\"button\" class=\"play\">Play</button>\n            <button type=\"button\" class=\"pause\">Pause</button>\n            <button type=\"button\" class=\"mute\">Mute</button>\n            <button type=\"button\" class=\"fullscreen\">Fullscreen</button>\n            <input type=\"range\" class=\"volumeBar\" value=\"100\"/>\n            <select name=\"quality\" class=\"qualitySet\">\n          </select>\n         </div>";
        _this.parentElement = placeHolder;
        _this.placeHolder.innerHTML = _this.htmlText;
        _this.init();
        return _this;
    }
    MyView.prototype.init = function () {
        var _this = this;
        this.playButton = this.parentElement.querySelector('.play');
        this.playButton.addEventListener('click', function () { return _this.player.play(); });
        this.pauseButton = this.parentElement.querySelector('.pause');
        this.pauseButton.addEventListener('click', function () { return _this.player.pause(); });
        this.muteButton = this.parentElement.querySelector('.mute');
        this.muteButton.addEventListener('click', function () { return _this.player.muteToggle(); });
        this.seekBar = this.parentElement.querySelector('.seekBar');
        this.seekBar.addEventListener('change', function () { return _this.player.seek(+_this.seekBar.value); });
        this.volumeBar = this.parentElement.querySelector('.volumeBar');
        this.volumeBar.min = '0';
        this.volumeBar.max = '1';
        this.volumeBar.step = '0.01';
        this.volumeBar.addEventListener('change', function () { return _this.player.setVolume(+_this.volumeBar.value); });
        this.player.on(PlayerEvents_1.PlayerEvents.PLAY, function () { return _this.videoPlay(); });
        this.player.on(PlayerEvents_1.PlayerEvents.PAUSE, function () { return _this.videoPause(); });
        this.player.on(PlayerEvents_1.PlayerEvents.MUTE_TOGGLE, function () { return _this.videoMuteToggle(); });
        this.player.on(PlayerEvents_1.PlayerEvents.CHANGE_VOLUME, function (value) { return _this.changeVolume(value); });
    };
    MyView.prototype.videoPlay = function () {
        this.playButton.disabled = true;
        this.pauseButton.disabled = false;
    };
    MyView.prototype.videoPause = function () {
        this.playButton.disabled = false;
        this.pauseButton.disabled = true;
    };
    MyView.prototype.videoMuteToggle = function () {
        if (this.player.isMuted()) {
            this.muteButton.textContent = "Unmute";
        }
        else {
            this.muteButton.textContent = "Mute";
        }
    };
    MyView.prototype.changeVolume = function (value) {
        this.volumeBar.value = value.toString();
    };
    return MyView;
}(GgView_1.GgView));
exports.MyView = MyView;
//# sourceMappingURL=MyView.js.map