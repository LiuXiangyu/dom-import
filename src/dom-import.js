void function () {
  const createDOM = html => {
    var parent = document.createElement('div');
    parent.innerHTML = html;
    return parent.childNodes;
  };

  const replace = item => {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', item.getAttribute('src'));
    xhr.onload = () => {
      var newChildren = createDOM(xhr.responseText);
      [].forEach.call(newChildren, child => {
        item.parentNode.insertBefore(child, item);
      });
      item.remove();
    };
    xhr.send();
  };

  document.addEventListener('DOMSubtreeModified', () => {
    var elements = document.getElementsByTagName('import');
    [].forEach.call(elements, item => {
      if (!item.getAttribute('replaced')) {
        replace(item);
        item.setAttribute('replaced', true);
      }
    });
  });
}();
