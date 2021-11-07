const IMAGE_NUM = 16;
const GameImage = document.querySelector('.image-container');

var newList = [];
var pos_x = 0;
var pos_y = 0;

for (var i = 0; i < IMAGE_NUM; i++) {
  newList.push(document.createElement("li"));
  newList[i].setAttribute('id', 'list'+i);
  GameImage.appendChild(newList[i]);

  newList[i].style.backgroundPosition = -pos_x + 'px ' + -pos_y + 'px';
  console.log(-pos_x + 'px ' + -pos_y + 'px');

  pos_x += 100;
  if(pos_x == (Math.sqrt(IMAGE_NUM)*100) && i != 0)
  {
    pos_x = 0;
    pos_y += 100;
  }
}
