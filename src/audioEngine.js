// Web Audio Synthesis & Playback Engine for Gigi Official Website
// Delivers authentic Ethiopian modal tuning (Tizita, Bati, Ambassel, Anchihoye)
// and real-time frequency analysis for visualizer bars.

import { ETHIOPIAN_SCALES, PLAYLIST } from './data.js';

class AudioEngine {
  constructor() {
    this.audioCtx = null;
    this.analyser = null;
    this.masterGain = null;
    this.currentTrackIndex = 0;
    this.isPlaying = false;
    this.currentTime = 0;
    this.duration = 288; // 4:48 in seconds for track 1
    this.playbackInterval = null;
    this.melodyTimer = null;
    this.volume = 0.8;
    this.listeners = {
      stateChange: [],
      timeUpdate: [],
      trackChange: [],
      noteTrigger: []
    };
  }

  initContext() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
        this.analyser = this.audioCtx.createAnalyser();
        this.analyser.fftSize = 64;
        this.analyser.smoothingTimeConstant = 0.8;

        this.masterGain = this.audioCtx.createGain();
        this.masterGain.gain.setValueAtTime(this.volume, this.audioCtx.currentTime);

        this.masterGain.connect(this.analyser);
        this.analyser.connect(this.audioCtx.destination);
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  getCurrentTrack() {
    return PLAYLIST[this.currentTrackIndex];
  }

  playTrack(index = this.currentTrackIndex) {
    this.initContext();
    if (index >= 0 && index < PLAYLIST.length) {
      this.currentTrackIndex = index;
    }
    const track = this.getCurrentTrack();
    const parts = track.duration.split(':');
    this.duration = parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
    this.currentTime = 0;
    this.isPlaying = true;

    this.emit('trackChange', track);
    this.emit('stateChange', { isPlaying: true, track });

    this.startMelodyLoop();
    this.startPlaybackTicker();
  }

  pause() {
    this.isPlaying = false;
    this.stopMelodyLoop();
    this.stopPlaybackTicker();
    this.emit('stateChange', { isPlaying: false, track: this.getCurrentTrack() });
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.playTrack();
    }
  }

  nextTrack() {
    const nextIdx = (this.currentTrackIndex + 1) % PLAYLIST.length;
    this.playTrack(nextIdx);
  }

  prevTrack() {
    const prevIdx = (this.currentTrackIndex - 1 + PLAYLIST.length) % PLAYLIST.length;
    this.playTrack(prevIdx);
  }

  seek(percent) {
    this.currentTime = Math.floor(percent * this.duration);
    this.emit('timeUpdate', {
      currentTime: this.currentTime,
      duration: this.duration,
      formattedCurrent: this.formatTime(this.currentTime),
      formattedDuration: this.formatTime(this.duration),
      progressPercent: (this.currentTime / this.duration) * 100
    });
  }

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.audioCtx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.audioCtx.currentTime);
    }
  }

  startPlaybackTicker() {
    this.stopPlaybackTicker();
    this.playbackInterval = setInterval(() => {
      if (!this.isPlaying) return;
      this.currentTime += 1;
      if (this.currentTime >= this.duration) {
        this.nextTrack();
        return;
      }
      this.emit('timeUpdate', {
        currentTime: this.currentTime,
        duration: this.duration,
        formattedCurrent: this.formatTime(this.currentTime),
        formattedDuration: this.formatTime(this.duration),
        progressPercent: (this.currentTime / this.duration) * 100
      });
    }, 1000);
  }

  stopPlaybackTicker() {
    if (this.playbackInterval) {
      clearInterval(this.playbackInterval);
      this.playbackInterval = null;
    }
  }

  // Generates musical phrase matching traditional Ethiopian scales
  startMelodyLoop() {
    this.stopMelodyLoop();
    const track = this.getCurrentTrack();
    const scale = ETHIOPIAN_SCALES.find(s => track.scale.toLowerCase().includes(s.id)) || ETHIOPIAN_SCALES[0];
    let noteStep = 0;

    const intervalTime = Math.max(300, Math.round(60000 / (track.tempo * 2)));

    this.melodyTimer = setInterval(() => {
      if (!this.isPlaying) return;
      const pattern = track.melodyPattern;
      const noteIdx = pattern[noteStep % pattern.length];
      const freq = scale.frequencies[noteIdx % scale.frequencies.length];

      // Pluck synthesized Ethiopian Krar / flute acoustic timbre
      this.synthesizeNote(freq, 0.45, 'triangle');

      // Add a subtle sub-bass root (Bill Laswell signature dub style)
      if (noteStep % 4 === 0) {
        this.synthesizeDubBass(scale.frequencies[0] / 2, 0.9);
      }

      this.emit('noteTrigger', { freq, scale: scale.name, noteIndex: noteIdx });
      noteStep++;
    }, intervalTime);
  }

  stopMelodyLoop() {
    if (this.melodyTimer) {
      clearInterval(this.melodyTimer);
      this.melodyTimer = null;
    }
  }

  // Plays an individual tone for the interactive Ethiopian Scales (Qenet) explorer
  playScaleTone(freq, scaleName = 'Tizita') {
    this.initContext();
    this.synthesizeNote(freq, 0.8, 'sine');
    // Add warm overtone
    this.synthesizeNote(freq * 1.5, 0.4, 'triangle');
  }

  synthesizeNote(freq, duration = 0.5, type = 'sine') {
    if (!this.audioCtx || !this.masterGain) return;
    const now = this.audioCtx.currentTime;

    const osc = this.audioCtx.createOscillator();
    const noteGain = this.audioCtx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);

    // Warm envelope modeling acoustic string / breath
    noteGain.gain.setValueAtTime(0, now);
    noteGain.gain.linearRampToValueAtTime(0.35, now + 0.04);
    noteGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(noteGain);
    noteGain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + duration);
  }

  synthesizeDubBass(freq, duration = 0.8) {
    if (!this.audioCtx || !this.masterGain) return;
    const now = this.audioCtx.currentTime;

    const osc = this.audioCtx.createOscillator();
    const bassGain = this.audioCtx.createGain();
    const filter = this.audioCtx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(140, now);

    bassGain.gain.setValueAtTime(0, now);
    bassGain.gain.linearRampToValueAtTime(0.4, now + 0.06);
    bassGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(filter);
    filter.connect(bassGain);
    bassGain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + duration);
  }

  getFrequencyData() {
    if (!this.analyser) return new Uint8Array(16);
    const buffer = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(buffer);
    return buffer;
  }

  formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  on(event, callback) {
    if (this.listeners[event]) {
      this.listeners[event].push(callback);
    }
  }

  emit(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(fn => {
        try { fn(data); } catch (e) { console.error(e); }
      });
    }
  }
}

export const audioEngine = new AudioEngine();
