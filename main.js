const IMAGE_NUM = 16;
const PROVIDING_TIME = 5000;
const GameImage = document.querySelector('.image-container');
const GameText = document.querySelector('.game-text');
const PlayTime = document.querySelector('.play-time');
const StartText = document.querySelector('.start-text');

var answerTiles = [];
var problemTiles = [];
var isPlaying = false;
var timeInterval = null;
var AnswerTimer = null;
let time = 1;

function setGame(){
  if(isPlaying){
    var returnValue = confirm('다시 시작하시겠습니까?');
    if(!returnValue) { return; }
    else {
      alert('게임이 다시 시작됩니다');
    }
  }
  isPlaying = true;
  GameImage.innerHTML = "";
  StartText.style.display = "none";
  GameImage.classList.remove("image-container");
  GameText.style.display = "none";

  time = 0;
  PlayTime.innerText = time;

  clearInterval(timeInterval);
  clearInterval(AnswerTimer);

  answerTiles = createImageTiles();
  problemTiles = shuffle(answerTiles.slice());

  timeInterval = setInterval(()=>{
    time++;
    PlayTime.innerText = time;
  }, 1000)

  AnswerTimer = setTimeout(() => {
    tileDisplay(problemTiles);
  }, PROVIDING_TIME)
}

function createImageTiles() {
  var newList = [];
  var pos_x = 0;
  var pos_y = 0;

  for (var i = 0; i < IMAGE_NUM; i++) {
    newList.push(document.createElement("li"));
    newList[i].setAttribute('id', 'list' + i);
    newList[i].setAttribute('draggable', 'true');

    GameImage.appendChild(newList[i]);

    newList[i].style.backgroundPosition = -pos_x + 'px ' + -pos_y + 'px';
    console.log(-pos_x + 'px ' + -pos_y + 'px');

    pos_x += 100;
    if (pos_x == (Math.sqrt(IMAGE_NUM) * 100) && i != 0) {
      pos_x = 0;
      pos_y += 100;
    }

    answerTiles[i] = newList[i];
  }
  return newList;
}

function shuffle(array) {
  let index = array.length - 1;
  while (index > 0) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [array[index], array[randomIndex]] = [array[randomIndex], array[index]]
    index--;
  }
  return array;
}

function tileDisplay(tiles){
  GameImage.innerHTML = "";
  for (var i = 0; i < IMAGE_NUM; i++) {
    GameImage.appendChild(tiles[i]);
  }
}

function checkStatus(){
  for (var i = 0; i < IMAGE_NUM; i++) {
    if(answerTiles[i] !== problemTiles[i])
    {
      console.log('fail!');
      return;
    }
  }
  GameText.style.display = "block";
  clearInterval(timeInterval);
  var li = document.querySelectorAll('li');
  for( var i = 0; i < li.length; i++){
    var item = li.item(i);
    item.draggable = false;
  }
}

//events
var dragged;
var draggedIndex;

GameImage.addEventListener('dragstart', e => {
  if(!isPlaying) return;
  console.log(e);
  dragged = e.target;
  draggedIndex = problemTiles.indexOf(dragged);
})

GameImage.addEventListener('dragover', e => {
  if(!isPlaying) return;
  e.preventDefault();
  // console.log('over');
})

GameImage.addEventListener('drop', e => {
  if(!isPlaying) return;
  if(e.target !== dragged){
    temp = e.target;
    problemTiles[problemTiles.indexOf(e.target)] = dragged;
    problemTiles[draggedIndex] = temp;
    tileDisplay(problemTiles);
    checkStatus();
  }
})
