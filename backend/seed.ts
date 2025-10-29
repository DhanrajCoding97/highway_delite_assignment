import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Experience from './models/Experience';
import PromoCode from './models/PromoCode';

dotenv.config();

// Helper function to get future dates
const getFutureDate = (daysFromNow: number) => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date;
};

// Helper to get future date for expiry (30 days from now)
const getExpiryDate = (daysFromNow: number) => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date;
};

const experiences = [
  {
    title: 'Nandi Hills Sunrise',
    description:
      'Curated small-group experience. Certified guide. Safety first with gear included.',
    location: 'Bangalore',
    duration: '3 hours',
    category: 'Adventure',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    rating: 4.8,
    reviewCount: 156,
    highlights: [
      'Watch mesmerizing sunrise from 1,478m altitude',
      'Small group experience (max 8 people)',
      'Certified mountain guide',
      'Safety equipment included'
    ],
    included: [
      'Hotel pickup and drop',
      'Breakfast at hilltop',
      'Entry tickets',
      'Professional guide',
      'Safety gear'
    ],
    about:
      "Experience the breathtaking sunrise from Nandi Hills, one of Bangalore's most scenic spots. Perfect for nature lovers and photography enthusiasts.",
    slots: [
      {
        date: getFutureDate(1),
        slotTime: '04:00 AM',
        availableSpots: 8,
        totalSpots: 8,
        price: 899
      },
      {
        date: getFutureDate(2),
        slotTime: '07:00 AM',
        availableSpots: 5,
        totalSpots: 8,
        price: 899
      },
      {
        date: getFutureDate(3),
        slotTime: '10:00 AM',
        availableSpots: 8,
        totalSpots: 8,
        price: 899
      },
      {
        date: getFutureDate(4),
        slotTime: '01:00 PM',
        availableSpots: 0,
        totalSpots: 8,
        price: 899
      },
      {
        date: getFutureDate(5),
        slotTime: '04:00 PM',
        availableSpots: 3,
        totalSpots: 8,
        price: 899
      }
    ]
  },
  {
    title: 'Kayaking',
    description:
      'Curated small-group experience. Certified guide. Safety first with gear included. Helmet and Life Jackets along with an expert will accompany in kayaking.',
    location: 'Goa',
    duration: '2 hours',
    category: 'Water Sports',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
    rating: 4.6,
    reviewCount: 203,
    highlights: [
      'Paddle through scenic routes',
      'Certified guide accompaniment',
      'All safety equipment provided',
      'Small group experience'
    ],
    included: [
      'Kayak and paddle',
      'Life jacket and helmet',
      'Professional instructor',
      'Safety briefing',
      'Water bottles'
    ],
    about:
      'Paddle Indian waters, explore hidden paths, and safety briefing. Minimum age 12.',
    slots: [
      {
        date: getFutureDate(1),
        slotTime: '07:00 AM - 09:00 AM',
        availableSpots: 6,
        totalSpots: 10,
        price: 999
      },
      {
        date: getFutureDate(1),
        slotTime: '11:00 AM - 01:00 PM',
        availableSpots: 4,
        totalSpots: 10,
        price: 999
      },
      {
        date: getFutureDate(1),
        slotTime: '03:00 PM - 05:00 PM',
        availableSpots: 0,
        totalSpots: 10,
        price: 999
      },
      {
        date: getFutureDate(2),
        slotTime: '07:00 AM - 09:00 AM',
        availableSpots: 10,
        totalSpots: 10,
        price: 999
      },
      {
        date: getFutureDate(2),
        slotTime: '11:00 AM - 01:00 PM',
        availableSpots: 8,
        totalSpots: 10,
        price: 999
      }
    ]
  },
  {
    title: 'Scuba Diving in Andaman',
    description:
      'Dive into crystal clear waters. PADI certified instructors. Complete equipment included.',
    location: 'Port Blair',
    duration: '4 hours',
    category: 'Water Sports',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
    rating: 4.9,
    reviewCount: 289,
    highlights: [
      'Explore vibrant coral reefs',
      'PADI certified instructors',
      'Underwater photography included',
      'Beginner friendly'
    ],
    included: [
      'Complete diving gear',
      'Underwater camera shots',
      'Training session',
      'Refreshments',
      'Certificate of completion'
    ],
    about:
      'Discover the underwater paradise of Andaman. Suitable for beginners with proper training provided.',
    slots: [
      {
        date: getFutureDate(1),
        slotTime: '08:00 AM - 12:00 PM',
        availableSpots: 4,
        totalSpots: 6,
        price: 3499
      },
      {
        date: getFutureDate(2),
        slotTime: '08:00 AM - 12:00 PM',
        availableSpots: 2,
        totalSpots: 6,
        price: 3499
      },
      {
        date: getFutureDate(3),
        slotTime: '08:00 AM - 12:00 PM',
        availableSpots: 6,
        totalSpots: 6,
        price: 3499
      }
    ]
  },
  {
    title: 'Paragliding in Bir Billing',
    description:
      'Fly like a bird over stunning Himalayan valleys. Tandem flight with experienced pilot.',
    location: 'Bir, Himachal Pradesh',
    duration: '30 minutes flight',
    category: 'Adventure',
    image: 'https://images.unsplash.com/photo-1534368420009-621bfab424a8?w=800',
    rating: 4.7,
    reviewCount: 178,
    highlights: [
      'Tandem flight with certified pilot',
      'Breathtaking valley views',
      'HD video recording included',
      "World's second-best paragliding site"
    ],
    included: [
      'Tandem paragliding flight',
      'Safety gear',
      'HD video of your flight',
      'Photos',
      'Insurance'
    ],
    about:
      "Experience the thrill of paragliding at one of the world's best paragliding destinations.",
    slots: [
      {
        date: getFutureDate(1),
        slotTime: '09:00 AM - 10:00 AM',
        availableSpots: 3,
        totalSpots: 5,
        price: 2500
      },
      {
        date: getFutureDate(1),
        slotTime: '11:00 AM - 12:00 PM',
        availableSpots: 5,
        totalSpots: 5,
        price: 2500
      },
      {
        date: getFutureDate(2),
        slotTime: '09:00 AM - 10:00 AM',
        availableSpots: 1,
        totalSpots: 5,
        price: 2500
      }
    ]
  },
  {
    title: 'Heritage Walk in Old Delhi',
    description:
      'Walk through history. Expert local guides. Taste authentic street food.',
    location: 'Delhi',
    duration: '3.5 hours',
    category: 'Cultural',
    image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800',
    rating: 4.5,
    reviewCount: 312,
    highlights: [
      'Visit Chandni Chowk and Jama Masjid',
      'Street food tasting included',
      'Stories from Mughal era',
      'Small group (max 12 people)'
    ],
    included: [
      'Expert local guide',
      'Food tasting (5 items)',
      'Entry to monuments',
      'Bottled water',
      'Historical stories and anecdotes'
    ],
    about:
      'Immerse yourself in the rich history of Old Delhi with our heritage walk covering iconic monuments and delicious street food.',
    slots: [
      {
        date: getFutureDate(1),
        slotTime: '08:00 AM - 11:30 AM',
        availableSpots: 8,
        totalSpots: 12,
        price: 699
      },
      {
        date: getFutureDate(1),
        slotTime: '04:00 PM - 07:30 PM',
        availableSpots: 10,
        totalSpots: 12,
        price: 699
      },
      {
        date: getFutureDate(2),
        slotTime: '08:00 AM - 11:30 AM',
        availableSpots: 6,
        totalSpots: 12,
        price: 699
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
  },
  {
    code: 'WELCOME20',
    discountType: 'percentage',
    discountValue: 20,
    active: true,
    expiryDate: getExpiryDate(30),
    minPurchaseAmount: 1500,
    maxDiscount: 1000,
    usageLimit: 50,
    description: 'Welcome offer: 20% off on bookings above ₹1500 (max ₹1000)'
  },
  {
    code: 'FLAT500',
    discountType: 'flat',
    discountValue: 500,
    active: true,
    expiryDate: getExpiryDate(15),
    minPurchaseAmount: 3000,
    usageLimit: 30,
    description: 'Mega deal: Flat ₹500 off on bookings above ₹3000'
  }
];

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    await Experience.deleteMany({});
    await PromoCode.deleteMany({});
    console.log('🗑️  Cleared existing data');

    const insertedExperiences = await Experience.insertMany(experiences);
    const insertedPromoCodes = await PromoCode.insertMany(promoCodes);

    console.log('\n✅ Database seeded successfully!');
    console.log(`   📍 Added ${insertedExperiences.length} experiences`);
    console.log(`   🎟️  Added ${insertedPromoCodes.length} promo codes`);

    console.log('\n📋 Available Promo Codes:');
    insertedPromoCodes.forEach((promo) => {
      console.log(`   - ${promo.code}: ${promo.description}`);
    });

    console.log('\n🎯 Next steps:');
    console.log('   1. Start your server: npm run dev');
    console.log('   2. Test API: GET http://localhost:5000/api/experiences');
    console.log(
      '   3. Validate promo: POST http://localhost:5000/api/promo/validate\n'
    );

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

seedDatabase();
