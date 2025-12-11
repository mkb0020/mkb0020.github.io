// bossScene.js
import { SCREEN_W, SCREEN_H, Colors } from '../config/gameConfig.js';
import { getBoss, initializeBoss, chooseBossMove } from '../config/bosses.js';
import { calculateDamage } from '../systems/battleSystem.js';
import { createVolumeToggle } from '../utils/audioControls.js';
import {
  setupBossMusic,
  addBossBackground,
  addBattleSprites,
  addPlayerHPPanel,
  addBossHPPanel,
  addBattleLogPanel,
  addMoveButtonsPanel,
  createMoveButtons,
  updateHPBars,
  updateMoveButtons,
  animateAttack,
  animateHit,
  animateHeal,
  animateDefeat,
  animateExplosion,
  animateFireball,
  animateSmoke,
  animateSwirl,
  animatePowerup,
  animateClaw,
  animateZoomies,
  animateBigBoom,
  animateGreenBlast,
  animateBiscuits,
  animateEspressoFireball,
  animateScratch,
  animateSuperpositionSlam,
  animateHydrogenHammer,
  animatePoisonAttack,
  animateRodentRage,
  animateBite,
  animateMouseMissiles,
  animateLaserBeam,
  animateZap
} from '../helpers/bossHelpers.js';

/**
 * CREATE BOSS BATTLE SCENES
 */
