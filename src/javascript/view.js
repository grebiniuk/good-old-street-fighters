class View {
  element;

  createElement({ tagName, className = '', attributes = {}, html = '', text = '' }) {
    const element = document.createElement(tagName);
    if (className) {
      element.classList.add(className);
    }
    if (html) {
      element.innerHTML = html;
    } else if (text) {
      element.innerText = text;
    }

    Object.keys(attributes).forEach(key => element.setAttribute(key, attributes[key]));

    return element;
  }
}

export default View;