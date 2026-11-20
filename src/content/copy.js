// Roman Urdu: File frontend/src/content/copy.js ka code. Har line ki tafseel CODE-LINE-BY-LINE-ROMAN-URDU.md mein milti hai.
// /* ==========================================================================
//    STOREFRONT COPY: every visible headline and paragraph lives here so the
//    voice stays consistent and one file edit changes the wording site-wide.
//    Voice: calm, specific, confident. Plain verbs. No hype, no invented
//    claims (no fake reviews, discounts, delivery promises or awards).
//    Links use the existing routes; adjust category names to match /api/categories.
//    ========================================================================== */
// export const brand = {
//   name: 'Aurangzaib',
//   descriptor: 'Men’s wear',
//   logo: '/images/logo.jpg',  // supplied brand logo (white on black)
//   mark: '/images/logo-mark.jpg',        // monogram crop used in the header
//   logoAlt: 'Aurangzaib Men’s Wear',
// }

// export const announcement = {
//   text: 'Cash on delivery is available on every order.',
//   link: { label: 'Book a fitting', to: '/appointment' },
// }

// export const nav = {
//   actions: [
//     { label: 'New arrival', to: '/shop?newArrival=1' },
//     { label: 'Appointment', to: '/appointment' },
//   ],
// }

// // export const hero = {
// //   lines: ['Tailored for', 'every occasion.'],
// //   body: 'Eastern and western menswear, cut with care for the way you work, dress and celebrate.',
// //   primary: { label: 'Shop new arrivals', to: '/shop?newArrival=1' },
// //   secondary: { label: 'Book an appointment', to: '/appointment' },
// // image: '/images/hero.svg.webp'
// // }


// export const hero = {
//   lines: ['Tailored for', 'every occasion.'],
//   body: 'Eastern and western menswear, cut with care for the way you work, dress and celebrate.',
//   primary: {
//     label: 'Shop new arrivals',
//     to: '/shop?newArrival=1'
//   },
//   secondary: {
//     label: 'Book an appointment',
//     to: '/appointment'
//   },
// // image: '/images/hero.svg.webp'
// }


// export const trust = ['Cash on delivery', 'Tailoring by appointment', 'Size guide on every product page']

// export const newArrivals = {
//   title: 'New arrivals',
//   body: 'The latest eastern and western pieces, added to the collection.',
//   cta: { label: 'View all', to: '/shop?newArrival=1' },
// }

// export const wedding = {
//   title: 'Wedding season',
//   body: 'Sherwanis, waistcoats and prince coats for the days everyone remembers.',
//   tiles: [
//     { title: 'Sherwani', cta: 'Shop sherwanis', to: '/shop?category=Eastern%20Wear&subCategory=Sherwani', image: '' },
//     { title: 'Waistcoats', cta: 'Shop waistcoats', to: '/shop?category=Eastern%20Wear&subCategory=Waistcoats', image: '' },
//     { title: 'Prince coats', cta: 'Shop prince coats', to: '/shop?category=Eastern%20Wear&subCategory=Prince%20Coat', image: '' },
//   ],
// }

// export const essentials = {
//   title: 'Casual and formal essentials',
//   body: 'Kurtas, shirts and suits you can reach for any day of the week.',
//   tiles: [
//     { title: 'Everyday eastern wear', cta: 'Shop eastern wear', to: '/shop?category=Eastern%20Wear', image: '' },
//     { title: 'Tailored western wear', cta: 'Shop western wear', to: '/shop?category=Western%20Wear', image: '' },
//   ],
// }

// export const madeToMeasure = {
//   title: 'Made to measure. Made for you.',
//   rows: [
//     {
//       heading: 'Unmatched quality',
//       body: 'We choose each fabric for how it drapes, holds its shape and wears over the years. The details you notice up close are the ones we spend the most time on.',
//       image: '', alt: 'Close view of tailoring fabric and stitching',
//     },
//     {
//       heading: 'Made for you',
//       body: 'Visit for a fitting or book a home visit. We take your measurements and cut to your frame, so the garment sits right the first time you wear it.',
//       image: '', alt: 'A tailor taking measurements',
//       cta: { label: 'Book a consultation', to: '/appointment' },
//       secondary: { label: 'Shop the collection', to: '/shop' },
//     },
//   ],
// }

