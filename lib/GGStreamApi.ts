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
            .catch(() => console.log.bind(console));
    }


    getBroadcastPoster(): string {
        return this.stream.broadcast.broadcast_logo;
    }

    getChannelPoster(): string {
        return this.stream.channel_poster;
    }

    isOnline() {
        console.log('is stream online?');
        console.log(this.stream.channel_status === 'online');
        return this.stream.channel_status === 'online';
    }

    isAdult(): boolean {
        console.log(this.stream.adult as boolean);
        return this.stream.adult as boolean;
    }

    hasAnnouncement(): boolean {
        if (this.stream.broadcast.broadcast_start) {
            console.log(this.stream.broadcast);
            return true
        }
        return false;
    }


    getStreamStartTime() {
        return new Date(this.stream.broadcast.broadcast_start);
    }
}