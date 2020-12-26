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
      return `<div class="${cls}" data-id=${key.id} data-url=${key.url}></div>`;
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
    this.tools = document.createElement('div');
    this.musicStaff = document.querySelector('#staff');
    this.note = document.createElement('div');
    this.currentNote = document.querySelector('.musicStaff__note');

  }
  addSelect() {
    this.tools.className = 'tools';
    this.tools.innerHTML = this.nameTools;
    this.app.prepend(this.tools);
  }
  changeMusicStaff() {
    switch(this.nameTools) {
      case 'bass':
        this.musicStaff.className = `musicStaff-${this.nameTools}`;
        break;
      case 'treble':
        this.musicStaff.className = `musicStaff-${this.nameTools}`;
        break;
    }
  }
  addNote() {
    this.note.className = 'musicStaff__note';
    this.musicStaff.appendChild(this.note);
  }
  changeNote() {
    switch(this.nameTools) {
      case 'do' :
        this.currentNote.style.marginTop = '160px';
        break;
      case 'doDies' :
        this.currentNote.style.marginTop = '120px';
        break;
      case 're' :
        this.currentNote.style.marginTop = '100px';
        break; 
      case 'reDies' :
        this.currentNote.style.marginTop = '80px';
        break;
      case 'mi' :
        this.currentNote.style.marginTop = '60px';
        break;  
      case 'fa' :
        this.currentNote.style.marginTop = '40px';
        break;
      case 'faDies' :
        this.currentNote.style.marginTop = '20px';
        break;
      case 'sol' :
        this.currentNote.style.marginTop = '0px';
        break;
      case 'solDies' :
        this.currentNote.style.marginTop = '-20px';
        break;
      case 'lya' :
        this.currentNote.style.marginTop = '-40px';
        break;
      case 'lyaDies' :
        this.currentNote.style.marginTop = '-60px';
        break;
      case 'si' :
        this.currentNote.style.marginTop = '-80px';
        break;
    }
  }
}

function createMusicStaff() {
  let app = document.querySelector('.app');    
  let musicStaff = document.createElement('div');
  musicStaff.id = 'staff';
  musicStaff.className = 'musicStaff-treble';
  app.prepend(musicStaff);
}

function getSelect() {
  let selectClef = `  
  <select data-name='staff'>
    <option value=${'treble'}>Скрипичный ключ</option>
    <option value=${'bass'}>Басовый ключ</option>
  </select>`;
  let tools = new Tools(selectClef);
  tools.addSelect();
}

function selectStaff() {
  document.addEventListener('change', function (e) {
    if(e.target.dataset.name === 'staff') {
      let staffName = e.target.value;
      let tools = new Tools(staffName);
      tools.changeMusicStaff();
    }
  });
}

function removeClassPush(key) {
  key.classList.remove('key-push');
}      

function soundClick(keyUrl) {
  let audio = new Audio();
  console.log(keyUrl);

  audio.src = keyUrl;
  audio.autoplay = true;
}

function pushKeys() {
  document.addEventListener('click', function(e) {
    if(e.target.className === 'key key__white' || e.target.className === 'key key__black') {
      let key = e.target;
      let keyUrl = e.target.dataset.url;
      soundClick(keyUrl);
      key.classList.add('key-push');
      setTimeout(removeClassPush, 300, key);
    }
  });
}

function createNote() {
  let note = getRandomNote();
  let tools = new Tools(note);
  tools.addNote();
}

function addRandomNote() {
  let note = getRandomNote();
  let tools = new Tools(note);
  tools.changeNote();
}

function timerAddNote() {
  setInterval(() => addRandomNote(), 2000);
}

function getRandomNote() {
  let notes = ['do', 'doDies', 're', 'reDies', 'mi', 'fa', 'faDies', 'sol', 'solDies', 'lya', 'lyaDies', 'si'];
  let key = getRandomInt(0, notes.length-1);
  return notes[key];
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function checkWin() {

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
  pushKeys();
  getUsers();
  getSelect();
  selectStaff();
  createMusicStaff();
  createNote();
  timerAddNote();
}

init();