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
    route: 'Scenic drive via Gatundu - Kiganjo road',
    description: 'From Kamwangi to Tropical Gardens, guests will use a: Scenic drive via Gatundu - Kiganjo road.',
    directionsNote: 'A smooth, picturesque journey connecting Kamwangi Catholic Church through Gatundu and Kiganjo road directly to Tropical Gardens Ruiru-Kimbo.',
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
    wishlistIntro: "For friends and family who have asked about gifts, we've put together a small wishlist of things we'd love as we start our home together.",
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
    wishlist: [
      {
        id: 1,
        name: 'Philips 5000 Series HR3033/00 Blender',
        category: 'Kitchen Appliances',
        brand: 'Philips',
        notes: 'High-speed ProBlend Plus technology blender'
      },
      {
        id: 2,
        name: 'Philips 3000 Series 6.2 L Air Fryer',
        category: 'Kitchen Appliances',
        brand: 'Philips',
        notes: 'Preferably model NA332/09'
      },
      {
        id: 3,
        name: "De'Longhi Dedica EC685 Coffee Maker",
        category: 'Kitchen Appliances',
        brand: "De'Longhi",
        notes: 'Slim espresso machine for morning brew'
      },
      {
        id: 4,
        name: 'Von Electric Pressure Cooker',
        category: 'Kitchen Appliances',
        brand: 'Von',
        notes: 'With stainless steel bowl (or any with stainless steel bowl)'
      },
      {
        id: 5,
        name: 'LG MS2595CIS 25 L NeoChef Solo Microwave',
        category: 'Kitchen Appliances',
        brand: 'LG',
        notes: 'Smart Inverter solo microwave'
      },
      {
        id: 6,
        name: 'Kärcher WD 3 Wet & Dry Vacuum Cleaner',
        category: 'Home & Cleaning',
        brand: 'Kärcher',
        notes: 'Multi-purpose vacuum cleaner'
      },
      {
        id: 7,
        name: 'Sony HT-S20R 5.1-channel Home Cinema Sound System',
        category: 'Living & Entertainment',
        brand: 'Sony',
        notes: 'Dolby Digital 5.1ch surround sound system'
      },
      {
        id: 8,
        name: 'LG 55" 4K UHD Smart TV',
        category: 'Living & Entertainment',
        brand: 'LG',
        notes: '4K Ultra HD Smart Television'
      },
      {
        id: 9,
        name: 'LG Front Load Washing Machine, 10-15 kg',
        category: 'Laundry & Home Care',
        brand: 'LG',
        notes: 'AI DD, Steam, built-in heater, 1400 rpm'
      },
      {
        id: 10,
        name: 'LG Double-Door No-Frost Refrigerator',
        category: 'Kitchen & Cooling',
        brand: 'LG',
        notes: 'No-Frost double door refrigerator'
      },
      {
        id: 11,
        name: 'Philips / Tefal Steam Iron + Ironing Board',
        category: 'Laundry & Home Care',
        brand: 'Philips / Tefal',
        notes: 'Steam iron with sturdy folding ironing board'
      },
      {
        id: 12,
        name: 'Sony 5.1 Channel Sound System',
        category: 'Living & Entertainment',
        brand: 'Sony',
        notes: '5.1 Channel High-Fidelity Audio System'
      }
    ]
  },
  themeColors: {
    primary: {
      name: 'Navy Blue',
      hex: '#0F2444',
      textColor: '#FFFFFF',
      description: 'A deep, majestic navy blue embodying devotion, honor, loyalty, and eternal love.',
    },
    secondary: {
      name: 'Crisp White',
      hex: '#FFFFFF',
      textColor: '#0F2444',
      description: 'Pure, timeless white representing grace, sacred vows, and a brilliant new beginning.',
    },
    accent: {
      name: 'Champagne Gold',
      hex: '#D4AF37',
      textColor: '#594411',
      description: 'Radiant golden foil accents celebrating the holy sacrament of matrimony.',
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
      'Speeches and blessings by Groom’s Parents',
      'Speeches and blessings by Bride’s Parents & Family',
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
