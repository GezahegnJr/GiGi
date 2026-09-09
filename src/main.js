// Main Application Controller for Gigi (Ejigayehu Shibabaw) Official Platform
import { 
  ARTIST_DATA, 
  ETHIOPIAN_SCALES, 
  PLAYLIST, 
  DISCOGRAPHY, 
  TIKTOK_FEED, 
  TOUR_DATES, 
  PRESS_QUOTES, 
  YOUTUBE_VIDEOS,
  YARED_SYMBOLS 
} from './data.js';

import { audioEngine } from './audioEngine.js';

// Application State
let activeScaleId = 'tizita';
let activeDiscographyFilter = 'All';
let selectedAlbum = null;
let visualizerAnimationFrame = null;

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initHero();
  initPlayer();
  initScalesExplorer();
  initDiscography();
  initVideoAndTikTok();
  initTourMatrix();
  initPressQuotes();
  initContactAndNewsletter();
  initAccessibilityAndModals();
});

/* -------------------------------------------------------------
 * 1. Navigation & Mobile Menu
 * ----------------------------------------------------------- */
function initNavigation() {
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
      mobileMenu.classList.toggle('hidden');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Active section spy on scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 140;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('text-gold', 'border-b-2', 'border-gold');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('text-gold', 'border-b-2', 'border-gold');
      }
    });
  });
}

/* -------------------------------------------------------------
 * 2. Hero Section
 * ----------------------------------------------------------- */
function initHero() {
  const heroPlayBtn = document.getElementById('heroPlayFeaturedBtn');
  if (heroPlayBtn) {
    heroPlayBtn.addEventListener('click', () => {
      audioEngine.playTrack(0); // Plays Guramayle
      showNotification("Now Playing: Guramayle (Gigi ft. Bill Laswell)");
    });
  }
}

/* -------------------------------------------------------------
 * 3. Sticky Global Audio Player
 * ----------------------------------------------------------- */
function initPlayer() {
  const playPauseBtn = document.getElementById('playerPlayPauseBtn');
  const prevBtn = document.getElementById('playerPrevBtn');
  const nextBtn = document.getElementById('playerNextBtn');
  const progressBar = document.getElementById('playerProgressBar');
  const currentTimeEl = document.getElementById('playerCurrentTime');
  const totalDurationEl = document.getElementById('playerTotalDuration');
  const trackTitleEl = document.getElementById('playerTrackTitle');
  const trackAlbumEl = document.getElementById('playerTrackAlbum');
  const trackCoverEl = document.getElementById('playerCoverImg');
  const volumeSlider = document.getElementById('playerVolumeSlider');
  const visualizerCanvas = document.getElementById('playerVisualizerCanvas');
  const spotifyLinkBtn = document.getElementById('playerSpotifyLink');

  // Update track UI
  const updateTrackDisplay = (track) => {
    if (trackTitleEl) trackTitleEl.innerHTML = `${track.title} <span class="font-amharic text-xs text-gold/80 ml-1">(${track.amharicTitle})</span>`;
    if (trackAlbumEl) trackAlbumEl.textContent = `${track.album} • Scale: ${track.scale}`;
    if (trackCoverEl) trackCoverEl.src = track.coverArt;
    if (totalDurationEl) totalDurationEl.textContent = track.duration;
    if (spotifyLinkBtn) spotifyLinkBtn.href = track.spotifyUri || ARTIST_DATA.socialLinks.spotify;
  };

  // Initial populate
  updateTrackDisplay(audioEngine.getCurrentTrack());

  // Listen for audio engine events
  audioEngine.on('stateChange', ({ isPlaying }) => {
    if (playPauseBtn) {
      playPauseBtn.innerHTML = isPlaying 
        ? `<svg class="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>` 
        : `<svg class="w-6 h-6 fill-current ml-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>`;
      playPauseBtn.setAttribute('aria-label', isPlaying ? 'Pause Audio' : 'Play Audio');
    }

    if (isPlaying) {
      startVisualizerLoop(visualizerCanvas);
    } else {
      stopVisualizerLoop();
    }
  });

  audioEngine.on('trackChange', (track) => {
    updateTrackDisplay(track);
  });

  audioEngine.on('timeUpdate', ({ formattedCurrent, formattedDuration, progressPercent }) => {
    if (currentTimeEl) currentTimeEl.textContent = formattedCurrent;
    if (totalDurationEl) totalDurationEl.textContent = formattedDuration;
    if (progressBar) progressBar.value = progressPercent;
  });

  // Event handlers
  if (playPauseBtn) {
    playPauseBtn.addEventListener('click', () => audioEngine.togglePlay());
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => audioEngine.prevTrack());
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => audioEngine.nextTrack());
  }

  if (progressBar) {
    progressBar.addEventListener('input', (e) => {
      const pct = parseFloat(e.target.value) / 100;
      audioEngine.seek(pct);
    });
  }

  if (volumeSlider) {
    volumeSlider.addEventListener('input', (e) => {
      audioEngine.setVolume(parseFloat(e.target.value));
    });
  }
}

