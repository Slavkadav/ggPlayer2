"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ggVideo = (function () {
    function ggVideo(parentElement, player) {
        this.parentElement = parentElement;
        this.player = player;
        this.videoElement = document.createElement('video');
        this.parentElement.appendChild(this.videoElement);
    }
    ggVideo.prototype.seek = function (value) { };
    ;
    return ggVideo;
}());
exports.ggVideo = ggVideo;
//# sourceMappingURL=ggVideo.js.map