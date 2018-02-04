import EventEmitter from './events.js';

class Model extends EventEmitter {
    
    constructor(data = []) {
        super();

        this.storage = data;
    }

    getItem(id) {
        this.storage.find(item => item.id == id);
    }

    addItem(item) {
        this.storage.push(item);
        this.emmit('change', this.storage);
        return item;
    }

    updateItem(id, value) {
        const item = this.getItem(id);
        Object.keys(value).forEach(p => item[p] = value[p]);
        this.emmit('change', this.storage);
        return item;
    }

    removeItem(id) {
        const index = this.storage.findIndex(item => item.id == id);

        if (index > -1) {
            this.storage.splice(index, 1);
            this.emmit('change', this.storage);
            return true;
        } else {
            return false;
        }
    }
    
}

export default Model;