function startVisualizerLoop(canvas) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  stopVisualizerLoop();

  const render = () => {
    visualizerAnimationFrame = requestAnimationFrame(render);
    const data = audioEngine.getFrequencyData();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const barCount = 18;
    const barWidth = 3;
    const gap = 2;
    const startX = 0;

    for (let i = 0; i < barCount; i++) {
      const val = data[i] || (audioEngine.isPlaying ? Math.floor(Math.random() * 120 + 20) : 4);
      const barHeight = Math.max(3, (val / 255) * canvas.height);
      const y = canvas.height - barHeight;

      // Gold gradient for frequency spectrum
      const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
      gradient.addColorStop(0, '#B08E19');
      gradient.addColorStop(1, '#F5D77F');

      ctx.fillStyle = gradient;
      ctx.fillRect(startX + i * (barWidth + gap), y, barWidth, barHeight);
    }
  };
  render();
}

function stopVisualizerLoop() {
  if (visualizerAnimationFrame) {
    cancelAnimationFrame(visualizerAnimationFrame);
    visualizerAnimationFrame = null;
  }
}

/* -------------------------------------------------------------
 * 4. Ethiopian Scales (Qenet) Interactive Explorer
 * ----------------------------------------------------------- */
function initScalesExplorer() {
  const tabsContainer = document.getElementById('scalesTabsContainer');
  const scaleTitle = document.getElementById('scaleTitle');
  const scaleAmharic = document.getElementById('scaleAmharic');
  const scaleMood = document.getElementById('scaleMood');
  const scaleDescription = document.getElementById('scaleDescription');
  const scaleKeysContainer = document.getElementById('scaleKeysContainer');
  const playScaleArpeggioBtn = document.getElementById('playScaleArpeggioBtn');
  const scaleSongsList = document.getElementById('scaleSongsList');

  const renderScale = (scaleId) => {
    activeScaleId = scaleId;
    const scale = ETHIOPIAN_SCALES.find(s => s.id === scaleId) || ETHIOPIAN_SCALES[0];

    // Update active tab styling
    document.querySelectorAll('.scale-tab-btn').forEach(btn => {
      if (btn.dataset.scaleId === scaleId) {
        btn.classList.add('bg-gold', 'text-dark-950', 'shadow-gold-sm');
        btn.classList.remove('bg-dark-800', 'text-earth-200');
      } else {
        btn.classList.remove('bg-gold', 'text-dark-950', 'shadow-gold-sm');
        btn.classList.add('bg-dark-800', 'text-earth-200');
      }
    });

    if (scaleTitle) scaleTitle.textContent = scale.name;
    if (scaleAmharic) scaleAmharic.textContent = scale.amharic;
    if (scaleMood) scaleMood.textContent = scale.mood;
    if (scaleDescription) scaleDescription.textContent = scale.description;

    // Render interactive piano/krar tone keys
    if (scaleKeysContainer) {
      scaleKeysContainer.innerHTML = '';
      scale.notes.forEach((note, idx) => {
        const freq = scale.frequencies[idx];
        const keyBtn = document.createElement('button');
        keyBtn.className = 'qenet-key flex flex-col items-center justify-between p-3 sm:p-4 rounded-xl bg-dark-850 hover:bg-dark-700 border border-gold/20 text-earth-100 transition shadow-sm group';
        keyBtn.innerHTML = `
          <span class="text-xs uppercase tracking-wider text-gold/70 group-hover:text-gold font-mono">Step ${idx + 1}</span>
          <span class="text-xl sm:text-2xl font-serif font-bold text-white my-2">${note}</span>
          <span class="text-[11px] text-earth-300 font-mono">${Math.round(freq)} Hz</span>
        `;
        keyBtn.setAttribute('aria-label', `Play ${scale.name} scale note ${note} at ${Math.round(freq)} Hz`);
        keyBtn.addEventListener('click', () => {
          keyBtn.classList.add('playing');
          audioEngine.playScaleTone(freq, scale.name);
          setTimeout(() => keyBtn.classList.remove('playing'), 300);
        });
        scaleKeysContainer.appendChild(keyBtn);
      });
    }

    // Render signature songs
    if (scaleSongsList) {
      scaleSongsList.innerHTML = scale.signatureSongs
        .map(song => `<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gold/10 text-gold-300 border border-gold/20 mr-2 mb-2">🎵 ${song}</span>`)
        .join('');
    }
  };

  // Render Tabs
  if (tabsContainer) {
    tabsContainer.innerHTML = '';
    ETHIOPIAN_SCALES.forEach(scale => {
      const btn = document.createElement('button');
      btn.dataset.scaleId = scale.id;
      btn.className = `scale-tab-btn px-5 py-2.5 rounded-full text-sm font-medium transition flex items-center gap-2 ${scale.id === activeScaleId ? 'bg-gold text-dark-950 font-semibold' : 'bg-dark-800 text-earth-200 hover:bg-dark-700'}`;
      btn.innerHTML = `<span>${scale.name}</span><span class="font-amharic text-xs opacity-70">(${scale.amharic})</span>`;
      btn.addEventListener('click', () => renderScale(scale.id));
      tabsContainer.appendChild(btn);
    });
  }

  // Arpeggio play button
  if (playScaleArpeggioBtn) {
    playScaleArpeggioBtn.addEventListener('click', () => {
      const scale = ETHIOPIAN_SCALES.find(s => s.id === activeScaleId) || ETHIOPIAN_SCALES[0];
      scale.frequencies.forEach((freq, index) => {
        setTimeout(() => {
          audioEngine.playScaleTone(freq, scale.name);
          const keys = scaleKeysContainer.querySelectorAll('.qenet-key');
          if (keys[index]) {
            keys[index].classList.add('playing');
            setTimeout(() => keys[index].classList.remove('playing'), 250);
          }
        }, index * 260);
      });
    });
  }

  renderScale(activeScaleId);

  // Render Saint Yared 10 Musical Signs
  const yaredContainer = document.getElementById('yaredSymbolsContainer');
  if (yaredContainer && YARED_SYMBOLS) {
    yaredContainer.innerHTML = '';
    YARED_SYMBOLS.forEach(item => {
      const btn = document.createElement('button');
      btn.className = 'p-3 rounded-xl bg-dark-950/80 hover:bg-dark-800 border border-gold/20 hover:border-gold text-left transition group';
      btn.innerHTML = `
        <div class="flex items-center justify-between mb-1">
          <span class="font-amharic text-lg font-bold text-white group-hover:text-gold">${item.name}</span>
          <span class="text-sm font-serif text-gold-300 font-mono">${item.symbol}</span>
        </div>
        <span class="block text-[11px] font-semibold text-earth-200">${item.english}</span>
        <span class="block text-[10px] text-earth-400 mt-0.5 line-clamp-1">${item.meaning}</span>
      `;
      btn.setAttribute('aria-label', `Hear St. Yared musical symbol ${item.name} (${item.english})`);
      btn.addEventListener('click', () => {
        audioEngine.playScaleTone(item.freq, item.name);
        showNotification(`St. Yared Neume: ${item.name} (${item.english}) — ${item.desc}`);
      });
      yaredContainer.appendChild(btn);
    });
  }
}

