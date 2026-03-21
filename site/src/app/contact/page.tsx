import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the AI Productivity Hub team. Questions, suggestions, partnership inquiries, or tool submissions welcome.",
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Contact Us</h1>

      <p className="text-lg text-gray-700 mb-8">
        Have questions, suggestions, or feedback? We would love to hear from you.
        Fill out the form below and our team will get back to you as soon as
        possible.
      </p>

      <ContactForm />
    </div>
  );
}
