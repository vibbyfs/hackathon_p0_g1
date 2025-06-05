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
    desc: "Biru yang dulu lantang membela rakyat kini memudar jadi bayang-bayang warisan. Partai tak lagi bergerak karena suara, tapi demi menjaga tahta keluarga di tengah panggung politik yang terus berubah.",
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
    if (elementAdvantage[attacker] && elementAdvantage[attacker].includes(defender)) {
      return 1.2; // 20% bonus
    }
    if (elementAdvantage[defender] && elementAdvantage[defender].includes(attacker)) {
      return 0.8; // 20% penalty
    }
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

  // Tambahkan array untuk menyimpan index musuh yang sudah tampil dalam satu putaran
  let usedEnemyIndexes = [];

  function shuffleEnemyPool() {
    enemyPool = partaiData.filter(p => p.name !== playerParty);
    for (let i = enemyPool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [enemyPool[i], enemyPool[j]] = [enemyPool[j], enemyPool[i]];
    }
    enemyIndex = 0;
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
    // Jika sudah 3 musuh dipakai dalam satu putaran, reset untuk putaran berikutnya
    if (usedEnemyIndexes.length >= 3) {
      usedEnemyIndexes = [];
    }

    // Cari index musuh yang belum dipakai di putaran ini
    let availableIndexes = enemyPool
      .map((_, idx) => idx)
      .filter(idx => !usedEnemyIndexes.includes(idx));

    // Jika semua sudah dipakai (harusnya tidak terjadi), reset
    if (availableIndexes.length === 0) {
      usedEnemyIndexes = [];
      availableIndexes = enemyPool.map((_, idx) => idx);
    }

    // Pilih index acak dari yang tersedia
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

  function resetEnemy() {
    enemy = getNextEnemy();
    document.getElementById("card2Img").src = enemy.image;
    document.getElementById("card2Img").alt = enemy.character;
  }

<<<<<<< HEAD
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


// >>>>>>> main
  function chooseEnemy() {
    let available = partaiData.filter(p => p.name !== playerParty && !usedEnemies.includes(p.name));
    if (available.length === 0) {
      usedEnemies = [];
      available = partaiData.filter(p => p.name !== playerParty);
    }
    const enemy = available[Math.floor(Math.random() * available.length)];
    usedEnemies.push(enemy.name);
    card2Img.src = enemy.image;
// <<<<<<< ii9wm8-codex/fix-bug-in-game.html
    updateStats(enemy);

// >>>>>>> main
    return enemy;
  }

    if (currentRound >= 3) {
      alert("Pertarungan sudah selesai!");
      return;
    }


  window.quitGame = function () {
    window.location.href = "index.html";
  };
  let enemyData = chooseEnemy();
  updateScoreboard();
// <<<<<<< ii9wm8-codex/fix-bug-in-game.html
  resetHealthBars();

// >>>>>>> main

  function battle(enemy) {
    const playerScore = playerData.stats.atk + Math.random() * 20 - enemy.stats.def / 2 + playerData.stats.hp / 20;
    const enemyScore = enemy.stats.atk + Math.random() * 20 - playerData.stats.def / 2 + enemy.stats.hp / 20;

    if (playerScore >= enemyScore) {
      playerWins++;
      points += 500;
// <<<<<<< ii9wm8-codex/fix-bug-in-game.html
      applyBattleResult("player");
      alert(`Kamu menang melawan ${enemy.character}!`);
    } else {
      enemyWins++;
      applyBattleResult("enemy");

      alert(`Kamu menang melawan ${enemy.character}!`);
    } else {
      enemyWins++;
// >>>>>>> main
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
=======
  function updateAll() {
    updateStats();
    updateHealthBar();
>>>>>>> bdb3a71 (second commit)
    updateScoreboard();
  }

  updateAll();

  window.startBattle = function () {
    if (gameOver) return;
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

      // Hitung damage (untuk penentuan pemenang ronde)
      const damageToEnemy = Math.max(1, Math.round((playerAtk - enemyDef) * playerBonus));
      const damageToPlayer = Math.max(1, Math.round((enemyAtk - playerDef) * enemyBonus));

      // Penentuan pemenang ronde & update HP bar berbasis ronde
      let statusClass;
      let popupMsg;
      if (damageToEnemy > damageToPlayer) {
        statusClass = "win";
        popupMsg = "MENANG RONDE INI!";
        playerScore++;
        points += 500;
        enemyRoundHp = Math.max(0, enemyRoundHp - 1);
        localStorage.setItem("points", points);
      } else if (damageToEnemy < damageToPlayer) {
        statusClass = "lose";
        popupMsg = "KALAH RONDE INI!";
        enemyScore++;
        playerRoundHp = Math.max(0, playerRoundHp - 1);
      } else {
        statusClass = "draw";
        popupMsg = "SERI RONDE INI!";
        // Tidak ada perubahan HP bar
      }

      updateAll();

      // Cek apakah sudah 3 ronde (1 putaran)
      if (round === 3) {
        gameOver = true;
        if (playerScore > enemyScore) {
          popupMsg = "KAMU MENANG PUTARAN!";
          statusClass = "win";
        } else if (playerScore < enemyScore) {
          popupMsg = "KAMU KALAH PUTARAN!";
          statusClass = "lose";
        } else {
          popupMsg = "PUTARAN SERI!";
          statusClass = "draw";
        }
        showPopup(popupMsg + " Tekan Reset Game untuk mulai lagi.", statusClass, true);
      } else {
        round++;
        resetEnemy();
        updateAll();
        showPopup(popupMsg, statusClass, false);
      }
    }, 700);
  };

  window.resetGame = function () {
    round = 1;
    playerScore = 0;
    enemyScore = 0;
    gameOver = false;
    playerRoundHp = 3;
    enemyRoundHp = 3;
    shuffleEnemyPool();
    usedEnemyIndexes = [];
    resetEnemy();
    updateAll();
    closePopup();
  };

  window.showPopup = function (msg, status, isRoundWin = false) {
    let popup = document.getElementById("battlePopup");
    if (!popup) {
      popup = document.createElement("div");
      popup.id = "battlePopup";
      popup.style.position = "fixed";
      popup.style.top = "0";
      popup.style.left = "0";
      popup.style.width = "100vw";
      popup.style.height = "100vh";
      popup.style.background = "rgba(0,0,0,0.7)";
      popup.style.display = "flex";
      popup.style.alignItems = "center";
      popup.style.justifyContent = "center";
      popup.style.zIndex = "9999";
      popup.innerHTML = `
        <div class="popup-content" style="background:#fff;padding:32px 48px;border-radius:16px;text-align:center;min-width:300px;position:relative;">
          <div id="popupText" style="font-size:2rem;font-weight:bold;margin-bottom:18px;"></div>
          <button onclick="closePopup()" style="padding:8px 24px;font-size:1.2rem;border:none;border-radius:8px;background:crimson;color:#fff;cursor:pointer;">OK</button>
        </div>
      `;
      document.body.appendChild(popup);
    }
    const popupText = document.getElementById("popupText");
    const popupContent = popup.querySelector(".popup-content");
    popupText.innerText = msg;
    popupContent.classList.remove("win", "lose", "draw");
    if (status) popupContent.classList.add(status);
    popup.style.display = "flex";

    // Play audio sesuai status
    if (isRoundWin && status === "win") {
      audioRoundWin.currentTime = 0; audioRoundWin.play();
    } else if (status === "win") {
      audioWin.currentTime = 0; audioWin.play();
    } else if (status === "lose") {
      audioLose.currentTime = 0; audioLose.play();
    } else if (status === "draw") {
      audioDraw.currentTime = 0; audioDraw.play();
    }
  };

  window.closePopup = function () {
    const popup = document.getElementById("battlePopup");
    if (popup) {
      popup.querySelector(".popup-content").classList.remove("win", "lose", "draw");
      popup.style.display = "none";
    }
  };
}