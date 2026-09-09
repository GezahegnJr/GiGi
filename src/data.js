// Official Gigi (Ejigayehu Shibabaw) Platform Data Store

export const ARTIST_DATA = {
  name: "Gigi",
  fullName: "Ejigayehu Shibabaw",
  amharicName: "እጅጋየሁ ሽባባው",
  tagline: "The Voice of Ethiopia to the World",
  subtitle: "Vocalist • Songwriter • Cultural Innovator • Composer",
  bioHeadline: "The Transcendent Voice of the Ethiopian Highlands",
  birthplace: "Chagni, Gojjam, Ethiopia",
  vocalRange: "Five-Octave Range",
  socialLinks: {
    spotify: "https://open.spotify.com/artist/6b17c5b6h5q52wT8rS2YfD",
    tiktok: "https://www.tiktok.com/@gigishibabaw_official",
    youtube: "https://www.youtube.com/results?search_query=Gigi+Ejigayehu+Shibabaw",
    appleMusic: "https://music.apple.com/artist/gigi/15858066",
    instagram: "https://www.instagram.com/explore/tags/gigishibabaw/",
    facebook: "https://www.facebook.com/search/top?q=Ejigayehu%20Shibabaw%20Gigi",
    twitter: "https://x.com/search?q=Gigi%20Shibabaw"
  }
};

export const ETHIOPIAN_SCALES = [
  {
    id: "tizita",
    name: "Tizita",
    amharic: "ትዝታ",
    mood: "Nostalgia, Longing & Soulful Memory",
    description: "The quintessential Ethiopian modal scale, evoking deep contemplation, historical yearning, and romantic sentiment. It mirrors the emotional resonance of the blues while carrying centuries of highland oral poetry.",
    notes: ["C4", "D4", "E4", "G4", "A4", "C5"],
    frequencies: [261.63, 293.66, 329.63, 392.00, 440.00, 523.25],
    signatureSongs: ["Guramayle", "Mengedegna", "Tizita"]
  },
  {
    id: "bati",
    name: "Bati",
    amharic: "ባቲ",
    mood: "Mystical, Desert Sun & Pastoral Ecstasy",
    description: "Originating in the Wollo region at the crossroads of highland and desert trading routes. Bati features a distinctive warm major third and sharp leading tone that creates mystical, swirling melodic cadences.",
    notes: ["C4", "E4", "F4", "G4", "B4", "C5"],
    frequencies: [261.63, 329.63, 349.23, 392.00, 493.88, 523.25],
    signatureSongs: ["Bale Washginda", "Aba Alem Lemina"]
  },
  {
    id: "ambassel",
    name: "Ambassel",
    amharic: "አምባሰል",
    mood: "Heroic, Mountain Solitude & Epic Poetry",
    description: "Named after the rugged Ambassel fortress mountain in Amhara. Characterized by natural minor inflections and half-step tension, this scale is historically favored by azmaris (bards) for epic ballads and warrior praise.",
    notes: ["C4", "Db4", "F4", "G4", "Ab4", "C5"],
    frequencies: [261.63, 277.18, 349.23, 392.00, 415.30, 523.25],
    signatureSongs: ["Adwa", "Kahn"]
  },
  {
    id: "anchihoye",
    name: "Anchihoye / Kizita",
    amharic: "አንቺሆዬ",
    mood: "Ecstatic Celebrations & Devotional Fire",
    description: "Intense, rhythmically kinetic, and emotionally electrifying. Anchihoye features an augmented fourth that produces visceral tension, powering celebratory Eskista shoulder dances and spiritual fervor.",
    notes: ["C4", "Db4", "F4", "F#4", "A4", "C5"],
    frequencies: [261.63, 277.18, 349.23, 369.99, 440.00, 523.25],
    signatureSongs: ["Gole", "Shemendefer", "Tew Ante Sew"]
  }
];

