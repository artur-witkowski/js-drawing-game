import React, { Component } from 'react';
import openSocket from 'socket.io-client';

import './Board.css';

let roomId;

class Board extends Component {
  
  handleCanvas() {
    const socket = openSocket('http://localhost:3000');
    socket.emit('message', { message: 'hi' });
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

    let x = 'black',
      y = 2;

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
          x = 'green';
          break;
        case 'blue':
          x = 'blue';
          break;
        case 'red':
          x = 'red';
          break;
        case 'yellow':
          x = 'yellow';
          break;
        case 'orange':
          x = 'orange';
          break;
        case 'black':
          x = 'black';
          break;
        case 'white':
          x = 'white';
          break;
        default:
          x = 'black';
          break;
      }
      if (x === 'white') y = 14;
      else y = 2;
    }

    function draw() {
      ctx.beginPath();
      ctx.moveTo(prevX, prevY);
      ctx.lineTo(currX, currY);
      ctx.strokeStyle = x;
      ctx.lineWidth = y;
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
          socket.emit('lineTo', { x: currX, y: currY, color: x });
          draw();
        }
      }
    }

    init();
    color({ id: 'green' });
  }

  componentDidMount() {
    const {
      match: { params },
    } = this.props;
    roomId = params.roomId;
    console.log(roomId)
    var c = document.getElementById('myCanvas');
    var ctx = c.getContext('2d');
    ctx.moveTo(13, 0);
    ctx.lineTo(200, 400);
    ctx.stroke();
    this.handleCanvas();
  }

  render() {
    return (
      <div className="App">
        Room {roomId}
        <canvas width="800" height="600" id="myCanvas"></canvas>
      </div>
    );
  }
}

export default Board;
