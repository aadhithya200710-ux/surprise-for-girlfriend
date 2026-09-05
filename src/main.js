/* ============================================================
   BIRTHDAY SURPRISE FOR MUHSII - MAIN JAVASCRIPT
   Sender: Aadhiii
   Receiver: Muhsii
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Global State
  let currentSectionIndex = 0;
  const sections = document.querySelectorAll('.section');
  
  // Initialize Modules
  initBackgroundCanvas();
  setupNavigation();
  setupWelcome();
  setupBalloonMemories();
  setupCandleScene();
  setupLetterScene();
  setupGiftScene();
  setupHugScene();
  setupMusicPlayer();
  setupBirthdayScene();
  setupVideoScene();
});

/* ============================================================
   BACKGROUND PARTICLES & FLOATING HEARTS CANVAS
   ============================================================ */
function initBackgroundCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(Math.floor(window.innerWidth / 20), 40);

  const shapes = ['❤️', '✨', '⭐', '🌸'];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 12 + Math.random() * 18,
      speedY: 0.3 + Math.random() * 0.8,
      speedX: (Math.random() - 0.5) * 0.5,
      opacity: 0.2 + Math.random() * 0.6,
      symbol: shapes[Math.floor(Math.random() * shapes.length)],
      sway: Math.random() * Math.PI * 2
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.y -= p.speedY;
      p.sway += 0.02;
      p.x += Math.sin(p.sway) * 0.4 + p.speedX;

      if (p.y < -30) {
        p.y = height + 20;
        p.x = Math.random() * width;
      }

      ctx.save();
      ctx.globalAlpha = p.opacity;
      ctx.font = `${p.size}px sans-serif`;
      ctx.fillText(p.symbol, p.x, p.y);
      ctx.restore();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

/* ============================================================
   SECTION NAVIGATION
   ============================================================ */
