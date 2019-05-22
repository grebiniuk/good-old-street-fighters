import {fighterService} from './services/fightersService';

class Fighter{
  constructor({ _id, name, source }) {
    this._id = _id;
    this.name = name;
    this.source = source;
  }

  async getDetails() {
    if (!this.details) {
      this.details = await fighterService.getFighterDetails(this._id);
    }
    return this.details;
  }
  setDetails(details) {
    console.log(details);
    Object.assign(this.details, details);
  }

  getHitPower() {
    let criticalHitChance = Math.floor(Math.random() * 2 + 1);
    return this.details.attack * criticalHitChance;
  }
  getBlockPower() {
    let dodgeChance = Math.floor(Math.random() * 2 + 1);
    return this.details.defense * dodgeChance;
  }
}

export default Fighter;