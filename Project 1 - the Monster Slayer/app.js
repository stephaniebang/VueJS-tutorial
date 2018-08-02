new Vue({
  el: '#app',
  
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    damage: [8, 12],   // damage for normal attack and for special attack
    heal: 10,
    gameEnd: false,
    eventLog: []   // array of events
  },

  methods: {
    attackRound: function(i) {
      // computes attacks
      var hit = this.monsterAttack();

      this.monsterHealth -= this.damage[i];
      this.playerHealth -= hit;

      // saves events to eventLog
      this.eventLog.push({ player:  "Player hits monster for "+this.damage[i],
                      monster: "Monster hits player for "+hit
                    });

      if (this.playerHealth <= 0 || this.monsterHealth <= 0) this.gameEnd = true;
    },

    healRound: function() {
      // computes heal with attack
      var hit = this.monsterAttack();
      this.playerHealth += this.heal-hit;

      // saves events to eventLog
      this.eventLog.push({ player:  "Player heals himself for "+this.heal,
                      monster: "Monster hits player for "+hit
                    });
    },

    monsterAttack: function() {
      var i = Math.random();

      // 50% chance of dealing a weak attack
      if (i < 0.5) return this.damage[0];
      // 35% chance of dealing a normal attack
      if (i < 0.85) return (this.damage[0]+this.damage[1])/2;
      // 15% chance of dealing a special attack
      return this.damage[1];
    },

    giveUp: function() {
      this.playerHealth = 0;
      this.gameEnd = true;
    },

    restartGame: function() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.gameEnd = false;
      this.eventLog = [];
    }
  },

  computed: {
    resultMessage: function() {
      return this.playerHealth <= 0 ? "YOU LOST! MWAHAHAHA" : "YOU WON! YAY! :D";
    }
  }
});