'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

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
    }
  };
})();
