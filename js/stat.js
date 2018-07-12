'use strict';

var TEXT_COLOR = '#000000';
var SHADOW_OFFSET = 10;
var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var CLOUD_OFFSET = 0;
var CLOUD_COLOR = '#ffffff';
var GRAPHICK_HEIGHT = 150;
var FIRST_BLOCK_X = 155;
var GAP = 50;
var NAMES_POSITION_Y = 220;
var BLOCK_Y = NAMES_POSITION_Y - 8;
var BLOCK_WIDTH = 40;
// [высота блока] =  [высота гистограммы] - [высота текста + небольшой зазор между текстом и столбиком]x2 (x2 это имя игрока + время игры)
var blockHeight = GRAPHICK_HEIGHT - (16 + 8) * 2;

var renderCloud = function (ctx, color, offset) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(100 + offset, 10 + offset);
  ctx.quadraticCurveTo(160 + offset, 20 + offset, 170 + offset, 40 + offset);
  ctx.lineTo(240 + offset, 40 + offset);
  ctx.quadraticCurveTo(250 + offset, 20 + offset, 310 + offset, 10 + offset);
  ctx.quadraticCurveTo(370 + offset, 20 + offset, 380 + offset, 40 + offset);
  ctx.lineTo(450 + offset, 40 + offset);
  ctx.quadraticCurveTo(460 + offset, 20 + offset, 520 + offset, 10 + offset);
  ctx.quadraticCurveTo(510 + offset, 90 + offset, 496 + offset, 100 + offset);
  ctx.lineTo(496 + offset, 190 + offset);
  ctx.quadraticCurveTo(506 + offset, 200 + offset, 520 + offset, 280 + offset);
  ctx.quadraticCurveTo(460 + offset, 260 + offset, 450 + offset, 250 + offset);
  ctx.lineTo(380 + offset, 250 + offset);
  ctx.quadraticCurveTo(370 + offset, 270 + offset, 310 + offset, 280 + offset);
  ctx.quadraticCurveTo(250 + offset, 270 + offset, 240 + offset, 250 + offset);
  ctx.lineTo(170 + offset, 250 + offset);
  ctx.quadraticCurveTo(160 + offset, 260 + offset, 100 + offset, 280 + offset);
  ctx.quadraticCurveTo(110 + offset, 200 + offset, 124 + offset, 190 + offset);
  ctx.lineTo(124 + offset, 100 + offset);
  ctx.quadraticCurveTo(110 + offset, 90 + offset, 100 + offset, 10 + offset);
  ctx.closePath();
  ctx.fill();
};

var getMaxElement = function (arr) {
  var maxElement = 0;

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var getRandomColor = function () {
  return 'rgba(0, 0, 255, ' + Math.random() + ')';
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, SHADOW_COLOR, SHADOW_OFFSET);
  renderCloud(ctx, CLOUD_COLOR, CLOUD_OFFSET);

  ctx.font = '16px "PT Mono"';
  ctx.textBaseline = 'hanging';
  ctx.fillStyle = TEXT_COLOR;
  ctx.fillText('Ура вы победили!', 180, 40);
  ctx.fillText('Список результатов:', 190, 60);

  // Решение теоретической(!) ситуации, когда длины массивов names и times не совпадают
  var lengthCheck = names.length - times.length;

  if (lengthCheck > 0) { // Имён оказалось больше, чем значений времени
    for (var k = 0; k <= lengthCheck; k++) {
      times.push('0'); // Записывам в конец массива времён нужное количество нейтральных нулевых значений
    }
  } else if (lengthCheck < 0) { // Имён оказалось меньше, чем значений времени
    lengthCheck = -lengthCheck; // В этом случае получилось отрицательное число, которое нельзя использовать -> меням знак

    for (var l = 0; l <= lengthCheck; l++) {
      names.push('Игрок'); // Записываем в конец массива имён нужное количество нейтральных имён
    }
  }

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    times[i] = Math.round(times[i]);
    ctx.fillStyle = (names [i] === 'Вы') ? 'rgba(255, 0, 0, 1)' : getRandomColor();
    ctx.fillRect(FIRST_BLOCK_X + (BLOCK_WIDTH + GAP) * i, BLOCK_Y, BLOCK_WIDTH, -(blockHeight * times[i]) / maxTime);
    ctx.fillStyle = TEXT_COLOR;
    ctx.fillText(names[i], FIRST_BLOCK_X + (BLOCK_WIDTH + GAP) * i, NAMES_POSITION_Y);
    ctx.fillText(times[i], FIRST_BLOCK_X + (BLOCK_WIDTH + GAP) * i, BLOCK_Y - (blockHeight * times[i]) / maxTime - 20);
  }
};
