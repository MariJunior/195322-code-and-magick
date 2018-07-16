'use strict';

(function () {
  var coatColor;
  var eyesColor;
  var fireballColor;
  var wizards = [];

  var userDialog = document.querySelector('.setup');
  var wizardsInterface = document.querySelector('.setup-similar');
  var userForm = userDialog.querySelector('.setup-wizard-form');

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 15;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 10;
    }
    if (wizard.colorFireball === fireballColor) {
      rank += 5;
    }

    return rank;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var updateWizards = function () {
    window.render(wizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  };

  window.wizard.onCoatChange = window.debounce(function (color) {
    coatColor = color;
    updateWizards();
  });

  window.wizard.onEyesChange = window.debounce(function (color) {
    eyesColor = color;
    updateWizards();
  });

  window.wizard.onFireballChange = window.debounce(function (color) {
    fireballColor = color;
    updateWizards();
  });

  var successLoadHandler = function (data) {
    wizards = data;

    updateWizards();

    wizardsInterface.classList.remove('hidden');
  };

  var successSaveHandler = function () {
    userDialog.classList.add('hidden');
    userForm.reset();
  };

  window.backend.load(successLoadHandler, window.utils.errorHandler);

  userForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(userForm), successSaveHandler, window.utils.errorHandler);
  });
})();
