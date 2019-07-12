import Modal from './modal';
import {IFighter, IFighterDetailsUpdate} from './fighter';

class FighterInfoModal extends Modal {
  fighter: IFighter;

  async showFighter(fighter: IFighter){
    const fighterDetails = await fighter.getDetails();
    this.fighter = fighter;
    this.fieldSet.innerHTML = '';
    this.fieldSet.append(
        this.createName(fighterDetails.name),
        this.createInput(String(fighterDetails.health), 'health'),
        this.createInput(String(fighterDetails.attack), 'attack'),
        this.createInput(String(fighterDetails.defense), 'defense'),
    );
    this.show();
  }

  createName(name: string): HTMLSpanElement {
    const nameElement = this.createElement({
      tagName: 'span',
      className: 'name'
    }) as HTMLSpanElement;
    nameElement.innerText = name;

    return nameElement;
  }

  createInput(value: string, name: string) {
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
  onUpdate(event: Event) {
    let isValid = true;
    const elements = this.formElement.elements;
    const newDetails: IFighterDetailsUpdate = {};
    for (let i = 0; i < elements.length; i++) {
      if (!elements[i].matches('input[type="number"]')) {
        continue;
      } else if (!elements[i].matches(':valid')) {
        isValid = false;
        break;
      }
      let input = elements[i] as HTMLInputElement;
      newDetails[input.name as 'attack' | 'defense' | 'health'] = input.value;
    }
    if (isValid){
      event.preventDefault();
      this.fighter.setDetails(newDetails);
      this.close();
    }
  }
}

export default FighterInfoModal;