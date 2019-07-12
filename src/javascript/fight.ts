import { IFighter } from './fighter';

function fight(p1: IFighter, p2: IFighter): {winner: IFighter, log: string} {
  let healthP1: number = p1.details.health;
  let healthP2: number = p2.details.health;
  let fightLog: string = '';

  while (healthP1 > 0 && healthP2 > 0) {
    const punchPower1 = Math.max(0, p1.getHitPower() - p2.getBlockPower());
    const punchPower2 = Math.max(0, p2.getHitPower() - p1.getBlockPower());
    healthP2 -= punchPower1;
    fightLog += `<p>${p1.name} 🤜 ${p2.name}  with 💪 ${punchPower1}. ${p2.name} ❤️ ${healthP2} <br>`;
    if (healthP2 > 0) {
      healthP1 -= punchPower2;
      fightLog += `${p2.name} 🤜 ${p1.name} with 💪 ${punchPower2}. ${p1.name} ❤️ ${healthP1} </p>`;
    }
  }
  return {
    winner: healthP1 > 0 ? p1 : p2,
    log: fightLog
  };
}

export default fight;