export function createBossBattleScene(bossId, character, playerHP) {
  setupBossMusic();

  const bossConfig = getBoss(bossId);
  const boss = initializeBoss(bossId);
  
  // PLAYER STATS
  const player = {
    name: character.name,
    hp: parseInt(playerHP) || character.stats.maxHP,
    maxHP: parseInt(character.stats.maxHP),
    atk: parseInt(character.stats.baseAtk),
    speed: parseInt(character.stats.baseSpeed),
    defense: parseInt(character.stats.baseDefense),
    moves: JSON.parse(JSON.stringify(character.moves)),
    speedBuffTurns: 0,
    defenseBuffTurns: 0
  };

  // BATTLE STATE
  let battleLog = bossConfig.introMessage[0];
  let waitingForPlayer = true;
  let battleActive = true;

  // VISUAL ELEMENTS
  addBossBackground(bossConfig);
  const { playerSprite, playerGlow, bossSprite, bossGlow } = addBattleSprites(character, bossConfig);
  const { playerHPBar, playerHPText } = addPlayerHPPanel(player);
  const { bossHPBar, bossHPText } = addBossHPPanel(boss);
  const logText = addBattleLogPanel(battleLog);
  addMoveButtonsPanel();

  // GETTERS FOR GAME STATES
  const getGameActive = () => battleActive && waitingForPlayer;

  // CREATE MOVE BUTTONS
  const moveButtons = createMoveButtons(player, executeTurn, getGameActive);

  // UPDATE BATTLE LOG
  function updateLog(message) {
    battleLog = message;
    logText.text = message;
  }


  // 🎮 ANIMATIONS
  function playAttackAnimation(moveName, attackerSprite, targetSprite, attackerGlow, isHeal) {
      console.log('🎮 Playing animation for:', moveName, 'uppercase:', moveName.toUpperCase());

  const isPlayer = attackerSprite === playerSprite;
  
  // MAP MOVES TO ANIMATIONS
  switch(moveName.toUpperCase()) {
    // PLAYER MOVES
    case "ZOOMIES":
      animateZoomies(attackerSprite, targetSprite);
      animateAttack(attackerSprite, attackerGlow, isPlayer);
      wait(0.2, () => animateHit(targetSprite, isPlayer ? bossGlow : playerGlow));
      break;
      
    case "CATNIP CLAW":
      animateClaw(attackerSprite, targetSprite);
      animateAttack(attackerSprite, attackerGlow, isPlayer);
      wait(0.2, () => animateHit(targetSprite, isPlayer ? bossGlow : playerGlow));
      break;
      
    case "SCRATCH":
      animateScratch(attackerSprite, targetSprite);
      animateAttack(attackerSprite, attackerGlow, isPlayer);
      wait(0.2, () => animateHit(targetSprite, isPlayer ? bossGlow : playerGlow));
      break;
      
    case "MAKE BISCUITS":
      animateBiscuits(attackerSprite);
      animateHeal(attackerSprite, attackerGlow);
      break;
    
    
    // LASER POINTER BOSS MOVES
    case "ZAP":
      animateZap(attackerSprite, targetSprite);
      animateAttack(attackerSprite, attackerGlow, isPlayer);
      wait(0.2, () => animateHit(targetSprite, isPlayer ? bossGlow : playerGlow));
      break;
      
    case "LASER BEAM":
      animateLaserBeam(attackerSprite, targetSprite);
      //animateAttack(attackerSprite, attackerGlow, isPlayer);
      wait(0.2, () => animateHit(targetSprite, isPlayer ? bossGlow : playerGlow));
      break;
    
    
      // BOSS CUP MOVES
    case "ESPRESSO EMBER":
      animateEspressoFireball(attackerSprite, targetSprite);
      animateAttack(attackerSprite, attackerGlow, isPlayer);
      wait(0.2, () => animateHit(targetSprite, isPlayer ? bossGlow : playerGlow));
      break;
      
    case "STEAM BURN":
      animateSmoke(targetSprite);
      animateExplosion(targetSprite);
      animateAttack(attackerSprite, attackerGlow, isPlayer);
      wait(0.2, () => animateHit(targetSprite, isPlayer ? bossGlow : playerGlow));
      break;
      
    case "REFILL":
      animatePowerup(attackerSprite);
      animateHeal(attackerSprite, attackerGlow);
      break;
    
    // BOSS CUCUMBER MOVES
    case "CUCUMBER CRUNCH":
      animateExplosion(targetSprite);
      shake(20);
      animateAttack(attackerSprite, attackerGlow, isPlayer);
      wait(0.2, () => animateHit(targetSprite, isPlayer ? bossGlow : playerGlow));
      break;
      
    case "CUCUMBER CANNON":
      animateGreenBlast(attackerSprite, targetSprite);
      animateAttack(attackerSprite, attackerGlow, isPlayer);
      wait(0.2, () => animateHit(targetSprite, isPlayer ? bossGlow : playerGlow));
      break;
      
    case "PICKLE":
      animatePowerup(attackerSprite);
      animateHeal(attackerSprite, attackerGlow);
      break;
      
    case "GOURD GUARD":
      animateSwirl(attackerSprite);
      animateHeal(attackerSprite, attackerGlow);
      break;
    
    // RAT KING
    case "BITE":
  animateBite(attackerSprite, targetSprite);
  animateAttack(attackerSprite, attackerGlow, isPlayer);
  wait(0.2, () => animateHit(targetSprite, isPlayer ? bossGlow : playerGlow));
  break;
  
    case "RODENT RAGE":
      animateRodentRage(attackerSprite, targetSprite);
      animateAttack(attackerSprite, attackerGlow, isPlayer);
      wait(0.2, () => animateHit(targetSprite, isPlayer ? bossGlow : playerGlow));
      break;
      
    case "MOUSE MISSILES":
      animateMouseMissiles(attackerSprite, targetSprite);
     // animateAttack(attackerSprite, attackerGlow, isPlayer);
      wait(0.2, () => animateHit(targetSprite, isPlayer ? bossGlow : playerGlow));
      break;



    // OBSERVER MOVES 
    case "POISON":
        animatePoisonAttack(attackerSprite, targetSprite);
        animateAttack(attackerSprite, attackerGlow, isPlayer);
        wait(0.2, () => animateHit(targetSprite, isPlayer ? bossGlow : playerGlow));
        break;
        
    case "HYDROGEN HAMMER":
        animateHydrogenHammer(attackerSprite, targetSprite);
        animateAttack(attackerSprite, attackerGlow, isPlayer);
        wait(0.2, () => animateHit(targetSprite, isPlayer ? bossGlow : playerGlow));
        break;
        
    case "SUPERPOSITION SLAM":
        animateSuperpositionSlam(attackerSprite, targetSprite);
        animateAttack(attackerSprite, attackerGlow, isPlayer);
        wait(0.2, () => animateHit(targetSprite, isPlayer ? bossGlow : playerGlow));
        break;
      

    // DEFAULT: SIMPLE EXPLOSION
    default:
      animateExplosion(targetSprite);
      animateAttack(attackerSprite, attackerGlow, isPlayer);
      wait(0.2, () => animateHit(targetSprite, isPlayer ? bossGlow : playerGlow));
      break;
  }
  }

  // EXECUTE A TURN
  function executeTurn(playerMoveName) {
    waitingForPlayer = false;
    
    // GET MOVES
    const playerMove = player.moves[playerMoveName];
    const bossMoveName = chooseBossMove(boss, null);
    const bossMove = boss.moves[bossMoveName];
    
    // DECREMENT USES
    playerMove.uses--;
    bossMove.uses--;
    
    // DETERMINE ORDER BASED ON SPEED
    let firstAttacker, secondAttacker;
    let firstMove, secondMove;
    let firstMoveName, secondMoveName;
    let firstSprite, secondSprite, firstGlow, secondGlow;
    
    if (player.speed >= boss.speed) {
      firstAttacker = player;
      secondAttacker = boss;
      firstMove = playerMove;
      secondMove = bossMove;
      firstMoveName = playerMoveName;
      secondMoveName = bossMoveName;
      firstSprite = playerSprite;
      secondSprite = bossSprite;
      firstGlow = playerGlow;
      secondGlow = bossGlow;
    } else {
      firstAttacker = boss;
      secondAttacker = player;
      firstMove = bossMove;
      secondMove = playerMove;
      firstMoveName = bossMoveName;
      secondMoveName = playerMoveName;
      firstSprite = bossSprite;
      secondSprite = playerSprite;
      firstGlow = bossGlow;
      secondGlow = playerGlow;
    }
    
    // FIRST MOVE
    wait(0.5, () => {
      let logMessage = "";
      
      playAttackAnimation(firstMoveName, firstSprite, secondSprite, firstGlow, firstMove.heal);
      
      if (firstAttacker === player) {
        logMessage = executeMove(player, boss, firstMoveName, firstMove);
      } else {
        logMessage = executeMove(boss, player, firstMoveName, firstMove);
      }
      
      updateLog(logMessage);
      updateHPBars(player, boss, playerHPBar, playerHPText, bossHPBar, bossHPText);
      
      // CHECK IF SOMEONE IS AT 0 HP
      if (checkBattleEnd()) {
        return;
      }

    wait(2.5, () => {
      let secondLogMessage = "";
      
      playAttackAnimation(secondMoveName, secondSprite, firstSprite, secondGlow, secondMove.heal);
      
      if (secondAttacker === player) {
        secondLogMessage = executeMove(player, boss, secondMoveName, secondMove);
      } else {
        secondLogMessage = executeMove(boss, player, secondMoveName, secondMove);
      }
        
        updateLog(secondLogMessage);
        updateHPBars(player, boss, playerHPBar, playerHPText, bossHPBar, bossHPText);
        
        if (checkBattleEnd()) {
          return;
        }
        
        // UPDATE BUFFS
        if (player.speedBuffTurns > 0) player.speedBuffTurns--;
        if (player.defenseBuffTurns > 0) player.defenseBuffTurns--;
        if (boss.speedBuffTurns > 0) boss.speedBuffTurns--;
        if (boss.defenseBuffTurns > 0) boss.defenseBuffTurns--;
        
        // READY FOR NEXT TURN
        wait(1, () => {
          updateMoveButtons(moveButtons, player);
          waitingForPlayer = true;
          updateLog("Choose your move!");
        });
      });
    });
  }

  // HANDLES DAMAGE CALCULATION, HEALING, AND BUFFS
  function executeMove(attacker, defender, moveName, move) {
    let message = "";
    
    if (move.heal) {
      // HEALING
      const healAmount = Math.min(move.heal, attacker.maxHP - attacker.hp);
      attacker.hp += healAmount;
      message = `${attacker.name} used ${moveName} and restored ${healAmount} HP!`;
    } else if (move.dmg) {
      // DAMAGE
      const damageResult = calculateDamage(attacker, defender, move.dmg);
      defender.hp = Math.max(0, defender.hp - damageResult.damage);
      message = `${attacker.name} used ${moveName} and dealt ${damageResult.damage} damage!`;
      
      if (damageResult.crit) {
        message += " CRITICAL HIT!";
      }
      
      // BUFFS
      if (move.speedBoost) {
        attacker.speedBuffTurns = 2;
        message += ` ${attacker.name}'s speed increased!`;
      }
      if (move.defenseBoost) {
        attacker.defenseBuffTurns = 2;
        message += ` ${attacker.name}'s defense increased!`;
      }
    }
    
    return message;
  }

  function checkBattleEnd() {
    const bossHP = parseInt(boss.hp) || 0;
    const currentPlayerHP = parseInt(player.hp) || 0;
    
    console.log('🔍 Checking battle end | Boss HP:', bossHP, 'Player HP:', currentPlayerHP);
    
    if (bossHP <= 0) {
      console.log('🎉 BOSS DEFEATED!');
      battleActive = false;
      updateLog(`${boss.name} has been defeated! Victory!`);
      
      animateDefeat(bossSprite, bossGlow, false); // ANIMATE BOSS DEFEAT
      
      wait(2, () => {
        if (bossId === 'BossLaserPointer') {
          go("bossDefeated", {
            level: "laserPointerBoss",
            score: 0,
            nextLevel: "Transition2",
            character: character,
            playerHP: player.hp
          });
        } else if (bossId === 'BossCup') {
          go("bossDefeated", {
            level: "cupBoss",
            score: 0,
            nextLevel: "Transition3",
            character: character,
            playerHP: player.hp
          });
        } else if (bossId === 'BossCucumber') {
          go("bossDefeated", {
            level: "cucumberBoss",
            score: 0,
            nextLevel: "Transition4",
            character: character,
            playerHP: player.hp
          });
        } else if (bossId === 'BossRatKing') {
          go("bossDefeated", {
            level: "ratKingBoss",
            score: 0,
            nextLevel: "Transition5",
            character: character,
            playerHP: player.hp
          });
        } else if (bossId === 'observerBoss') {
            go("transition", "Transition7", character, player.hp);
          }
      });

            
            return true;
          }
    

      if (currentPlayerHP <= 0) {
        console.log('💀 PLAYER DEFEATED!');
        battleActive = false;
        updateLog(`${player.name} has been defeated...`);
        
        animateDefeat(playerSprite, playerGlow, true);
        
        wait(2, () => {
          go("gameOver", { 
            level: "boss",
            lives: 3, 
            character: character
          });
        });
        
        return true;
      }
    
    return false;
  }

  // INITIALIZE
  updateHPBars(player, boss, playerHPBar, playerHPText, bossHPBar, bossHPText);
  updateMoveButtons(moveButtons, player);
  createVolumeToggle();
}

export function createLaserPointerBossScene(character, playerHP) {
  createBossBattleScene('BossLaserPointer', character, playerHP);
}

export function createCupBossScene(character, playerHP) {
  createBossBattleScene('BossCup', character, playerHP);
}

export function createCucumberBossScene(character, playerHP) {
  createBossBattleScene('BossCucumber', character, playerHP);
}

export function createRatKingBossScene(character, playerHP) {
  createBossBattleScene('BossRatKing', character, playerHP);
}

export function createObserverBossScene(character, playerHP) {
  createBossBattleScene('observerBoss', character, playerHP);
}

