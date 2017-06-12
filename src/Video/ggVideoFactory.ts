import {GgMp4Video} from "./ggMp4Video";
import {GgVideo} from "./ggVideo";
import {GgVideoHLS} from "./GgHlsVideo";
export class GgVideoFactory{
    constructor(){

    }

    createVideo(videoUrl, parent, player):GgVideo{
        let urlSplit = videoUrl.split('.');
        let type = urlSplit[urlSplit.length-1];
        switch (type){
            case 'mp4':
                console.log('loading mp4 video');
                return new GgMp4Video(videoUrl,parent, player);
            // case 'm3u8':
             case 'smil':
                 console.log('loading stream');
                 return new GgVideoHLS(videoUrl,parent,player);
            default:
                return null;
        }

    }
}