function showSection(index) {
  const sections = document.querySelectorAll('.section');
  if (index < 0 || index >= sections.length) return;

  sections.forEach((sec, idx) => {
    if (idx === index) {
      sec.classList.remove('hidden');
      setTimeout(() => sec.classList.add('active'), 50);
    } else {
      sec.classList.remove('active');
      setTimeout(() => {
        if (!sec.classList.contains('active')) {
          sec.classList.add('hidden');
        }
      }, 700);
    }
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Trigger Section Specific Setup On Arrival
  if (index === 5) triggerHugAnimation();
  if (index === 7) triggerConfetti();
}

function setupNavigation() {
  // 1. Welcome -> Balloon
  document.getElementById('btn-start')?.addEventListener('click', () => showSection(1));

  // 2. Balloon -> Candle
  document.getElementById('btn-balloon-next')?.addEventListener('click', () => showSection(2));

  // 3. Candle -> Letter
  document.getElementById('btn-candle-next')?.addEventListener('click', () => showSection(3));

  // 4. Letter -> Gift
  document.getElementById('btn-letter-next')?.addEventListener('click', () => showSection(4));

  // 5. Gift -> Hug
  document.getElementById('btn-open-gift')?.addEventListener('click', () => {
    const giftBox = document.getElementById('gift-box');
    giftBox?.classList.add('opened');
    setTimeout(() => showSection(5), 1200);
  });

  // 6. Hug -> Song
  document.getElementById('btn-hug-next')?.addEventListener('click', () => showSection(6));

  // 7. Song -> Birthday
  document.getElementById('btn-song-next')?.addEventListener('click', () => showSection(7));

  // 8. Birthday -> Video
  document.getElementById('btn-birthday-next')?.addEventListener('click', () => showSection(8));

  // 9. Video -> Ending
  document.getElementById('btn-video-next')?.addEventListener('click', () => showSection(9));
}

/* ============================================================
   1. WELCOME PAGE
   ============================================================ */
function setupWelcome() {
  // Sparkle badges & smooth entry ready
}

/* ============================================================
   2. BALLOON MEMORY SURPRISE
   ============================================================ */
function setupBalloonMemories() {
  const container = document.getElementById('balloon-container');
  const overlay = document.getElementById('memory-overlay');
  const memoryImg = document.getElementById('memory-img');
  const caption = document.getElementById('memory-caption');
  const progressBar = document.getElementById('timer-progress');
  const completeBox = document.getElementById('balloon-complete-box');
  if (!container) return;

  const memories = [
    { src: '/memories/memory1.jpg', text: 'A sweet moment together... ✨' },
    { src: '/memories/memory2.jpg', text: 'Your beautiful smile brightens my day ❤️' },
    { src: '/memories/memory3.jpg', text: 'Precious memories with you 🌟' },
    { src: '/memories/memory4.jpg', text: 'Every laugh shared with you is golden ✨' },
    { src: '/memories/memory5.jpg', text: 'My favorite memory of us ❤️' }
  ];

  let currentBalloonIndex = 0;
  let isMemoryActive = false;

  container.innerHTML = '';
  memories.forEach((mem, idx) => {
    const balloon = document.createElement('div');
    balloon.className = `balloon-item ${idx === 0 ? '' : 'locked'}`;
    balloon.dataset.index = idx;

    balloon.innerHTML = `
      <div class="balloon-body">
        <span class="balloon-number">${idx + 1}</span>
      </div>
      <div class="balloon-string"></div>
    `;

    balloon.addEventListener('click', () => {
      if (balloon.classList.contains('locked') || isMemoryActive) return;
      popAndShowMemory(idx, balloon);
    });

    container.appendChild(balloon);
  });

  function popAndShowMemory(index, balloonEl) {
    isMemoryActive = true;
    balloonEl.classList.add('popped');

    setTimeout(() => {
      memoryImg.src = memories[index].src;
      caption.textContent = memories[index].text;

      // Handle broken/missing images gracefully
      memoryImg.onerror = () => {
        memoryImg.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23270b43"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23ffd700" font-size="22" font-family="sans-serif">Memory %23${index + 1} ❤️</text></svg>`;
      };

      overlay.classList.remove('hidden');
      setTimeout(() => overlay.classList.add('show'), 30);

      // Start Timer Progress
      progressBar.style.transition = 'none';
      progressBar.style.width = '100%';
      
      setTimeout(() => {
        progressBar.style.transition = 'width 3.5s linear';
        progressBar.style.width = '0%';
      }, 50);

      // Hide memory after 3.5s
      setTimeout(() => {
        overlay.classList.remove('show');
        setTimeout(() => {
          overlay.classList.add('hidden');
          isMemoryActive = false;

          // Unlock Next Balloon
          currentBalloonIndex++;
          if (currentBalloonIndex < memories.length) {
            const nextBalloon = container.children[currentBalloonIndex];
            if (nextBalloon) nextBalloon.classList.remove('locked');
          } else {
            // All Memories Done
            completeBox?.classList.remove('hidden');
          }
        }, 500);
      }, 3600);
    }, 300);
  }
}

/* ============================================================
   3. CANDLE BLOWING
   ============================================================ */
function setupCandleScene() {
  const btnMic = document.getElementById('btn-enable-mic');
  const btnManual = document.getElementById('btn-manual-blow');
  const flame = document.getElementById('flame');
  const smoke = document.getElementById('smoke');
  const statusMsg = document.getElementById('mic-status');
  const successBox = document.getElementById('candle-success');
  const candleControls = document.getElementById('candle-controls');

  let audioContext = null;
  let mediaStream = null;
  let analyser = null;
  let animFrameId = null;
  let isBlown = false;

  function extinguishCandle() {
    if (isBlown) return;
    isBlown = true;

    flame?.classList.remove('burning');
    flame?.classList.add('extinguished');
    smoke?.classList.remove('hidden');

    if (candleControls) candleControls.style.display = 'none';
    if (statusMsg) statusMsg.textContent = '';
    if (successBox) successBox.classList.remove('hidden');

    // Clean up Audio
    cleanupMic();
  }

  function cleanupMic() {
    if (animFrameId) cancelAnimationFrame(animFrameId);
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
      mediaStream = null;
    }
    if (audioContext && audioContext.state !== 'closed') {
      audioContext.close();
      audioContext = null;
    }
  }

  btnManual?.addEventListener('click', extinguishCandle);

  btnMic?.addEventListener('click', async () => {
    if (statusMsg) statusMsg.textContent = 'Listening for your blow... 🌬️';
    
    try {
      mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const source = audioContext.createMediaStreamSource(mediaStream);
      analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      let blowSustainCount = 0;

      function detectBlow() {
        if (isBlown) return;
        analyser.getByteFrequencyData(dataArray);

        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += dataArray[i];
        }
        let averageVolume = sum / bufferLength;

        // Detect sustained high volume / air noise
        if (averageVolume > 45) {
          blowSustainCount++;
          if (blowSustainCount > 8) {
            extinguishCandle();
            return;
          }
        } else {
          blowSustainCount = Math.max(0, blowSustainCount - 1);
        }

        animFrameId = requestAnimationFrame(detectBlow);
      }

      detectBlow();
    } catch (err) {
      console.warn('Microphone permission denied or unsupported:', err);
      if (statusMsg) statusMsg.textContent = "Microphone access wasn't available. Please tap below to blow out your candle!";
      btnManual?.classList.add('btn-glow');
    }
  });
}

/* ============================================================
   4. PERSONAL LETTER
   ============================================================ */
function setupLetterScene() {
  const btnOpen = document.getElementById('btn-open-letter');
  const envelope = document.getElementById('envelope');
  const letterCard = document.getElementById('letter-content');

  btnOpen?.addEventListener('click', () => {
    envelope?.classList.add('open');
    btnOpen.style.display = 'none';

    setTimeout(() => {
      letterCard?.classList.remove('hidden');
      setTimeout(() => letterCard?.classList.add('show'), 50);
    }, 700);
  });
}

/* ============================================================
   5. GIFT SURPRISE
   ============================================================ */
function setupGiftScene() {
  // Handled by setupNavigation() with gift box animation
}

/* ============================================================
   6. DUDU & BUBU HUG
   ============================================================ */
function triggerHugAnimation() {
  const dudu = document.getElementById('char-dudu');
  const bubu = document.getElementById('char-bubu');
  const textBox = document.getElementById('hug-text-box');
  const heartsContainer = document.getElementById('hug-hearts-effect');

  if (!dudu || !bubu) return;

  // Add walking class
  dudu.classList.add('walking');
  bubu.classList.add('walking');

  // Walk toward center
  setTimeout(() => {
    dudu.classList.remove('dudu-start');
    bubu.classList.remove('bubu-start');

    dudu.classList.add('hug-left');
    bubu.classList.add('hug-right');
  }, 100);

  // Hug reached
  setTimeout(() => {
    dudu.classList.remove('walking');
    bubu.classList.remove('walking');

    if (textBox) textBox.classList.remove('hidden');

    // Create Heart Burst Effect around characters
    if (heartsContainer) {
      heartsContainer.innerHTML = '';
      for (let i = 0; i < 15; i++) {
        const heart = document.createElement('span');
        heart.textContent = '❤️';
        heart.style.position = 'absolute';
        heart.style.left = `${45 + (Math.random() * 10 - 5)}%`;
        heart.style.bottom = '90px';
        heart.style.fontSize = `${16 + Math.random() * 14}px`;
        heart.style.animation = `hugHeartFloat ${1.5 + Math.random()}s forwards ease-out`;
        heart.style.animationDelay = `${Math.random() * 0.8}s`;
        heartsContainer.appendChild(heart);
      }
    }
  }, 1900);
}

function setupHugScene() {
  const imgDudu = document.getElementById('img-dudu');
  const imgBubu = document.getElementById('img-bubu');

  // Fallback for missing character images
  if (imgDudu) {
    imgDudu.onerror = () => {
      // Brown Bear SVG fallback for Dudu (Aadhiii)
      imgDudu.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="140" viewBox="0 0 120 140"><circle cx="60" cy="50" r="35" fill="%238d6e63"/><circle cx="45" cy="40" r="6" fill="%23fff"/><circle cx="75" cy="40" r="6" fill="%23fff"/><path d="M 50 60 Q 60 70 70 60" stroke="%23fff" stroke-width="4" fill="none"/><rect x="40" y="85" width="40" height="50" rx="10" fill="%238d6e63"/></svg>`;
    };
  }

  if (imgBubu) {
    imgBubu.onerror = () => {
      // White Panda SVG fallback for Bubu (Muhsii)
      imgBubu.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="140" viewBox="0 0 120 140"><circle cx="60" cy="50" r="35" fill="%23ffffff"/><circle cx="45" cy="40" r="6" fill="%23333"/><circle cx="75" cy="40" r="6" fill="%23333"/><path d="M 50 60 Q 60 70 70 60" stroke="%23333" stroke-width="4" fill="none"/><rect x="40" y="85" width="40" height="50" rx="10" fill="%23ffffff"/></svg>`;
    };
  }
}

/* Add CSS animation dynamically for floating hug hearts */
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  @keyframes hugHeartFloat {
    0% { transform: translateY(0) scale(0.6); opacity: 1; }
    100% { transform: translateY(-110px) scale(1.3); opacity: 0; }
  }
`;
document.head.appendChild(styleSheet);

/* ============================================================
   7. SONG SURPRISE
   ============================================================ */
function setupMusicPlayer() {
  const audio = document.getElementById('bg-audio');
  const btnPlay = document.getElementById('btn-play-pause');
  const playIcon = document.getElementById('play-icon');
  const vinylDisc = document.getElementById('vinyl-disc');
  const progressFill = document.getElementById('progress-fill');
  const progressBg = document.getElementById('progress-bar-bg');
  const timeCurrent = document.getElementById('time-current');
  const timeDuration = document.getElementById('time-duration');
  const volumeSlider = document.getElementById('volume-slider');

  if (!audio) return;

  // Set audio source to local song file
  const songSources = [
    '/song/Eppadi Vandhaayo - Reprise-Downringtone.com.mp3',
    '/song/birthday-song.mp3'
  ];
  audio.src = songSources[0];

  let isPlaying = false;

  function togglePlay() {
    if (isPlaying) {
      audio.pause();
      isPlaying = false;
      playIcon.textContent = '▶';
      vinylDisc?.classList.remove('playing');
    } else {
      audio.play().then(() => {
        isPlaying = true;
        playIcon.textContent = '❚❚';
        vinylDisc?.classList.add('playing');
      }).catch(err => {
        console.warn('Audio playback prevented or failed:', err);
      });
    }
  }

  btnPlay?.addEventListener('click', togglePlay);

  audio.addEventListener('timeupdate', () => {
    if (!audio.duration) return;
    const pct = (audio.currentTime / audio.duration) * 100;
    if (progressFill) progressFill.style.width = `${pct}%`;

    if (timeCurrent) timeCurrent.textContent = formatTime(audio.currentTime);
    if (timeDuration) timeDuration.textContent = formatTime(audio.duration);
  });

  audio.addEventListener('ended', () => {
    isPlaying = false;
    if (playIcon) playIcon.textContent = '▶';
    vinylDisc?.classList.remove('playing');
  });

  progressBg?.addEventListener('click', (e) => {
    const rect = progressBg.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    if (audio.duration) {
      audio.currentTime = pos * audio.duration;
    }
  });

  volumeSlider?.addEventListener('input', (e) => {
    audio.volume = parseFloat(e.target.value);
  });

  function formatTime(secs) {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  }
}

/* ============================================================
   8. BIRTHDAY WISH (CONFETTI BURST)
   ============================================================ */
function setupBirthdayScene() {
  // Setup ready
}

function triggerConfetti() {
  const container = document.querySelector('.confetti-canvas-container');
  if (!container) return;

  container.innerHTML = '';
  const colors = ['#ff2a75', '#ffd700', '#9c27b0', '#ffffff', '#ff80ab'];

  for (let i = 0; i < 40; i++) {
    const piece = document.createElement('div');
    piece.style.position = 'fixed';
    piece.style.top = '-20px';
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.width = `${8 + Math.random() * 10}px`;
    piece.style.height = `${8 + Math.random() * 10}px`;
    piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    piece.style.zIndex = '1';
    piece.style.pointerEvents = 'none';
    piece.style.opacity = `${0.7 + Math.random() * 0.3}`;
    piece.style.animation = `confettiFall ${2.5 + Math.random() * 2}s linear forwards`;
    container.appendChild(piece);
  }
}

const confettiStyle = document.createElement("style");
confettiStyle.innerText = `
  @keyframes confettiFall {
    0% { transform: translateY(0) rotate(0deg); }
    100% { transform: translateY(105vh) rotate(720deg); }
  }
`;
document.head.appendChild(confettiStyle);

/* ============================================================
   9. FINAL VIDEO
   ============================================================ */
function setupVideoScene() {
  const video = document.getElementById('final-video-player');
  const credits = document.getElementById('video-ending-credits');

  if (!video) return;

  video.addEventListener('ended', () => {
    credits?.classList.remove('hidden');
  });

  video.addEventListener('error', () => {
    console.warn('Video failed to load local file, showing fallback credits option.');
    credits?.classList.remove('hidden');
  });
}
