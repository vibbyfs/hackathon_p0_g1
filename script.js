// ======================= DATA KARAKTER ==========================
const partaiData = [
  {
    name: "Padiptra Mourningroot",
    character: "Magaweidah, The Crimson Matron",
    image: "assets/char1.png",
    desc: "Banteng Merah itu kini tak lagi menyeruduk demi rakyat, tapi siap menggulingkan siapa pun—bahkan keadilan—demi menjaga tahta sang Ratu yang memerintah dari balik layar.",
    stats: { atk: 80, def: 60, hp: 100, element: "fire" }
  },
  {
    name: "Grindraksa Legion",
    character: "Pravornox, The Iron Oath",
    image: "assets/char2.png",
    desc: "Sang Burung yang ditunggangi Tuannya meski harus 4 kali terjatuh tapi kini berjaya mengantarkan Tuannya sampai ke tahta diatas penderitaan rakyatnya.",
    stats: { atk: 75, def: 80, hp: 110, element: "earth" }
  },
  {
    name: "Goqhlarnyx Assembly",
    character: "Hartanox, The Bureaucratic Husk",
    image: "assets/char3.png",
    desc: "Kuning yang dulu lambang kemakmuran kini jadi simbol kebisuan. Beringin tak lagi menaungi rakyat, tapi membelit kekuasaan demi menjaga warisan dinasti yang enggan tumbang.",
    stats: { atk: 65, def: 90, hp: 120, element: "metal" }
  },
  {
    name: "Nas'drem Coils",
    character: "Surapalux, The Radiant Maw",
    image: "assets/char4.png",
    desc: "Dulu yang katanya warna perubahan kini justru tenggelam dalam arus kepentingan. NasDem tak lagi mendayung harapan rakyat, tapi berlayar untuk ambisi elit yang bersembunyi di balik jargon restorasi.",
    stats: { atk: 85, def: 70, hp: 95, element: "light" }
  },
  {
    name: "Pekabhan Maw",
    character: "Mukhaegrim, The Laughing Vulture",
    image: "assets/char7.png",
    desc: "Mereka melangkah dengan spirit santri, menjadikan kebaikan sebagai pedoman. Di tengah hiruk politik, mereka berikhtiar menyalakan cahaya akhlak dan memperjuangkan kemaslahatan umat.",
    stats: { atk: 70, def: 75, hp: 105, element: "wind" }
  },
  {
    name: "Peksithra Creed",
    character: "Syaikhuloth, The Cloaked Scribe",
    image: "assets/char6.png",
    desc: "PKS tak lagi bersujud untuk rakyat, tapi berlutut di altar kekuasaan. Di balik jubah moral dan dakwah, tersembunyi hasrat akan panggung dan posisi—agama dijadikan alat, bukan lagi cahaya.",
    stats: { atk: 60, def: 85, hp: 100, element: "shadow" }
  },
  {
    name: "Demokravox",
    character: "Arhymon, The Heir of Hollow Echoes",
    image: "assets/char5.png",
    desc: "Biru yang dulu lantang membela rakyat kini memudar jadi bayang-bayang warisan. Guild tak lagi bergerak karena suara, tapi demi menjaga tahta keluarga di tengah panggung politik yang terus berubah.",
    stats: { atk: 78, def: 72, hp: 98, element: "void" }
  },
  {
    name: "Panarch Hive",
    character: "Zulhazir, The Smiling Serpent",
    image: "assets/char9.png",
    desc: "Bukan lagi penjaga nurani, tapi makelar kekuasaan. Langit birunya pudar, diganti tawar-menawar di balik layar—demi kursi, bukan keadilan.",
    stats: { atk: 68, def: 65, hp: 102, element: "poison" }
  },
  {
    name: "Perindrak Maw",
    character: "Tanovark, The Media Maw",
    image: "assets/char10.png",
    desc: "Kami kini bukan gelombang perubahan, tapi perahu pesanan kaum elit. Berlayar megah dengan jargon rakyat, tapi haluannya patuh pada satu nakhoda—bukan suara, melainkan selera penguasa.",
    stats: { atk: 72, def: 68, hp: 100, element: "electric" }
  },
  {
    name: "Hanurath Shard",
    character: "Osparum, The Relic Roar",
    image: "assets/char11.png",
    desc: "Kita kini tak lagi berdiri untuk suara hati nurani rakyat, tapi jadi perisai bisu bagi kepentingan para elite—rela menukar idealisme demi sejumput kekuasaan yang dikendalikan dari balik bayang kekuasaan lama.",
    stats: { atk: 74, def: 70, hp: 108, element: "stone" }
  },
  {
    name: "Psychonautic Spawns",
    character: "Caesar, Magical Child",
    image: "assets/char13.png",
    desc: "Bunga Mawar Merah itu kini tak lagi mekar untuk harapan dan keberanian, tapi tumbuh di taman kekuasaan, disiram oleh pujian istana. Ia tak segan menusuk dengan durinya siapa pun yang mengganggu narasi para elit—menjadi penjaga gincu kekuasaan, bukan suara rakyat.",
    stats: { atk: 90, def: 50, hp: 95, element: "chaos" }
  }
];