export const YARED_MODES = [
  { name: "ግዕዝ", english: "Ge'ez", description: "The foundational, solemn chant of prayer and morning liturgy" },
  { name: "ዕዝል", english: "Ezel", description: "The deep, emotional, and sorrowful mode for contemplation and fasting" },
  { name: "አራራይ", english: "Araray", description: "The ecstatic, uplifting, and joyful chant of celebration and triumph" }
];

export const YARED_SYMBOLS = [
  { name: "ይዘት", english: "Yizet", symbol: "―", meaning: "Root Accent", desc: "Foundational pitch grounding", freq: 261.63 },
  { name: "ጭረት", english: "Chiret", symbol: "／", meaning: "Extension", desc: "Upward soaring vocal elongation", freq: 293.66 },
  { name: "ቅናት", english: "Qinat", symbol: "⌒", meaning: "Ascension", desc: "Melismatic pitch rise", freq: 329.63 },
  { name: "ድፋት", english: "Difat", symbol: "◣", meaning: "Cadence Fall", desc: "Downward modal descent", freq: 277.18 },
  { name: "ሒደት", english: "Hidet", symbol: "∿", meaning: "Glide", desc: "Fluid vocal sliding between notes", freq: 349.23 },
  { name: "ደረት", english: "Deret", symbol: "▭", meaning: "Chest Tone", desc: "Deep chest acoustic resonance", freq: 220.00 },
  { name: "ቁርጥ", english: "Qurt", symbol: "’", meaning: "Staccato", desc: "Crisp rhythmic note termination", freq: 392.00 },
  { name: "ርክርክ", english: "Rikrik", symbol: "〰", meaning: "Trill / Vibrato", desc: "Vibrant throat tremolo ornamentation", freq: 440.00 },
  { name: "አንብር", english: "Anbir", symbol: "‥", meaning: "Rest / Resolution", desc: "Sacred silence and resolution", freq: 261.63 },
  { name: "ጽፋት", english: "Tsifat", symbol: "▲", meaning: "Vocal Climax", desc: "Stratospheric octave peak", freq: 523.25 }
];

export const PLAYLIST = [
  {
    id: "track-1",
    title: "Guramayle",
    amharicTitle: "ጉራማይሌ",
    album: "Gigi (Self-Titled)",
    year: "2001",
    scale: "Tizita / Bati",
    duration: "4:48",
    spotifyUri: "https://open.spotify.com/track/1P6X7V8i11uI7vLqXmH8tU",
    appleMusicUrl: "https://music.apple.com/album/gigi/15858066",
    tempo: 96,
    baseFreq: 261.63, // C4
    melodyPattern: [0, 2, 4, 3, 2, 4, 5, 4, 2, 0],
    coverArt: "/gigi-portrait.jpg",
    description: "A cultural tour-de-force fusing Ethiopian polyrhythms with Bill Laswell's deep dub bass and Gigi's dazzling vocal crescendos."
  },
  {
    id: "track-2",
    title: "Adwa",
    amharicTitle: "አድዋ",
    album: "Gigi (Self-Titled)",
    year: "2001",
    scale: "Ambassel",
    duration: "5:12",
    spotifyUri: "https://open.spotify.com/artist/6b17c5b6h5q52wT8rS2YfD",
    appleMusicUrl: "https://music.apple.com/album/gigi/15858066",
    tempo: 84,
    baseFreq: 261.63,
    melodyPattern: [0, 1, 3, 2, 4, 3, 1, 0],
    coverArt: "/gigi-portrait.jpg",
    description: "An epic, panoramic tribute to the historic Battle of Adwa, sung with towering emotional gravity and accompanied by Wayne Shorter's soprano saxophone."
  },
  {
    id: "track-3",
    title: "Kahn",
    amharicTitle: "ካህን",
    album: "Gigi (Self-Titled)",
    year: "2001",
    scale: "Ambassel / Spiritual",
    duration: "5:40",
    spotifyUri: "https://open.spotify.com/artist/6b17c5b6h5q52wT8rS2YfD",
    appleMusicUrl: "https://music.apple.com/album/gigi/15858066",
    tempo: 78,
    baseFreq: 277.18,
    melodyPattern: [0, 2, 3, 4, 2, 1, 0],
    coverArt: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=600&q=80",
    description: "A sacred hymn of spiritual yearning, weaving classical Ethiopian Orthodox vocal motifs with ambient soundscapes and jazz improvisation."
  },
  {
    id: "track-4",
    title: "Bale Washginda",
    amharicTitle: "ባሌ ዋሽጊንዳ",
    album: "Gigi (Self-Titled)",
    year: "2001",
    scale: "Bati",
    duration: "4:32",
    spotifyUri: "https://open.spotify.com/artist/6b17c5b6h5q52wT8rS2YfD",
    appleMusicUrl: "https://music.apple.com/album/gigi/15858066",
    tempo: 108,
    baseFreq: 261.63,
    melodyPattern: [0, 1, 2, 3, 4, 3, 1, 2, 0],
    coverArt: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=600&q=80",
    description: "Pounding traditional Gojjam rhythmic drive combined with blazing funk-jazz horns and electrifying vocal ornamentations."
  },
  {
    id: "track-5",
    title: "Aba Alem Lemina",
    amharicTitle: "አባ ዓለም ለምና",
    album: "Abyssinia Infinite: Zion Roots",
    year: "2003",
    scale: "Tizita",
    duration: "5:28",
    spotifyUri: "https://open.spotify.com/artist/6b17c5b6h5q52wT8rS2YfD",
    appleMusicUrl: "https://music.apple.com/album/zion-roots/38318182",
    tempo: 72,
    baseFreq: 261.63,
    melodyPattern: [0, 4, 3, 2, 1, 0],
    coverArt: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80",
    description: "An intimate acoustic masterpiece accompanied by traditional krar (lyre) and washint (flute), recorded with pure acoustic reverence."
  }
];

