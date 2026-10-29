import type { Experience } from "@/types/content";

/**
 * Destination facts checked against the sources listed per entry (October 2026).
 * Re-verify before publishing, and never imply the hotel runs these activities
 * unless that has been confirmed.
 */
export const experiences: Experience[] = [
  {
    id: "sindhudurg-fort",
    title: "Sindhudurg Fort",
    summary:
      "A sea fort on a rocky island just off Malvan, reached by a short boat ride from the town’s jetty.",
    details: [
      "Chhatrapati Shivaji Maharaj chose the island of Kurte for a naval stronghold in 1664, and records give 1667 as the year work was completed. The island sits about a kilometre from Malvan’s harbour, so the crossing is brief.",
      "Allow two to three hours to walk the ramparts and look around the island.",
    ],
    goodToKnow:
      "Boat timings, fares and seasonal closures are set locally and can change, especially in the monsoon. Confirm before you travel.",
    sources: [
      "https://en.wikipedia.org/wiki/Sindhudurg_Fort",
      "https://durgbharari.in/sindhudurg/",
      "https://www.outlooktraveller.com/explore/features/maharashtra-malvan-maratha-heritage",
    ],
    image: null,
  },
  {
    id: "tarkarli-devbag",
    title: "Tarkarli and Devbag beaches",
    summary:
      "Two of the best-known stretches of coast near Malvan, with calm water and, at Devbag, a river meeting the sea.",
    details: [
      "Tarkarli’s beach and neighbouring Devbag are popular for relaxed days by the water. At Devbag, the Karli river joins the Arabian Sea at a spot known as the sangam.",
    ],
    goodToKnow:
      "Sea conditions change with the tide and the season. Follow local advice and stay out of the water when it is rough.",
    sources: [
      "https://www.ixigo.com/plan/malvan",
      "https://www.trawell.in/maharashtra/malvan-sindhudurg/devbagh-beach",
      "https://maharashtratourism.gov.in/?p=8074",
    ],
    image: null,
  },
  {
    id: "water-sports",
    title: "Snorkelling, scuba and water sports",
    summary:
      "Independent operators around Sindhudurg fort, Tarkarli, Devbag and the fort offer snorkelling, scuba and other water activities.",
    details: [
      "Activities are generally available from about October to May, when the sea is calmer. During the monsoon, June to September, rough seas usually suspend them.",
      "Beginners are catered for at several operators near sindhudurg fort, Tarkarli, with instructors on hand for first-time divers.",
    ],
    goodToKnow:
      "Operators are independent businesses. Meridian Malvan does not run these activities unless this site says so. Carry some cash, as card payments are not always accepted.",
    sources: [
      "https://www.ixigo.com/plan/malvan",
      "https://trekgo.in/blog/top-things-to-do-in-tarkarli-and-malvan",
      "https://www.trawell.in/maharashtra/malvan-sindhudurg/devbagh-beach",
    ],
    image: null,
  },
  {
    id: "malvani-food",
    title: "Malvani cooking",
    summary:
      "A coastal cuisine built on coconut, kokum and the day’s catch, and one of the main reasons people visit Malvan.",
    details: [
      "Fish dominates the table, whether fried or cooked in a coconut-and-masala curry. Look for kombdi vade, a chicken curry served with fried bread, and sol kadhi, a tangy pink drink of kokum and coconut milk.",
      "Cashews are used as a vegetable here too, in dishes such as cashew amti. Most Malvani food is non-vegetarian, but vegetarian dishes exist.",
    ],
    goodToKnow: "Ask what is freshest that day. Fish dishes vary with the season and the catch.",
    sources: [
      "https://en.wikipedia.org/wiki/Malvani_cuisine",
      "https://www.thenewsminute.com/features/kombdi-vade-dhondas-malvani-cuisine-boasts-variety-delectable-dishes-68222",
    ],
    image: null,
  },
];
