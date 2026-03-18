import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">About AI Productivity Hub</h1>
      <section className="prose prose-lg max-w-none">
        <p className="mb-6">
          Welcome to AI Productivity Hub, your premier destination for
          discovering how artificial intelligence can transform your workflow and
          boost your efficiency.
        </p>
        <p className="mb-6">
          Our mission is to bridge the gap between cutting-edge AI technology and
          practical, everyday use. We believe that AI should not be intimidating
          or reserved for tech experts. Instead, it should be accessible to
          everyone looking to work smarter, save time, and achieve more. We
          provide in-depth reviews, tutorials, and comparisons of the latest AI
          tools to help you make informed decisions about your tech stack.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">What We Offer</h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            <strong>Expert Analysis of AI Software</strong> &mdash; We test and
            review the most popular AI productivity tools so you do not have to
            wade through marketing fluff to find what actually works.
          </li>
          <li>
            <strong>Step-by-Step Automation Guides</strong> &mdash; Practical
            tutorials that walk you through automating repetitive tasks, from
            meeting notes to document signing to content creation.
          </li>
          <li>
            <strong>Curated Tool Lists</strong> &mdash; Hand-picked
            recommendations organized by industry, use case, and budget so you
            can find the right tool for your specific needs.
          </li>
          <li>
            <strong>Latest AI News &amp; Trends</strong> &mdash; Stay ahead of
            the curve with our coverage of the rapidly evolving world of
            artificial intelligence and how it impacts productivity.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Who We Serve</h2>
        <p className="mb-4">
          AI Productivity Hub is built for anyone who wants to reclaim their time
          and work more effectively:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            <strong>Freelancers</strong> who juggle multiple clients and need to
            streamline admin, invoicing, and content creation.
          </li>
          <li>
            <strong>Small Business Owners</strong> looking for affordable AI
            solutions to compete with larger organizations.
          </li>
          <li>
            <strong>Enterprise Teams</strong> seeking scalable tools to improve
            collaboration, training, and customer support.
          </li>
          <li>
            <strong>Anyone who wants to work smarter</strong> &mdash; whether you
            are a student, a creative professional, or simply curious about how
            AI can help you get more done in less time.
          </li>
        </ul>
        <p>
          Whether you are just starting to explore AI or you are ready to
          overhaul your entire workflow, AI Productivity Hub is here to guide
          you every step of the way.
        </p>
      </section>
    </div>
  );
}
