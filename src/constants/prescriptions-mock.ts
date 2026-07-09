import type { Prescription } from "@/types";

export const prescriptionsMock: Prescription[] = [
  {
    id: "rx-1",
    patientName: "Sara Malik",
    doctorName: "Ayesha Khan",
    createdAt: "Jul 6, 2026",
    diagnosis: "Seasonal allergic rhinitis",
    medicines: [
      { name: "Cetirizine", dosage: "10mg", frequency: "Once daily", duration: "10 days" },
      { name: "Fluticasone nasal spray", dosage: "50mcg", frequency: "Twice daily", duration: "14 days" },
    ],
    notes: "Avoid known allergens. Follow up if symptoms persist beyond 2 weeks.",
  },
  {
    id: "rx-2",
    patientName: "Bilal Ahmed",
    doctorName: "Usman Tariq",
    createdAt: "Jul 4, 2026",
    diagnosis: "Mild knee joint inflammation",
    medicines: [
      { name: "Ibuprofen", dosage: "400mg", frequency: "Twice daily", duration: "7 days" },
      { name: "Topical diclofenac gel", dosage: "1%", frequency: "3 times daily", duration: "10 days" },
    ],
    notes: "Apply ice pack for 15 minutes, 3x daily. Avoid strenuous activity.",
  },
  {
    id: "rx-3",
    patientName: "Hina Farooq",
    doctorName: "Fatima Noor",
    createdAt: "Jun 29, 2026",
    diagnosis: "Contact dermatitis",
    medicines: [
      { name: "Hydrocortisone cream", dosage: "1%", frequency: "Twice daily", duration: "7 days" },
    ],
  },
  {
    id: "rx-4",
    patientName: "Zainab Sheikh",
    doctorName: "Sadia Malik",
    createdAt: "Jul 8, 2026",
    diagnosis: "Chronic migraine",
    medicines: [
      { name: "Sumatriptan", dosage: "50mg", frequency: "As needed", duration: "30 days" },
      { name: "Propranolol", dosage: "40mg", frequency: "Once daily", duration: "30 days" },
    ],
    notes: "Maintain a headache diary. Avoid triggers such as bright lights and stress.",
  },
  {
    id: "rx-5",
    patientName: "Mahnoor Iqbal",
    doctorName: "Hamza Sheikh",
    createdAt: "Jul 7, 2026",
    diagnosis: "Mild acne vulgaris",
    medicines: [
      { name: "Benzoyl peroxide gel", dosage: "2.5%", frequency: "Once daily", duration: "6 weeks" },
    ],
    notes: "Apply at night. Use sunscreen during the day.",
  },
];
