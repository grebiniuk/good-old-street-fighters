import {fighterService} from './services/fightersService';

export interface IFighterData {
  readonly _id: number;
  name: string;
  source: string;
}

export interface IFighterDetails {
  name: string;
  attack: number;
  defense: number;
  health: number;
}

export interface IFighterDetailsUpdate {
  attack?: number|string,
  defense?: number|string,
  health?: number|string
}

export interface IFighter extends IFighterData {
  details: IFighterDetails;
  setDetails: (details: IFighterDetailsUpdate) => void;
  getDetails: () => Promise<IFighterDetails>;
  getHitPower: () => number;
  getBlockPower: () => number;
}

class Fighter implements IFighter {
  readonly _id: number;
  name: string;
  source: string;
  details: IFighterDetails;

  constructor({ _id, name, source }: IFighterData) {
    this._id = _id;
    this.name = name;
    this.source = source;
  }

  async getDetails(): Promise<IFighterDetails> {
    if (!this.details) {
      this.details = await fighterService.getFighterDetails(this._id);
    }
    return this.details;
  }

  setDetails(details: IFighterDetailsUpdate) {
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