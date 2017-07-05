export class GGStreamApi {
    streamKey: string;
    stream;

    constructor(streamKey: string) {
        this.streamKey = streamKey;
    }

    load() {
        return fetch('https://goodgame.ru/api/player?src=' + this.streamKey)
            .then(response => response.text())
            .then(result => {
                console.log(result);
                this.stream = JSON.parse(result)
            })
            .catch(()=>console.log.bind(console));
    }


    getPoster() : string {
        return this.stream.broadcast.broadcast_logo;
    }

    isOnline(){
        return this.stream.status == 'online';
    }

    isAdult(): boolean {
        console.log(this.stream.adult as boolean);
        return this.stream.adult as boolean;
    }

    hasAnnouncement(): boolean {
        return !!this.stream.broadcast;
    }


    getStreamStartTime() {
        return new Date(this.stream.broadcast.broadcast_start);
    }
}