export const DISCOGRAPHY = [
  {
    id: "album-gigi-2001",
    title: "Gigi",
    type: "Studio Albums",
    year: "2001",
    label: "Palm Pictures",
    producer: "Bill Laswell",
    cover: "/gigi-portrait.jpg",
    spotifyUrl: "https://open.spotify.com/album/51j1jQxZ8vM2kYm3c3N0m5",
    appleMusicUrl: "https://music.apple.com/album/gigi/15858066",
    credits: [
      "Vocalist & Composer: Gigi (Ejigayehu Shibabaw)",
      "Producer & Bass: Bill Laswell",
      "Saxophone: Wayne Shorter, Pharoah Sanders",
      "Piano & Keyboards: Herbie Hancock, Bernie Worrell",
      "Drums: Hamid Drake, Sly Dunbar, Karsh Kale",
      "Tabla & Percussion: Zakir Hussain, Abegasu Shiota"
    ],
    highlightTracks: ["Guramayle", "Adwa", "Kahn", "Gole", "Bale Washginda", "Mengedegna"],
    description: "A landmark global fusion album that introduced Gigi's 5-octave vocal virtuosity to millions worldwide, uniting Ethiopian vocal traditions with legendary jazz masters."
  },
  {
    id: "album-guramayle-2003",
    title: "Guramayle",
    type: "Studio Albums",
    year: "2003",
    label: "Palm Pictures / Bardo",
    producer: "Bill Laswell & Abegasu Shiota",
    cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    spotifyUrl: "https://open.spotify.com/artist/6b17c5b6h5q52wT8rS2YfD",
    appleMusicUrl: "https://music.apple.com/artist/gigi/15858066",
    credits: [
      "Lead Vocals: Gigi",
      "Arrangements: Abegasu Shiota, Bill Laswell",
      "Electric & Acoustic Guitar: Buckethead, Amina Claudine Myers",
      "Traditional Krar & Masenqo: Ethiopian Master Instrumentalists"
    ],
    highlightTracks: ["Guramayle (Extended)", "Bati", "Abyssinia Dub", "Zelesegna"],
    description: "Deepening the conversation between Ethiopian songcraft and transatlantic soundscapes, celebrated for its poetic intimacy and rich acoustic warmth."
  },
  {
    id: "album-abyssinia-infinite-2003",
    title: "Abyssinia Infinite: Zion Roots",
    type: "Collaborations",
    year: "2003",
    label: "Network Medien",
    producer: "Bill Laswell",
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80",
    spotifyUrl: "https://open.spotify.com/album/42eZt6z1FwN0Q2B5J0z6h7",
    appleMusicUrl: "https://music.apple.com/album/zion-roots/38318182",
    credits: [
      "Vocals & Direction: Gigi",
      "Krar (Lyre): Tigist Shibabaw & Fasil Wuhib",
      "Washint (Bamboo Flute): Moges Habte",
      "Percussion: Karsh Kale, Aiyb Dieng",
      "Acoustic Bass: Bill Laswell"
    ],
    highlightTracks: ["Aba Alem Lemina", "Gedey", "Maye", "Lebwe", "Bati Bati"],
    description: "A stripped-back acoustic masterwork featuring traditional Ethiopian stringed instruments, honoring village roots, pastoral laments, and spiritual gratitude."
  },
  {
    id: "album-mesgana-2010",
    title: "Mesgana Ethiopia",
    type: "Studio Albums",
    year: "2010",
    label: "MOD Technologies",
    producer: "Bill Laswell",
    cover: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80",
    spotifyUrl: "https://open.spotify.com/artist/6b17c5b6h5q52wT8rS2YfD",
    appleMusicUrl: "https://music.apple.com/artist/gigi/15858066",
    credits: [
      "Vocals: Gigi",
      "Bass & Production: Bill Laswell",
      "Guitars: Dominic Kanza",
      "Percussion: Guy Licata, Hamid Drake",
      "Keyboards: Bernie Worrell"
    ],
    highlightTracks: ["Mesgana", "Shemendefer", "Tizita Piano Suite", "Sew Argegn"],
    description: "Mesgana ('Gratitude/Thanksgiving') presents Gigi at her most spiritually majestic, weaving devotional Ethiopian chants with celestial funk and jazz arrangements."
  },
  {
    id: "album-illuminated-audio-2003",
    title: "Illuminated Audio (Dub Ambient)",
    type: "Collaborations",
    year: "2003",
    label: "Palm Pictures",
    producer: "Bill Laswell",
    cover: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80",
    spotifyUrl: "https://open.spotify.com/artist/6b17c5b6h5q52wT8rS2YfD",
    appleMusicUrl: "https://music.apple.com/artist/gigi/15858066",
    credits: [
      "Vocal Stems: Gigi",
      "Dub Re-construction: Bill Laswell",
      "Mixing: Robert Musso at Orange Music"
    ],
    highlightTracks: ["Abyssinia Dub", "Tew Ante Dub", "Kahn Ambient", "Goramayle Space"],
    description: "Bill Laswell deconstructs Gigi's vocals into reverberant, mystical dub-ambient tapestries that became a cult favorite among audiophiles worldwide."
  },
  {
    id: "album-one-world-1997",
    title: "Tsehay (Early Recordings)",
    type: "Singles & Live",
    year: "1997",
    label: "One World / Independent",
    producer: "Solomon Lulu",
    cover: "https://images.unsplash.com/photo-1446057032654-9d8885db76c6?auto=format&fit=crop&w=800&q=80",
    spotifyUrl: "https://open.spotify.com/artist/6b17c5b6h5q52wT8rS2YfD",
    appleMusicUrl: "https://music.apple.com/artist/gigi/15858066",
    credits: [
      "Lead Vocals: Gigi (Ejigayehu Shibabaw)",
      "Addis Ababa & Nairobi Session Ensembles"
    ],
    highlightTracks: ["Tsehay", "Selam", "Yene Wubet"],
    description: "Her groundbreaking debut sessions in East Africa before her international breakthrough, showcasing the raw brilliance and emotional purity of her vocal gift."
  }
];

