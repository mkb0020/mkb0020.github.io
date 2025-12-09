// characters.js
export const CHARACTERS = {
  NONA: {
    name: 'NONA',
    stats: {
      maxHP: 120,
      baseHP: 120,
      baseAtk: 42,
      baseSpeed: 38,
      baseDefense: 30,
    },
    platformerStats: { 
      speed: 5,
      jumpPower: -12,
      gravity: 0.6
    },
    moves: {
      "SCRATCH": { dmg: 24, uses: 5 },
      "CATNIP CLAW": { dmg: 42, uses: 2 },
      "ZOOMIES": { dmg: 25, speedBoost: true, uses: 3 },
      "MAKE BISCUITS": { heal: 30, uses: 3 }
    },
    sprites: {
      menu: 'assets/images/CATastrophe/NonaImg.png',
      small: 'assets/images/CATastrophe/NonaImg.png',
      big: 'assets/images/CATastrophe/NonaSelect.png',
      battle: 'assets/images/CATastrophe/NonaBattle.png',
      // LAZY LOAD THESE
      walk: 'assets/images/CATastrophe/NonaWalk.png',
      jump: 'assets/images/CATastrophe/NonaJump.png',
      stand: 'assets/images/CATastrophe/NonaStand.png',
      idle: 'assets/images/CATastrophe/NonaIdle.png',
      glowSprite: "glow"
    }
    
  },

  GATO: {
    name: 'GATO',
    stats: {
      maxHP: 120,
      baseHP: 120,
      baseAtk: 42,
      baseSpeed: 38,
      baseDefense: 30,
    },
    platformerStats: {  
      speed: 5,
      jumpPower: -12,
      gravity: 0.6
    },
    moves: {
      "SCRATCH": { dmg: 24, uses: 5 },
      "CATNIP CLAW": { dmg: 42, uses: 2 },
      "ZOOMIES": { dmg: 25, speedBoost: true, uses: 3 },
      "MAKE BISCUITS": { heal: 30, uses: 3 }
    },
    sprites: {
      menu: 'assets/images/CATastrophe/GatoImg.png',
      small: 'assets/images/CATastrophe/GatoImg.png',
      big: 'assets/images/CATastrophe/GatoSelect.png',
      battle: 'assets/images/CATastrophe/GatoBattle.png',
      // LAZY LOAD THESE
      walk: 'assets/images/CATastrophe/GatoWalk.png',
      jump: 'assets/images/CATastrophe/GatoJump.png',
      stand: 'assets/images/CATastrophe/GatoStand.png',
      idle: 'assets/images/CATastrophe/GatoIdle.png',
      glowSprite: "glow"
    }
  },

  NIELS: {
    name: 'NIELS',
    stats: {
      maxHP: 120,
      baseHP: 120,
      baseAtk: 42,
      baseSpeed: 38,
      baseDefense: 30,
    },
    platformerStats: {  
      speed: 5,
      jumpPower: -12,
      gravity: 0.6
    },
    moves: {
      "SCRATCH": { dmg: 24, uses: 5 },
      "CATNIP CLAW": { dmg: 42, uses: 2 },
      "ZOOMIES": { dmg: 25, speedBoost: true, uses: 3 },
      "MAKE BISCUITS": { heal: 30, uses: 3 }
    },
    sprites: {
      menu: 'assets/images/CATastrophe/NielsImg.png',
      small: 'assets/images/CATastrophe/NielsImg.png',
      big: 'assets/images/CATastrophe/NielsSelect.png',
      battle: 'assets/images/CATastrophe/NielsBattle.png',
      // LAZY LOAD THESE
      walk: 'assets/images/CATastrophe/NielsWalk.png',
      jump: 'assets/images/CATastrophe/NielsJump.png',
      stand: 'assets/images/CATastrophe/NielsStand.png',
      idle: 'assets/images/CATastrophe/NielsIdle.png',
      glowSprite: "glow"
    }
  },

  NOVA: {
    name: 'NOVA',
  stats: {
      maxHP: 120,
      baseHP: 120,
      baseAtk: 42,
      baseSpeed: 38,
      baseDefense: 30,
    },
    platformerStats: {  
      speed: 5,
      jumpPower: -12,
      gravity: 0.6
    },
    moves: {
      "SCRATCH": { dmg: 24, uses: 5 },
      "CATNIP CLAW": { dmg: 42, uses: 2 },
      "ZOOMIES": { dmg: 25, speedBoost: true, uses: 3 },
      "MAKE BISCUITS": { heal: 30, uses: 3 }
    },
    sprites: {
      menu: 'assets/images/CATastrophe/NovaImg.png',
      small: 'assets/images/CATastrophe/NovaImg.png',
      big: 'assets/images/CATastrophe/NovaSelect.png',
      battle: 'assets/images/CATastrophe/NovaBattle.png',
      // LAZY LOAD THESE
      walk: 'assets/images/CATastrophe/NovaWalk.png',
      jump: 'assets/images/CATastrophe/NovaJump.png',
      stand: 'assets/images/CATastrophe/NovaStand.png',
      idle: 'assets/images/CATastrophe/NovaIdle.png',
      glowSprite: "glow"
    }
  },

  // CLOUDY TEMPORARILY REMOVED DUE TO ISSUES WITH SPRITE SHEET
  ///CLOUDY: {
    //name: 'CLOUDY',
    //stats: {
//      maxHP: 120,
 //     baseHP: 120,
  //    baseAtk: 42,
  //    baseSpeed: 38,
 //     baseDefense: 30,
  //  },
  //  platformerStats: { 
    //  speed: 5,
     // jumpPower: -12,
//      gravity: 0.6
//    },
//    moves: {
// /     "SCRATCH": { dmg: 24, uses: 5 },
//      "CATNIP CLAW": { dmg: 42, uses: 2 },
//      "MAKE BISCUITS": { heal: 30, uses: 3 },
//      "ZOOMIES": { dmg: 25, speedBoost: true, uses: 3 }
//    },
   // sprites: {
   //   menu: 'assets/images/CATastrophe/CloudyImg.png',
   //   small: 'assets/images/CATastrophe/CloudyImg.png',
   //   big: 'assets/images/CATastrophe/CloudySelect.png',
   //   battle: 'assets/images/CATastrophe/CloudyBattle.png',
      // LAZY LOAD THESE
   //   walk: 'assets/images/CATastrophe/CloudyWalk.png',
   //   jump: 'assets/images/CATastrophe/CloudyJump.png',
   //   stand: 'assets/images/CATastrophe/CloudyStand.png',
   //   idle: 'assets/images/CATastrophe/CloudyIdle.png'
   // }
//  },


  CLOUDY: {
    name: 'AUBIE',
    stats: {
      maxHP: 120,
      baseHP: 120,
      baseAtk: 42,
      baseSpeed: 38,
      baseDefense: 30,
    },
    platformerStats: {  
      speed: 5,
      jumpPower: -12,
      gravity: 0.6
    },
    moves: {
      "SCRATCH": { dmg: 24, uses: 5 },
      "CATNIP CLAW": { dmg: 42, uses: 2 },
      "ZOOMIES": { dmg: 25, speedBoost: true, uses: 3 },
      "MAKE BISCUITS": { heal: 30, uses: 3 }
    },
    sprites: {
      menu: 'assets/images/CATastrophe/AubieImg.png',
      small: 'assets/images/CATastrophe/AubieImg.png',
      big: 'assets/images/CATastrophe/AubieSelect.png',
      battle: 'assets/images/CATastrophe/AubieBattle.png',
      // LAZY LOAD THESE
      walk: 'assets/images/CATastrophe/AubieWalk.png',
      jump: 'assets/images/CATastrophe/AubieJump.png',
      stand: 'assets/images/CATastrophe/AubieStand.png',
      idle: 'assets/images/CATastrophe/AubieIdle.png',
      glowSprite: "glow"
    }
  },

  
  DOUG: {
    name: 'DOUG',
    stats: {
      maxHP: 120,
      baseHP: 120,
      baseAtk: 42,
      baseSpeed: 38,
      baseDefense: 30,
    },
    platformerStats: {  
      speed: 5,
      jumpPower: -12,
      gravity: 0.6
    },
    moves: {
      "SCRATCH": { dmg: 24, uses: 5 },
      "CATNIP CLAW": { dmg: 42, uses: 2 },
      "ZOOMIES": { dmg: 25, speedBoost: true, uses: 3 },
      "MAKE BISCUITS": { heal: 30, uses: 3 }
    },
    sprites: {
      menu: 'assets/images/CATastrophe/DougImg.png',
      small: 'assets/images/CATastrophe/DougImg.png',
      big: 'assets/images/CATastrophe/DougSelect.png',
      battle: 'assets/images/CATastrophe/DougBattle.png',
      walk: 'assets/images/CATastrophe/DougWalk.png',
      jump: 'assets/images/CATastrophe/DougJump.png',
      stand: 'assets/images/CATastrophe/DougStand.png',
      idle: 'assets/images/CATastrophe/DougIdle.png',
      glowSprite: "glow"
    }
}}



export function getCharacter(characterName) {
  return CHARACTERS[characterName];
}


export function getCharacterList() {
  return Object.values(CHARACTERS);
}

export function getCharacterStats(characterName) {
  const char = CHARACTERS[characterName];
  return {
    name: char.name,
    stats: {
      maxHP: char.baseHP,
      atk: char.baseAtk,
      speed: char.baseSpeed,
      defense: char.baseDefense
    },
    moves: JSON.parse(JSON.stringify(char.moves)), 
    sprites: char.sprites
  };
}