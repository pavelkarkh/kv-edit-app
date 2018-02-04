class Controller {
    
    constructor(model, view) {
        this.model = model;
        this.view = view;

        view.on('add', this.handleAddItem.bind(this));
        view.on('edit', this.handeEditItem.bind(this));
        view.on('remove', this.handleRemoveItem.bind(this));

        view.show(model.storage);
    }

    handleAddItem(item) {
        const kvItem = this.model.addItem({
            id: Date.now(),
            key: item.key,
            value: item.value
        });

        this.view.addKvItem(kvItem);
    }

    handeEditItem({id, key, value}) {
        const item = this.model.updateItem(id, {key, value});
        this.view.editKvItem(item);
    }

    handleRemoveItem(id) {
        if (this.model.removeItem(id)) {
            this.view.removeKvItem(id);
        }
    }

}

export default Controller;