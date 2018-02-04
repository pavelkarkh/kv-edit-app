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

    handleEdit() {
        //
    }

    handleRemove() {
        //
    }

    handleBulkRemove() {

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

    addKvItem(item) {
        const kvItem = this.createKvItem(item);
        this.addKeyInput.value = '';
        this.addValueInput.value = '';
        this.kvList.appendChild(kvItem);
    }

}

export default View;