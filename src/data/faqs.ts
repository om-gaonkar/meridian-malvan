import type { Faq } from "@/types/content";

/** Items with answer: null are hidden on the live site until the hotel supplies them. */
export const faqs: Faq[] = [
  {
    id: "how-to-book",
    question: "How do I book a stay?",
    answer:
      "Send an inquiry with your dates and the number of guests. The hotel team checks availability and rates and gets back to you directly. Nothing is reserved until they confirm.",
  },
  {
    id: "online-payment",
    question: "Can I see live availability or pay online?",
    answer:
      "Not on this website yet. It works as an inquiry service only, and no payment is taken online.",
  },
  {
    id: "best-time",
    question: "When is the best time to visit Malvan?",
    answer:
      "Most visitors come between October and May, when the sea is calmer and water sports and boat trips to Sindhudurg Fort usually run. The monsoon months, June to September, often bring rough seas and suspended activities, so check with operators before you plan around them.",
  },
  {
    id: "activities",
    question: "Does the hotel arrange fort visits or water sports?",
    answer:
      "Water sports and fort boats in Malvan are run by independent local operators. Ask in your inquiry what help the hotel can offer.",
  },
  { id: "check-in-times", question: "What are the check-in and check-out times?", answer: null },
  { id: "breakfast", question: "Is breakfast included?", answer: null },
];