/* -------------------------------------------------------------
 * 5. Interactive Discography & Music Hub
 * ----------------------------------------------------------- */
function initDiscography() {
  const filterTabsContainer = document.getElementById('discographyFilterTabs');
  const albumsGrid = document.getElementById('discographyGrid');
  const albumModal = document.getElementById('albumDetailModal');

  const categories = ['All', 'Studio Albums', 'Collaborations', 'Singles & Live'];

  const renderFilterTabs = () => {
    if (!filterTabsContainer) return;
    filterTabsContainer.innerHTML = '';
    categories.forEach(cat => {
      const btn = document.createElement('button');
      btn.className = `px-5 py-2 rounded-full text-sm font-medium transition ${activeDiscographyFilter === cat ? 'bg-gold text-dark-950 shadow-gold-sm font-semibold' : 'bg-dark-800/80 text-earth-300 hover:text-white hover:bg-dark-700'}`;
      btn.textContent = cat;
      btn.addEventListener('click', () => {
        activeDiscographyFilter = cat;
        renderFilterTabs();
        renderAlbums();
      });
      filterTabsContainer.appendChild(btn);
    });
  };

  const renderAlbums = () => {
    if (!albumsGrid) return;
    const filtered = activeDiscographyFilter === 'All' 
      ? DISCOGRAPHY 
      : DISCOGRAPHY.filter(a => a.type === activeDiscographyFilter);

    albumsGrid.innerHTML = '';
    filtered.forEach(album => {
      const card = document.createElement('div');
      card.className = 'glass-card rounded-2xl overflow-hidden flex flex-col group';
      card.innerHTML = `
        <div class="relative overflow-hidden aspect-square bg-dark-950">
          <img src="${album.cover}" alt="Album cover for ${album.title}" loading="lazy" class="w-full h-full object-cover object-center group-hover:scale-105 transition duration-700">
          <div class="absolute inset-0 bg-gradient-to-t from-dark-950/90 via-dark-950/20 to-transparent opacity-80 group-hover:opacity-60 transition"></div>
          <span class="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold bg-dark-950/80 text-gold border border-gold/30 backdrop-blur-md">${album.year}</span>
          <button class="album-quick-play absolute bottom-4 right-4 w-12 h-12 rounded-full bg-gold text-dark-950 flex items-center justify-center shadow-gold-md transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition duration-300 hover:scale-110" aria-label="Play sample from ${album.title}">
            <svg class="w-6 h-6 fill-current ml-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          </button>
        </div>
        <div class="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between text-xs text-earth-400 mb-1">
              <span>${album.label}</span>
              <span class="text-gold/80">${album.type}</span>
            </div>
            <h3 class="text-2xl font-serif font-bold text-white mb-1 group-hover:text-gold transition">${album.title}</h3>
            <p class="text-xs text-earth-300 mb-3">Produced by <span class="text-earth-100 font-medium">${album.producer}</span></p>
            <p class="text-sm text-earth-200/80 line-clamp-2 mb-4 leading-relaxed">${album.description}</p>
          </div>
          <div class="pt-3 border-t border-gold/10 flex items-center justify-between gap-2">
            <button class="album-view-details-btn text-xs text-gold hover:text-gold-light font-medium flex items-center gap-1.5 transition">
              <span>Full Credits & Tracks</span>
              <svg class="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" /></svg>
            </button>
            <a href="${album.spotifyUrl}" target="_blank" rel="noopener noreferrer" class="social-icon-btn !w-8 !h-8 hover:!border-spotify hover:!text-spotify" aria-label="Listen to ${album.title} on Spotify">
              <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
            </a>
          </div>
        </div>
      `;

      // Quick play click
      const quickPlay = card.querySelector('.album-quick-play');
      if (quickPlay) {
        quickPlay.addEventListener('click', (e) => {
          e.stopPropagation();
          audioEngine.playTrack(0);
          showNotification(`Now Playing highlight from: ${album.title}`);
        });
      }

      // View details click
      const detailsBtn = card.querySelector('.album-view-details-btn');
      if (detailsBtn) {
        detailsBtn.addEventListener('click', () => openAlbumModal(album));
      }
      card.addEventListener('click', (e) => {
        if (!e.target.closest('a') && !e.target.closest('button')) {
          openAlbumModal(album);
        }
      });

      albumsGrid.appendChild(card);
    });
  };

  const openAlbumModal = (album) => {
    selectedAlbum = album;
    if (!albumModal) return;

    const modalTitle = albumModal.querySelector('#modalAlbumTitle');
    const modalCover = albumModal.querySelector('#modalAlbumCover');
    const modalMeta = albumModal.querySelector('#modalAlbumMeta');
    const modalDesc = albumModal.querySelector('#modalAlbumDesc');
    const modalCredits = albumModal.querySelector('#modalAlbumCredits');
    const modalTracks = albumModal.querySelector('#modalAlbumTracks');
    const modalSpotify = albumModal.querySelector('#modalSpotifyBtn');
    const modalApple = albumModal.querySelector('#modalAppleBtn');

    if (modalTitle) modalTitle.textContent = album.title;
    if (modalCover) modalCover.src = album.cover;
    if (modalMeta) modalMeta.textContent = `${album.year} • ${album.label} • Produced by ${album.producer}`;
    if (modalDesc) modalDesc.textContent = album.description;

    if (modalCredits) {
      modalCredits.innerHTML = album.credits
        .map(c => `<li class="text-xs text-earth-200 flex items-start gap-1.5"><span class="text-gold mt-0.5">•</span><span>${c}</span></li>`)
        .join('');
    }

    if (modalTracks) {
      modalTracks.innerHTML = album.highlightTracks
        .map((t, idx) => `
          <div class="flex items-center justify-between py-1.5 border-b border-white/5 text-xs text-earth-100">
            <span class="flex items-center gap-2"><span class="text-earth-400 font-mono">${idx + 1}.</span> <span class="font-medium">${t}</span></span>
            <button class="text-gold hover:text-gold-light font-mono text-[11px]" onclick="window.playHighlightSong('${t}')">Preview</button>
          </div>
        `).join('');
    }

    if (modalSpotify) modalSpotify.href = album.spotifyUrl;
    if (modalApple) modalApple.href = album.appleMusicUrl;

    if (typeof albumModal.showModal === 'function') {
      albumModal.showModal();
    } else {
      albumModal.setAttribute('open', '');
    }
  };

  window.playHighlightSong = (songName) => {
    audioEngine.playTrack(0);
    showNotification(`Streaming preview: ${songName}`);
  };

  renderFilterTabs();
  renderAlbums();
}

