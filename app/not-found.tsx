import Link from "next/link";
import Layout from "@/components/Layout";
import Section from "@/components/Section";

export default function NotFound() {
  return (
    <Layout>
      <Section className="py-12 lg:py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-text mb-4">404</h1>
          <p className="text-lg text-text-subtle mb-8">Page not found</p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-primary text-white rounded-button hover:opacity-90 transition-opacity"
          >
            Go Home
          </Link>
        </div>
      </Section>
    </Layout>
  );
}

