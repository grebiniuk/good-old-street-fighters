import Modal from './modal';

class FighterInfoModal extends Modal {
  constructor() {
    super();
  }

  async showFighter(fighter){
    const fighterDetails = await fighter.getDetails();
    this.fighter = fighter;
    this.fieldSet.innerHTML = '';
    this.fieldSet.append(
        this.createName(fighterDetails.name),
        this.createInput(fighterDetails.health, 'health'),
        this.createInput(fighterDetails.attack, 'attack'),
        this.createInput(fighterDetails.defense, 'defense'),
    );
    this.show();
  }

  createName(name) {
    const nameElement = this.createElement({
      tagName: 'span',
      className: 'name'
    });
    nameElement.innerText = name;

    return nameElement;
  }

  createInput(value, name) {
    const labelElement = this.createElement({
      tagName: 'label',
      className: `label-info`,
      attributes: {for: `${name}-info`},
    });
    labelElement.innerText = name.charAt(0).toUpperCase() + name.slice(1) +
        ': ';
    const inputElement = this.createElement({
      tagName: 'input',
      className: `input-info`,
      attributes: {
        type: 'number',
        name,
        value,
        id: `${name}-info`,
        placeholder: 'Numbers only',
        min: '0',
        required: 'required',
      },
    });
    const divElement = this.createElement({
      tagName: 'div',
      className: 'fighter-info'
    });
    divElement.append(labelElement, inputElement);
    return divElement;
  }
  onUpdate(event) {
    let isValid = true;
    const elements = this.formElement.elements;
    const newDetails = {};
    for (let i = 0; i < elements.length; i++) {
      if (!elements[i].matches('input[type="number"]')) {
        continue;
      } else if (!elements[i].matches(':valid')) {
        isValid = false;
        break;
      }
      newDetails[elements[i].name] = elements[i].value;
    }
    if (isValid){
      event.preventDefault();
      this.fighter.setDetails(newDetails);
      this.close();
    }
  }
}

export default FighterInfoModal;