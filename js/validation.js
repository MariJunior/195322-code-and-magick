'use strict';

(function () {
  var userNameInput = document.querySelector('.setup-user-name');

  userNameInput.addEventListener('invalid', function () {
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
})();
