import Controller from './controller.js';
import Model from './model.js';
import View from './view.js';
import { save, load } from './db.js';

const data = load();

const model = new Model(data || undefined);
model.on('change', data => save(data));

const view = new View();
const controller = new Controller(model, view);