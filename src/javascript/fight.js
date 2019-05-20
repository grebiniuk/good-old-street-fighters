function fight(p1, p2) {
  let healthP1 = p1.details.health;
  let healthP2 = p2.details.health;

  while (healthP1 > 0 && healthP2 > 0) {

    healthP2 -= Math.max(0, p1.getHitPower() - p2.getBlockPower());
    console.log(`health p1: ${healthP1}`);
    if (healthP2 > 0) {
      healthP1 -= Math.max(0, p2.getHitPower() - p1.getBlockPower());
    }
    console.log(`health p2: ${healthP2}`);
  }
  return healthP1 > 0 ? p1 : p2;
}

export default fight;