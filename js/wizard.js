'use strict';

(function () {
  var COAT_COLORS = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ];
  var EYES_COLORS = [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ];
  var FIREBALL_COLORS = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ];

  var wizardElement = document.querySelector('.setup-wizard');
  var wizardCoatElement = wizardElement.querySelector('.wizard-coat');
  var wizardEyesElement = wizardElement.querySelector('.wizard-eyes');
  var wizardFireballElement = document.querySelector('.setup-fireball-wrap');
  var coatColorInput = document.querySelector('input[name = coat-color]');
  var eyeColorInput = document.querySelector('input[name = eyes-color]');
  var fireballColorInput = wizardFireballElement.querySelector('input[name = fireball-color]');

  var wizard = {
    onCoatChange: function (color) {
      return color;
    },
    onEyesChange: function (color) {
      return color;
    },
    onFireballChange: function (color) {
      return color;
    }
  };

  wizardCoatElement.addEventListener('click', function () {
    var newColor = window.utils.getRandomElement(COAT_COLORS);

    wizardCoatElement.style.fill = newColor;
    coatColorInput.value = newColor;

    wizard.onCoatChange(newColor);
  });

  wizardEyesElement.addEventListener('click', function () {
    var newColor = window.utils.getRandomElement(EYES_COLORS);

    wizardEyesElement.style.fill = newColor;
    eyeColorInput.value = newColor;

    wizard.onEyesChange(newColor);
  });

  wizardFireballElement.addEventListener('click', function () {
    var newColor = window.utils.getRandomElement(FIREBALL_COLORS);

    wizardFireballElement.style.background = newColor;
    fireballColorInput.value = newColor;

    wizard.onFireballChange(newColor);
  });

  window.wizard = wizard;
})();
