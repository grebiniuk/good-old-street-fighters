import View from './view';
import FighterView from './fighterView';
import FighterInfoView from './fighterInfoView';
import { fighterService } from './services/fightersService';

class FightersView extends View {
    constructor(fighters) {
      super();
      
      this.handleClick = this.handleFighterClick.bind(this);
      this.createFighters(fighters);
    }
  
    fightersDetailsMap = new Map();
  
    createFighters(fighters) {
      const fighterElements = fighters.map(fighter => {
        const fighterView = new FighterView(fighter, this.handleClick);
        return fighterView.element;
      });
  
      this.element = this.createElement({ tagName: 'div', className: 'fighters' });
      this.element.append(...fighterElements);
    }
  
    async handleFighterClick(event, fighter) {
      if (this.fightersDetailsMap.get(fighter._id) === undefined) {
        this.fightersDetailsMap.set(fighter._id, await fighterService.getFighterDetails(fighter._id));
      }
      
      const chosenFighter = this.fightersDetailsMap.get(fighter._id);
      const fighterInfoElements = chosenFighter.map(chosenFighter => {
        const fighterInfoView = new FighterInfoView(chosenFighter);
        return fighterInfoView.element;
      });

      this.element = this.createElement({ tagName: 'div', className: 'infos' });
      this.element.append(...fighterInfoElements);
      // Get the modal
      let modal = document.getElementById("fighterInfo");
      modal.style.visibility = "visible";
      let form = document.getElementById("form");
      form.innerHTML = '';

      for (let value in chosenFighter) {
        if (value == '_id' || value == 'source') {
          continue;
        }
        let elem = this.createElement({tagName: "div", className: value});
        let cValue = value.charAt(0).toUpperCase() + value.slice(1);
        elem.innerHTML = `${cValue}: ${chosenFighter[value]}`;
        form.appendChild(elem);
      }
      
      // Get the <span> element that closes the modal
      let span = document.getElementsByClassName("close")[0];
      
      // When the user clicks on <span> (x), close the modal
      span.onclick = () => modal.style.visibility = "hidden";

      // When the user clicks anywhere outside of the modal, close it
      window.onclick = (event) => {
        if (event.target == modal) {
          modal.style.visibility = "hidden";
        }
      }
      // get from map or load info and add to fightersMap - Done
      // show modal with fighter info - Done
      // allow to edit health and power in this modal
    }
  }

  export default FightersView;