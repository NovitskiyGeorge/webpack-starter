import '../styles/index.scss';

if (process.env.NODE_ENV === 'development') {
  require('../index.html');
}

console.log('webpack starterkit');



class Keyboard {
  constructor(keys) {
    this.keys = keys;
  }
  createKeyboard() {
    let main = document.querySelector('.main');
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
      return `<div class="${cls}"></div>`;
    });
    let htmlString = html.join('');
    keyboard.innerHTML = htmlString;
    main.appendChild(keyboard);
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
      color: 'white',
      url: '...',
    }
  ];
  let keyboard = new Keyboard(keys);  
  keyboard.createKeyboard();
}



function init() {
  getKeys();
}

init();