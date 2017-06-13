import {EventEmitter} from "events";
import {GgPlayer} from "../GgPlayer";
/**
 * Created by ggdev on 05.06.17.
 */

export abstract class GgView {
    protected player : GgPlayer;
    protected placeHolder : Element;
    protected templateUrl: string;
    protected template: string;

    constructor(placeHolder:Element, player:GgPlayer){
        this.placeHolder = placeHolder;
        this.player = player;
    }

    protected loadTemplate() {
        if (this.template != null && this.template != '') {
            this.placeHolder.innerHTML = this.template;
        }
        else {
            let request = new XMLHttpRequest();
            request.open('get', this.templateUrl, true);
            request.send(null);
            request.onreadystatechange = () => request.readyState == 4 ?
                this.placeHolder.innerHTML = request.responseText :
                console.log('emptyHTML');
        }
    }


}
