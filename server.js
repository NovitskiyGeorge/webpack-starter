/**
 * API
 * 
 * PUT =>    input {title: 'string'} output {title: 'string', id: 1}
 * GET =>                            output [{title: 'string', id: 1}, ...]
 * DELETE => input {id: 1}           output [{title: 'string', id: 1}, ...]
 */



var users = [{id: 0, name: 'string', email: 'string', result: 1}];
 // [{id: string, name: string, email: string, result: number}]
var userId = 0;

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

let keysId = 0;

var express = require("express");
var app = express();

const jsonParser = express.json();

function resolveCors(res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
}

app.use("/users", jsonParser, function (req, res) {
  resolveCors(res);

  switch (req.method) {
    case "GET":
      break;
    case "PUT":
      userId++;
      users.push({ title: req.body.name, id: userId, email: req.body.email, result: req.body.result});
      console.log("items: ", users);
      res.json(users[users.length - 1]);
      return;
    case "DELETE":
      users = users.filter((item) => item.id !== req.body.id);
      break;
    default:
      console.log("error request", req.method, req.url);
  }
  console.log("items: ", users);
  res.json(users);
});

app.use("/keys", jsonParser, function (req, res) {
  resolveCors(res);

  switch (req.method) {
    case "GET":
      break;
    case "PUT":
      keysId++;
      keys.push({ color: req.body.color, id: keysId, url: req.body.url});
      console.log("items: ", keys);
      res.json(keys[keys.length - 1]);
      return;
    case "DELETE":
      keys = keys.filter((item) => item.id !== req.body.id);
      break;
    default:
      console.log("error request", req.method, req.url);
  }
  console.log("items: ", keys);
  res.json(keys);
});

app.listen(3000, function () {
  console.log("ExpressJs server run on 3000 port");
});
