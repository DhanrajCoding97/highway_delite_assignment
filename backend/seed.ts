import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Experience from './models/Experience.js';
import PromoCode from './models/PromoCode.js';

dotenv.config();

const experiences = [
  {
    title: "Nandi Hills Sunrise",
    description: "Curated small-group experience. Certified guide. Safety first with gear included.",
    location: "Bangalore",
    duration: "3 hours",
    category: "Adventure",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    rating: 4.8,
    reviewCount: 156,
    highlights: [
      "Watch mesmerizing sunrise from 1,478m altitude",
      "Small group experience (max 8 people)",
      "Certified mountain guide",
      "Safety equipment included"
    ],
    included: [
      "Hotel pickup and drop",
      "Breakfast at hilltop",
      "Entry tickets",
      "Professional guide",
      "Safety gear"
    ],
    about: "Experience the breathtaking sunrise from Nandi Hills, one of Bangalore's most scenic spots. Perfect for nature lovers and photography enthusiasts.",
    slots: [
      { date: new Date('2025-10-22'), startTime: '04:00 AM', endTime: '07:00 AM', availableSpots: 8, totalSpots: 8, price: 899 },
      { date: new Date('2025-10-23'), startTime: '04:00 AM', endTime: '07:00 AM', availableSpots: 5, totalSpots: 8, price: 899 },
      { date: new Date('2025-10-24'), startTime: '04:00 AM', endTime: '07:00 AM', availableSpots: 8, totalSpots: 8, price: 899 },
      { date: new Date('2025-10-25'), startTime: '04:00 AM', endTime: '07:00 AM', availableSpots: 0, totalSpots: 8, price: 899 },
      { date: new Date('2025-10-26'), startTime: '04:00 AM', endTime: '07:00 AM', availableSpots: 3, totalSpots: 8, price: 899 }
    ]
  },
  {
    title: "Kayaking",
    description: "Curated small-group experience. Certified guide. Safety first with gear included. Helmet and Life Jackets along with an expert will accompany in kayaking.",
    location: "Goa",
    duration: "2 hours",
    category: "Water Sports",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800",
    rating: 4.6,
    reviewCount: 203,
    highlights: [
      "Paddle through scenic routes",
      "Certified guide accompaniment",
      "All safety equipment provided",
      "Small group experience"
    ],
    included: [
      "Kayak and paddle",
      "Life jacket and helmet",
      "Professional instructor",
      "Safety briefing",
      "Water bottles"
    ],
    about: "Paddle Indian waters, explore hidden paths, and safety briefing. Minimum age 12.",
    slots: [
      { date: new Date('2025-10-22'), startTime: '07:00 AM', endTime: '09:00 AM', availableSpots: 6, totalSpots: 10, price: 999 },
      { date: new Date('2025-10-22'), startTime: '11:00 AM', endTime: '01:00 PM', availableSpots: 4, totalSpots: 10, price: 999 },
      { date: new Date('2025-10-22'), startTime: '03:00 PM', endTime: '05:00 PM', availableSpots: 0, totalSpots: 10, price: 999 },
      { date: new Date('2025-10-23'), startTime: '07:00 AM', endTime: '09:00 AM', availableSpots: 10, totalSpots: 10, price: 999 },
      { date: new Date('2025-10-23'), startTime: '11:00 AM', endTime: '01:00 PM', availableSpots: 8, totalSpots: 10, price: 999 }
    ]
  },
  {
    title: "Scuba Diving in Andaman",
    description: "Dive into crystal clear waters. PADI certified instructors. Complete equipment included.",
    location: "Port Blair",
    duration: "4 hours",
    category: "Water Sports",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
    rating: 4.9,
    reviewCount: 289,
    highlights: [
      "Explore vibrant coral reefs",
      "PADI certified instructors",
      "Underwater photography included",
      "Beginner friendly"
    ],
    included: [
      "Complete diving gear",
      "Underwater camera shots",
      "Training session",
      "Refreshments",
      "Certificate of completion"
    ],
    about: "Discover the underwater paradise of Andaman. Suitable for beginners with proper training provided.",
    slots: [
      { date: new Date('2025-10-22'), startTime: '08:00 AM', endTime: '12:00 PM', availableSpots: 4, totalSpots: 6, price: 3499 },
      { date: new Date('2025-10-23'), startTime: '08:00 AM', endTime: '12:00 PM', availableSpots: 2, totalSpots: 6, price: 3499 },
      { date: new Date('2025-10-24'), startTime: '08:00 AM', endTime: '12:00 PM', availableSpots: 6, totalSpots: 6, price: 3499 }
    ]
  },
  {
    title: "Paragliding in Bir Billing",
    description: "Fly like a bird over stunning Himalayan valleys. Tandem flight with experienced pilot.",
    location: "Bir, Himachal Pradesh",
    duration: "30 minutes flight",
    category: "Adventure",
    image: "https://images.unsplash.com/photo-1534368420009-621bfab424a8?w=800",
    rating: 4.7,
    reviewCount: 178,
    highlights: [
      "Tandem flight with certified pilot",
      "Breathtaking valley views",
      "HD video recording included",
      "World's second-best paragliding site"
    ],
    included: [
      "Tandem paragliding flight",
      "Safety gear",
      "HD video of your flight",
      "Photos",
      "Insurance"
    ],
    about: "Experience the thrill of paragliding at one of the world's best paragliding destinations.",
    slots: [
      { date: new Date('2025-10-22'), startTime: '09:00 AM', endTime: '10:00 AM', availableSpots: 3, totalSpots: 5, price: 2500 },
      { date: new Date('2025-10-22'), startTime: '11:00 AM', endTime: '12:00 PM', availableSpots: 5, totalSpots: 5, price: 2500 },
      { date: new Date('2025-10-23'), startTime: '09:00 AM', endTime: '10:00 AM', availableSpots: 1, totalSpots: 5, price: 2500 }
    ]
  },
  {
    title: "Heritage Walk in Old Delhi",
    description: "Walk through history. Expert local guides. Taste authentic street food.",
    location: "Delhi",
    duration: "3.5 hours",
    category: "Cultural",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800",
    rating: 4.5,
    reviewCount: 312,
    highlights: [
      "Visit Chandni Chowk and Jama Masjid",
      "Street food tasting included",
      "Stories from Mughal era",
      "Small group (max 12 people)"
    ],
    included: [
      "Expert local guide",
      "Food tasting (5 items)",
      "Entry to monuments",
      "Bottled water",
      "Historical stories and anecdotes"
    ],
    about: "Immerse yourself in the rich history of Old Delhi with our heritage walk covering iconic monuments and delicious street food.",
    slots: [
      { date: new Date('2025-10-22'), startTime: '08:00 AM', endTime: '11:30 AM', availableSpots: 8, totalSpots: 12, price: 699 },
      { date: new Date('2025-10-22'), startTime: '04:00 PM', endTime: '07:30 PM', availableSpots: 10, totalSpots: 12, price: 699 },
      { date: new Date('2025-10-23'), startTime: '08:00 AM', endTime: '11:30 AM', availableSpots: 6, totalSpots: 12, price: 699 }
    ]
  }
];

const promoCodes = [
  {
    code: 'SAVE10',
    discountType: 'percentage',
    discountValue: 10,
    active: true
  },
  {
    code: 'FLAT100',
    discountType: 'flat',
    discountValue: 100,
    active: true
  },
  {
    code: 'WELCOME20',
    discountType: 'percentage',
    discountValue: 20,
    active: true
  },
  {
    code: 'FLAT500',
    discountType: 'flat',
    discountValue: 500,
    active: true
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Experience.deleteMany({});
    await PromoCode.deleteMany({});
    console.log('Cleared existing data');

    // Insert new data
    await Experience.insertMany(experiences);
    await PromoCode.insertMany(promoCodes);
    
    console.log('✅ Database seeded successfully!');
    console.log(`   - Added ${experiences.length} experiences`);
    console.log(`   - Added ${promoCodes.length} promo codes`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();