const IMAGE_NUM = 16;
const PROVIDING_TIME = 2000;
const GameImage = document.querySelector('.image-container');

let answerTiles = [];
let problemTiles = [];

function setGame(){
  answerTiles = createImageTiles();
  problemTiles = shuffle(answerTiles);

  setTimeout(() => {
    GameImage.innerHTML = "";
    for (var i = 0; i < IMAGE_NUM; i++) {
      GameImage.appendChild(problemTiles[i]);
    }
  }, PROVIDING_TIME)
}

function createImageTiles() {
  var newList = [];
  var pos_x = 0;
  var pos_y = 0;

  for (var i = 0; i < IMAGE_NUM; i++) {
    newList.push(document.createElement("li"));
    newList[i].setAttribute('id', 'list' + i);
    GameImage.appendChild(newList[i]);

    newList[i].style.backgroundPosition = -pos_x + 'px ' + -pos_y + 'px';
    console.log(-pos_x + 'px ' + -pos_y + 'px');

    pos_x += 100;
    if (pos_x == (Math.sqrt(IMAGE_NUM) * 100) && i != 0) {
      pos_x = 0;
      pos_y += 100;
    }
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
