'use strict';

(function () {
  var WIZARDS_QUANTITY = 4;
  var wizardsList = document.querySelector('.setup-similar-list');
  var template = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var fragment = document.createDocumentFragment();

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

  window.render = function (wizardsArr) {
    var takeNumber = wizardsArr.length > WIZARDS_QUANTITY ? WIZARDS_QUANTITY : wizardsArr.length;
    wizardsList.innerHTML = '';
    for (var i = 0; i < takeNumber; i++) {
      var newWizard = createWizard(wizardsArr[i]);

      fragment.appendChild(newWizard);
    }

    wizardsList.appendChild(fragment);
  };
})();
