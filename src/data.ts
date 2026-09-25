import { ProgramItem, ColorSwatch } from './types';

// Saturday, 12th December 2026 (EAT)
export const WEDDING_DATE = new Date('2026-12-12T10:00:00+03:00');

export const WEDDING_DETAILS = {
  couple: {
    bride: 'Sylvia',
    groom: 'Dr. Peter',
    brideFull: 'Sylvia Waithira Muchiri',
    groomFull: 'Dr. Peter Kamau Mwangi',
    initials: 'S & P',
  },
  families: {
    leadIn: "With grateful hearts and our families' blessing",
    groomFamily: 'The family of Mr and Mrs Francis Mwangi Kamau',
    brideFamily: 'The family of Mr. Charles Muchiri Njau (Late) & Mrs. Lucy Wanjiku Muchiri',
    fullInvitation: 'Joyfully invite you to witness and celebrate the Holy Matrimony uniting their children',
  },
  tagline: 'Two lives, two hearts, joined together in faith, friendship, and united forever in love.',
  ceremony: {
    time: '10:00 AM – 12:00 Noon',
    venue: 'Our Lady of the Holy Rosary Kamwangi Catholic Church',
    shortVenue: 'Kamwangi Catholic Church',
    address: 'Kamwangi, Gatundu North, Kiambu County, Kenya',
    coordinates: { lat: -0.9634, lng: 36.9387 },
    mapEmbedUrl: 'https://maps.google.com/maps?q=Our+Lady+of+the+Holy+Rosary+Kamwangi+Catholic+Church&t=&z=14&ie=UTF8&iwloc=&output=embed',
  },
  reception: {
    time: '1:00 PM – 5:00 PM',
    venue: 'Tropical Gardens Ruiru-Kimbo',
    shortVenue: 'Tropical Gardens, Ruiru-Kimbo',
    address: 'Ruiru-Kimbo (Off Thika Superhighway), Kiambu County, Kenya',
    coordinates: { lat: -1.1442, lng: 36.9588 },
    mapEmbedUrl: 'https://maps.google.com/maps?q=Tropical+Gardens+Ruiru+Kimbo&t=&z=14&ie=UTF8&iwloc=&output=embed',
  },
  transitInfo: {
    duration: '40–45 min drive',
    description: 'The journey from Kamwangi Catholic Church to Tropical Gardens Ruiru-Kimbo is approximately 40 to 45 minutes along the scenic Kiambu / Thika Road corridor.',
  },
  rsvpDeadline: '30th November 2026',
  rsvpNote: 'Kindly confirm your attendance with your full names by 30th November so we can reserve your seat and prepare to celebrate with you.',
  contacts: [
    { name: 'Sylvia Waithira (Bride)', phone: '+254 720 000 000' },
    { name: 'Dr. Peter Kamau (Groom)', phone: '+254 711 000 000' },
  ],
  dressCode: {
    title: 'Dress Code',
    guideline: 'Come looking colorful, vibrant, and elegant ✨',
    description: 'We invite our guests to celebrate in style — come dressed in your finest colorful, vibrant, and elegant attire for our special day.',
  },
  gifts: {
    title: 'Wedding Gifts & Blessings',
    message: 'Your presence and prayers as we begin our marriage are more than we could ask for. Should you wish to bless us further, we gratefully welcome a gift in the form of an envelope or M-Pesa toward our new life together.',
    envelope: {
      title: 'Gift in an Envelope',
      instruction: 'A decorated gift envelope drop box will be gracefully stationed at the reception entrance at Tropical Gardens Ruiru-Kimbo for your cards, envelopes, and warm blessings.',
    },
    mpesa: {
      title: 'M-Pesa Contribution',
      instruction: 'For digital blessings, you are warmly invited to send via M-Pesa:',
      recipientName: 'Dr. Peter Kamau / Sylvia Waithira',
      number: '0722 000 000',
      tillNumber: '5849201',
    },
  },
  themeColors: {
    sapphireBlue: {
      name: 'Sapphire Blue',
      hex: '#1E3A8A',
      textColor: '#FFFFFF',
      description: 'A deep, regal blue signifying loyalty, devotion, and steadfast love.',
    },
    emeraldGreen: {
      name: 'Emerald Green',
      hex: '#047857',
      textColor: '#FFFFFF',
      description: 'A rich jewel green representing vitality, prosperity, and God’s abundant blessings.',
    },
    oceanTeal: {
      name: 'Ocean Teal',
      hex: '#0D9488',
      textColor: '#FFFFFF',
      description: 'A vibrant blend of blue and green expressing joy, freshness, and harmony.',
    },
    forestSage: {
      name: 'Forest Sage',
      hex: '#3D5A45',
      textColor: '#FFFFFF',
      description: 'A botanical earthy green celebrating the natural beauty of Kenya’s lush garden landscapes.',
    },
    skyBlue: {
      name: 'Cerulean Sky Blue',
      hex: '#38BDF8',
      textColor: '#082F49',
      description: 'A luminous, celebratory azure reflecting hope, peace, and boundless skies.',
    },
    champagneGold: {
      name: 'Champagne Gold',
      hex: '#D4AF37',
      textColor: '#594411',
      description: 'A radiant golden accent honoring the sacred sacrament and joyous celebration.',
    },
  },
  bibleVerses: [
    {
      text: 'Therefore what God has joined together, let no one separate.',
      reference: 'Mark 10:9 (NIV)',
    },
    {
      text: 'Above all, love each other deeply, because love covers over a multitude of sins.',
      reference: '1 Peter 4:8 (NIV)',
    },
    {
      text: 'Two are better than one, because they have a good return for their labor.',
      reference: 'Ecclesiastes 4:9 (NIV)',
    },
  ],
};

