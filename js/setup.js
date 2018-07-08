'use strict';

var FIRST_NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];
var LAST_NAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];
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
var WIZARDS_QUANTITY = 4;
var wizards = [];
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var userDialog = document.querySelector('.setup');
var wizardsInterface = document.querySelector('.setup-similar');
var wizardsList = document.querySelector('.setup-similar-list');
var template = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var fragment = document.createDocumentFragment();
var setupOpen = document.querySelector('.setup-open');
var setupClose = userDialog.querySelector('.setup-close');
var userNameInput = userDialog.querySelector('.setup-user-name');
var userWizardCoat = userDialog.querySelector('.setup-wizard .wizard-coat');
var userWizardEyes = userDialog.querySelector('.setup-wizard .wizard-eyes');
var userFireball = userDialog.querySelector('.setup-fireball-wrap');
var coatColorInput = userDialog.querySelector('input[name = coat-color]');
var eyeColorInput = userDialog.querySelector('input[name = eyes-color]');
var fireballColorInput = userFireball.querySelector('input[name = fireball-color]');

var getRandomElement = function (arr) {
  return arr[Math.floor(Math.random() * (arr.length))];
};

var getRandomWizard = function () {
  var wizard = {
    name: getRandomElement(FIRST_NAMES) + ' ' + getRandomElement(LAST_NAMES),
    coatColor: getRandomElement(COAT_COLORS),
    eyesColor: getRandomElement(EYES_COLORS)
  };
  return wizard;
};

var createWizard = function (object) {
  var wizardTemplate = template.cloneNode(true);
  var wizardName = wizardTemplate.querySelector('.setup-similar-label');
  var wizardCoat = wizardTemplate.querySelector('.wizard-coat');
  var wizardEyes = wizardTemplate.querySelector('.wizard-eyes');
  wizardName.textContent = object.name;
  wizardCoat.style.fill = object.coatColor;
  wizardEyes.style.fill = object.eyesColor;

  return wizardTemplate;
};

var renderWizards = function (wizardsArr) {
  for (i = 0; i < wizardsArr.length; i++) {
    var newWizard = createWizard(wizardsArr[i]);
    fragment.appendChild(newWizard);
  }
  wizardsList.appendChild(fragment);
};

for (var i = 0; i < WIZARDS_QUANTITY; ++i) {
  wizards[i] = getRandomWizard();
}
renderWizards(wizards);
wizardsInterface.classList.remove('hidden');


var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    var target = evt.target;
    if (target === userNameInput) {
      evt.stopPropagation();
    } else {
      closePopup();
    }
  }
};

var openPopup = function () {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

var getColor = function (element, arr, property, input) {
  var color = getRandomElement(arr);
  element.style[property] = color;
  input.value = color;
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

userNameInput.addEventListener('invalid', function (evt) {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Введено слишком короткое имя, минимум 2 символа!');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Введено слишком длинное имя, максимум 25 символов!');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное для заполнения поле!');
  } else {
    userNameInput.setCustomValidity('');
  }
});

userNameInput.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < 2) {
    target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else {
    target.setCustomValidity('');
  }
});

userWizardCoat.addEventListener('click', function () {
  getColor(userWizardCoat, COAT_COLORS, 'fill', coatColorInput);
});

userWizardEyes.addEventListener('click', function () {
  getColor(userWizardEyes, EYES_COLORS, 'fill', eyeColorInput);
});

userFireball.addEventListener('click', function () {
  getColor(userFireball, FIREBALL_COLORS, 'background', fireballColorInput);
});
