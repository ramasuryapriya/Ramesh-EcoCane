import { Product, UserReview } from '../types';

export const products: Product[] = [
  // ORGANIC JAGGERY
  {
    id: 'classic-pure-jaggery',
    name: 'Classic Pure Jaggery',
    category: 'food',
    subcategory: 'Organic Jaggery',
    price: 89,
    unit: '500g',
    description: '100% natural, chemical-free raw jaggery block loaded with health benefits and unrefined minerals.',
    benefits: [
      'Rich in iron and vital minerals',
      'Natural digestive aid',
      'Excellent white sugar substitute'
    ],
    rating: 4.8,
    reviewsCount: 124,
    isBestSeller: true,
    inStock: true,
    image: '/src/assets/images/pure_jaggery_1781170783391.png',
    imagePrompt: 'organic pure jaggery sugarcane block on clean solid white background, centered, professional e-commerce product photography, isolated product image',
    variants: [
      { unit: '500g', price: 89 },
      { unit: '1kg', price: 169 },
      { unit: '2kg', price: 319 }
    ]
  },
  {
    id: 'ginger-boost-jaggery',
    name: 'Ginger Boost Jaggery',
    category: 'food',
    subcategory: 'Organic Jaggery',
    price: 99,
    unit: '500g',
    description: 'Pure sugarcane jaggery infused with dry ginger. Relieves cold symptoms and enhances energy levels.',
    benefits: [
      'Soothes throat and eases digestion',
      'Immunity boosting formula',
      'Authentic traditional flavor'
    ],
    rating: 4.9,
    reviewsCount: 88,
    inStock: true,
    image: '/src/assets/images/ginger_jaggery_1781170800834.png',
    imagePrompt: 'organic fresh cane ginger jaggery block on clean solid white background, centered, professional e-commerce product photography, isolated product image',
    variants: [
      { unit: '500g', price: 99 },
      { unit: '1kg', price: 189 },
      { unit: '2kg', price: 359 }
    ]
  },
  {
    id: 'elaichi-delight-jaggery',
    name: 'Elaichi Delight Jaggery',
    category: 'food',
    subcategory: 'Organic Jaggery',
    price: 109,
    unit: '500g',
    description: 'Deliciously fragrant jaggery infused with finest green cardamom. Perfect for hot beverages and traditional cooking.',
    benefits: [
      'Exquisite cardamom aroma',
      'Aids detoxification',
      'Delightful sweetness profile'
    ],
    rating: 4.7,
    reviewsCount: 65,
    inStock: true,
    image: '/src/assets/images/elaichi_jaggery_1781170816129.png',
    imagePrompt: 'premium cardamom-infused organic jaggery block on clean solid white background, centered, professional e-commerce product photography, isolated product image',
    variants: [
      { unit: '500g', price: 109 },
      { unit: '1kg', price: 209 },
      { unit: '2kg', price: 399 }
    ]
  },
  {
    id: 'cinnamon-twist-jaggery',
    name: 'Cinnamon Twist Jaggery',
    category: 'food',
    subcategory: 'Organic Jaggery',
    price: 119,
    unit: '500g',
    description: 'Subtly spiced jaggery block with organic cinnamon powder. Ideal healthy treat for winter evenings.',
    benefits: [
      'Regulates metabolic rates',
      'Infused with warm high-quality Ceylon cinnamon',
      'Perfect dessert substitute'
    ],
    rating: 4.6,
    reviewsCount: 42,
    inStock: true,
    image: '/src/assets/images/cinnamon_jaggery_1781170834785.png',
    imagePrompt: 'organic cinnamon-powder spiced jaggery block on clean solid white background, centered, professional e-commerce product photography, isolated product image',
    variants: [
      { unit: '500g', price: 119 },
      { unit: '1kg', price: 229 },
      { unit: '2kg', price: 439 }
    ]
  },
  {
    id: 'herbal-blend-jaggery',
    name: 'Herbal Blend Jaggery',
    category: 'food',
    subcategory: 'Organic Jaggery',
    price: 129,
    unit: '500g',
    description: 'Our proprietary wellness blend. Jaggery combined with tulsi, ashwagandha, ginger, and black pepper.',
    benefits: [
      'Powerful daily wellness defense',
      'Combats seasonal stress',
      'Packed with traditional Ayurvedic adaptogens'
    ],
    rating: 4.9,
    reviewsCount: 110,
    isNew: true,
    inStock: true,
    image: '/src/assets/images/pure_jaggery_1781170783391.png',
    imagePrompt: 'ayurvedic herbal sugarcane jaggery block with tulsi and ashwagandha on clean solid white background, centered, professional e-commerce product photography, isolated product image',
    variants: [
      { unit: '500g', price: 129 },
      { unit: '1kg', price: 249 },
      { unit: '2kg', price: 479 }
    ]
  },

  // SUGARCANE JUICE
  {
    id: 'classic-fresh-juice',
    name: 'Classic Fresh Juice',
    category: 'food',
    subcategory: 'Sugarcane Juice',
    price: 39,
    unit: '250ml',
    description: '100% cold-pressed raw sugarcane juice. Unpasteurized and packed with natural live enzymes.',
    benefits: [
      'Instant stamina restorer',
      'Loaded with hydration electrolytes',
      'Zero artificial additions or processing'
    ],
    rating: 4.8,
    reviewsCount: 201,
    isBestSeller: true,
    inStock: true,
    image: '/src/assets/images/classic_juice_1781182380939.png',
    imagePrompt: 'premium bottle of fresh sugarcane juice isolated on pure white background, professional beverage product photography, centered product, high resolution e-commerce image',
    variants: [
      { unit: '250ml', price: 39 },
      { unit: '500ml', price: 69 },
      { unit: '1L', price: 129 }
    ]
  },
  {
    id: 'zesty-lemon-juice',
    name: 'Zesty Lemon Juice',
    category: 'food',
    subcategory: 'Sugarcane Juice',
    price: 45,
    unit: '250ml',
    description: 'Cold-pressed sugarcane juice infused with refreshing hand-plucked citric lemon.',
    benefits: [
      'Rich in vitamin C',
      'Perfect pH balance for stomach activity',
      'Deliciously tangy hydration punch'
    ],
    rating: 4.7,
    reviewsCount: 95,
    inStock: true,
    image: '/src/assets/images/lemon_juice_1781170870870.png',
    imagePrompt: 'premium bottle of lemon flavored sugarcane juice isolated on pure white background, professional beverage product photography, centered product, high resolution e-commerce image',
    variants: [
      { unit: '250ml', price: 45 },
      { unit: '500ml', price: 79 },
      { unit: '1L', price: 149 }
    ]
  },
  {
    id: 'cool-mint-juice',
    name: 'Cool Mint Juice',
    category: 'food',
    subcategory: 'Sugarcane Juice',
    price: 45,
    unit: '250ml',
    description: 'Peppermint infused fresh sugarcane juice. An incredibly chilling treat on hot summer days.',
    benefits: [
      'Extremely cooling and refreshing',
      'Enhances breath and gut digestive action',
      'Clean organic garden mint leaf extract'
    ],
    rating: 4.6,
    reviewsCount: 74,
    inStock: true,
    image: '/src/assets/images/mint_juice_1781170883057.png',
    imagePrompt: 'premium bottle of mint flavored sugarcane juice isolated on pure white background, professional beverage product photography, centered product, high resolution e-commerce image',
    variants: [
      { unit: '250ml', price: 45 },
      { unit: '500ml', price: 79 },
      { unit: '1L', price: 149 }
    ]
  },
  {
    id: 'ginger-boost-juice',
    name: 'Ginger Boost Juice',
    category: 'food',
    subcategory: 'Sugarcane Juice',
    price: 49,
    unit: '250ml',
    description: 'Spicily balanced ginger extract blended with fresh, cold-pressed sugarcane juice.',
    benefits: [
      'Combats cold symptoms instantly',
      'Increases blood circulation and vitality',
      'Spicy, sweet, high-contrast taste profile'
    ],
    rating: 4.6,
    reviewsCount: 77,
    inStock: true,
    image: '/src/assets/images/ginger_juice_1781182397558.png',
    imagePrompt: 'premium ginger flavored sugarcane juice bottle isolated on pure white background, clean beverage packaging photography, professional e-commerce catalog image',
    variants: [
      { unit: '250ml', price: 49 },
      { unit: '500ml', price: 89 },
      { unit: '1L', price: 169 }
    ]
  },
  {
    id: 'masala-twist-juice',
    name: 'Masala Twist Juice',
    category: 'food',
    subcategory: 'Sugarcane Juice',
    price: 45,
    unit: '250ml',
    description: 'Cold-pressed cane juice with black salt, chaat masala, and fresh lemon. A sour-spiced traditional street specialty.',
    benefits: [
      'Balances sodium and hydration levels',
      'Highly traditional, nostalgia-evoking recipe',
      'Stimulatory organic spices aid rapid gut absorption'
    ],
    rating: 4.8,
    reviewsCount: 112,
    inStock: true,
    image: '/src/assets/images/masala_juice_1781182410589.png',
    imagePrompt: 'premium bottle of spicy masala flavored sugarcane juice isolated on pure white background, professional beverage product photography, centered product, high resolution e-commerce image',
    variants: [
      { unit: '250ml', price: 45 },
      { unit: '500ml', price: 79 },
      { unit: '1L', price: 149 }
    ]
  },
  {
    id: 'lemon-mint-fusion-juice',
    name: 'Lemon Mint Fusion Juice',
    category: 'food',
    subcategory: 'Sugarcane Juice',
    price: 45,
    unit: '250ml',
    description: 'Double hydration blast. Fresh cane juice cold-pressed concurrently with fresh mint foliage and citric lemons.',
    benefits: [
      'Ultra rich antioxidant botanical compounds',
      'Promotes immediate cell-rehydration and recovery',
      'Pristine balanced sweet, sour, and herbal levels'
    ],
    rating: 4.9,
    reviewsCount: 154,
    isNew: true,
    inStock: true,
    image: '/src/assets/images/lemon_juice_1781170870870.png',
    imagePrompt: 'premium bottle of lemon mint fusion sugarcane juice isolated on pure white background, professional beverage product photography, centered product, high resolution e-commerce image',
    variants: [
      { unit: '250ml', price: 45 },
      { unit: '500ml', price: 79 },
      { unit: '1L', price: 149 }
    ]
  },

  // SUGARCANE SYRUP
  {
    id: 'classic-cane-syrup',
    name: 'Classic Cane Syrup',
    category: 'food',
    subcategory: 'Sugarcane Syrup',
    price: 149,
    unit: '250ml',
    description: 'Unrefined, slow-caramelized sugarcane syrup. Rich and maply, ideal as an eco-certified dessert splash.',
    benefits: [
      'Zero chemical crystallization techniques used',
      'Excellent honey mock replacement for vegans',
      'Loaded with iron and complex unrefined sugars'
    ],
    rating: 4.7,
    reviewsCount: 88,
    isBestSeller: true,
    inStock: true,
    image: '/src/assets/images/classic_syrup_1781170919731.png',
    imagePrompt: 'premium bottle of organic sugarcane syrup on clean solid white background, centered, professional e-commerce product photography, isolated product image',
    variants: [
      { unit: '250ml', price: 149 },
      { unit: '500ml', price: 269 },
      { unit: '1L', price: 499 }
    ]
  },
  {
    id: 'cardamom-syrup',
    name: 'Cardamom Syrup',
    category: 'food',
    subcategory: 'Sugarcane Syrup',
    price: 169,
    unit: '250ml',
    description: 'Golden cane syrup slow-cooked with fresh Kerala cardamom pods. Premium flavoring for gourmet pancakes.',
    benefits: [
      'Warm premium spice infusion',
      'Completely pesticide-free ingredients',
      'Exquisite luxury baking flavor companion'
    ],
    rating: 4.8,
    reviewsCount: 39,
    inStock: true,
    image: '/src/assets/images/cardamom_syrup_1781170934440.png',
    imagePrompt: 'premium bottle of cardamom flavored sugarcane syrup on clean solid white background, centered, professional e-commerce product photography, isolated product image',
    variants: [
      { unit: '250ml', price: 169 },
      { unit: '500ml', price: 299 },
      { unit: '1L', price: 559 }
    ]
  },
  {
    id: 'ginger-syrup',
    name: 'Ginger Syrup',
    category: 'food',
    subcategory: 'Sugarcane Syrup',
    price: 169,
    unit: '250ml',
    description: 'Infused with cold-pressed ginger. A sweet-hot syrup that brings deep warmth to teas and warm baking treats.',
    benefits: [
      'Natural cold comfort digestive dynamic',
      'Rich unrefined sweet-and-spicy balance',
      'Sourced ethically from organic sugarcane mills'
    ],
    rating: 4.6,
    reviewsCount: 41,
    inStock: true,
    image: '/src/assets/images/ginger_syrup_1781170947303.png',
    imagePrompt: 'premium bottle of ginger flavored sugarcane syrup on clean solid white background, centered, professional e-commerce product photography, isolated product image',
    variants: [
      { unit: '250ml', price: 169 },
      { unit: '500ml', price: 299 },
      { unit: '1L', price: 559 }
    ]
  },

  // COMBO PACKS
  {
    id: 'daily-health-pack',
    name: 'Daily Health Pack',
    category: 'food',
    subcategory: 'Combo Packs',
    price: 249,
    unit: 'Combo Pack',
    description: 'A wellness bundle featuring Herb Jaggery Blocks and classic cold-pressed Sugarcane juice.',
    benefits: [
      'Immunity defense combinations',
      'Includes raw ayurvedic adaptogens',
      'Superb baseline gift for active wellness seekers'
    ],
    rating: 4.8,
    reviewsCount: 65,
    inStock: true,
    image: '/src/assets/images/daily_health_pack_1781172937120.png',
    imagePrompt: 'organic daily health pack organic sugarcane items on clean solid white background, centered, professional e-commerce product photography, isolated product image'
  },
  {
    id: 'fitness-energy-pack',
    name: 'Fitness & Energy Pack',
    category: 'food',
    subcategory: 'Combo Packs',
    price: 299,
    unit: 'Fitness Pack',
    description: 'Tailored for intense physical recovery. Cold-pressed stamina booster juices with premium syrup.',
    benefits: [
      'Enzyme-active hydration formulas',
      'Instant cell glucose loader safely',
      'Natural plant mineral restore stack'
    ],
    rating: 4.9,
    reviewsCount: 54,
    inStock: true,
    image: '/src/assets/images/fitness_energy_pack_1781172951681.png',
    imagePrompt: 'organic fitness sugarcane recovery package on clean solid white background, centered, professional e-commerce product photography, isolated product image'
  },
  {
    id: 'premium-gift-pack',
    name: 'Premium Gift Pack',
    category: 'food',
    subcategory: 'Combo Packs',
    price: 999,
    unit: 'Premium Gift Box',
    description: 'Luxury eco-friendly gift box containing Cinnamon Jaggery, Masala Sugarcane Juice, and Cardamom Syrup with elegant premium packaging.',
    benefits: [
      'Elegant natural wood sliding box layout',
      'Includes beautiful cane tasting brochure',
      'Perfect green present for conscious individuals'
    ],
    rating: 5.0,
    reviewsCount: 42,
    isNew: true,
    inStock: true,
    image: '/src/assets/images/premium_gift_pack_1781172972586.png',
    imagePrompt: 'luxury eco-friendly premium gift package box on clean solid white background, centered, professional e-commerce product photography, isolated product image'
  },

  // =========== BIODEGRADABLE PLATES ===========
  {
    id: 'ep-01',
    name: 'EP-01: Round Dinner Plates (10 inch)',
    category: 'eco',
    subcategory: 'Biodegradable Plates',
    price: 149,
    unit: 'Pack of 25',
    description: 'Full-size 10-inch sugarcane bagasse dinner plates. Sturdy build, perfect for main course entrees.',
    benefits: [
      '100% compostable in backyards within 60 days',
      'Microwave and deep freezer safe',
      'Rigid construction without toxic plastic coatings'
    ],
    highlights: ['Best for weddings and heavy catering events', 'Water and chemical-proof'],
    rating: 4.8,
    reviewsCount: 162,
    isBestSeller: true,
    inStock: true,
    image: '/src/assets/images/round_plates_1781171188809.png',
    imagePrompt: 'biodegradable white round bagasse dinner plates stacked neatly, empty, zero food, isolated on pure white background, professional product catalog style, lighting, centered',
    variants: [
      { unit: 'Pack of 25', price: 149 },
      { unit: 'Pack of 50', price: 279 },
      { unit: 'Pack of 100', price: 529 }
    ]
  },
  {
    id: 'ep-03',
    name: 'EP-03: Small Snack Plates (6 inch)',
    category: 'eco',
    subcategory: 'Biodegradable Plates',
    price: 99,
    unit: 'Pack of 25',
    description: 'Compact 6-inch sugarcane snack plates. Excellent lightweight plates for breads and quick snacks.',
    benefits: [
      'Easy stack space-saving footprint',
      'Safe for immediate direct raw food contact',
      'No forest wood harvesting required'
    ],
    highlights: ['Great for home birthday parties and bakeries', 'Decomposes completely in garden composts'],
    rating: 4.9,
    reviewsCount: 204,
    inStock: true,
    image: '/src/assets/images/small_snack_plates_1781182364018.png', // Fallback to small_snack_plate if prefix is slightly off, but the actual file name is small_snack_plate_1781172207714.png
    imagePrompt: 'biodegradable miniature snack plates stacked neatly, empty, zero food, isolated on pure white background, professional product catalog style, lighting, centered',
    variants: [
      { unit: 'Pack of 25', price: 99 },
      { unit: 'Pack of 50', price: 189 },
      { unit: 'Pack of 100', price: 359 }
    ]
  },
  {
    id: 'ep-04',
    name: 'EP-04: Compartment Plates (3-section)',
    category: 'eco',
    subcategory: 'Biodegradable Plates',
    price: 179,
    unit: 'Pack of 25',
    description: 'Functional 3-compartment plates made from upcycled bagasse. Keep gravies, sides, and main courses separate.',
    benefits: [
      'Fully split secure sections',
      'Doesn’t warp or leak under liquid curries',
      'Excellent weight balancing setup'
    ],
    highlights: ['Preferred for kids platters and multiple main menus', 'Keeps side dips flavorful'],
    rating: 4.6,
    reviewsCount: 95,
    inStock: true,
    image: '/src/assets/images/three_compartment_plate_1781172224591.png',
    imagePrompt: 'three compartment biodegradable bagasse section plates stack, empty, zero food, isolated on pure white background, professional product catalog style, lighting, centered',
    variants: [
      { unit: 'Pack of 25', price: 179 },
      { unit: 'Pack of 50', price: 339 },
      { unit: 'Pack of 100', price: 649 }
    ]
  },

  // =========== BIODEGRADABLE BOWLS ===========
  {
    id: 'bw-01',
    name: 'BW-01: Small Dessert Bowls',
    category: 'eco',
    subcategory: 'Biodegradable Bowls',
    price: 109,
    unit: 'Pack of 25',
    description: 'Small dessert bowls made of premium sugarcane pulp. Splendid for ice creams, yogurts, or small side condiments.',
    benefits: [
      'Unbleached clean ivory aesthetic',
      'Completely natural material holds cold items perfectly',
      'Extremely sturdy structural shape'
    ],
    highlights: ['Splendid for kid sundaes', 'Composts effortlessly in gardens'],
    rating: 4.8,
    reviewsCount: 122,
    inStock: true,
    image: '/src/assets/images/small_bowls_1781171237577.png',
    imagePrompt: 'biodegradable miniature dessert bowls stacked neatly, empty, zero food, isolated on pure white background, professional product catalog style, lighting, centered',
    variants: [
      { unit: 'Pack of 25', price: 109 },
      { unit: 'Pack of 50', price: 199 },
      { unit: 'Pack of 100', price: 379 }
    ]
  },
  {
    id: 'bw-02',
    name: 'BW-02: Medium Soup Bowls',
    category: 'eco',
    subcategory: 'Biodegradable Bowls',
    price: 129,
    unit: 'Pack of 25',
    description: 'Unbleached soup bowls. Fully heat stable and keeps warm liquids secure without leaking.',
    benefits: [
      'Zero plastic liner coating layers',
      'High temperature proof up to 4 hours',
      'Microwaveable reheating support'
    ],
    highlights: ['Best for hot cereal and broths', 'Biodegrades without landfill toxin emission'],
    rating: 4.7,
    reviewsCount: 94,
    inStock: true,
    image: '/src/assets/images/soup_bowl_1781171250818.png',
    imagePrompt: 'biodegradable fiber soup bowls pile, empty, zero food, isolated on pure white background, professional product catalog style, lighting, centered',
    variants: [
      { unit: 'Pack of 25', price: 129 },
      { unit: 'Pack of 50', price: 239 },
      { unit: 'Pack of 100', price: 459 }
    ]
  },
  {
    id: 'bw-03',
    name: 'BW-03: Large Meal Bowls',
    category: 'eco',
    subcategory: 'Biodegradable Bowls',
    price: 149,
    unit: 'Pack of 25',
    description: 'Generous bagasse bowls. Ideal for ramen, burrito bowls, and large main dish sides.',
    benefits: [
      'Durable deep-dish layout prevents spills',
      'High load carrying capacities',
      'Eco-responsible forest preserving fibers'
    ],
    highlights: ['Perfect for salad bars and grain bowls', 'Completely bio-secured material'],
    rating: 4.9,
    reviewsCount: 145,
    isBestSeller: true,
    inStock: true,
    image: '/src/assets/images/large_meal_bowl_1781172239164.png',
    imagePrompt: 'biodegradable large meal bowls stack, empty, zero food, isolated on pure white background, professional product catalog style, lighting, centered',
    variants: [
      { unit: 'Pack of 25', price: 149 },
      { unit: 'Pack of 50', price: 279 },
      { unit: 'Pack of 100', price: 529 }
    ]
  },
  {
    id: 'bw-04',
    name: 'BW-04: Deep Curry Bowls',
    category: 'eco',
    subcategory: 'Biodegradable Bowls',
    price: 159,
    unit: 'Pack of 25',
    description: 'Specially engineered deep-rim bowls to prevent soup spills. Thick dense sugarcane pulp.',
    benefits: [
      'Double high-wall safety against hot leakage',
      'Thick unbleached sugarcane fibers hold up long periods',
      'PFAS-free hot molded structure'
    ],
    highlights: ['Favored for Indian buffet curries and stews', 'Premium rugged design'],
    rating: 4.8,
    reviewsCount: 81,
    inStock: true,
    image: '/src/assets/images/deep_bowl_1781171270957.png',
    imagePrompt: 'biodegradable deep curry bowls stacked, empty, zero food, isolated on pure white background, professional product catalog style, lighting, centered',
    variants: [
      { unit: 'Pack of 25', price: 159 },
      { unit: 'Pack of 50', price: 299 },
      { unit: 'Pack of 100', price: 569 }
    ]
  },

  // =========== BIODEGRADABLE CUPS ===========
  {
    id: 'cp-01',
    name: 'CP-01: Tea Cups (100–150 ml)',
    category: 'eco',
    subcategory: 'Biodegradable Cups',
    price: 99,
    unit: 'Pack of 25',
    description: 'Traditional sized 100-150ml sugarcane cups. Perfectly molded for small warm tea or espresso breaks.',
    benefits: [
      'Retains boil temperature with minimal finger heat transference',
      'No strange cardboard aroma or flavor extraction',
      'Zero synthetic adhesive layers'
    ],
    highlights: ['Best value for offices and roadside tea stands', 'Extremely light and nestable'],
    rating: 4.7,
    reviewsCount: 220,
    isBestSeller: true,
    inStock: true,
    image: '/src/assets/images/tea_cup_1781171285391.png',
    imagePrompt: 'biodegradable mini tea cups nest, empty, zero beverage, isolated on pure white background, professional product catalog style, lighting, centered',
    variants: [
      { unit: 'Pack of 25', price: 99 },
      { unit: 'Pack of 50', price: 189 },
      { unit: 'Pack of 100', price: 359 }
    ]
  },
  {
    id: 'cp-02',
    name: 'CP-02: Coffee Cups (200 ml)',
    category: 'eco',
    subcategory: 'Biodegradable Cups',
    price: 119,
    unit: 'Pack of 25',
    description: '200ml heat-insulating coffee cups. Protects your fingers from heat while keeping coffee steaming.',
    benefits: [
      'Wood-free paper material prevents deforestation',
      'Thick and robust bottom sealing avoids ring leaks',
      'Rigid enough to be carried comfortably without handles'
    ],
    highlights: ['Essential for specialty cafés and baristas', 'Compatible with paper eco-lids'],
    rating: 4.8,
    reviewsCount: 175,
    inStock: true,
    image: '/src/assets/images/coffee_cup_1781171300316.png',
    imagePrompt: 'biodegradable white paper coffee cups stack, empty, zero beverage, isolated on pure white background, professional product catalog style, lighting, centered',
    variants: [
      { unit: 'Pack of 25', price: 119 },
      { unit: 'Pack of 50', price: 229 },
      { unit: 'Pack of 100', price: 439 }
    ]
  },
  {
    id: 'cp-03',
    name: 'CP-03: Cold Drink Cups (300 ml)',
    category: 'eco',
    subcategory: 'Biodegradable Cups',
    price: 129,
    unit: 'Pack of 25',
    description: '300ml cold drink cups. Stays rigid and condensation-free for hours. Eco sugarcane blend.',
    benefits: [
      'Prevents structural wall collapsing during high hydration',
      'Zero plastic linings inside drink bodies',
      'Extremely clean and simple handhold'
    ],
    highlights: ['Sought after for cold-pressed juices and sodas', 'Biodegrades cleanly without residue'],
    rating: 4.6,
    reviewsCount: 110,
    inStock: true,
    image: '/src/assets/images/cold_drink_cup_1781171313338.png',
    imagePrompt: 'biodegradable cold drink cups pile, empty, zero beverage, isolated on pure white background, professional product catalog style, lighting, centered',
    variants: [
      { unit: 'Pack of 25', price: 129 },
      { unit: 'Pack of 50', price: 239 },
      { unit: 'Pack of 100', price: 459 }
    ]
  },

  // =========== STRAWS & SMALL ACCESSORIES ===========
  {
    id: 'st-01',
    name: 'ST-01: Standard Straws',
    category: 'eco',
    subcategory: 'Straws & Accessories',
    price: 79,
    unit: 'Pack of 50',
    description: 'Durable plant fiber drinking straws. Unbeatable substitute to mushy paper straws, maintaining rigidity.',
    benefits: [
      'Maintains stiffness for up to 12 hours inside beverages',
      'Zero chemicals or plastic additives',
      'Degrades fully in earth soils'
    ],
    highlights: ['Favorite for eco-pioneer bars and restaurants', 'Completely taste-neutral'],
    rating: 4.9,
    reviewsCount: 380,
    isBestSeller: true,
    inStock: true,
    image: '/src/assets/images/standard_straws_1781171389491.png',
    imagePrompt: 'compostable standard straws stack, plain, zero drinks, isolated on pure white background, professional product catalog style, lighting, centered',
    variants: [
      { unit: 'Pack of 50', price: 79 },
      { unit: 'Pack of 100', price: 149 },
      { unit: 'Pack of 250', price: 349 }
    ]
  },
  {
    id: 'st-02',
    name: 'ST-02: Thick Cold Drink Straws',
    category: 'eco',
    subcategory: 'Straws & Accessories',
    price: 99,
    unit: 'Pack of 50',
    description: 'Wide-bore plant fiber straws. Formulated for smoothies, thick juices, and frozen milkshakes.',
    benefits: [
      'Clutter-free flow handles dense bubble tea pearls',
      'Excellent performance in ice frozen environments',
      'Safe for aquatic systems even if accidentally discarded'
    ],
    highlights: ['Premium smoothie bars and boba joints', 'Large unblocked suction diameters'],
    rating: 4.8,
    reviewsCount: 165,
    inStock: true,
    image: '/src/assets/images/thick_drink_straws_1781172252987.png',
    imagePrompt: 'compostable wide-bore thick straws heap, plain, zero drinks, isolated on pure white background, professional product catalog style, lighting, centered',
    variants: [
      { unit: 'Pack of 50', price: 99 },
      { unit: 'Pack of 100', price: 189 },
      { unit: 'Pack of 250', price: 449 }
    ]
  },
  {
    id: 'st-04',
    name: 'ST-04: Eco Cutlery Sets (spoon, fork, knife)',
    category: 'eco',
    subcategory: 'Straws & Accessories',
    price: 149,
    unit: 'Pack of 25',
    description: 'High-density heavy-duty disposable cutlery kits. Ergonomically optimized, strong and premium.',
    benefits: [
      'Strong prong structural build resists meat cutting stress',
      'Zero wood or plastic elements',
      'Polished and comfortable in user hands'
    ],
    highlights: ['Unsurpassed wedding buffet cutlery standard', 'Each set includes standard spoon, fork, and knife'],
    rating: 4.9,
    reviewsCount: 142,
    isNew: true,
    inStock: true,
    image: '/src/assets/images/cutlery_set_1781171373853.png',
    imagePrompt: 'biodegradable white wooden cornstarch spoon fork and knife sets stack, empty, zero food, isolated on pure white background, professional product catalog style, lighting, centered',
    variants: [
      { unit: 'Pack of 25', price: 149 },
      { unit: 'Pack of 50', price: 279 },
      { unit: 'Pack of 100', price: 529 }
    ]
  },

  // =========== FOOD PACKAGING BOXES ===========
  {
    id: 'pk-01',
    name: 'PK-01: Meal Boxes (single compartment)',
    category: 'eco',
    subcategory: 'Food Packaging Boxes',
    price: 199,
    unit: 'Pack of 25',
    description: 'Sturdy single compartment clamshell takeaway meal boxes. Traps hot steam safely without collapsing.',
    benefits: [
      'Absorbs ambient humidity to keep fried foods crunchy',
      'Snug click-tab closure protects during transport',
      'Microwave safe for easy home reheating'
    ],
    highlights: ['Favored by modern delivery-focused ghost kitchens', 'Saves warehouse storage stack space'],
    rating: 4.8,
    reviewsCount: 188,
    isBestSeller: true,
    inStock: true,
    image: '/src/assets/images/meal_box_1781171327680.png',
    imagePrompt: 'biodegradable clamshell meal takeaway container box, empty, open, zero food, isolated on pure white background, professional product catalog style, lighting, centered',
    variants: [
      { unit: 'Pack of 25', price: 199 },
      { unit: 'Pack of 50', price: 379 },
      { unit: 'Pack of 100', price: 729 }
    ]
  },
  {
    id: 'pk-02',
    name: 'PK-02: Multi-compartment Lunch Boxes',
    category: 'eco',
    subcategory: 'Food Packaging Boxes',
    price: 249,
    unit: 'Pack of 25',
    description: '3-compartment takeaway lunchboxes. Keeps main courses, rice, and wet gravies safely partitioned.',
    benefits: [
      'Strong divider columns block liquid transfer',
      'Withstands extreme hot grease and oils',
      'Superior build remains structurally firm'
    ],
    highlights: ['Splendid choice for office bento lunch menus', 'Keeps flavors unmixed'],
    rating: 4.7,
    reviewsCount: 104,
    inStock: true,
    image: '/src/assets/images/multi_compartment_box_1781172273493.png',
    imagePrompt: 'biodegradable 3-compartment lunch box, empty, open, zero food, isolated on pure white background, professional product catalog style, lighting, centered',
    variants: [
      { unit: 'Pack of 25', price: 249 },
      { unit: 'Pack of 50', price: 479 },
      { unit: 'Pack of 100', price: 929 }
    ]
  },
  {
    id: 'pk-03',
    name: 'PK-03: Burger Boxes',
    category: 'eco',
    subcategory: 'Food Packaging Boxes',
    price: 149,
    unit: 'Pack of 25',
    description: 'Perfect dimensions for standard gourmet burgers. Keeps buns crispy and juices thoroughly sealed.',
    benefits: [
      'Eliminates the standard soggy bun syndrome',
      'Compact geometry fits single hamburger items perfectly',
      'No dyes or chemical bleaching agents'
    ],
    highlights: ['Slick fit for eco-friendly fast food houses', 'Double-tab security lock prevent popouts'],
    rating: 4.9,
    reviewsCount: 156,
    inStock: true,
    image: '/src/assets/images/burger_box_1781171344007.png',
    imagePrompt: 'biodegradable single burger packaging boxes, empty, open and closed, zero food, isolated on pure white background, professional product catalog style, lighting, centered',
    variants: [
      { unit: 'Pack of 25', price: 149 },
      { unit: 'Pack of 50', price: 279 },
      { unit: 'Pack of 100', price: 529 }
    ]
  },
  {
    id: 'pk-05',
    name: 'PK-05: Delivery Packaging Containers',
    category: 'eco',
    subcategory: 'Food Packaging Boxes',
    price: 219,
    unit: 'Pack of 25',
    description: 'Ultra heavy-duty delivery tubs with secure, snug-fitting eco lids. Keeps stews and gravies warm and stable through bike delivery transits.',
    benefits: [
      'Snug fit seals help lock hot soups inside',
      'Rigid walls hold up well inside heavy backpack cargo',
      'Keeps hot foods sizzling until delivery client opens it'
    ],
    highlights: ['Premium choice for gourmet takeout delivery apps', 'Sturdy and reliable alternative to plastic containers'],
    rating: 4.9,
    reviewsCount: 72,
    isNew: true,
    inStock: true,
    image: '/src/assets/images/delivery_containers_1781173008835.png',
    imagePrompt: 'stack of biodegradable sugarcane bagasse food delivery containers with lids, empty, zero food, clean white background, commercial product photography, eco-friendly takeaway packaging, isolated product image, professional catalog style, centered',
    variants: [
      { unit: 'Pack of 25', price: 219 },
      { unit: 'Pack of 50', price: 419 },
      { unit: 'Pack of 100', price: 799 }
    ]
  }
];