/* -------------------------------------------------------------
 * 6. Multimedia & TikTok Reels Grid
 * ----------------------------------------------------------- */
function initVideoAndTikTok() {
  const videoSelectorBtns = document.querySelectorAll('.video-select-btn');
  const mainIframe = document.getElementById('featuredVideoIframe');
  const videoTitleEl = document.getElementById('featuredVideoTitle');
  const videoDescEl = document.getElementById('featuredVideoDesc');
  const tikTokGrid = document.getElementById('tikTokGridContainer');

  // Video switcher
  videoSelectorBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      videoSelectorBtns.forEach(b => b.classList.remove('border-gold', 'bg-dark-800', 'text-gold'));
      btn.classList.add('border-gold', 'bg-dark-800', 'text-gold');

      const videoId = btn.dataset.videoId;
      const video = YOUTUBE_VIDEOS.find(v => v.id === videoId);
      if (video) {
        if (audioEngine.isPlaying) {
          audioEngine.pause();
        }
        if (mainIframe) {
          mainIframe.src = `https://www.youtube.com/embed/${video.embedId}?autoplay=1&enablejsapi=1&rel=0`;
        }
        if (videoTitleEl) videoTitleEl.textContent = video.title;
        if (videoDescEl) videoDescEl.textContent = video.description;
        showNotification(`Playing YouTube Audio: ${video.title}`);
      }
    });
  });

  // Direct play trigger button
  const triggerPlayBtn = document.getElementById('playIframeDirectBtn');
  if (triggerPlayBtn) {
    triggerPlayBtn.addEventListener('click', () => {
      if (audioEngine.isPlaying) {
        audioEngine.pause();
      }
      if (mainIframe) {
        mainIframe.src = "https://www.youtube.com/embed/LQX8xCTJpnQ?autoplay=1&enablejsapi=1&rel=0";
      }
      showNotification("Playing in YouTube Iframe: Gigi - Guramayle");
    });
  }

  // Render TikTok vertical reel cards
  if (tikTokGrid) {
    tikTokGrid.innerHTML = '';
    TIKTOK_FEED.forEach(reel => {
      const reelCard = document.createElement('div');
      reelCard.className = 'glass-card rounded-2xl overflow-hidden flex flex-col relative group h-[480px] sm:h-[520px]';
      reelCard.innerHTML = `
        <img src="${reel.coverImg}" alt="TikTok reel featuring Gigi music by ${reel.author}" loading="lazy" class="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition duration-700">
        <div class="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/40 to-dark-950/20"></div>
        
        <!-- TikTok Watermark & Tag -->
        <div class="relative p-4 flex items-center justify-between z-10">
          <div class="flex items-center gap-2">
            <span class="w-7 h-7 rounded-full bg-black/70 flex items-center justify-center text-white border border-white/20">
              <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.46V11.8a8.28 8.28 0 0 0 5.77 2.29V10.6a4.85 4.85 0 0 1-3.77-1.74V6.69h3.77z"/></svg>
            </span>
            <span class="text-xs font-semibold text-white/90 drop-shadow">TikTok Trending</span>
          </div>
          <span class="text-xs px-2 py-0.5 rounded bg-black/60 text-earth-200 border border-white/10 font-mono">${reel.videoSimulatorDuration}</span>
        </div>

        <!-- Center Play Simulation Overlay -->
        <div class="relative flex-1 flex items-center justify-center z-10 pointer-events-none">
          <div class="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-xl transform group-hover:scale-110 transition">
            <svg class="w-7 h-7 fill-current ml-1" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          </div>
        </div>

        <!-- Reel Details & Social Action Row -->
        <div class="relative p-4 z-10">
          <div class="flex items-center gap-1.5 mb-1.5">
            <span class="text-sm font-bold text-white">${reel.author}</span>
            ${reel.verified ? `<svg class="w-4 h-4 text-sky-400 fill-current" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>` : ''}
          </div>
          <p class="text-xs text-earth-100 line-clamp-2 mb-3 leading-relaxed drop-shadow-sm">${reel.caption}</p>
          
          <div class="flex items-center justify-between text-xs text-earth-300 pt-2 border-t border-white/15">
            <div class="flex items-center gap-3">
              <span class="flex items-center gap-1">
                <svg class="w-3.5 h-3.5 fill-current text-rose-500" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                <span>${reel.likes}</span>
              </span>
              <span class="flex items-center gap-1">
                <svg class="w-3.5 h-3.5 fill-current text-earth-300" viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
                <span>${reel.views}</span>
              </span>
            </div>
            <a href="${reel.url}" target="_blank" rel="noopener noreferrer" class="text-xs text-tiktok-cyan hover:text-white font-semibold flex items-center gap-1">
              <span>Watch on TikTok</span>
              <svg class="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>
            </a>
          </div>
        </div>
      `;

      reelCard.addEventListener('click', (e) => {
        if (!e.target.closest('a')) {
          audioEngine.playTrack(0);
          showNotification(`Simulating audio for: ${reel.author}`);
        }
      });

      tikTokGrid.appendChild(reelCard);
    });
  }
}

