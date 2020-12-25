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
  console.log(keys);
  let keyboard = new Piano(keys);  
  keyboard.createKeyboard();
}
class Tools {
  constructor(nameTools) {
    this.nameTools = nameTools;
    this.app = document.querySelector('.app');
    this.tools = document.createElement('div');
  }
  addSelect() {
    this.tools.className = 'tools';
    this.tools.innerHTML = this.nameTools;
    this.app.prepend(this.tools);
  }
  changeMusicStaff() {
    let nameClassStaff = 'treble';
    let musicStaff = document.querySelector(`.musicStaff-${nameClassStaff}`);    
    if(this.nameTools === 'bass') {
      nameClassStaff = 'bass';
    }
    musicStaff.className = `musicStaff-${this.nameTools}`;
  }
}

function createMusicStaff() {
  let app = document.querySelector('.app');    
  let musicStaff = document.createElement('div');
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

function getUsers() {
  let usersPromise = fetch('http://localhost:3000/users').then(res => {
	return res.json();
});
usersPromise.then (
	res => {
		console.log(res);
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
}

init();