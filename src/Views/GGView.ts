import {EventEmitter} from "events";
import {GGPlayer} from "../GGPlayer";
import resolve = Promise.resolve;
import reject = Promise.reject;
/**
 * Created by ggdev on 05.06.17.
 */

export abstract class GGView {
    protected player: GGPlayer;
    protected placeHolder: Element;
    protected templateUrl: string;
    protected template: string;

    constructor(placeHolder: Element, player: GGPlayer) {
        this.placeHolder = placeHolder;
        this.player = player;
    }


    protected loadByTemplateUrl() {
        return new Promise<string>((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.open('get', this.templateUrl, true);
            request.send(null);
            console.log('request sent');
            request.addEventListener('load', () => {
                if (request.status == 200) {
                    if (request.responseText.length === 0) {
                        reject();
                    }

                    console.log('got response');
                    resolve(request.responseText);
                } else {
                    console.log('wait for response');
                }
            });
            request.addEventListener('error', () => reject());
        })
    }

    protected loadTemplate() {

        return new Promise((resolve, reject) => {
            console.log('start load template');
            if (this.template != null && this.template != '') {
                this.placeHolder.innerHTML = this.template;
                resolve();
            }
            else {
                this.loadByTemplateUrl()
                    .then(
                        (response) => {
                            this.placeHolder.innerHTML = response;
                            this.onTemplateLoaded();
                            resolve()
                        },
                        () => {
                            console.log('An error occurred during http request');
                            reject();
                        }
                    )
            }
        })


    }


    protected abstract onTemplateLoaded();
}