/* -------------------------------------------------------------
 * 7. Live Dates & Tour Matrix
 * ----------------------------------------------------------- */
function initTourMatrix() {
  const tourListContainer = document.getElementById('tourDatesList');
  if (!tourListContainer) return;

  tourListContainer.innerHTML = '';
  TOUR_DATES.forEach(tour => {
    const row = document.createElement('div');
    row.className = 'glass-card p-4 sm:p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group hover:border-gold/40 transition';
    
    let badgeClass = 'bg-gold/20 text-gold border-gold/40';
    if (tour.statusType === 'rsvp') badgeClass = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
    if (tour.statusType === 'alert') badgeClass = 'bg-sky-500/20 text-sky-300 border-sky-500/40';

    row.innerHTML = `
      <div class="flex items-start gap-4 sm:gap-6">
        <div class="text-center min-w-[80px] p-2 rounded-xl bg-dark-950 border border-gold/20">
          <span class="block text-xs uppercase tracking-wider text-gold font-mono">${tour.date.split(' ')[0]}</span>
          <span class="block text-2xl font-serif font-bold text-white">${tour.date.split(' ')[1].replace(',', '')}</span>
          <span class="block text-[10px] text-earth-400 font-mono">${tour.date.split(' ')[2]}</span>
        </div>
        <div>
          <div class="flex items-center gap-2 mb-1">
            <span class="text-sm font-semibold text-white group-hover:text-gold transition">${tour.city}</span>
            <span class="text-xs text-earth-400">• ${tour.venue}</span>
          </div>
          <p class="text-xs text-earth-300 mb-1">${tour.event}</p>
          <span class="text-[11px] text-earth-400 font-mono">${tour.day}</span>
        </div>
      </div>
      <div class="flex items-center gap-3 w-full md:w-auto justify-end">
        <a href="${tour.link}" class="px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider border ${badgeClass} transition hover:scale-105">
          ${tour.status}
        </a>
      </div>
    `;

    tourListContainer.appendChild(row);
  });
}

