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
var WIZARDS_QUANTITY = 4;
var wizards = [];

var userDialog = document.querySelector('.setup');
var wizardsInterface = document.querySelector('.setup-similar');
var wizardsList = document.querySelector('.setup-similar-list');
var template = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var fragment = document.createDocumentFragment();

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

userDialog.classList.remove('hidden');

for (var i = 0; i < WIZARDS_QUANTITY; ++i) {
  wizards[i] = getRandomWizard();
}

renderWizards(wizards);

wizardsInterface.classList.remove('hidden');
