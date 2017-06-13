import {EventEmitter} from "events";
import {GgPlayer} from "../GgPlayer";
/**
 * Created by ggdev on 05.06.17.
 */

export abstract class GgView {
    protected player : GgPlayer;
    protected placeHolder : Element;

    constructor(placeHolder:Element, player:GgPlayer){
        this.placeHolder = placeHolder;
        this.player = player;

    }

}
