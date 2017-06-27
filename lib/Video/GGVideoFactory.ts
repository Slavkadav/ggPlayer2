import {GGMp4Video} from "./GGMp4Video";
import {GGVideo} from "./GGVideo";
import {GGVideoHLS} from "./GGHlsVideo";
export class GGVideoFactory{
    constructor(){

    }

    createVideo(videoUrl, parent, player):GGVideo{
        console.debug(parent);
        let urlSplit = videoUrl.split('.');
        let type = urlSplit[urlSplit.length-1];
        switch (type){
            case 'mp4':
                console.log('loading mp4 video');
                return new GGMp4Video(videoUrl, parent, player);
            case 'm3u8':
             case 'smil':
                 console.log('loading stream');
                 return new GGVideoHLS(videoUrl, parent, player);
            default:
                return null;
        }

    }
}