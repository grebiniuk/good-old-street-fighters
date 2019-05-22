import View from './view';

class FighterView extends View {
  constructor(fighter, handleClick) {
    super();

    this.createFighter(fighter, handleClick);
  }

  createFighter(fighter, handleClick) {
    const { _id, name, source } = fighter;
    const nameElement = this.createName(name);
    const imageElement = this.createImage(source);
    const checkBoxElement = this.createCheckbox(_id);

    this.element = this.createElement({
      tagName: 'div',
      className: 'fighter',
    });
    this.element.append(imageElement, nameElement, checkBoxElement);
    this.element.addEventListener('click', event => handleClick(event, fighter), false);
  }

  createName(name) {
    const nameElement = this.createElement({
      tagName: 'span',
      className: 'name'
    });
    nameElement.innerText = name;

    return nameElement;
  }

  createImage(source) {
    const attributes = { src: source };

    return this.createElement({
      tagName: 'img',
      className: 'fighter-image',
      attributes
    });
  }

  createCheckbox(id) {
    const checkBoxElement = this.createElement({
      tagName: 'input',
      className: 'fighter-check',
      attributes: {type:"checkbox", value:id}
    });
    const checkMark = this.createElement({
      tagName: 'span',
      className: 'checkmark',
    });
    const checkboxContainer = this.createElement({
      tagName: 'label',
      className: 'checkbox-container',
    });
    checkboxContainer.append(checkBoxElement, checkMark);

    return checkboxContainer;
  }
}

export default FighterView;