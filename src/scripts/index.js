import '../styles/index.scss';

if (process.env.NODE_ENV === 'development') {
  require('../index.html');
}

// console.log('webpack starterkit');

class Keyboard {
  constructor(keys) {
    this.keys = keys;
  }
  createKeyboard() {
    let piano = document.querySelector('.piano');
    let keyboard = document.createElement('div');
    keyboard.className = 'keyboard';
    let html = this.keys.map(key => {
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
    keyboard.innerHTML = htmlString;
    piano.appendChild(keyboard);
  }
}

function getKeys() {
  let keys = [
    {
      id: 1,
      color: 'white',
      url: 'src/audio/do.wav',
    },
    {
      id: 2,
      color: 'black',
      url: 'src/audio/doDies.wav',
    },
    {
      id: 3,
      color: 'white',
      url: 'src/audio/re.wav',
    },
    {
      id: 4,
      color: 'black',
      url: 'src/audio/reDies.wav',
    },
    {
      id: 5,
      color: 'white',
      url: 'src/audio/mi.wav',
    },
    {
      id: 6,
      color: 'white',
      url: 'src/audio/fa.wav',
    },
    {
      id: 7,
      color: 'black',
      url: 'src/audio/faDies.wav',
    },
    {
      id: 8,
      color: 'white',
      url: 'src/audio/sol.wav',
    },
    {
      id: 9,
      color: 'black',
      url: 'src/audio/solDies.wav',
    },
    {
      id: 10,
      color: 'white',
      url: 'src/audio/lya.wav',
    },
    {
      id: 11,
      color: 'black',
      url: 'src/audio/lyaDies.wav',
    },
    {
      id: 12,
      color: 'white',
      url: 'src/audio/si.wav',
    },
  ];
  let keyboard = new Keyboard(keys);  
  keyboard.createKeyboard();
}
class Tools {
  constructor(nameTools) {
    this.nameTools = nameTools;
  }
  addSelect() {
    let main = document.querySelector('.main');
    let instruments = document.createElement('div');
    instruments.className = 'tools';
    instruments.innerHTML = this.nameTools;
    main.prepend(instruments);
  }
  changeMusicStaff() {
    debugger;
    let nameClassStaff = 'treble';
    let musicStaff = document.querySelector(`.musicStaff-${nameClassStaff}`);    
    if(this.nameTools === 'bass') {
      nameClassStaff = 'bass';
    }
    musicStaff.className = `musicStaff-${this.nameTools}`;
  }

}

function createMusicStaff() {
  let main = document.querySelector('.main');    
  let musicStaff = document.createElement('div');
  musicStaff.className = 'musicStaff-treble';
  main.prepend(musicStaff);
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


function init() {
  getKeys();
  pushKeys();
  getSelect();
  selectStaff();
  createMusicStaff();
}

init();

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
