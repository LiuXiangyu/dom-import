'use strict';

void function () {
  var createDOM = function createDOM(html) {
    var parent = document.createElement('div');
    parent.innerHTML = html;
    return parent.childNodes;
  };

  var replace = function replace(item) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', item.getAttribute('src'));
    xhr.onload = function () {
      var newChildren = createDOM(xhr.responseText);
      [].forEach.call(newChildren, function (child) {
        item.parentNode.insertBefore(child, item);
      });
      item.remove();
    };
    xhr.send();
  };

  document.addEventListener('DOMSubtreeModified', function () {
    var elements = document.getElementsByTagName('import');
    [].forEach.call(elements, function (item) {
      if (!item.getAttribute('replaced')) {
        replace(item);
        item.setAttribute('replaced', true);
      }
    });
  });
}();
