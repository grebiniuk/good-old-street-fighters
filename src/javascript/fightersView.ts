import View from './view';
import FighterView from './fighterView';
import FighterInfoModal from './fighterInfoModal';
import fight from './fight';
import Fighter, { IFighter, IFighterData } from './fighter';
import Modal from './modal';

class FightersView extends View {
  players: [IFighter?, IFighter?];
  fighters: IFighter[];
  handleClick: (event: Event, fighter: IFighter ) => void;
  title: HTMLHeadingElement;
  fightersCollection: HTMLDivElement;
  fightButton: HTMLButtonElement;
  fighterInfo: FighterInfoModal;
  winnerInfo: Modal;

  constructor(fighters: IFighterData[]) {
    super();
    this.players = [];
    this.fighters = fighters.map((data: IFighterData) => new Fighter(data));
    this.handleClick = this.handleFighterClick.bind(this);
    this.createFighters();
  }

  createFighters() {
    const fighterElements = this.fighters.map((fighter: IFighter) => {
      const fighterView = new FighterView(fighter, this.handleClick);
      return fighterView.element;
    });

    this.element = this.createElement({
      tagName: 'div',
      className: 'fighters-view'
    });

    this.title = this.createElement({
      tagName: 'h1',
      className: 'title',
    }) as HTMLHeadingElement;
    this.title.innerHTML = 'Player select';
    this.element.append(this.title);

    this.fightersCollection = this.createElement({
      tagName: 'div',
      className: 'fighters'
    }) as HTMLDivElement;

    this.fightersCollection.append(...fighterElements);
    this.fightersCollection.addEventListener('change', event => this.onFighterCheck(event),
        false);
    this.element.append(this.fightersCollection);

    this.fightButton = this.createElement({
      tagName: 'button',
      className: 'wide-button',
      attributes: {style: 'visibility: hidden'},
    }) as HTMLButtonElement;
    this.fightButton.innerText = 'Start Fight';
    this.fightButton.addEventListener('click', event => this.startFight(event),
        false);
    this.element.append(this.fightButton);
  }

  async handleFighterClick(event: Event, fighter: IFighter) {
    if (((event.target as HTMLElement).parentNode as HTMLElement).matches('label.checkbox-container')) {
      return;
    }

    if (!this.fighterInfo) {
      this.fighterInfo = new FighterInfoModal();
      this.element.append(this.fighterInfo.element);
    }
    await this.fighterInfo.showFighter(fighter);
  }

  onFighterCheck(event: Event) {
    if (!((event.target as HTMLElement).parentNode as HTMLElement).matches('label.checkbox-container')) {
      return;
    }
    let fighter = this.fighters.find(fighter => String(fighter._id) === (event.target as HTMLInputElement).value);

    if (!fighter) {
      return;
    }

    if ((((event.target as HTMLElement).parentNode as HTMLElement).firstChild as HTMLInputElement).checked) {
      this.players.push(fighter);
    } else {
      let index = this.players.indexOf(fighter);
      if (index !== -1) {
        this.players.splice(index, 1);
      }
    }

    if (this.players.length > 2) {
      let fighter = this.players.shift();
      (document.querySelector('input[type="checkbox"][value="' + String(fighter._id) +
          '"]') as HTMLInputElement).checked = false;
    }
    if (this.players.length === 2) {
      this.fightButton.style.visibility = 'visible';
    } else {
      this.fightButton.style.visibility = 'hidden';
    }
  }

  async startFight(event: Event) {
    if ((event.target as HTMLElement).style.visibility === 'hidden') {
      return;
    }
    await this.players[0].getDetails();
    await this.players[1].getDetails();
    let result = fight(...this.players);
    if (!this.winnerInfo) {
      this.winnerInfo = new Modal();
      this.element.append(this.winnerInfo.element);
    } else {
      this.winnerInfo.fieldSet.innerHTML = '';
      this.winnerInfo.details.innerHTML = '';
    }
    this.winnerInfo.fieldSet.append(
        this.createElement({
          tagName: 'h3',
          className: 'winner-info',
          html: `And the winner is: <span>${result.winner.name}</span>`,
        }));
    this.winnerInfo.details.append(this.createElement({
      tagName: 'details',
      html: `<summary>See full fight details</summary> ${result.log}`,
      attributes: {style: 'max-height: 50%'},
    }));
    this.winnerInfo.show();
  }
}

export default FightersView;