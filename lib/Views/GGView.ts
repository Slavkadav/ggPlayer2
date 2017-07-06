import { GGPlayer } from "../GGPlayer";
import 'whatwg-fetch';


export abstract class GGView {
    protected player: GGPlayer;
    protected placeHolder: Element;
    protected templateUrl: string;
    protected template: string;

    constructor(placeHolder: Element, player: GGPlayer) {
        this.placeHolder = placeHolder;
        this.player = player;
    }


    protected loadTemplateUrl() {
        return fetch(this.templateUrl)
            .then(response => response.text())
            .catch(() => console.log.bind(console));
    }

    public loadTemplate(): Promise<string> {
        return (this.template ? Promise.resolve(this.template) : this.loadTemplateUrl())
            .then(res => {
                console.log(res);
                this.placeHolder.innerHTML = res;
            })
            .then(res => this.bind())
            .catch(()=>console.log.bind(console));
    }

    protected abstract bind();
}
