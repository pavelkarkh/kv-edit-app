class Controller {
    
    constructor(model, view) {
        this.model = model;
        this.view = view;

        view.on('add', this.handleAddItem.bind(this));
    }

    handleAddItem(item) {
        const kvItem = {
            id: Date.now(),
            key: item.key,
            value: item.value
        };

        this.view.addKvItem(kvItem);
    }

}

export default Controller;