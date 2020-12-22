import '../styles/index.scss';

if (process.env.NODE_ENV === 'development') {
  require('../index.html');
}

console.log('webpack starterkit');


let main = document.querySelector('.main');

let keys = [
  {
    id: 1,
    color: 'white',
    size: 'big',
    url: '...',
  },
  {
    id: 2,
    color: 'black',
    size: 'small',
    url: '...',
  },
  {
    id: 3,
    color: 'white',
    size: 'big',
    url: '...',
  },
  {
    id: 4,
    color: 'white',
    size: 'big',
    url: '...',
  }
];


let paino = document.createElement('div');
paino.className = 'piano';


function init() {    
  let keyboard = document.createElement('div');
  keyboard.className = 'keyboard';
  let html = keys.map(key => {
    let cls = '';
    switch(key.color) {
      case 'white': 
        cls+= 'key__white';
        break;
      case 'black': 
        cls+= ' key__black';
    }
    switch(key.size) {
      case 'big': 
        cls+= ' key__big';
        break;
      case 'small': 
        cls+= ' key__small';
    }
    return `<div class="${cls}"></div>`;
  });
  let htmlString = html.join('');
  keyboard.innerHTML = htmlString;
  debugger
  main.appendChild(keyboard);
}

init();