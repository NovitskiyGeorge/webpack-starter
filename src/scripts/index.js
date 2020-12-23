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
      return `<div class="${cls}" data-id=${key.id}></div>`;
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
      url: '...',
    },
    {
      id: 2,
      color: 'black',
      url: '...',
    },
    {
      id: 3,
      color: 'white',
      url: '...',
    },
    {
      id: 4,
      color: 'black',
      url: '...',
    },
    {
      id: 5,
      color: 'white',
      url: '...',
    },
    {
      id: 6,
      color: 'white',
      url: '...',
    },
    {
      id: 7,
      color: 'black',
      url: '...',
    },
    {
      id: 8,
      color: 'white',
      url: '...',
    },
    {
      id: 9,
      color: 'black',
      url: '...',
    },
    {
      id: 10,
      color: 'white',
      url: '...',
    },
    {
      id: 11,
      color: 'black',
      url: '...',
    },
    {
      id: 12,
      color: 'white',
      url: '...',
    },
  ];
  let keyboard = new Keyboard(keys);  
  keyboard.createKeyboard();
}

function init() {
  getKeys();
  pushKeys();
}

init();


function removeClassPush(key) {
  key.classList.remove('key-push');
}      

function soundClick() {
  let audio = new Audio();
  audio.src = 'src/audio/sound.wav';
  audio.autoplay = true;
}


function pushKeys() {
  document.addEventListener('click', function(e) {

    if(e.target.className === 'key key__white' || e.target.className === 'key key__black') {
      console.log(e.target);
      let key = e.target;
      soundClick();
      key.classList.add('key-push');
      setTimeout(removeClassPush, 300, key);
    }
  });
}