// export const footer = {
//   about: 'Eastern and western menswear, with tailoring by appointment.',
//   columns: [
//     { title: 'Shop', links: [
//       { label: 'Eastern wear', to: '/shop?category=Eastern%20Wear' },
//       { label: 'Western wear', to: '/shop?category=Western%20Wear' },
//       { label: 'Accessories', to: '/shop?category=Accessories' },
//       { label: 'Footwear', to: '/shop?category=Footwear' },
//       { label: 'New arrival', to: '/shop?newArrival=1' },
//     ]},
//     { title: 'Help', links: [
//       { label: 'Book an appointment', to: '/appointment' },
//       { label: 'Contact us', to: '/contact' },
//       { label: 'Gallery', to: '/gallery' },
//     ]},
//   ],
//   newsletter: {
//     title: 'Stay in the loop',
//     body: 'Occasional updates on new arrivals and tailoring.',
//     placeholder: 'Email address',
//     button: 'Subscribe',
//     success: 'You’re subscribed. Thank you.',
//     error: 'We couldn’t subscribe you. Check the email address and try again.',
//   },
// }

// /* Interface states: say what happened and what to do next. */
// export const states = {
//   loading: 'Loading the collection',
//   error: 'We couldn’t load the products. Check your connection and try again.',
//   retry: 'Try again',
//   emptyShop: 'No pieces match these filters.',
//   clearFilters: 'Clear filters',
//   emptyBag: 'Your bag is empty.',
//   continueShopping: 'Continue shopping',
//   addToBag: 'Add to bag',
//   chooseSize: 'Choose a size to add this to your bag',
//   soldOut: 'Sold out',
// }



/* ==========================================================================
   STOREFRONT COPY & HOME PAGE IMAGES
   All editable text and image paths are managed from this file.
   ========================================================================== */

// BRAND
export const brand = {
  name: 'Aurangzaib',
  descriptor: 'Men’s wear',
  logo: '/images/logo.jpg',
  mark: '/images/logo-mark.jpg',
  logoAlt: 'Aurangzaib Men’s Wear',
}

// ALL HOME PAGE IMAGES
// Add your image files inside frontend/public/images/

export const homeImages = {
  hero: '/images/hero-fashion.webp',

  weddingSherwani: '/images/wedding-1.webp',
  weddingWaistcoat: '/images/wedding-2.webp',
  weddingPrinceCoat: '/images/wedding-3.webp',

  everydayEastern: '/images/essentials-1.webp',
  tailoredWestern: '/images/essentials-2.webp',

  qualityFabric: '/images/mtm-1.webp',
  madeToMeasure: '/images/mtm-2.webp',
}

// ANNOUNCEMENT
export const announcement = {
  text: 'Cash on delivery is available on every order.',
  link: {
    label: 'Book a fitting',
    to: '/appointment'
  },
}

// NAVIGATION
export const nav = {
  actions: [
    { label: 'New arrival', to: '/shop?newArrival=1' },
    { label: 'Appointment', to: '/appointment' },
  ],
}

// HERO SECTION
export const hero = {
  lines: ['Tailored for', 'every occasion.'],
  body: 'Eastern and western menswear, cut with care for the way you work, dress and celebrate.',
  primary: {
    label: 'Shop new arrivals',
    to: '/shop?newArrival=1'
  },
  secondary: {
    label: 'Book an appointment',
    to: '/appointment'
  },
  image: homeImages.hero,
}

// TRUST STRIP
export const trust = [
  'Cash on delivery',
  'Tailoring by appointment',
  'Size guide on every product page'
]

