import {ggPlayer} from "../ggPlayer";


export abstract class ggVideo{
    protected parentElement : Element;
    protected player : ggPlayer;
    protected videoElement:HTMLVideoElement;

    constructor(parentElement:Element, player: ggPlayer){
        this.parentElement = parentElement;
        this.player = player;
        this.videoElement = document.createElement('video');
        this.parentElement.appendChild(this.videoElement);
    }



    abstract play():void;
    abstract pause():void;
    abstract mute():void;
    abstract setFullscreen():void;
    abstract changeVolume(value:number):void;

    protected seek(value:number){};
}