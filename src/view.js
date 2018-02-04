import EventEmitter from './events.js';
import { createElement } from './utils.js';

class View extends EventEmitter {
    
    constructor() {
        super();
        
        this.addKeyInput = document.getElementById('addkey-input');
        this.addValueInput = document.getElementById('addvalue-input');
        this.kvList = document.getElementById('kv-list');
        this.form = document.getElementById('kv-form');
        this.bulkRemoveButton = document.getElementById('remove-button-bulk');

        this.form.addEventListener('submit', this.handleForm.bind(this));
        this.bulkRemoveButton.addEventListener('click', this.handleBulkRemove.bind(this));
    }

    findKvItem(id) {
        return this.kvList.querySelector(`[data-id="${id}"]`);
    }

    getKvObject(kvItem) {
        const id = kvItem.getAttribute('data-id');
        const checkbox = kvItem.querySelector('.checkbox');
        const keyInput = kvItem.querySelector('.key-input');
        const valueInput = kvItem.querySelector('.value-input');
        const label = kvItem.querySelector('.kv-item-title');
        const editButton = kvItem.querySelector('.edit-button');
        const removeButton = kvItem.querySelector('.remove-button');

        return {id, checkbox, keyInput, valueInput, label, editButton, removeButton, self: kvItem};
    }

    handleForm(event) {
        
        event.preventDefault();
        if (!this.addKeyInput.value && !this.addValueInput.value) {
            return alert('Оба поля обязательны для заполнения');
        }
        const kv = {
            key: this.addKeyInput.value,
            value: this.addValueInput.value
        };

        this.emmit('add', kv);
    }

    handleToggle() {
        //
    }

    handleEdit({ target }) {
        const kvItem = this.getKvObject(target.parentNode);
        const isEditing = kvItem.self.classList.contains('editing');

        let key = kvItem.keyInput.value;
        let value = kvItem.valueInput.value;

        if (isEditing) {
            this.emmit('edit', {id: kvItem.id, key, value});
        } else {
            let textForEditing = kvItem.label.textContent.split(':');
            kvItem.keyInput.value = textForEditing[0].trim();
            kvItem.valueInput.value = textForEditing[1].trim();
            kvItem.editButton.textContent = 'Сохранить';
            kvItem.self.classList.add('editing');
        }
    }

    handleRemove({ target }) {
        const kvItem = this.getKvObject(target.parentNode);
        this.emmit('remove', kvItem.id);
    }

    handleBulkRemove({ target }) {
        //
    }

    createKvItem(item) {
        const checkbox = createElement('input', {
            type: 'checkbox',
            className: 'checkbox'
        });
        const title = createElement('label', {
            type: 'text',
            className: 'kv-item-title'
        }, `${item.key}: ${item.value}`);
        const keyInput = createElement('input', {
            type: 'text',
            className: 'key-input'
        });
        const valueInput = createElement('input', {
            type: 'text',
            className: 'value-input'
        });
        const editButton = createElement('button', {
            className: 'edit-button'
        }, 'изменить');
        const removeButton = createElement('button', {
            className: 'remove-button'
        }, 'удалить');

        const kvItem = createElement('div', {
            className: 'kv-item',
            'data-id': item.id
        }, checkbox, title, keyInput, valueInput, editButton, removeButton);

        return this.addEventListeners(kvItem);
    }

    addEventListeners(item) {
        const checkbox = item.querySelector('.checkbox');
        const editButton = item.querySelector('.edit-button');
        const removeButton = item.querySelector('.remove-button');

        checkbox.addEventListener('change', this.handleToggle.bind(this));
        editButton.addEventListener('click', this.handleEdit.bind(this));
        removeButton.addEventListener('click', this.handleRemove.bind(this));

        return item;
    }

    show(items) {
        items.forEach(item => {
            const kvItem = this.createKvItem(item);
            this.kvList.appendChild(kvItem);
        });
    }

    addKvItem(item) {
        const kvItem = this.createKvItem(item);
        this.addKeyInput.value = '';
        this.addValueInput.value = '';
        this.kvList.appendChild(kvItem);
    }

    editKvItem({id, key, value}) {
        const kvItem = this.getKvObject(this.findKvItem(id));
        kvItem.label.textContent = `${key}: ${value}`;
        kvItem.editButton.textContent = 'Изменить';
        kvItem.self.classList.remove('editing');
    }

    removeKvItem(id) {
        const kvItem = this.getKvObject(this.findKvItem(id));
        this.kvList.removeChild(kvItem.self);
    }

}

export default View;