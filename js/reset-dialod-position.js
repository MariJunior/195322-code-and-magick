'use strict';
(function () {
  var defaultDialogCoords = {
    beginX: window.userDialog.style.left,
    beginY: window.userDialog.style.top
  };

  window.resetDialogPosition = function () {
    window.userDialog.style.left = defaultDialogCoords.beginX;
    window.userDialog.style.top = defaultDialogCoords.beginY;
  };
})();
