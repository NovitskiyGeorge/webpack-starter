import '../styles/index.scss';

if (process.env.NODE_ENV === 'development') {
  require('../index.html');
}

// console.log('webpack starterkit');

class Piano {
  constructor(components) {
    this.components = components;
    this.piano = document.querySelector('.piano');
    this.keyboard = document.createElement('div');
    this.instrument = document.createElement('div');
    this.app = document.querySelector('.app');
  }
  createPiano() {
    this.instrument.className = 'piano';
    this.instrument.innerHTML = this.components;
    this.app.append(this.instrument);
  }
  createKeyboard() {
    this.keyboard.className = 'keyboard';
    let html = this.components.map(key => {
      let cls = 'key';
      switch(key.color) {
        case 'white': 
          cls+= ' key__white';
          break;
        case 'black': 
          cls+= ' key__black';
      }
      return `<div class="${cls}" data-id=${key.id} data-url=${key.url} data-name=${key.name}></div>`;
    });
    let htmlString = html.join('');
    this.keyboard.innerHTML = htmlString;
    this.piano.appendChild(this.keyboard);
  }
}

function addBodyPiano() {
  let bodyPiano = `
  <div class="piano__panel"></div>
  <div class="piano__redLine"></div>
  `;
  let piano = new Piano(bodyPiano);
  piano.createPiano();
}

function getKeys() {
  let keysPromise = fetch('http://localhost:3000/keys').then(res => {
    return res.json();
  });
  keysPromise.then (
    res => {
      createKeys(res);
    },
    err => {
      console.log('Error');
    }
  );
}

function createKeys(keys) {  
  let keyboard = new Piano(keys);  
  keyboard.createKeyboard();
}
class Tools {
  constructor(nameTools) {
    this.nameTools = nameTools;
    this.app = document.querySelector('.app');
    this.stan = document.querySelector('.stan');
    this.tools = document.createElement('div');
    this.musicClef = document.querySelector('#clef');
    this.currentNote = document.querySelector('.stan__note');

  }
  addSelect() {
    this.tools.className = 'tools';
    this.tools.innerHTML = this.nameTools;
    this.app.prepend(this.tools);
  }
  changeMusicClef() {
    switch(this.nameTools) {
      case 'bass':
        this.musicClef.className = `stan__clef-${this.nameTools}`;
        break;
      case 'treble':
        this.musicClef.className = `stan__clef-${this.nameTools}`;
        break;
    }
  }
  changeNote() {
    switch(this.nameTools) {
      case 'do' :
        this.currentNote.id = this.nameTools;
        break;
      case 'doDies' :
        this.currentNote.id = this.nameTools;
        break;
      case 're' :
        this.currentNote.id = this.nameTools;
        break; 
      case 'reDies' :
        this.currentNote.id = this.nameTools;
        break;
      case 'mi' :
        this.currentNote.id = this.nameTools;
        break;  
      case 'fa' :
        this.currentNote.id = this.nameTools;
        break;
      case 'faDies' :
        this.currentNote.id = this.nameTools;
        break;
      case 'sol' :
        this.currentNote.id = this.nameTools;
        break;
      case 'solDies' :
        this.currentNote.id = this.nameTools;
        break;
      case 'lya' :
        this.currentNote.id = this.nameTools;
        break;
      case 'lyaDies' :
        this.currentNote.id = this.nameTools;
        break;
      case 'si' :
        this.currentNote.id = this.nameTools;
        break;
    }
  }
}

function createMusicStan() {
  let app = document.querySelector('.app');
  let musicStan = document.createElement('div');
  musicStan.className = 'stan';
  musicStan.innerHTML = `
  <div class="stan__clef-treble" id="clef"></div>
  <div class="stan__note"></div>`;
  app.prepend(musicStan);
}

function createSelect() {
  let selectClef = `  
  <select data-name='clef'>
    <option value=${'treble'}>Скрипичный ключ</option>
    <option value=${'bass'}>Басовый ключ</option>
  </select>
  <input type="checkbox" class="checkboxOctava" value="oktavaOne"> 1-я октава
  <input type="checkbox" class="checkboxOctava" value="oktavaTwo"> 2-я октава
  <input type="checkbox" class="checkboxOctava" value="oktavaThree"> 3-я октава
  <input type="checkbox" class="checkboxOctava" value="oktavaFour"> 4-я октава
  <input type="checkbox" class="checkboxOctava" value="oktavaSmall"> малая октава
  <input type="checkbox" class="checkboxOctava" value="oktavaBig"> большая октава
  <button class="start">Start</button>
  `;
  let tools = new Tools(selectClef);
  tools.addSelect();
}

function start() {
  let startBtn = document.querySelector('.start');
  startBtn.addEventListener('click', function() {
    timerAddNote();
  });
}

function selectClef() {
  document.addEventListener('change', function (e) {
    if(e.target.dataset.name === 'clef') {
      let clefName = e.target.value;
      let tools = new Tools(clefName);
      tools.changeMusicClef();
    }
  });
}

function removeClassPush(key) {
  key.classList.remove('key-push');
}      

function soundClick(keyUrl) {
  let audio = new Audio();
  audio.src = keyUrl;
  audio.autoplay = true;
}

function pushKeys() {
  document.addEventListener('click', function(e) {
    if(e.target.className === 'key key__white' || e.target.className === 'key key__black') {
      let key = e.target;
      let keyUrl = e.target.dataset.url;
      let noteName = e.target.dataset.name;
      checkWin(noteName);
      soundClick(keyUrl);
      key.classList.add('key-push');
      setTimeout(removeClassPush, 300, key);
    }
  });
}

function addRandomNote() {
  let note = getRandomNote();
  let tools = new Tools(note);
  tools.changeNote();
}

function timerAddNote() {
  setInterval(() => addRandomNote(), 5000);
}

function pickOctava() {
  let pickCheckboxes = document.querySelectorAll('.checkboxOctava');
  let pickBoxOctava = '';
  pickCheckboxes.forEach(box => {
    if(box.checked) {
      pickBoxOctava += box.value;
    }
  });
  return pickBoxOctava;
}
function getRandomNote() {
  let select = document.querySelector('select');
  let selectOctava = pickOctava();
  
  console.log(selectOctava);
  let notes = [];

  if(select.value === 'treble'){
    if(selectOctava.includes('octavaOne')) {
      console.log('done!');
    }
  }
  
  let key = getRandomInt(0, notes.length-1);
  return notes[key];
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function checkWin(keyNote) {
  let currentNote = document.querySelector('.stan__note');
  let inf;
  if (keyNote === currentNote.id) {
    inf = 'win!';
    inform(inf);
    console.log('win!');
  } else {
    inf = 'loose!';
    inform(inf);
    console.log('loose!');
    }
}

function inform(mess) {
  let infPanel = document.querySelector('.piano__panel');
  infPanel.innerText = mess;
  setTimeout(clearInfPanel, 1000, infPanel);
}

function clearInfPanel(infPanel) {
  infPanel.innerText = '';
}


function getUsers() {
  let usersPromise = fetch('http://localhost:3000/users').then(res => {
	return res.json();
});
usersPromise.then (
	res => {
		// console.log(res);
	},
	err => {
    console.log('Error');
	}
);
}

function init() {
  addBodyPiano();
  getKeys();
  createSelect();
  createMusicStan();
  pushKeys();
  getUsers();
  selectClef();  
  start();
}

init();