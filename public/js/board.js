const socket = io('http://localhost:3000');



let canvas,
  ctx,
  flag = false,
  prevX = 0,
  currX = 0,
  prevY = 0,
  currY = 0;
// dot_flag = false,
// w,
// h;

let currColor = 'black',
  currSize = 2;

function init() {
  canvas = document.getElementById('myCanvas');
  ctx = canvas.getContext('2d');
  // w = canvas.width;
  // h = canvas.height;

  canvas.addEventListener(
    'mousemove',
    function (e) {
      findxy('move', e);
    },
    false
  );
  canvas.addEventListener(
    'mousedown',
    function (e) {
      findxy('down', e);
    },
    false
  );
  canvas.addEventListener(
    'mouseup',
    function (e) {
      findxy('up', e);
    },
    false
  );
  canvas.addEventListener(
    'mouseout',
    function (e) {
      findxy('out', e);
    },
    false
  );
}

function color(obj) {
  switch (obj.id) {
    case 'green':
      currColor = 'green';
      break;
    case 'blue':
      currColor = 'blue';
      break;
    case 'red':
      currColor = 'red';
      break;
    case 'yellow':
      currColor = 'yellow';
      break;
    case 'orange':
      currColor = 'orange';
      break;
    case 'black':
      currColor = 'black';
      break;
    case 'white':
      currColor = 'white';
      break;
    default:
      currColor = 'black';
      break;
  }
  if (currColor === 'white') currSize = 14;
  else currSize = 2;
}

function draw() {
  ctx.beginPath();
  ctx.moveTo(prevX, prevY);
  ctx.lineTo(currX, currY);
  ctx.strokeStyle = currColor;
  ctx.lineWidth = currSize;
  ctx.stroke();
  ctx.closePath();
}

function findxy(res, e) {
  if (res === 'down') {
    prevX = currX;
    prevY = currY;
    currX = e.clientX - canvas.offsetLeft;
    currY = e.clientY - canvas.offsetTop;

    flag = true;
    //dot_flag = true;
    // if (dot_flag) {
    //   ctx.beginPath();
    //   ctx.fillStyle = x;
    //   ctx.fillRect(currX, currY, 2, 2);
    //   ctx.closePath();
    //   dot_flag = false;
    // }
  }
  if (res === 'up' || res === 'out') {
    flag = false;
  }
  if (res === 'move') {
    if (flag) {
      prevX = currX;
      prevY = currY;
      currX = e.clientX - canvas.offsetLeft;
      currY = e.clientY - canvas.offsetTop;
      socket.emit('newLine', {
        roomId: roomId,
        playerId: playerId,
        xStart: prevX,
        xEnd: currX,
        yStart: prevY,
        yEnd: currY,
        color: currColor,
        size: currSize
      });
      draw();
    }
  }
}

init();
color({ id: 'green' });
socket.on('newLine', data => {
  console.log(data.playerId);
  ctx.beginPath();
  ctx.moveTo(data.xStart, data.yStart);
  ctx.lineTo(data.xEnd, data.yEnd);
  ctx.strokeStyle = data.color;
  ctx.lineWidth = data.size;
  ctx.stroke();
  ctx.closePath();
})