export const TIKTOK_FEED = [
  {
    id: "tiktok-1",
    author: "@ethio_vibes_global",
    authorHandle: "@ethio_vibes_global",
    verified: true,
    caption: "When Gigi hits this note in Guramayle... pure goosebumps every single time! 🇪🇹✨ Her 5-octave range is unreal #Gigi #EthiopianMusic #Habesha #Guramayle #VocalGod",
    sound: "Gigi (Ejigayehu Shibabaw) - Guramayle (Original)",
    views: "1.4M",
    likes: "312K",
    shares: "42K",
    coverImg: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=500&q=80",
    videoSimulatorDuration: "0:28",
    url: "https://www.tiktok.com/@gigishibabaw_official"
  },
  {
    id: "tiktok-2",
    author: "@habeshajazzguy",
    authorHandle: "@habeshajazzguy",
    verified: false,
    caption: "Showing my Berklee jazz professor Gigi's collaboration with Herbie Hancock & Wayne Shorter! He had no idea Ethiopian scales could do THIS 🎷🔥 #JazzTok #WorldFusion #GigiShibabaw",
    sound: "Gigi ft. Herbie Hancock & Wayne Shorter - Adwa",
    views: "980K",
    likes: "215K",
    shares: "38K",
    coverImg: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=500&q=80",
    videoSimulatorDuration: "0:35",
    url: "https://www.tiktok.com/@gigishibabaw_official"
  },
  {
    id: "tiktok-3",
    author: "@chagni_dancers",
    authorHandle: "@chagni_dancers",
    verified: true,
    caption: "Bale Washginda hits the speakers and NOBODY can stand still! Traditional Gojjam eskista shoulder dance in full effect 🔥🇪🇹 #Eskista #BaleWashginda #GigiLegend #DanceChallenge",
    sound: "Gigi - Bale Washginda (Highland Funk Mix)",
    views: "2.8M",
    likes: "594K",
    shares: "88K",
    coverImg: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=500&q=80",
    videoSimulatorDuration: "0:22",
    url: "https://www.tiktok.com/@gigishibabaw_official"
  },
  {
    id: "tiktok-4",
    author: "@ambient_soundscapes",
    authorHandle: "@ambient_soundscapes",
    verified: false,
    caption: "Bill Laswell's deep dub bass + Gigi's spiritual vocal layers on Kahn = 3 AM meditation perfection 🌌🎧 Put on headphones right now! #DubMusic #SpiritualVocals #IlluminatedAudio",
    sound: "Gigi - Kahn (Illuminated Audio Dub)",
    views: "720K",
    likes: "148K",
    shares: "26K",
    coverImg: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=500&q=80",
    videoSimulatorDuration: "0:42",
    url: "https://www.tiktok.com/@gigishibabaw_official"
  }
];