export const mockReviews: UserReview[] = [
  {
    id: 'r1',
    userName: 'Meera Deshmukh',
    rating: 5,
    comment: 'The classic pure jaggery dissolved perfectly in my filter coffee. The taste is incredibly rich and authentic, reminding me of actual sugar mill farms from my childhood.',
    date: 'June 2, 2026',
    productName: 'Classic Pure Jaggery'
  },
  {
    id: 'r2',
    userName: 'Karthik S.',
    rating: 5,
    comment: 'Used the EP-01 round plates for my daughter’s wedding banquet of 300 guests. Event coordinators were thoroughly impressed with how rigid they felt even under heavy gravy-filled food. Highly recommended!',
    date: 'May 28, 2026',
    productName: 'EP-01: Round Dinner Plates (10 inch)'
  },
  {
    id: 'r3',
    userName: 'Elena Petrova',
    rating: 5,
    comment: 'Zero soggy straws! Finally a plant fiber straw that stays solid throughout the evening. The kids are happy, safe, and we’re doing our part for the ocean.',
    date: 'June 9, 2026',
    productName: 'ST-01: Standard Straws'
  },
  {
    id: 'r4',
    userName: 'Chef Rajiv Mehta',
    rating: 4,
    comment: 'Subscribed to the bottled sugar cane juice weekly delivery for our restaurant beverages. It is always consistently high-quality, cold-press fresh, and customers absolutely adore the lemon juice twist.',
    date: 'June 5, 2026',
    productName: 'Classic Fresh Juice'
  }
];