/* -------------------------------------------------------------
 * 8. Press Quotes & Accolades
 * ----------------------------------------------------------- */
function initPressQuotes() {
  const container = document.getElementById('pressQuotesContainer');
  if (!container) return;

  container.innerHTML = '';
  PRESS_QUOTES.forEach(quote => {
    const card = document.createElement('div');
    card.className = 'glass-card p-6 sm:p-8 rounded-2xl flex flex-col justify-between relative';
    card.innerHTML = `
      <div class="absolute top-4 right-4 text-4xl text-gold/20 font-serif leading-none">“</div>
      <p class="text-sm sm:text-base text-earth-100 font-serif italic mb-6 leading-relaxed">"${quote.quote}"</p>
      <div class="pt-4 border-t border-gold/15 flex items-center justify-between">
        <div>
          <h4 class="text-sm font-bold text-white tracking-wide">${quote.outlet}</h4>
          <span class="text-xs text-earth-400">${quote.critic}</span>
        </div>
        <span class="text-xs px-2.5 py-1 rounded bg-gold/10 text-gold border border-gold/25 font-mono">${quote.tag}</span>
      </div>
    `;
    container.appendChild(card);
  });
}

/* -------------------------------------------------------------
 * 9. Direct Booking & Management Contact Form
 * ----------------------------------------------------------- */
