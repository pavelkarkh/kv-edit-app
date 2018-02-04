function save(data) {
    const string = JSON.stringify(data);
    localStorage.setItem('kv-data', string);
}

function load() {
    const string = localStorage.getItem('kv-data');
    const data = JSON.parse(string);

    return data;
}

export { save, load };