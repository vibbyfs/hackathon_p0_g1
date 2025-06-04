// ======================= DATA KARAKTER ==========================
const partaiData = [
  {
    name: "Padiptra Mourningroot",
    character: "Magaweidah, The Crimson Matron",
    image: "assets/char1.png",
    desc: "Banteng Merah itu kini tak lagi menyeruduk demi rakyat...",
    stats: { atk: 80, def: 60, hp: 100, element: "fire" }
  },
  {
    name: "Grindraksa Legion",
    character: "Pravornox, The Iron Oath",
    image: "assets/char2.png",
    desc: "Di mana semangat juangmu dulu?...",
    stats: { atk: 75, def: 80, hp: 110, element: "earth" }
  },
  {
    name: "Goqhlarnyx Assembly",
    character: "Hartanox, The Bureaucratic Husk",
    image: "assets/char3.png",
    desc: "Kuning yang dulu lambang kemakmuran...",
    stats: { atk: 65, def: 90, hp: 120, element: "metal" }
  },
  {
    name: "Nas'drem Coils",
    character: "Surapalux, The Radiant Maw",
    image: "assets/char4.png",
    desc: "Biru yang dulu lantang membela rakyat...",
    stats: { atk: 85, def: 70, hp: 95, element: "light" }
  },
  {
    name: "Pekabhan Maw",
    character: "Mukhaegrim, The Laughing Vulture",
    image: "assets/char7.png",
    desc: "Mereka melangkah dengan spirit santri...",
    stats: { atk: 70, def: 75, hp: 105, element: "wind" }
  },
  {
    name: "Peksithra Creed",
    character: "Syaikhuloth, The Cloaked Scribe",
    image: "assets/char6.png",
    desc: "Mereka tak lagi bersujud untuk rakyat...",
    stats: { atk: 60, def: 85, hp: 100, element: "shadow" }
  },
  {
    name: "Demokravox",
    character: "Arhymon, The Heir of Hollow Echoes",
    image: "assets/char5.png",
    desc: "Biru yang katanya warna perubahan...",
    stats: { atk: 78, def: 72, hp: 98, element: "void" }
  },
  {
    name: "Panarch Hive",
    character: "Zulhazir, The Smiling Serpent",
    image: "assets/char9.png",
    desc: "Mereka bukan lagi penjaga nurani...",
    stats: { atk: 68, def: 65, hp: 102, element: "poison" }
  },
  {
    name: "Perindrak Maw",
    character: "Tanovark, The Media Maw",
    image: "assets/char10.png",
    desc: "Mereka kini bukan gelombang perubahan...",
    stats: { atk: 72, def: 68, hp: 100, element: "electric" }
  },
  {
    name: "Hanurath Shard",
    character: "Osparum, The Relic Roar",
    image: "assets/char11.png",
    desc: "Mereka kini tak lagi berdiri untuk suara hati...",
    stats: { atk: 74, def: 70, hp: 108, element: "stone" }
  },
  {
    name: "Psychonautic Spawns",
    character: "Caesar, Magical Child",
    image: "assets/char13.png",
    desc: "Bunga Mawar Merah itu kini tak lagi mekar...",
    stats: { atk: 90, def: 50, hp: 95, element: "chaos" }
  }
];

let usedEnemies = [];
let currentRound = 0;
let playerWins = 0;
let enemyWins = 0;

// ======================= INDEX PAGE ==============================
if (document.getElementById("partySelect")) {
  const partySelect = document.getElementById("partySelect");
  const charName = document.getElementById("characterName");
  const charImg = document.getElementById("characterImg");

  partaiData.forEach(partai => {
    const opt = document.createElement("option");
    opt.value = partai.name;
    opt.textContent = partai.name;
    partySelect.appendChild(opt);
  });

  window.updateCharacter = function () {
    const selected = partySelect.value;
    const data = partaiData.find(p => p.name === selected);
    if (data) {
      charName.textContent = data.character;
      charImg.src = data.image;
      document.getElementById("descTitle").textContent = data.name;
      document.getElementById("descText").textContent = data.desc;
    }
  };

  window.startGame = function () {
    const name = document.getElementById("nameInput").value;
    const party = partySelect.value;
    const data = partaiData.find(p => p.name === party);

    if (!name || !party || !data) {
      alert("Silakan isi nama dan pilih partai.");
      return;
    }

    localStorage.setItem("playerName", name);
    localStorage.setItem("playerParty", party);
    localStorage.setItem("playerCharacter", data.image);
    localStorage.setItem("playerCharacterName", data.character);

    window.location.href = "game.html";
  };
}