export const PROGRAM_ITEMS: ProgramItem[] = [
  {
    time: '10:00 AM – 12:00 PM',
    duration: '2 Hours',
    title: 'Holy Matrimony & Nuptial Mass',
    description: 'Sacrament of Holy Matrimony celebrated at Our Lady of the Holy Rosary Kamwangi Catholic Church.',
    bullets: [
      'Processional Hymn & Welcoming Rite',
      'Liturgy of the Word & Homily',
      'Exchange of Sacred Vows & Rings',
      'Nuptial Blessing & Eucharistic Celebration',
      'Signing of Marriage Certificate & Recessional',
    ],
    isChurch: true,
  },
  {
    time: '12:00 PM – 12:45 PM',
    duration: '40–45 Mins Drive',
    title: 'Drive from Kamwangi to Tropical Gardens',
    description: 'Guests and bridal convoy journey from Kamwangi Catholic Church to Tropical Gardens Ruiru-Kimbo (~40-45 minutes drive).',
    bullets: [
      'Scenic drive via Kiambu/Thika Road corridor',
      'Bridal party photographic stopover',
      'Traffic marshals and parking guidance on arrival',
    ],
    isChurch: false,
  },
  {
    time: '12:45 PM – 1:15 PM',
    duration: '30 Mins',
    title: 'Arrival & Welcome Refreshments',
    description: 'Guests arrive at Tropical Gardens Ruiru-Kimbo, receive warm ushering to their tables, and enjoy welcome cocktails.',
    bullets: [
      'Guest ushering and registration',
      'Welcome tropical drinks and snacks',
      'Gift envelope drop-off at entrance',
    ],
    isChurch: false,
  },
  {
    time: '1:00 PM – 2:00 PM',
    duration: '1 Hour',
    title: 'Opening Prayer & Wedding Luncheon Feast',
    description: 'Blessing of the celebration followed by a lavish culinary luncheon in the lush tropical garden.',
    bullets: [
      'Opening Thanksgiving Prayer',
      'Sumptuous Luncheon Buffet & Desserts',
      'Relaxing Acoustic Background Melodies',
    ],
    isChurch: false,
  },
  {
    time: '2:00 PM – 2:30 PM',
    duration: '30 Mins',
    title: 'Garden Portrait Session & Fellowship',
    description: 'Bridal party, parents, and family photo sessions across the manicured lawns of Tropical Gardens.',
    bullets: [
      'Extended family portraits',
      'Friends and colleagues photo moments',
      'Guest mingling in the garden',
    ],
    isChurch: false,
  },
  {
    time: '2:30 PM – 3:30 PM',
    duration: '1 Hour',
    title: 'Grand Triumphant Entrance & Family Speeches',
    description: 'High-energy celebratory entrance with traditional songs and dancing, followed by parental blessings and toasts.',
    bullets: [
      'Joyful Grand Entrance of Sylvia & Dr. Peter',
      'Speeches by Mr & Mrs Francis Mwangi Kamau (Groom’s Family)',
      'Speeches by Mrs Lucy Wanjiku Muchiri & Family (Bride’s Family)',
      'Tributes from Best Couple & Special Friends',
    ],
    isChurch: false,
  },
  {
    time: '3:30 PM – 4:15 PM',
    duration: '45 Mins',
    title: 'Cake Cutting Ceremony & Champagne Toast',
    description: 'Cutting of the masterfully crafted wedding cake, feeding of the couple, and presentation to parents.',
    bullets: [
      'Ceremonial Cake Cutting',
      'Serving and honouring the parents',
      'Grand Champagne Toast to the Newlyweds',
    ],
    isChurch: false,
  },
  {
    time: '4:15 PM – 4:45 PM',
    duration: '30 Mins',
    title: 'Couple’s Vote of Thanks & Bouquet Toss',
    description: 'Heartfelt appreciation from Sylvia & Dr. Peter Kamau, followed by the exhilarating bridal bouquet toss.',
    bullets: [
      'Heartfelt speech by Dr. Peter & Sylvia',
      'Presentation of tokens of appreciation',
      'Exciting Bouquet & Garter Toss',
    ],
    isChurch: false,
  },
  {
    time: '4:45 PM – 5:00 PM',
    duration: '15 Mins',
    title: 'Pastoral Benediction & Departure',
    description: 'Closing prayer of blessing over the newly established home, followed by evening departure.',
    bullets: [
      'Pastoral Blessing & Benediction',
      'Final musical celebration and send-off',
    ],
    isChurch: false,
  },
];