function initContactAndNewsletter() {
  const bookingForm = document.getElementById('bookingForm');
  const bookingFeedback = document.getElementById('bookingFeedback');
  const newsletterForm = document.getElementById('newsletterForm');
  const newsletterFeedback = document.getElementById('newsletterFeedback');

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('bookingName').value.trim();
      const email = document.getElementById('bookingEmail').value.trim();
      const inquiryType = document.getElementById('bookingInquiryType').value;

      if (!name || !email) {
        showBookingFeedback('Please fill in all required fields.', 'error');
        return;
      }

      // Simulate sending booking inquiry
      const submitBtn = bookingForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Transmitting Inquiry...';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        bookingForm.reset();
        showBookingFeedback(`Thank you, ${name}. Your ${inquiryType} inquiry has been received by Gigi's executive management. We will respond within 48 hours.`, 'success');
      }, 1200);
    });
  }

  function showBookingFeedback(msg, type) {
    if (!bookingFeedback) return;
    bookingFeedback.textContent = msg;
    bookingFeedback.className = `p-4 rounded-xl text-xs font-medium border ${type === 'success' ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-200' : 'bg-rose-950/60 border-rose-500/40 text-rose-200'}`;
    bookingFeedback.classList.remove('hidden');
    bookingFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      const email = emailInput ? emailInput.value.trim() : '';

      if (!email || !email.includes('@')) {
        if (newsletterFeedback) {
          newsletterFeedback.textContent = 'Please enter a valid email address.';
          newsletterFeedback.className = 'text-xs text-rose-400 mt-2';
        }
        return;
      }

      newsletterForm.reset();
      if (newsletterFeedback) {
        newsletterFeedback.textContent = 'Welcome to the Inner Circle. You will receive private archival releases & tour updates.';
        newsletterFeedback.className = 'text-xs text-gold mt-2';
      }
    });
  }
}

/* -------------------------------------------------------------
 * 10. Accessibility & Light-Dismiss Dialog Fallback
 * ----------------------------------------------------------- */
function initAccessibilityAndModals() {
  const modal = document.getElementById('albumDetailModal');
  const closeBtn = document.getElementById('closeModalBtn');

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      if (typeof modal.close === 'function') {
        modal.close();
      } else {
        modal.removeAttribute('open');
      }
    });
  }

  // Fallback for browsers without native 'closedBy' support (per modern-web-guidance)
  if (modal && !('closedBy' in HTMLDialogElement.prototype)) {
    modal.addEventListener('click', (event) => {
      if (event.target !== modal) return;
      const rect = modal.getBoundingClientRect();
      const isInside = (
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width
      );
      if (!isInside) {
        modal.close();
      }
    });
  }
}

// Notification toast helper
function showNotification(text) {
  let toast = document.getElementById('globalNotificationToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'globalNotificationToast';
    toast.className = 'fixed top-24 right-4 z-50 px-4 py-3 rounded-xl bg-dark-900/95 border border-gold/40 text-gold-200 text-xs font-medium shadow-gold-md backdrop-blur-md transition transform translate-y-[-20px] opacity-0 pointer-events-none';
    document.body.appendChild(toast);
  }
  toast.textContent = text;
  toast.classList.remove('translate-y-[-20px]', 'opacity-0');
  toast.classList.add('translate-y-0', 'opacity-100');

  setTimeout(() => {
    toast.classList.remove('translate-y-0', 'opacity-100');
    toast.classList.add('translate-y-[-20px]', 'opacity-0');
  }, 3200);
}
