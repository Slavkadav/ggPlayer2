"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PlayerEvents_1 = require("../PlayerEvents");
var GgVideo = (function () {
    function GgVideo(parentElement, player) {
        var _this = this;
        this.parentElement = parentElement;
        this.player = player;
        this.videoElement = document.createElement('video');
        this.parentElement.appendChild(this.videoElement);
        this.player.on(PlayerEvents_1.PlayerEvents.PLAY, function () { return _this.play(); });
        this.player.on(PlayerEvents_1.PlayerEvents.PAUSE, function () { return _this.pause(); });
        this.player.on(PlayerEvents_1.PlayerEvents.SEEK, function (value) { return _this.seek(value); });
        this.player.on(PlayerEvents_1.PlayerEvents.CHANGE_VOLUME, function (value) { return _this.changeVolume(value); });
    }
    GgVideo.prototype.seek = function (value) {
    };
    ;
    return GgVideo;
}());
exports.GgVideo = GgVideo;
//# sourceMappingURL=ggVideo.js.map