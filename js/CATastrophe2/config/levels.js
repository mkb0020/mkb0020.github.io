/// levels.js - Clean, organized level configurations
export const LEVELS = {
  level1: {
    id: 'level1',
    name: 'Level 1',
    timeLimit: 90,
    length: 12000,
    playerSpawn: { x: 1000, y: 300 },
    groundPlatform: { x: -1000, y: 440, width: 13000, height: 50 },
    platforms: [
      { x: 40000, y: 350, width: 200, height: 20 },
      { x: 8300, y: 250, width: 200, height: 20 },
      { x: 12700, y: 220, width: 200, height: 20 },
      { x: 1950, y: 270, width: 200, height: 20 },
      { x: 2350, y: 200, width: 200, height: 20 },
      { x: 3000, y: 340, width: 200, height: 20 },
      { x: 3400, y: 290, width: 200, height: 20 },
      { x: 3700, y: 190, width: 200, height: 20 },
      { x: 4480, y: 270, width: 200, height: 20 },
      { x: 4800, y: 190, width: 200, height: 20 },
      { x: 5200, y: 160, width: 200, height: 20 },
      { x: 5750, y: 260, width: 200, height: 20 },
      { x: 6050, y: 210, width: 200, height: 20 },
      { x: 6330, y: 270, width: 200, height: 20 },
      { x: 6730, y: 180, width: 200, height: 20 },
      { x: 6920, y: 270, width: 200, height: 20 },
      { x: 7200, y: 270, width: 200, height: 20 },
      { x: 7600, y: 230, width: 200, height: 20 },
      { x: 8000, y: 210, width: 200, height: 20 },
      { x: 8400, y: 150, width: 200, height: 20 },
    ],
    cups: { enabled: true, count: 20 },
    enemies: {
      cucumbers: { enabled: false },
      rats: { enabled: false },
      lasers: { enabled: false }
    },
    items: {
      fishBones: { enabled: true, count: 3 },
      tunaCan: { enabled: false },
      milkBottle: { enabled: false },
      catnip: { enabled: true, count: 5 },
    },
    playerHP: { start: 100, max: 100 },
    background: 'level1BG',
    levelMusic: 'PlatformerTrack1',
    nextBoss: 'cupBoss'
  },

  level2: {
    id: 'level2',
    name: 'Level 2',
    timeLimit: 90,
    length: 12000,
    playerSpawn: { x: 1000, y: 300 },
    groundPlatform: { x: -1000, y: 440, width: 13000, height: 50 },  
    platforms: [
{
      "x": 287,
      "y": 212,
      "w": 288,
      "h": 12
    },
    {
      "x": 470,
      "y": 220,
      "w": 323,
      "h": 12
    },
    {
      "x": 650,
      "y": 212,
      "w": 360,
      "h": 12
    },
    {
      "x": 821,
      "y": 219,
      "w": 292,
      "h": 12
    },
    {
      "x": 993,
      "y": 222,
      "w": 278,
      "h": 12
    },
    {
      "x": 1163,
      "y": 216,
      "w": 344,
      "h": 12
    },
    {
      "x": 1344,
      "y": 226,
      "w": 372,
      "h": 12
    },
    {
      "x": 1524,
      "y": 211,
      "w": 351,
      "h": 12
    },
    {
      "x": 1689,
      "y": 223,
      "w": 359,
      "h": 12
    },
    {
      "x": 1860,
      "y": 218,
      "w": 341,
      "h": 12
    },
    {
      "x": 2034,
      "y": 224,
      "w": 274,
      "h": 12
    },
    {
      "x": 2214,
      "y": 224,
      "w": 338,
      "h": 12
    },
    {
      "x": 2395,
      "y": 218,
      "w": 244,
      "h": 12
    },
    {
      "x": 2574,
      "y": 225,
      "w": 312,
      "h": 12
    },
    {
      "x": 2752,
      "y": 211,
      "w": 303,
      "h": 12
    },
    {
      "x": 2929,
      "y": 213,
      "w": 313,
      "h": 12
    },
    {
      "x": 3096,
      "y": 212,
      "w": 267,
      "h": 12
    },
    {
      "x": 3274,
      "y": 219,
      "w": 328,
      "h": 12
    },
    {
      "x": 3442,
      "y": 217,
      "w": 375,
      "h": 12
    },
    {
      "x": 3604,
      "y": 211,
      "w": 374,
      "h": 12
    }
    ],
    cups: { enabled: true, count: 15 },
    enemies: {
      cucumbers: { 
        enabled: true,
        spawnRate: 2500,
        damage: 5
      },
      rats: { enabled: false },
      lasers: { enabled: false }
    },
    items: {
      fishBones: { enabled: true, count: 2 },
      tunaCan: { enabled: true, count: 3 },
      milkBottle: { enabled: true, count: 1 },
      catnip: { enabled: false }
    },
    playerHP: { start: 100, max: 100 },
    background: 'level1BG',
    levelMusic: 'PlatformerTrack2',
    nextBoss: 'cucumberBoss'
  },

  level3: {
    id: 'level3',
    name: 'Level 3',
    timeLimit: 90,
    length: 12000,
    playerSpawn: { x: 1000, y: 300 },
    groundPlatform: { x: -1000, y: 440, width: 13000, height: 50 },
    platforms: [
{
      "x": 287,
      "y": 212,
      "w": 288,
      "h": 12
    },
    {
      "x": 470,
      "y": 220,
      "w": 323,
      "h": 12
    },
    {
      "x": 650,
      "y": 212,
      "w": 360,
      "h": 12
    },
    {
      "x": 821,
      "y": 219,
      "w": 292,
      "h": 12
    },
    {
      "x": 993,
      "y": 222,
      "w": 278,
      "h": 12
    },
    {
      "x": 1163,
      "y": 216,
      "w": 344,
      "h": 12
    },
    {
      "x": 1344,
      "y": 226,
      "w": 372,
      "h": 12
    },
    {
      "x": 1524,
      "y": 211,
      "w": 351,
      "h": 12
    },
    {
      "x": 1689,
      "y": 223,
      "w": 359,
      "h": 12
    },
    {
      "x": 1860,
      "y": 218,
      "w": 341,
      "h": 12
    },
    {
      "x": 2034,
      "y": 224,
      "w": 274,
      "h": 12
    },
    {
      "x": 2214,
      "y": 224,
      "w": 338,
      "h": 12
    },
    {
      "x": 2395,
      "y": 218,
      "w": 244,
      "h": 12
    },
    {
      "x": 2574,
      "y": 225,
      "w": 312,
      "h": 12
    },
    {
      "x": 2752,
      "y": 211,
      "w": 303,
      "h": 12
    },
    {
      "x": 2929,
      "y": 213,
      "w": 313,
      "h": 12
    },
    {
      "x": 3096,
      "y": 212,
      "w": 267,
      "h": 12
    },
    {
      "x": 3274,
      "y": 219,
      "w": 328,
      "h": 12
    },
    {
      "x": 3442,
      "y": 217,
      "w": 375,
      "h": 12
    },
    {
      "x": 3604,
      "y": 211,
      "w": 374,
      "h": 12
    }
    ],
    cups: { enabled: true, count: 18 },
    enemies: {
      cucumbers: { 
        enabled: true,
        spawnRate: 2000,
        damage: 5
      },
      rats: { 
        enabled: true,
        spawnRate: 4000
      },
      lasers: { enabled: false }
    },  
    items: {
      fishBones: { enabled: true, count: 3 },
      tunaCan: { enabled: true, count: 4 },
      milkBottle: { enabled: false },
      catnip: { enabled: true, count: 1 }
    },
    playerHP: { start: 100, max: 100 },
    background: 'level1BG',
    levelMusic: 'PlatformerTrack3',
    nextBoss: 'bossRatKing'
  },

  level4: {
    id: 'level4',
    name: 'Level 4',
    timeLimit: 90,
    length: 12000,
    playerSpawn: { x: 1000, y: 300 },
    groundPlatform: { x: -1000, y: 440, width: 13000, height: 50 },
    platforms: [
      {
      "x": 287,
      "y": 212,
      "w": 288,
      "h": 12
    },
    {
      "x": 470,
      "y": 220,
      "w": 323,
      "h": 12
    },
    {
      "x": 650,
      "y": 212,
      "w": 360,
      "h": 12
    },
    {
      "x": 821,
      "y": 219,
      "w": 292,
      "h": 12
    },
    {
      "x": 993,
      "y": 222,
      "w": 278,
      "h": 12
    },
    {
      "x": 1163,
      "y": 216,
      "w": 344,
      "h": 12
    },
    {
      "x": 1344,
      "y": 226,
      "w": 372,
      "h": 12
    },
    {
      "x": 1524,
      "y": 211,
      "w": 351,
      "h": 12
    },
    {
      "x": 1689,
      "y": 223,
      "w": 359,
      "h": 12
    },
    {
      "x": 1860,
      "y": 218,
      "w": 341,
      "h": 12
    },
    {
      "x": 2034,
      "y": 224,
      "w": 274,
      "h": 12
    },
    {
      "x": 2214,
      "y": 224,
      "w": 338,
      "h": 12
    },
    {
      "x": 2395,
      "y": 218,
      "w": 244,
      "h": 12
    },
    {
      "x": 2574,
      "y": 225,
      "w": 312,
      "h": 12
    },
    {
      "x": 2752,
      "y": 211,
      "w": 303,
      "h": 12
    },
    {
      "x": 2929,
      "y": 213,
      "w": 313,
      "h": 12
    },
    {
      "x": 3096,
      "y": 212,
      "w": 267,
      "h": 12
    },
    {
      "x": 3274,
      "y": 219,
      "w": 328,
      "h": 12
    },
    {
      "x": 3442,
      "y": 217,
      "w": 375,
      "h": 12
    },
    {
      "x": 3604,
      "y": 211,
      "w": 374,
      "h": 12
    },
    ],
    cups: { enabled: true, count: 15 },
    enemies: {
      cucumbers: { 
        enabled: true,
        spawnRate: 1800,
        damage: 5
      },
      rats: { 
        enabled: true,
        spawnRate: 3500
      },
      lasers: { 
        enabled: true,
        count: 3
      }
    },
    items: {
      fishBones: { enabled: true, count: 3 },
      tunaCan: { enabled: true, count: 4 },
      milkBottle: { enabled: false },
      catnip: { enabled: true, count: 1 }
    },
    playerHP: { start: 120, max: 120 },
    background: 'level1BG',
    levelMusic: 'PlatformerTrack4',
    nextBoss: 'laserPointerBoss'
  },

  level5: {
    id: 'level5',
    name: 'Level 5',
    timeLimit: 90,
    length: 12000,
    playerSpawn: { x: 1000, y: 300 },
    groundPlatform: { x: -1000, y: 440, width: 13000, height: 50 },
    platforms: [
      {
      "x": 287,
      "y": 212,
      "w": 288,
      "h": 12
    },
    {
      "x": 470,
      "y": 220,
      "w": 323,
      "h": 12
    },
    {
      "x": 650,
      "y": 212,
      "w": 360,
      "h": 12
    },
    {
      "x": 821,
      "y": 219,
      "w": 292,
      "h": 12
    },
    {
      "x": 993,
      "y": 222,
      "w": 278,
      "h": 12
    },
    {
      "x": 1163,
      "y": 216,
      "w": 344,
      "h": 12
    },
    {
      "x": 1344,
      "y": 226,
      "w": 372,
      "h": 12
    },
    {
      "x": 1524,
      "y": 211,
      "w": 351,
      "h": 12
    },
    {
      "x": 1689,
      "y": 223,
      "w": 359,
      "h": 12
    },
    {
      "x": 1860,
      "y": 218,
      "w": 341,
      "h": 12
    },
    {
      "x": 2034,
      "y": 224,
      "w": 274,
      "h": 12
    },
    {
      "x": 2214,
      "y": 224,
      "w": 338,
      "h": 12
    },
    {
      "x": 2395,
      "y": 218,
      "w": 244,
      "h": 12
    },
    {
      "x": 2574,
      "y": 225,
      "w": 312,
      "h": 12
    },
    {
      "x": 2752,
      "y": 211,
      "w": 303,
      "h": 12
    },
    {
      "x": 2929,
      "y": 213,
      "w": 313,
      "h": 12
    },
    {
      "x": 3096,
      "y": 212,
      "w": 267,
      "h": 12
    },
    {
      "x": 3274,
      "y": 219,
      "w": 328,
      "h": 12
    },
    {
      "x": 3442,
      "y": 217,
      "w": 375,
      "h": 12
    },
    {
      "x": 3604,
      "y": 211,
      "w": 374,
      "h": 12
    }
    ],
    cups: { enabled: true, count: 15 },
    enemies: {
      cucumbers: { 
        enabled: true,
        spawnRate: 1500,
        damage: 5
      },
      rats: { 
        enabled: true,
        spawnRate: 3000
      },
      lasers: { 
        enabled: true,
        count: 5
      }
    },
    items: {
      fishBones: { enabled: true, count: 4 },
      tunaCan: { enabled: true, count: 4 },
      milkBottle: { enabled: true, count: 1 },
      catnip: { enabled: true, count: 1 }
    },
    playerHP: { start: 120, max: 120 },
    background: 'level1BG',
    levelMusic: 'PlatformerTrack5',
    nextBoss: 'observerBoss'
  }
};

export function getLevel(levelId) {
  return LEVELS[levelId];
}