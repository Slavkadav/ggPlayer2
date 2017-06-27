import { GGPlayer } from "../GGPlayer";
import 'whatwg-fetch';


export abstract class GGView {
    protected player: GGPlayer;
    protected placeHolder: Element;
    protected templateUrl: string;
    protected template: string;

    constructor(placeHolder: Element, player: GGPlayer) {
        this.placeHolder = placeHolder;
        console.debug('Placeholder:', placeHolder);
        this.player = player;
    }


    protected loadTemplateUrl() {
        return fetch(this.templateUrl)
            .then(response => response.text())
            .catch(() => console.log.bind(console));
    }

    public loadT(): Promise<string> {
        return (this.template ? Promise.resolve(this.template) : this.loadTemplateUrl())
            .then(res => {
                this.placeHolder.innerHTML = res;
                console.log('placeholder html was set');
            })
            .then(res => this.bind())
            .catch(()=>console.log.bind(console));
    }

    protected abstract bind();
}