export const COLOR_SWATCHES: ColorSwatch[] = [
  {
    name: 'Sapphire Royal Blue',
    hex: '#1E3A8A',
    textColor: '#FFFFFF',
    description: 'A deep, vibrant royal blue representing devotion, dignity, and majestic elegance.',
  },
  {
    name: 'Emerald Jewel Green',
    hex: '#047857',
    textColor: '#FFFFFF',
    description: 'A rich botanical green symbolizing life, abundant growth, and divine favor.',
  },
  {
    name: 'Ocean Teal',
    hex: '#0D9488',
    textColor: '#FFFFFF',
    description: 'A luminous bridge between blue and green reflecting joy, warmth, and vibrancy.',
  },
  {
    name: 'Lush Forest Green',
    hex: '#246038',
    textColor: '#FFFFFF',
    description: 'A deep nature-inspired green capturing the scenic paradise of Tropical Gardens.',
  },
  {
    name: 'Cerulean Sky Blue',
    hex: '#2563EB',
    textColor: '#FFFFFF',
    description: 'A bright, radiant blue adding colorful, energetic celebration to the palette.',
  },
  {
    name: 'Champagne Gold Accent',
    hex: '#D4AF37',
    textColor: '#422E06',
    description: 'A warm golden shimmer that complements and elevates the blues and greens.',
  },
];
