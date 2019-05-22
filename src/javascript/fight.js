function fight(p1, p2) {
  let healthP1 = p1.details.health;
  let healthP2 = p2.details.health;
  let fightLog = '';

  while (healthP1 > 0 && healthP2 > 0) {
    const punchPower1 = Math.max(0, p1.getHitPower() - p2.getBlockPower());
    const punchPower2 = Math.max(0, p2.getHitPower() - p1.getBlockPower());
    healthP2 -= punchPower1;
    fightLog += `${p1.name} 🤜 ${p2.name}  with 💪 ${punchPower1}. ${p2.name} ❤️ ${healthP2}
    `;
    if (healthP2 > 0) {
      healthP1 -= punchPower2;
      fightLog += `${p2.name} 🤜 ${p1.name} with 💪 ${punchPower2}. ${p1.name} ❤️ ${healthP1}
    `;
    }
  }
  let winner = {};
  winner = healthP1 > 0 ? p1 : p2;
  winner.log = fightLog;
  return winner;
}

export default fight;