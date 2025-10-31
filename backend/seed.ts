import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Experience from './models/Experience';
import PromoCode from './models/PromoCode';

dotenv.config();

// Helper: get future date
const getFutureDate = (daysFromNow: number) => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date;
};

// Helper: expiry (30 days from now)
const getExpiryDate = (daysFromNow: number) => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date;
};

const experiences = [
  {
    title: 'Kayaking',
    description:
      'Curated small-group experience. Certified guide. Safety first with gear included.',
    location: 'Udupi, Karnataka',
    duration: '2 hours',
    category: 'Water Sports',
    image:
      'https://images.unsplash.com/photo-1562388831-a7a060b9c1fe?auto=format&fit=crop&q=80&w=1600',
    rating: 4.7,
    reviewCount: 230,
    highlights: [
      'Kayak through mangroves',
      'Certified instructor',
      'Life jackets & helmets provided',
      'Small group activity'
    ],
    included: ['Kayak + Paddle', 'Safety Gear', 'Instructor Guidance'],
    about:
      'Paddle through Udupi’s peaceful backwaters surrounded by lush mangroves and tranquil beauty.',
    slots: [
      {
        date: getFutureDate(1),
        slotTime: '07:00 AM',
        availableSpots: 6,
        totalSpots: 8,
        price: 999
      },
      {
        date: getFutureDate(1),
        slotTime: '11:00 AM',
        availableSpots: 4,
        totalSpots: 8,
        price: 999
      },
      {
        date: getFutureDate(2),
        slotTime: '07:00 AM',
        availableSpots: 8,
        totalSpots: 8,
        price: 999
      },
      {
        date: getFutureDate(2),
        slotTime: '11:00 AM',
        availableSpots: 2,
        totalSpots: 8,
        price: 999
      }
    ]
  },
  {
    title: 'Nandi Hills Sunrise',
    description:
      'Curated small-group experience. Certified guide. Safety first with gear included.',
    location: 'Bangalore',
    duration: '3 hours',
    category: 'Adventure',
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=1600',
    rating: 4.8,
    reviewCount: 156,
    highlights: [
      'Watch sunrise from 1,478m altitude',
      'Certified mountain guide',
      'Small group tour'
    ],
    included: ['Pickup + Drop', 'Breakfast', 'Safety Gear'],
    about:
      'Catch the breathtaking sunrise from Nandi Hills — a serene experience for nature lovers.',
    slots: [
      {
        date: getFutureDate(1),
        slotTime: '07:00 AM',
        availableSpots: 4,
        totalSpots: 8,
        price: 899
      },
      {
        date: getFutureDate(1),
        slotTime: '09:00 AM',
        availableSpots: 2,
        totalSpots: 8,
        price: 899
      },
      {
        date: getFutureDate(1),
        slotTime: '11:00 AM',
        availableSpots: 5,
        totalSpots: 8,
        price: 899
      },
      {
        date: getFutureDate(1),
        slotTime: '01:00 PM',
        availableSpots: 0,
        totalSpots: 8,
        price: 899
      },
      {
        date: getFutureDate(2),
        slotTime: '07:00 AM',
        availableSpots: 8,
        totalSpots: 8,
        price: 899
      },
      {
        date: getFutureDate(2),
        slotTime: '09:00 AM',
        availableSpots: 6,
        totalSpots: 8,
        price: 899
      },
      {
        date: getFutureDate(2),
        slotTime: '11:00 AM',
        availableSpots: 3,
        totalSpots: 8,
        price: 899
      }
    ]
  },
  {
    title: 'Coffee Trail',
    description:
      'Curated small-group experience. Certified guide. Safety first with gear included.',
    location: 'Coorg',
    duration: '3 hours',
    category: 'Nature',
    image:
      'https://plus.unsplash.com/premium_photo-1677347335105-1bd16607a25e?auto=format&fit=crop&q=80&w=1600',
    rating: 4.9,
    reviewCount: 184,
    highlights: [
      'Walk through coffee plantations',
      'Learn brewing process',
      'Tasting session included'
    ],
    included: ['Local guide', 'Snacks', 'Coffee tasting'],
    about:
      'A peaceful trail through lush Coorg plantations, learning about the art of coffee making.',
    slots: [
      {
        date: getFutureDate(1),
        slotTime: '07:00 AM',
        availableSpots: 5,
        totalSpots: 8,
        price: 1299
      },
      {
        date: getFutureDate(1),
        slotTime: '09:00 AM',
        availableSpots: 2,
        totalSpots: 8,
        price: 1299
      },
      {
        date: getFutureDate(1),
        slotTime: '11:00 AM',
        availableSpots: 0,
        totalSpots: 8,
        price: 1299
      },
      {
        date: getFutureDate(2),
        slotTime: '07:00 AM',
        availableSpots: 8,
        totalSpots: 8,
        price: 1299
      },
      {
        date: getFutureDate(2),
        slotTime: '09:00 AM',
        availableSpots: 4,
        totalSpots: 8,
        price: 1299
      },
      {
        date: getFutureDate(3),
        slotTime: '07:00 AM',
        availableSpots: 6,
        totalSpots: 8,
        price: 1299
      }
    ]
  },
  {
    title: 'Boat Cruise',
    description:
      'Curated small-group experience. Certified guide. Safety first with gear included.',
    location: 'Sundarban',
    duration: '4 hours',
    category: 'Leisure',
    image:
      'https://images.unsplash.com/photo-1638123657021-f9aca72f8caf?auto=format&fit=crop&q=80&w=1600',
    rating: 4.6,
    reviewCount: 120,
    highlights: [
      'Cruise on scenic rivers',
      'Snacks & refreshments',
      'Safety assured'
    ],
    included: ['Life jackets', 'Refreshments', 'Guide commentary'],
    about:
      'A relaxing river cruise experience in the Sundarbans, ideal for family and groups.',
    slots: [
      {
        date: getFutureDate(1),
        slotTime: '07:00 AM',
        availableSpots: 6,
        totalSpots: 8,
        price: 999
      },
      {
        date: getFutureDate(1),
        slotTime: '09:00 AM',
        availableSpots: 4,
        totalSpots: 8,
        price: 999
      },
      {
        date: getFutureDate(1),
        slotTime: '01:00 PM',
        availableSpots: 0,
        totalSpots: 8,
        price: 999
      },
      {
        date: getFutureDate(2),
        slotTime: '07:00 AM',
        availableSpots: 8,
        totalSpots: 8,
        price: 999
      },
      {
        date: getFutureDate(2),
        slotTime: '01:00 PM',
        availableSpots: 2,
        totalSpots: 8,
        price: 999
      }
    ]
  },
  {
    title: 'Bunjee Jumping',
    description:
      'Curated small-group experience. Certified guide. Safety first with gear included.',
    location: 'Manali',
    duration: '1 hour',
    category: 'Adventure',
    image:
      'https://plus.unsplash.com/premium_photo-1663013514560-a30fbd137865?auto=format&fit=crop&q=80&w=1600',
    rating: 4.8,
    reviewCount: 211,
    highlights: [
      'Jump from 100ft platform',
      'Professional safety team',
      'Thrill guaranteed'
    ],
    included: ['Safety harness', 'Certified instructor', 'Jump video'],
    about: 'An adrenaline-filled experience in the mountains of Manali.',
    slots: [
      {
        date: getFutureDate(1),
        slotTime: '09:00 AM',
        availableSpots: 3,
        totalSpots: 8,
        price: 999
      },
      {
        date: getFutureDate(1),
        slotTime: '11:00 AM',
        availableSpots: 2,
        totalSpots: 8,
        price: 999
      },
      {
        date: getFutureDate(1),
        slotTime: '01:00 PM',
        availableSpots: 0,
        totalSpots: 8,
        price: 999
      },
      {
        date: getFutureDate(2),
        slotTime: '09:00 AM',
        availableSpots: 8,
        totalSpots: 8,
        price: 999
      },
      {
        date: getFutureDate(2),
        slotTime: '11:00 AM',
        availableSpots: 5,
        totalSpots: 8,
        price: 999
      },
      {
        date: getFutureDate(3),
        slotTime: '09:00 AM',
        availableSpots: 4,
        totalSpots: 8,
        price: 999
      }
    ]
  }
];

const promoCodes = [
  {
    code: 'SAVE10',
    discountType: 'percentage',
    discountValue: 10,
    active: true,
    expiryDate: getExpiryDate(30),
    minPurchaseAmount: 500,
    maxDiscount: 500,
    usageLimit: 100,
    description: 'Get 10% off on all bookings (max ₹500)'
  },
  {
    code: 'FLAT100',
    discountType: 'flat',
    discountValue: 100,
    active: true,
    expiryDate: getExpiryDate(30),
    minPurchaseAmount: 1000,
    usageLimit: 200,
    description: 'Flat ₹100 off on bookings above ₹1000'
  }
];

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) throw new Error('MONGODB_URI not defined');

    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    await Experience.deleteMany({});
    await PromoCode.deleteMany({});
    console.log('🗑️  Cleared old data');

    const insertedExperiences = await Experience.insertMany(experiences);
    const insertedPromoCodes = await PromoCode.insertMany(promoCodes);

    console.log(`✅ Seeded ${insertedExperiences.length} experiences`);
    console.log(`🎟️  Seeded ${insertedPromoCodes.length} promo codes`);

    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding DB:', err);
    await mongoose.connection.close();
    process.exit(1);
  }
};

seedDatabase();
