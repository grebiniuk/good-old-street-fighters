import View from './view';
import FighterView from './fighterView';
import FighterInfoView from './fighterInfoView';
import {fighterService} from './services/fightersService';
import fight from './fight';
import Fighter from './fighter';

class FightersView extends View {
  fightersDetailsMap = new Map();
  players = [];

  constructor(fighters) {
    super();

    this.fighters = fighters.map(data => new Fighter(data));
    this.handleClick = this.handleFighterClick.bind(this);
    this.createFighters();
  }

  createFighters() {
    const fighterElements = this.fighters.map(fighter => {
      const fighterView = new FighterView(fighter, this.handleClick);
      return fighterView.element;
    });

    this.element = this.createElement({tagName: 'div', className: 'fighters'});
    this.element.append(...fighterElements);
    this.element.addEventListener('change', event => this.onFighterCheck(event),
        false);

    this.fightButton = this.createElement({
      tagName: 'button',
      className: 'fightButton',
      attributes: {disabled: true},
    });
    this.fightButton.innerText ='Start Fight';
    this.fightButton.addEventListener('click', event => this.startFight(event),
        false);
    this.element.append(this.fightButton);
  }

  async handleFighterClick(event, fighter) {
    if (event.target.matches('input[type="checkbox"]')) {
      return;
    }
    // await fighter.getDetails();
    // if (this.fightersDetailsMap.get(fighter._id) === undefined) {
    //   this.fightersDetailsMap.set(fighter._id,
    //       await fighterService.getFighterDetails(fighter._id));
    // }

    const chosenFighter = await fighter.getDetails();


    /*const fighterInfoElements = chosenFighter.map(chosenFighter => {
      const fighterInfoView = new FighterInfoView(chosenFighter);
      return fighterInfoView.element;
    });

    this.element = this.createElement({ tagName: 'div', className: 'infos' });
    this.element.append(...fighterInfoElements);*/
    // Get the modal
    let modal = document.getElementById('fighterInfo');
    modal.style.visibility = 'visible';
    let form = document.getElementById('form');
    form.innerHTML = '';

    for (let value in chosenFighter) {
      if (value == '_id' || value == 'source') {
        continue;
      }
      let elem = this.createElement({tagName: 'div', className: value});
      let cValue = value.charAt(0).toUpperCase() + value.slice(1);
      elem.innerHTML = `${cValue}: ${chosenFighter[value]}`;
      form.appendChild(elem);
    }

    // Get the <span> element that closes the modal
    let span = document.getElementsByClassName('close')[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = () => modal.style.visibility = 'hidden';

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = (event) => {
      if (event.target == modal) {
        modal.style.visibility = 'hidden';
      }
    };
    // get from map or load info and add to fightersMap - Done
    // show modal with fighter info - Done
    // allow to edit health and power in this modal
  }

  onFighterCheck(event) {
    if (!event.target.matches('input[type="checkbox"]')) {
      return;
    }
    let fighter = this.fighters.find(
        fighter => fighter._id === event.target.value);

    if (!fighter) {
      return;
    }

    if (event.target.checked) {
      this.players.push(fighter);
    } else {
      let index = this.players.indexOf(fighter);
      if (index !== -1) {
        this.players.splice(index, 1);
      }
    }
    if (this.players.length > 2) {
      let fighter = this.players.shift();
      document.querySelector('input[type="checkbox"][value="' + fighter._id +
          '"]').checked = false;
    }
    this.fightButton.disabled = this.players.length !== 2;
  }

  async startFight(event) {
    if (event.target.disabled) {
      return;
    }
    await this.players[0].getDetails();
    await this.players[1].getDetails();
    let winner = fight(...this.players);
    console.log(winner);
  }
}

export default FightersView;