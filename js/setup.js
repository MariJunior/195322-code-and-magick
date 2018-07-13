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
  var WIZARDS_QUANTITY = 4;

  var userDialog = document.querySelector('.setup');
  var wizardsInterface = document.querySelector('.setup-similar');
  var wizardsList = document.querySelector('.setup-similar-list');
  var template = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var fragment = document.createDocumentFragment();
  var userWizardCoat = userDialog.querySelector('.setup-wizard .wizard-coat');
  var userWizardEyes = userDialog.querySelector('.setup-wizard .wizard-eyes');
  var userFireball = userDialog.querySelector('.setup-fireball-wrap');
  var coatColorInput = userDialog.querySelector('input[name = coat-color]');
  var eyeColorInput = userDialog.querySelector('input[name = eyes-color]');
  var fireballColorInput = userFireball.querySelector('input[name = fireball-color]');
  var userForm = userDialog.querySelector('.setup-wizard-form');

  var getRandomElement = function (arr) {
    return arr[Math.floor(Math.random() * (arr.length))];
  };

  var createWizard = function (object) {
    var wizardTemplate = template.cloneNode(true);
    var wizardName = wizardTemplate.querySelector('.setup-similar-label');
    var wizardCoat = wizardTemplate.querySelector('.wizard-coat');
    var wizardEyes = wizardTemplate.querySelector('.wizard-eyes');

    wizardName.textContent = object.name;
    wizardCoat.style.fill = object.colorCoat;
    wizardEyes.style.fill = object.colorEyes;

    return wizardTemplate;
  };

  var renderWizards = function (wizardsArr) {
    for (var i = 0; i < WIZARDS_QUANTITY; i++) {
      var newWizard = createWizard(getRandomElement(wizardsArr));

      fragment.appendChild(newWizard);
    }

    wizardsList.appendChild(fragment);
  };

  var getColor = function (element, arr, property, input) {
    var color = getRandomElement(arr);

    element.style[property] = color;
    input.value = color;
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: tomato;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
    setTimeout(function () {
      node.remove();
    }, 3000);
  };

  var successHandler = function () {
    userDialog.classList.add('hidden');
    userForm.reset();
  };

  window.backend.load(
      function (wizards) {
        renderWizards(wizards);

        wizardsInterface.classList.remove('hidden');
      },
      errorHandler
  );

  userWizardCoat.addEventListener('click', function () {
    getColor(userWizardCoat, COAT_COLORS, 'fill', coatColorInput);
  });

  userWizardEyes.addEventListener('click', function () {
    getColor(userWizardEyes, EYES_COLORS, 'fill', eyeColorInput);
  });

  userFireball.addEventListener('click', function () {
    getColor(userFireball, FIREBALL_COLORS, 'background', fireballColorInput);
  });

  userForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(userForm), successHandler, errorHandler);
  });
})();
