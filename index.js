const fs = require('fs');
const commandLineArgs = require('command-line-args');

//set global variables
const filename = 'data.json'; // define el nombre del archivo JSON
const filepath = `data/${filename}`; // define la ruta donde se guardara el archivo JSON

// read command lines args
const optionDefinitions = [
  { name: 'title', alias: 't', type: String },
  { name: 'completed', alias: 'c', type: Boolean, defaultOption: false },
  { name: 'date', alias: 'd', type: String },
];

// load
let items;
try {
  const content = fs.readFileSync(filepath, 'utf-8');
  items = JSON.parse(content);
} catch (error) {
  items = [];
}

//se agrega objeto al array , store the new item
const {
  title = '',
  completed = '',
  date = '',
} = commandLineArgs(optionDefinitions);
if (title) {
  items.push({ title, completed, date });
}

//se guarda la información en el archivo
fs.writeFileSync(filepath, JSON.stringify(items, null, 2));

//print
for (let index = 0; index < items.length; index++) {
  const { title = '', completed = '', date = '' } = items[index];
  const checked = completed ? '[✓]' : '[ ]';
  console.log(`${checked} ${title} ${date}`);
}
