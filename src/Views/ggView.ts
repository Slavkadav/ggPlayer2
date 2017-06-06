import {EventEmitter} from "events";
import {ggPlayer} from "../ggPlayer";
/**
 * Created by ggdev on 05.06.17.
 */

export abstract class ggView {
    protected player : ggPlayer;
    protected placeHolder : Element;

    constructor(placeHolder:Element, player:ggPlayer){
        this.placeHolder = placeHolder;
        this.player = player;

    }

}
