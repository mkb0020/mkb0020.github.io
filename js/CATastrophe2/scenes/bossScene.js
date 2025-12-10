// bossScene.js - Boss Battle Scenes for Kaplay
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
  animatePoisonAttack
} from '../helpers/bossHelpers.js';

/**
 * Create boss battle scene - used for all three bosses
 */
export function createBossBattleScene(bossId, character, playerHP) {
  // Setup music
  setupBossMusic();

  // Get boss config and initialize
  const bossConfig = getBoss(bossId);
  const boss = initializeBoss(bossId);
  
  // Initialize player stats
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

  // Battle state
  let battleLog = bossConfig.introMessage[0];
  let waitingForPlayer = true;
  let battleActive = true;

  // Add visual elements
  addBossBackground(bossConfig);
  const { playerSprite, playerGlow, bossSprite, bossGlow } = addBattleSprites(character, bossConfig);
  const { playerHPBar, playerHPText } = addPlayerHPPanel(player);
  const { bossHPBar, bossHPText } = addBossHPPanel(boss);
  const logText = addBattleLogPanel(battleLog);
  addMoveButtonsPanel();

  // Getters for game state
  const getGameActive = () => battleActive && waitingForPlayer;

  // Create move buttons
  const moveButtons = createMoveButtons(player, executeTurn, getGameActive);

  // Update battle log
  function updateLog(message) {
    battleLog = message;
    logText.text = message;
  }





  // 🎮 Choose which particle animation to play!
  function playAttackAnimation(moveName, attackerSprite, targetSprite, attackerGlow, isHeal) {
      console.log('🎮 Playing animation for:', moveName, 'uppercase:', moveName.toUpperCase());

  const isPlayer = attackerSprite === playerSprite;
  
  // Map move names to animations
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
    
          // OBSERVER MOVES - 🔬 THE NEW QUANTUM ATTACKS!
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
      

    // DEFAULT: Simple explosion
    default:
      animateExplosion(targetSprite);
      animateAttack(attackerSprite, attackerGlow, isPlayer);
      wait(0.2, () => animateHit(targetSprite, isPlayer ? bossGlow : playerGlow));
      break;
  }
  }



  // Execute a turn
  function executeTurn(playerMoveName) {
    waitingForPlayer = false;
    
    // Get moves
    const playerMove = player.moves[playerMoveName];
    const bossMoveName = chooseBossMove(boss, null);
    const bossMove = boss.moves[bossMoveName];
    
    // Decrement uses
    playerMove.uses--;
    bossMove.uses--;
    
    // Determine order based on speed
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
    
    // First move
    wait(0.5, () => {
      let logMessage = "";
      
      // 🎨 ALL moves go through playAttackAnimation now!
      playAttackAnimation(firstMoveName, firstSprite, secondSprite, firstGlow, firstMove.heal);
      
      if (firstAttacker === player) {
        logMessage = executeMove(player, boss, firstMoveName, firstMove);
      } else {
        logMessage = executeMove(boss, player, firstMoveName, firstMove);
      }
      
      updateLog(logMessage);
      updateHPBars(player, boss, playerHPBar, playerHPText, bossHPBar, bossHPText);
      
      // Check if battle ends after first move
      if (checkBattleEnd()) {
        return;
      }
      
      // Second move
    // Second move
    // Second move
    wait(2.5, () => {
      let secondLogMessage = "";
      
      // 🎨 ALL moves go through playAttackAnimation now!
      playAttackAnimation(secondMoveName, secondSprite, firstSprite, secondGlow, secondMove.heal);
      
      if (secondAttacker === player) {
        secondLogMessage = executeMove(player, boss, secondMoveName, secondMove);
      } else {
        secondLogMessage = executeMove(boss, player, secondMoveName, secondMove);
      }
        
        updateLog(secondLogMessage);
        updateHPBars(player, boss, playerHPBar, playerHPText, bossHPBar, bossHPText);
        
        // Check if battle ends after second move
        if (checkBattleEnd()) {
          return;
        }
        
        // Update buffs
        if (player.speedBuffTurns > 0) player.speedBuffTurns--;
        if (player.defenseBuffTurns > 0) player.defenseBuffTurns--;
        if (boss.speedBuffTurns > 0) boss.speedBuffTurns--;
        if (boss.defenseBuffTurns > 0) boss.defenseBuffTurns--;
        
        // Ready for next turn
        wait(1, () => {
          updateMoveButtons(moveButtons, player);
          waitingForPlayer = true;
          updateLog("Choose your move!");
        });
      });
    });
  }

  // Execute a single move (handles damage calculation, healing, and buffs)
  function executeMove(attacker, defender, moveName, move) {
    let message = "";
    
    if (move.heal) {
      // Healing move
      const healAmount = Math.min(move.heal, attacker.maxHP - attacker.hp);
      attacker.hp += healAmount;
      message = `${attacker.name} used ${moveName} and restored ${healAmount} HP!`;
    } else if (move.dmg) {
      // Damage move - calculateDamage returns an object with {damage, crit}
      const damageResult = calculateDamage(attacker, defender, move.dmg);
      defender.hp = Math.max(0, defender.hp - damageResult.damage);
      message = `${attacker.name} used ${moveName} and dealt ${damageResult.damage} damage!`;
      
      if (damageResult.crit) {
        message += " CRITICAL HIT!";
      }
      
      // Apply buffs if any
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
      
      // Animate boss defeat
      animateDefeat(bossSprite, bossGlow, false);
      
      wait(2, () => {
        if (bossId === 'BossCup') {
          go("bossDefeated", {
            level: "cupBoss",
            score: 0,
            nextLevel: "level2",
            character: character,
            playerHP: player.hp
          });
        } else if (bossId === 'BossCucumber') {
          go("bossDefeated", {
            level: "cucumberBoss",
            score: 0,
            nextLevel: "level3",
            character: character,
            playerHP: player.hp
          });
        } else if (bossId === 'Observer') {
          go("victory", { character });
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
          // Pass lives data - boss battles start with 3 lives by default
          // You can modify this if you want to carry lives from levels
          go("gameOver", { 
            level: "boss",
            lives: 3, // Could be passed in from level if you want
            character: character
          });
        });
        
        return true;
      }
    
    return false;
  }

  // Initialize
  updateHPBars(player, boss, playerHPBar, playerHPText, bossHPBar, bossHPText);
  updateMoveButtons(moveButtons, player);
  createVolumeToggle();
}

/**
 * Helper function to create all three boss scenes
 */
export function createCupBossScene(character, playerHP) {
  createBossBattleScene('BossCup', character, playerHP);
}

export function createCucumberBossScene(character, playerHP) {
  createBossBattleScene('BossCucumber', character, playerHP);
}

export function createObserverBossScene(character, playerHP) {
  createBossBattleScene('observerBoss', character, playerHP);
}