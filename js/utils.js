'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var TIMEOUT = 3000;

  window.utils = {
    isEscEvent: function (evt, stopElement, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        var target = evt.target;

        if (target === stopElement) {
          evt.stopPropagation();
        } else {
          evt.preventDefault();
          action();
        }
      }
    },

    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },

    getRandomElement: function (arr) {
      return arr[Math.floor(Math.random() * (arr.length))];
    },

    errorHandler: function (errorMessage) {
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
      }, TIMEOUT);
    }
  };
})();
