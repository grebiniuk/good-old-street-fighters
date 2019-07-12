import { callApi  } from '../helpers/apiHelper';
import {IFighterDetails} from "../fighter";

class FighterService {
  async getFighters() {
    try {
      const endpoint = 'fighters.json';
      const apiResult = await callApi(endpoint);

      return JSON.parse(atob(apiResult.content));
    } catch (error) {
      throw error;
    }

  }

  async getFighterDetails(_id: number): Promise<IFighterDetails> {
    try {
      const endpoint = `details/fighter/${_id}.json`;
      const apiResult = await callApi(endpoint);

      return JSON.parse(atob(apiResult.content));
    } catch (error) {
      throw error;
    }
  }

}

export const fighterService = new FighterService();