// NEW ARRIVALS
export const newArrivals = {
  title: 'New arrivals',
  body: 'The latest eastern and western pieces, added to the collection.',
  cta: {
    label: 'View all',
    to: '/shop?newArrival=1'
  },
}

// WEDDING SEASON
export const wedding = {
  title: 'Wedding season',
  body: 'Sherwanis, waistcoats and prince coats for the days everyone remembers.',

  tiles: [
    {
      title: 'Sherwani',
      cta: 'Shop sherwanis',
      to: '/shop?category=Eastern%20Wear&subCategory=Sherwani',
      image: homeImages.weddingSherwani
    },
    {
      title: 'Waistcoats',
      cta: 'Shop waistcoats',
      to: '/shop?category=Eastern%20Wear&subCategory=Waistcoats',
      image: homeImages.weddingWaistcoat
    },
    {
      title: 'Prince coats',
      cta: 'Shop prince coats',
      to: '/shop?category=Eastern%20Wear&subCategory=Prince%20Coat',
      image: homeImages.weddingPrinceCoat
    },
  ],
}

// CASUAL & FORMAL ESSENTIALS
export const essentials = {
  title: 'Casual and formal essentials',
  body: 'Kurtas, shirts and suits you can reach for any day of the week.',

  tiles: [
    {
      title: 'Everyday eastern wear',
      cta: 'Shop eastern wear',
      to: '/shop?category=Eastern%20Wear',
      image: homeImages.everydayEastern
    },
    {
      title: 'Tailored western wear',
      cta: 'Shop western wear',
      to: '/shop?category=Western%20Wear',
      image: homeImages.tailoredWestern
    },
  ],
}

// MADE TO MEASURE
export const madeToMeasure = {
  title: 'Made to measure. Made for you.',

  rows: [
    {
      heading: 'Unmatched quality',
      body: 'We choose each fabric for how it drapes, holds its shape and wears over the years. The details you notice up close are the ones we spend the most time on.',
      image: homeImages.qualityFabric,
      alt: 'Close view of tailoring fabric and stitching',
    },
    {
      heading: 'Made for you',
      body: 'Visit for a fitting or book a home visit. We take your measurements and cut to your frame, so the garment sits right the first time you wear it.',
      image: homeImages.madeToMeasure,
      alt: 'A tailor taking measurements',

      cta: {
        label: 'Book a consultation',
        to: '/appointment'
      },

      secondary: {
        label: 'Shop the collection',
        to: '/shop'
      },
    },
  ],
}

// FOOTER
export const footer = {
  about: 'Eastern and western menswear, with tailoring by appointment.',

  columns: [
    {
      title: 'Shop',
      links: [
        { label: 'Eastern wear', to: '/shop?category=Eastern%20Wear' },
        { label: 'Western wear', to: '/shop?category=Western%20Wear' },
        { label: 'Accessories', to: '/shop?category=Accessories' },
        { label: 'Footwear', to: '/shop?category=Footwear' },
        { label: 'New arrival', to: '/shop?newArrival=1' },
      ]
    },
    {
      title: 'Help',
      links: [
        { label: 'Book an appointment', to: '/appointment' },
        { label: 'Contact us', to: '/contact' },
        { label: 'Gallery', to: '/gallery' },
      ]
    },
  ],

  newsletter: {
    title: 'Stay in the loop',
    body: 'Occasional updates on new arrivals and tailoring.',
    placeholder: 'Email address',
    button: 'Subscribe',
    success: 'You’re subscribed. Thank you.',
    error: 'We couldn’t subscribe you. Check the email address and try again.',
  },
}

// INTERFACE STATES
export const states = {
  loading: 'Loading the collection',
  error: 'We couldn’t load the products. Check your connection and try again.',
  retry: 'Try again',
  emptyShop: 'No pieces match these filters.',
  clearFilters: 'Clear filters',
  emptyBag: 'Your bag is empty.',
  continueShopping: 'Continue shopping',
  addToBag: 'Add to bag',
  chooseSize: 'Choose a size to add this to your bag',
  soldOut: 'Sold out',
}
