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

// ======================= INDEX PAGE ==============================
if (document.getElementById("partySelect")) {
  const partySelect = document.getElementById("partySelect");
  const charName = document.getElementById("characterName");
  const charImg = document.getElementById("characterImg");

  // Isi dropdown partai
  partaiData.forEach(partai => {
    const opt = document.createElement("option");
    opt.value = partai.name;
    opt.textContent = partai.name;
    partySelect.appendChild(opt);
  });

  // Preview karakter saat pilih partai
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

  // Mulai game
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
if (window.location.pathname.includes("game.html")) {
  // --- Relasi elemen ---
  const elementAdvantage = {
    fire: ["wind", "metal"],
    wind: ["earth", "stone"],
    earth: ["electric", "light"],
    electric: ["water", "metal"],
    water: ["fire", "stone"],
    metal: ["earth", "chaos"],
    light: ["shadow", "void"],
    shadow: ["light", "poison"],
    poison: ["chaos", "water"],
    chaos: ["void", "fire"],
    void: ["electric", "wind"],
    stone: ["poison", "metal"]
  };

  function getElementBonus(attacker, defender) {
    if (elementAdvantage[attacker] && elementAdvantage[attacker].includes(defender)) {
      return 1.2; // 20% bonus
    }
    if (elementAdvantage[defender] && elementAdvantage[defender].includes(attacker)) {
      return 0.8; // 20% penalty
    }
    return 1;
  }

  // --- Ambil data pemain dari localStorage ---
  const playerName = localStorage.getItem("playerName");
  const playerParty = localStorage.getItem("playerParty");
  const playerCharacter = localStorage.getItem("playerCharacter");
  const playerCharacterName = localStorage.getItem("playerCharacterName");

  document.getElementById("playerInfo").textContent = `${playerName} (${playerParty})`;
  document.getElementById("card1Img").src = playerCharacter;
  document.getElementById("card1Img").alt = playerCharacterName;

  const roundDisplay = document.getElementById("roundDisplay");
  const playerScoreDisplay = document.getElementById("playerScoreDisplay");
  const enemyScoreDisplay = document.getElementById("enemyScoreDisplay");

  const playerHpBar = document.getElementById("playerHpBar");
  const enemyHpBar = document.getElementById("enemyHpBar");

  function updateLabels() {
    document.getElementById("playerName").textContent = playerName;
    document.getElementById("playerChar").textContent = playerData.character;
    document.getElementById("enemyName").textContent = enemy.name;
    document.getElementById("enemyChar").textContent = enemy.character;
  }

  let playerCurrentHp;
  let enemyCurrentHp;

  function updateCardInfo() {
    document.getElementById("playerAttr").textContent = playerData.stats.element.toUpperCase();
    document.getElementById("enemyAttr").textContent = enemy.stats.element.toUpperCase();
    document.getElementById("playerHp").textContent = playerCurrentHp + " HP";
    document.getElementById("enemyHp").textContent = enemyCurrentHp + " HP";
    playerHpBar.style.width = (playerCurrentHp / playerData.stats.hp * 100) + "%";
    enemyHpBar.style.width = (enemyCurrentHp / enemy.stats.hp * 100) + "%";
  }

  function updateScoreBoard() {
    roundDisplay.textContent = round;
    playerScoreDisplay.textContent = playerScore;
    enemyScoreDisplay.textContent = enemyScore;
  }

  // --- Simpan data karakter pemain ---
  const playerData = partaiData.find(p => p.name === playerParty);

  // --- Array musuh acak (tanpa karakter pemain) ---
  let enemyPool = [];
  let enemyIndex = 0;

  function shuffleEnemyPool() {
    enemyPool = partaiData.filter(p => p.name !== playerParty);
    for (let i = enemyPool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [enemyPool[i], enemyPool[j]] = [enemyPool[j], enemyPool[i]];
    }
    enemyIndex = 0;
  }

  shuffleEnemyPool();

  // --- Variabel global untuk skor dan ronde ---
  let round = 1;
  let playerScore = 0;
  let enemyScore = 0;

  // --- Fungsi untuk ambil musuh berikutnya ---
  function getNextEnemy() {
    if (enemyIndex >= enemyPool.length) {
      shuffleEnemyPool();
    }
    return enemyPool[enemyIndex++];
  }

  // --- Set musuh pertama kali ---
  let enemy = getNextEnemy();
  document.getElementById("card2Img").src = enemy.image;
  document.getElementById("card2Img").alt = enemy.character;

  playerCurrentHp = playerData.stats.hp;
  enemyCurrentHp = enemy.stats.hp;
  updateLabels();
  updateCardInfo();
  updateScoreBoard();

  window.startBattle = function () {
    // Animasi spinning pada kartu musuh
    const enemyCard = document.getElementById("card2");
    enemyCard.classList.add("spinning");

    setTimeout(() => {
      enemyCard.classList.remove("spinning");

      // Ambil stats
      const playerAtk = playerData.stats.atk;
      const playerDef = playerData.stats.def;
      const playerElem = playerData.stats.element;

      const enemyAtk = enemy.stats.atk;
      const enemyDef = enemy.stats.def;
      const enemyElem = enemy.stats.element;

      // Hitung bonus elemen
      const playerBonus = getElementBonus(playerElem, enemyElem);
      const enemyBonus = getElementBonus(enemyElem, playerElem);

      // Hitung damage
      const damageToEnemy = Math.max(1, Math.round((playerAtk - enemyDef) * playerBonus));
      const damageToPlayer = Math.max(1, Math.round((enemyAtk - playerDef) * enemyBonus));

      // Sisa HP setelah satu ronde
      playerCurrentHp = Math.max(0, playerCurrentHp - damageToPlayer);
      enemyCurrentHp = Math.max(0, enemyCurrentHp - damageToEnemy);
      updateCardInfo();

      const playerHpLeft = playerCurrentHp;
      const enemyHpLeft = enemyCurrentHp;

      let statusClass;
      let popupMsg;
      if (playerHpLeft > enemyHpLeft) {
        statusClass = "win";
        popupMsg = "MENANG RONDE INI!";
        playerScore++;
      } else if (playerHpLeft < enemyHpLeft) {
        statusClass = "lose";
        popupMsg = "KALAH RONDE INI!";
        enemyScore++;
      } else {
        statusClass = "draw";
        popupMsg = "SERI RONDE INI!";
      }

      // Cek apakah sudah 3 ronde
      if (round === 3) {
        if (playerScore > enemyScore) {
          popupMsg = "KAMU MENANG PERTANDINGAN!";
          statusClass = "win";
        } else if (playerScore < enemyScore) {
          popupMsg = "KAMU KALAH PERTANDINGAN!";
          statusClass = "lose";
        } else {
          popupMsg = "PERTANDINGAN SERI!";
          statusClass = "draw";
        }

        // Reset ronde dan skor untuk pertandingan berikutnya
        round = 1;
        playerScore = 0;
        enemyScore = 0;
        // Setelah pertandingan selesai, ambil musuh baru
        enemy = getNextEnemy();
        document.getElementById("card2Img").src = enemy.image;
        document.getElementById("card2Img").alt = enemy.character;
        playerCurrentHp = playerData.stats.hp;
        enemyCurrentHp = enemy.stats.hp;
        updateLabels();
        updateCardInfo();
      } else {
        round++;
        // Ambil musuh baru untuk ronde berikutnya
        enemy = getNextEnemy();
        document.getElementById("card2Img").src = enemy.image;
        document.getElementById("card2Img").alt = enemy.character;
        playerCurrentHp = playerData.stats.hp;
        enemyCurrentHp = enemy.stats.hp;
        updateLabels();
        updateCardInfo();
      }

      updateScoreBoard();

      showPopup(popupMsg, statusClass);
    }, 700); // waktu animasi spinning
  };

  // Custom popup battle
  window.showPopup = function (msg, status) {
    const popup = document.getElementById("battlePopup");
    const popupText = document.getElementById("popupText");
    const popupContent = popup.querySelector(".popup-content");
    popupText.innerText = msg;
    popupContent.classList.remove("win", "lose", "draw");
    if (status) popupContent.classList.add(status);
    popup.style.display = "flex";
  };
  window.closePopup = function () {
    const popup = document.getElementById("battlePopup");
    popup.querySelector(".popup-content").classList.remove("win", "lose", "draw");
    popup.style.display = "none";
  };
}
