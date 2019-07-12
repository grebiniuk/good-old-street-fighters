export interface IElement {
  tagName: string;
  className?: string;
  attributes?: {[key: string]: string};
  html?: string;
  text?: string;
}

class View {
  element: HTMLElement;

  createElement({ tagName, className = '', attributes = {}, html = '', text = '' }: IElement): HTMLElement {
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