export const TOUR_DATES = [
  {
    id: "tour-1",
    date: "OCT 24, 2026",
    day: "Saturday • 8:00 PM",
    city: "Addis Ababa, Ethiopia",
    venue: "Millennium Hall Grand Auditorium",
    event: "Mesgana: Homecoming & Ethiopian Cultural Heritage Gala",
    status: "RSVP Open",
    statusType: "rsvp",
    link: "#booking"
  },
  {
    id: "tour-2",
    date: "NOV 18, 2026",
    day: "Wednesday • 7:30 PM",
    city: "New York City, NY, USA",
    venue: "Lincoln Center (David Geffen Hall)",
    event: "Gigi & The Masters of Fusion: An Evening with Bill Laswell & Guests",
    status: "Tickets Available",
    statusType: "tickets",
    link: "#booking"
  },
  {
    id: "tour-3",
    date: "DEC 05, 2026",
    day: "Saturday • 8:00 PM",
    city: "London, United Kingdom",
    venue: "Barbican Centre Main Hall",
    event: "Echoes of Abyssinia: London Contemporary Orchestra with Gigi",
    status: "Selling Fast",
    statusType: "tickets",
    link: "#booking"
  },
  {
    id: "tour-4",
    date: "JAN 15, 2027",
    day: "Friday • 8:00 PM",
    city: "Washington, D.C., USA",
    venue: "The Kennedy Center Concert Hall",
    event: "Highland Melodies & Contemporary Jazz Legends",
    status: "RSVP Open",
    statusType: "rsvp",
    link: "#booking"
  },
  {
    id: "tour-5",
    date: "MAR 20, 2027",
    day: "Saturday • 8:30 PM",
    city: "Paris, France",
    venue: "Philharmonie de Paris",
    event: "Voix du Monde: Sacred Scales & Transatlantic Dub",
    status: "Join Tour Alerts",
    statusType: "alert",
    link: "#booking"
  }
];

