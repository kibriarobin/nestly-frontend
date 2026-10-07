export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ: FaqItem[] = [
  {
    question: "How do I rent a flat or a room?",
    answer:
      "Find a listing you like and send an application with a short message. The owner reviews it. If approved, a booking is created for you and you pay online to confirm it.",
  },
  {
    question: "Can I rent just one room?",
    answer:
      "Yes. Many flats list their rooms separately, so you can apply for a single room or for the whole flat, depending on what the owner offers.",
  },
  {
    question: "How does payment work?",
    answer:
      "After the owner approves your application you pay through the SSLCommerz checkout. Your booking is confirmed once the payment succeeds. In this demo, payments run in test mode, so no real money moves.",
  },
  {
    question: "Why can't I see my property after adding it?",
    answer:
      "An admin reviews every new property before it goes public. You can follow its status (pending, approved or rejected) under My properties.",
  },
  {
    question: "Can I cancel an application or a booking?",
    answer:
      "You can withdraw an application while it is still in review, and cancel a booking before you pay. Once a payment is confirmed, please contact the owner about any changes.",
  },
  {
    question: "How do I list my own property?",
    answer:
      "Create a free owner account, then use Add property to enter the property, its flats and optional rooms. After admin approval it appears for tenants, and you can manage applications and track earnings from your dashboard.",
  },
];
