/**
 * Office, Google Business Profile and social links, shared by the contact page,
 * the footer and the structured data. Name, address and phone must match the
 * Google Business Profile exactly.
 */

const PLACE_ID = "ChIJk8OIBEGTIwIRezVDLILreRo";

export const OFFICE = {
  name: "Frontline Financial Group",
  street: "Level 49, 8 Parramatta Square",
  locality: "Parramatta",
  region: "NSW",
  postcode: "2150",
  full: "Level 49, 8 Parramatta Square, Parramatta NSW 2150",
  phone: "+61 422 959 486",
  phoneHref: "tel:+61422959486",
  email: "operations@frontline.financial",
  geo: { latitude: -33.8169037, longitude: 151.0046739 },
};

export const GOOGLE = {
  placeId: PLACE_ID,
  listingUrl: "https://maps.google.com/?cid=1907814861488993659",
  directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    "Frontline Financial Group, Level 49, 8 Parramatta Square, Parramatta NSW 2150",
  )}&destination_place_id=${PLACE_ID}`,
  reviewsUrl: `https://search.google.com/local/reviews?placeid=${PLACE_ID}`,
  writeReviewUrl: "https://g.page/r/CXs1QyyC63kaEBM/review",
  mapEmbedSrc:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3314.8221012342337!2d151.0046739!3d-33.81690369999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x22393410488c393%3A0x1a79eb822c43357b!2sFrontline%20Financial%20Group!5e0!3m2!1sen!2sau!4v1793257633305!5m2!1sen!2sau",
};

export const SOCIAL = {
  facebook: "https://www.facebook.com/profile.php?id=61560475306366",
  instagram: "https://www.instagram.com/frontline.financial.group/",
  linkedin: "https://au.linkedin.com/company/frontline-financial-group",
};