export const PRESS_QUOTES = [
  {
    id: "press-1",
    quote: "Ejigayehu Shibabaw, known simply as Gigi, possesses one of the most transcendent voices in modern music—soaring from earthy highland whispers to stratospheric five-octave climaxes with breathtaking spiritual power.",
    outlet: "The New York Times",
    critic: "Jon Pareles",
    tag: "Critic's Choice"
  },
  {
    id: "press-2",
    quote: "A stunning crossroads where ancient Ethiopian modal singing meets American avant-garde jazz and deep dub basslines. Gigi redefines world fusion with unmatched soul, authority, and emotional resonance.",
    outlet: "Rolling Stone",
    critic: "David Fricke",
    tag: "Essential Listening"
  },
  {
    id: "press-3",
    quote: "Gigi is an artist of monumental stature. She takes the pentatonic soul of Ethiopia and elevates it to global reverence, joined by titans Wayne Shorter, Herbie Hancock, and Pharoah Sanders.",
    outlet: "The Guardian",
    critic: "Robin Denselow",
    tag: "Five Stars ★★★★★"
  },
  {
    id: "press-4",
    quote: "Listening to Gigi is like standing at the majestic summit of the Simien Mountains while a jazz ensemble plays in the clouds below. A global cultural treasure whose voice lives forever in memory.",
    outlet: "NPR Music",
    critic: "Banning Eyre (Afropop)",
    tag: "Feature Review"
  }
];

export const YOUTUBE_VIDEOS = [
  {
    id: "vid-1",
    title: "Gigi - Guramayle (Official Video • Palm Pictures)",
    embedId: "LQX8xCTJpnQ",
    youtubeUrl: "https://www.youtube.com/watch?v=LQX8xCTJpnQ",
    duration: "4:48",
    description: "The seminal anthem that defined Ethiopian contemporary fusion. Featuring traditional Gojjam rhythmic drive, Bill Laswell's dub bass, and dazzling vocal melismas."
  },
  {
    id: "vid-2",
    title: "Gigi - Adwa (ft. Wayne Shorter & Herbie Hancock)",
    embedId: "fBTFdgs-hAk",
    youtubeUrl: "https://www.youtube.com/watch?v=fBTFdgs-hAk",
    duration: "5:12",
    description: "Wayne Shorter's soprano saxophone soars alongside Gigi's powerhouse Ambassel vocal delivery in tribute to the historic Battle of Adwa."
  },
  {
    id: "vid-3",
    title: "Gigi - Bale Washintu / Bale Washginda (Official Video)",
    embedId: "FpbF21wtDlw",
    youtubeUrl: "https://www.youtube.com/watch?v=FpbF21wtDlw",
    duration: "4:32",
    description: "Pounding traditional Gojjam rhythmic drive combined with blazing funk-jazz horns, washint flute, and electrifying vocal ornamentations."
  },
  {
    id: "vid-4",
    title: "Gigi - Gud Fella (Official Palm Pictures Video)",
    embedId: "zvoZbLxkT4I",
    youtubeUrl: "https://www.youtube.com/watch?v=zvoZbLxkT4I",
    duration: "4:15",
    description: "Celebratory vocal fireworks blending Ethiopian folk scales with dub bass and world jazz."
  }
];