// ======================= GAME PAGE ==============================
if (window.location.pathname.includes("game.html")) {
  // Relasi elemen
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
    if (elementAdvantage[attacker] && elementAdvantage[attacker].includes(defender)) return 1.2;
    if (elementAdvantage[defender] && elementAdvantage[defender].includes(attacker)) return 0.8;
    return 1;
  }

  // Ambil data pemain dari localStorage
  const playerName = localStorage.getItem("playerName");
  const playerParty = localStorage.getItem("playerParty");
  const playerCharacter = localStorage.getItem("playerCharacter");
  const playerCharacterName = localStorage.getItem("playerCharacterName");

  // Set info pemain
  document.getElementById("playerInfo").textContent = `${playerName} (${playerParty})`;
  document.getElementById("card1Img").src = playerCharacter;
  document.getElementById("card1Img").alt = playerCharacterName;

  // Scoreboard
  const scoreboard = document.getElementById("scoreboard");
  const playerStats = document.getElementById("playerStats");
  const enemyStats = document.getElementById("enemyStats");
  const playerHealthBar = document.getElementById("playerHealth");
  const enemyHealthBar = document.getElementById("enemyHealth");

  // Simpan data karakter pemain
  const playerData = partaiData.find(p => p.name === playerParty);

  // Array musuh acak (tanpa karakter pemain)
  let enemyPool = [];
  let enemyIndex = 0;
  let usedEnemyIndexes = [];

  function shuffleEnemyPool() {
    enemyPool = partaiData.filter(p => p.name !== playerParty);
    for (let i = enemyPool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [enemyPool[i], enemyPool[j]] = [enemyPool[j], enemyPool[i]];
    }
    enemyIndex = 0;
    usedEnemyIndexes = [];
  }

  shuffleEnemyPool();

  // Variabel global untuk skor dan ronde
  let round = 1;
  let playerScore = 0;
  let enemyScore = 0;
  let points = parseInt(localStorage.getItem("points") || "0");
  let gameOver = false;

  // HP bar berbasis ronde (nyawa)
  let playerRoundHp = 3;
  let enemyRoundHp = 3;

  // Audio
  const audioWin = new Audio('audio/win.mp3');
  const audioLose = new Audio('audio/lose.mp3');
  const audioDraw = new Audio('audio/draw.mp3');
  const audioRoundWin = new Audio('audio/roundwin.mp3');

  // Fungsi untuk ambil musuh berikutnya
  function getNextEnemy() {
    if (usedEnemyIndexes.length >= 3) {
      usedEnemyIndexes = [];
      shuffleEnemyPool();
    }
    let availableIndexes = enemyPool
      .map((_, idx) => idx)
      .filter(idx => !usedEnemyIndexes.includes(idx));
    if (availableIndexes.length === 0) {
      shuffleEnemyPool();
      availableIndexes = enemyPool.map((_, idx) => idx);
    }
    const randomIdx = availableIndexes[Math.floor(Math.random() * availableIndexes.length)];
    usedEnemyIndexes.push(randomIdx);
    return enemyPool[randomIdx];
  }

  // Set musuh pertama kali
  let enemy = getNextEnemy();
  document.getElementById("card2Img").src = enemy.image;
  document.getElementById("card2Img").alt = enemy.character;

  function updateStats() {
    playerStats.innerHTML = `
      <b>${playerData.character}</b><br>
      <span>ATK: ${playerData.stats.atk} | DEF: ${playerData.stats.def} | RONDE MENANG: ${playerScore} | ${playerData.stats.element.toUpperCase()}</span>
    `;
    enemyStats.innerHTML = `
      <b>${enemy.character}</b><br>
      <span>ATK: ${enemy.stats.atk} | DEF: ${enemy.stats.def} | RONDE MENANG: ${enemyScore} | ${enemy.stats.element.toUpperCase()}</span>
    `;
  }

  function updateHealthBar() {
    playerHealthBar.style.width = (playerRoundHp / 3 * 100) + "%";
    enemyHealthBar.style.width = (enemyRoundHp / 3 * 100) + "%";
  }

  function updateScoreboard() {
    scoreboard.innerHTML = `
      <div>Putaran: <span id="roundDisplay">${round}</span> / 3</div>
      <div>Skor Kamu: <span id="playerScoreDisplay">${playerScore}</span> | Skor Musuh: <span id="enemyScoreDisplay">${enemyScore}</span></div>
      <div>Poin: <span id="pointDisplay">${points}</span></div>
    `;
  }

  function updateAll() {
    updateStats();
    updateHealthBar();
    updateScoreboard();
  }

  updateAll();

  // Tambahkan fungsi popup
  function showPopup(message, sound) {
    const modal = document.getElementById("popupModal");
    const msg = document.getElementById("popupMessage");
    msg.textContent = message;
    modal.style.display = "flex";
    if (sound) sound.play();
  }

  // Tutup modal saat klik X atau area luar
  document.getElementById("closeModal").onclick = function() {
    document.getElementById("popupModal").style.display = "none";
  };
  window.onclick = function(event) {
    const modal = document.getElementById("popupModal");
    if (event.target === modal) modal.style.display = "none";
  };

  window.startBattle = function () {
    if (gameOver) return;

    const playerBonus = getElementBonus(playerData.stats.element, enemy.stats.element);
    const enemyBonus = getElementBonus(enemy.stats.element, playerData.stats.element);

    const playerPower = playerData.stats.atk * playerBonus + Math.random() * 10 + playerData.stats.hp / 20;
    const enemyPower = enemy.stats.atk * enemyBonus + Math.random() * 10 + enemy.stats.hp / 20;

    let resultMsg = "";
    let sound = null;
    if (playerPower > enemyPower) {
      playerScore++;
      enemyRoundHp--;
      points += 500;
      sound = audioWin;
      resultMsg = `Kamu menang melawan ${enemy.character}!`;
    } else if (playerPower < enemyPower) {
      enemyScore++;
      playerRoundHp--;
      sound = audioLose;
      resultMsg = `Kamu kalah melawan ${enemy.character}.`;
    } else {
      sound = audioDraw;
      resultMsg = `Seri melawan ${enemy.character}.`;
    }

    round++;
    updateAll();

    // Cek akhir game
    if (playerRoundHp === 0 || enemyRoundHp === 0 || round > 3) {
      gameOver = true;
      localStorage.setItem("points", points);
      setTimeout(() => {
        showPopup(`Game selesai! Skor kamu: ${playerScore}, Musuh: ${enemyScore}. Total poin: ${points}`, sound);
      }, 300);
      return;
    }

    // Ganti musuh
    enemy = getNextEnemy();
    document.getElementById("card2Img").src = enemy.image;
    document.getElementById("card2Img").alt = enemy.character;
    updateAll();

    setTimeout(() => showPopup(resultMsg, sound), 200);
  };

  window.resetGame = function () {
    round = 1;
    playerScore = 0;
    enemyScore = 0;
    playerRoundHp = 3;
    enemyRoundHp = 3;
    gameOver = false;
    shuffleEnemyPool();
    enemy = getNextEnemy();
    document.getElementById("card2Img").src = enemy.image;
    document.getElementById("card2Img").alt = enemy.character;
    updateAll();
  };
}