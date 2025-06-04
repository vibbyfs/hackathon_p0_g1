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
      const playerHp = playerData.stats.hp;
      const playerElem = playerData.stats.element;

      const enemyAtk = enemy.stats.atk;
      const enemyDef = enemy.stats.def;
      const enemyHp = enemy.stats.hp;
      const enemyElem = enemy.stats.element;

      // Hitung bonus elemen
      const playerBonus = getElementBonus(playerElem, enemyElem);
      const enemyBonus = getElementBonus(enemyElem, playerElem);

      // Hitung damage
      const damageToEnemy = Math.max(1, Math.round((playerAtk - enemyDef) * playerBonus));
      const damageToPlayer = Math.max(1, Math.round((enemyAtk - playerDef) * enemyBonus));

      // Sisa HP setelah satu ronde
      const playerHpLeft = playerHp - damageToPlayer;
      const enemyHpLeft = enemyHp - damageToEnemy;

      let resultMsg = `Ronde ${round}:\n`;
      resultMsg += `Seranganmu: ${damageToEnemy} damage ke musuh (${enemy.character}, elemen: ${enemyElem}).\n`;
      resultMsg += `Serangan musuh: ${damageToPlayer} damage ke kamu (${playerCharacterName}, elemen: ${playerElem}).\n`;

      if (playerBonus > 1) resultMsg += "Kamu mendapat bonus elemen!\n";
      if (enemyBonus > 1) resultMsg += "Musuh mendapat bonus elemen!\n";

      if (playerHpLeft > enemyHpLeft) {
        resultMsg += "Kamu MENANG di ronde ini!\n";
        playerScore++;
      } else if (playerHpLeft < enemyHpLeft) {
        resultMsg += "Kamu KALAH di ronde ini!\n";
        enemyScore++;
      } else {
        resultMsg += "Seri di ronde ini!\n";
      }

      // Cek apakah sudah 3 ronde
      if (round === 3) {
        resultMsg += `\nHASIL AKHIR:\nKamu menang ${playerScore} ronde.\nMusuh menang ${enemyScore} ronde.\n`;
        if (playerScore > enemyScore) {
          resultMsg += "SELAMAT! Kamu MENANG pertandingan!";
        } else if (playerScore < enemyScore) {
          resultMsg += "Kamu KALAH pertandingan!";
        } else {
          resultMsg += "Pertandingan SERI!";
        }
        // Reset ronde dan skor untuk pertandingan berikutnya
        round = 1;
        playerScore = 0;
        enemyScore = 0;
        // Setelah pertandingan selesai, ambil musuh baru
        enemy = getNextEnemy();
        document.getElementById("card2Img").src = enemy.image;
        document.getElementById("card2Img").alt = enemy.character;
      } else {
        round++;
        // Ambil musuh baru untuk ronde berikutnya
        enemy = getNextEnemy();
        document.getElementById("card2Img").src = enemy.image;
        document.getElementById("card2Img").alt = enemy.character;
      }

      updateScoreBoard();

      showPopup(resultMsg);
    }, 700); // waktu animasi spinning
  };

  // Custom popup battle
  window.showPopup = function (msg) {
    const popup = document.getElementById("battlePopup");
    const popupText = document.getElementById("popupText");
    popupText.innerText = msg;
    popup.style.display = "flex";
  };
  window.closePopup = function () {
    document.getElementById("battlePopup").style.display = "none";
  };


  function updateLabels() {
    // Player
    document.getElementById("playerName").textContent = localStorage.getItem("playerName");
    document.getElementById("playerChar").textContent = playerData.character;
    // Enemy
    document.getElementById("enemyName").textContent = enemy.name;
    document.getElementById("enemyChar").textContent = enemy.character;


    // Setelah set musuh pertama kali:
    let enemy = getNextEnemy();
    document.getElementById("card2Img").src = enemy.image;
    document.getElementById("card2Img").alt = enemy.character;
    updateCardInfo();
    updateLabels();

    // Pada setiap ganti musuh di startBattle, tambahkan updateLabels() setelah updateCardInfo()

  }
}
