class EventEmitter {
    constructor() {
        this.events = {};
    }

    on(type, callback) {
        this.events[type] = this.events[type] || [];
        this.events[type].push(callback);
    }

    emmit(type, arg) {
        if (this.events[type]) {
            this.events[type].forEach(callback => callback(arg));
        }
    }
}

export default EventEmitter;