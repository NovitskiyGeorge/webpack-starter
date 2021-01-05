import '../styles/index.scss';

if (process.env.NODE_ENV === 'development') {
  require('../index.html');
}


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
    this.instrument.innerHTML = `
    <div class="piano__panel"></div>
    <div class="piano__redLine"></div>
    `;
    this.app.append(this.instrument);
  }

  getKeys() {
    let keysPromise = fetch('http://localhost:3000/keys').then(res => {
      return res.json();
    });
    keysPromise.then (
      res => {
        let keyboard = new Piano(res);
        keyboard.createKeyboard();
      },
      err => {
        console.log('Error');
      }
    );
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


// function getKeys() {
//   let keysPromise = fetch('http://localhost:3000/keys').then(res => {
//     return res.json();
//   });
//   keysPromise.then (
//     res => {
//       let keyboard = new Piano(res);
//       keyboard.createKeyboard();
//     },
//     err => {
//       console.log('Error');
//     }
//   );
// }

// function createKeys(keys) {  
//   let keyboard = new Piano(keys);  
//   keyboard.createKeyboard();
// }
class Tools {
  constructor(nameTools) {
    this.nameTools = nameTools;
    this.app = document.querySelector('.app');
    this.stan = document.querySelector('.stan');
    this.tools = document.createElement('div');
    this.musicClef = document.querySelector('#clef');
    this.currentNote = document.querySelector('.stan__note');
  }
  createSelect() {
    this.tools.className = 'tools';
    this.tools.innerHTML = `  
    <select data-name='clef'>
      <option value=${'treble'}>Скрипичный ключ</option>
      <option value=${'bass'}>Басовый ключ</option>
    </select>
    <input type="checkbox" class="checkboxOctave" value="octaveOne" checked> 1-я октава
    <input type="checkbox" class="checkboxOctave" value="octaveTwo" checked> 2-я октава
    <input type="checkbox" class="checkboxOctave" value="octaveThree"> 3-я октава
    <input type="checkbox" class="checkboxOctave" value="octaveFour"> 4-я октава
    <input type="checkbox" class="checkboxOctave" value="octaveSmall"> малая октава
    <input type="checkbox" class="checkboxOctave" value="octaveBig"> большая октава
    <button class="start">Start</button>
    `;
    this.app.prepend(this.tools);
  }
  createMusicStan() {
    let musicStan = document.createElement('div');
    musicStan.className = 'stan';
    musicStan.innerHTML = `
    <div class="stan__clef-treble" id="clef"></div>
    <div class="stan__note"></div>`;
    this.app.prepend(musicStan);
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
      case 'do-one':
        this.currentNote.id = this.nameTools;
        break;
      case 're-one':
        this.currentNote.id = this.nameTools;
        break;
      case 'mi-one':
        this.currentNote.id = this.nameTools;
        break; 
      case 'fa-one':
        this.currentNote.id = this.nameTools;
        break;
      case 'sol-one':
        this.currentNote.id = this.nameTools;
        break;  
      case 'lya-one':
        this.currentNote.id = this.nameTools;
        break;
      case 'si-one':
        this.currentNote.id = this.nameTools;
        break;
      case 'do-two':
        this.currentNote.id = this.nameTools;
        break;
      case 're-two':
        this.currentNote.id = this.nameTools;
        break;
      case 'mi-two':
        this.currentNote.id = this.nameTools;
        break; 
      case 'fa-two':
        this.currentNote.id = this.nameTools;
        break;
      case 'sol-two':
        this.currentNote.id = this.nameTools;
        break;  
      case 'lya-two':
        this.currentNote.id = this.nameTools;
        break;
      case 'si-two':
        this.currentNote.id = this.nameTools;
        break;
      case 'do-three':
        this.currentNote.id = this.nameTools;
        break;
    }
  }
  timerTestNote() {
    alert('good!');
  }

  getRandomNote() {
    let select = document.querySelector('select');
    if(select.value === 'treble'){
      let notes = pickNotes();
      let key = getRandomInt(0, notes.length-1);
      return notes[key];
    }
  }

  addRandomNote() {
    let note = new Tools().getRandomNote();
    let tools = new Tools(note);
    tools.changeNote();
  }

}

// function createMusicStan() {
//   let app = document.querySelector('.app');
//   let musicStan = document.createElement('div');
//   musicStan.className = 'stan';
//   musicStan.innerHTML = `
//   <div class="stan__clef-treble" id="clef"></div>
//   <div class="stan__note"></div>`;
//   app.prepend(musicStan);
// }

// function createSelect() {
//   let selectClef = `  
//   <select data-name='clef'>
//     <option value=${'treble'}>Скрипичный ключ</option>
//     <option value=${'bass'}>Басовый ключ</option>
//   </select>
//   <input type="checkbox" class="checkboxOctave" value="octaveOne" checked> 1-я октава
//   <input type="checkbox" class="checkboxOctave" value="octaveTwo" checked> 2-я октава
//   <input type="checkbox" class="checkboxOctave" value="octaveThree"> 3-я октава
//   <input type="checkbox" class="checkboxOctave" value="octaveFour"> 4-я октава
//   <input type="checkbox" class="checkboxOctave" value="octaveSmall"> малая октава
//   <input type="checkbox" class="checkboxOctave" value="octaveBig"> большая октава
//   <button class="start">Start</button>
//   `;
//   let tools = new Tools(selectClef);
//   tools.addSelect();
// }

function start() {
  let startBtn = document.querySelector('.start');
  startBtn.addEventListener('click', function() {
    new Tools().addRandomNote();
    new Tools().timerTestNote();
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
      setTimeout(removeClassPush, 100, key);
      new Tools().addRandomNote();
    }
  });
}

// function addRandomNote() {
//   let note = new Tools().getRandomNote();
//   let tools = new Tools(note);
//   tools.changeNote();
// }

function pickNotes() {
  let pickCheckboxes = document.querySelectorAll('.checkboxOctave');
  let notes = [];
  pickCheckboxes.forEach(box => {

    if(box.checked) {
      switch (box.value) {
        case 'octaveOne': {
          notes.push('do-one', 're-one', 'mi-one', 'fa-one', 'sol-one', 'lya-one', 'si-one');
          break;
        }
        case 'octaveTwo': {
          notes.push('do-two', 're-two', 'mi-two', 'fa-two', 'sol-two', 'lya-two', 'si-two');
          break;
        }
        case 'octaveThree': {
          notes.push('do-three');
          break;
        }
      }
      
    }
  });
  return notes;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function checkWin(keyNote) {
  let currentNote = document.querySelector('.stan__note');
  let inf;
  console.log(keyNote);
  if (currentNote.id.includes(keyNote)) {
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
  new Piano().createPiano();
  new Piano().getKeys();
  new Tools().createSelect();
  new Tools().createMusicStan();
  new Tools().addRandomNote();
  pushKeys();
  getUsers();
  selectClef();  
  start();
}

init();