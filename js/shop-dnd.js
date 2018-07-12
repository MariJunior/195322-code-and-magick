'use strict';
(function () {
  var shopElement = document.querySelector('.setup-artifacts-shop');
  var artifactsElement = document.querySelector('.setup-artifacts');
  var draggedItem = null;

  shopElement.addEventListener('dragstart', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target;
      evt.dataTransfer.setData('text', evt.target.alt);
    }

    return false;
  });

  artifactsElement.addEventListener('drop', function (evt) {
    evt.target.style.backgroundColor = '';
    evt.target.appendChild(draggedItem);

    return false;
  });

  artifactsElement.addEventListener('dragenter', function (evt) {
    evt.preventDefault();
    evt.target.style.backgroundColor = 'yellow';
  });

  artifactsElement.addEventListener('dragover', function (evt) {
    evt.preventDefault();

    return false;
  });

  artifactsElement.addEventListener('dragleave', function (evt) {
    evt.preventDefault();
    evt.target.style.backgroundColor = '';
  });
})();