// ======================= GAME PAGE ==============================
if (document.getElementById("playerInfo")) {
  const playerInfoEl = document.getElementById("playerInfo");
  const card1Img = document.getElementById("card1Img");
  const card2Img = document.getElementById("card2Img");
  const card1 = document.getElementById("card1");
  const card2 = document.getElementById("card2");
  const scoreboardEl = document.getElementById("scoreboard");
  const playerHealth = document.getElementById("playerHealth");
  const enemyHealth = document.getElementById("enemyHealth");
  const playerStatsEl = document.getElementById("playerStats");
  const enemyStatsEl = document.getElementById("enemyStats");

  const playerName = localStorage.getItem("playerName") || "Player";
  const playerParty = localStorage.getItem("playerParty");
  const playerImage = localStorage.getItem("playerCharacter");
  const playerCharacter = localStorage.getItem("playerCharacterName");
  let points = parseInt(localStorage.getItem("playerPoints") || "0", 10);

  const playerData = partaiData.find(p => p.name === playerParty) || partaiData[0];

  card1Img.src = playerImage || playerData.image;
  playerInfoEl.textContent = `${playerName} - ${playerCharacter}`;

  function updateScoreboard() {
    scoreboardEl.textContent = `Round ${currentRound + 1}/3 | Skor ${playerWins}-${enemyWins} | Poin ${points}`;
  }

  function updateStats(enemy) {
    playerStatsEl.textContent = `ATK ${playerData.stats.atk} | DEF ${playerData.stats.def} | HP ${playerData.stats.hp}`;
    enemyStatsEl.textContent = `ATK ${enemy.stats.atk} | DEF ${enemy.stats.def} | HP ${enemy.stats.hp}`;
  }

  function resetHealthBars() {
    playerHealth.style.width = "100%";
    enemyHealth.style.width = "100%";
  }

  function applyBattleResult(winner) {
    if (winner === "player") {
      enemyHealth.style.width = "0%";
    } else {
      playerHealth.style.width = "0%";
    }
    setTimeout(resetHealthBars, 500);
  }

  function chooseEnemy() {
    let available = partaiData.filter(p => p.name !== playerParty && !usedEnemies.includes(p.name));
    if (available.length === 0) {
      usedEnemies = [];
      available = partaiData.filter(p => p.name !== playerParty);
    }
    const enemy = available[Math.floor(Math.random() * available.length)];
    usedEnemies.push(enemy.name);
    card2Img.src = enemy.image;
    updateStats(enemy);
    return enemy;
  }

  let enemyData = chooseEnemy();
  updateScoreboard();
  resetHealthBars();

  function battle(enemy) {
    const playerScore = playerData.stats.atk + Math.random() * 20 - enemy.stats.def / 2 + playerData.stats.hp / 20;
    const enemyScore = enemy.stats.atk + Math.random() * 20 - playerData.stats.def / 2 + enemy.stats.hp / 20;

    if (playerScore >= enemyScore) {
      playerWins++;
      points += 500;
      applyBattleResult("player");
      alert(`Kamu menang melawan ${enemy.character}!`);
    } else {
      enemyWins++;
      applyBattleResult("enemy");
      alert(`Kamu kalah melawan ${enemy.character}.`);
    }

    currentRound++;
    localStorage.setItem("playerPoints", points);
    if (currentRound >= 3) {
      updateScoreboard();
      alert(`Pertarungan selesai! Skor akhir ${playerWins}-${enemyWins}. Total poin: ${points}`);
      return;
    }

    enemyData = chooseEnemy();
    updateScoreboard();
  }

  window.startBattle = function () {
    card1.classList.add("spinning");
    card2.classList.add("spinning");
    setTimeout(() => {
      card1.classList.remove("spinning");
      card2.classList.remove("spinning");
      battle(enemyData);
    }, 600);
  };
}
