export class StreamApi {
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
            .then(() => {
                console.dir(this.stream);
                console.log('times', Date.now());
                console.log(this.getStreamStartTime().getHours());
            });
    }


    getPoster() {
        return this.stream.broadcast.broadcast_logo;
    }

    isOnline(){
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