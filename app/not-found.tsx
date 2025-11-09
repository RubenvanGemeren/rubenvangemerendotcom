import Layout from "@/components/Layout";
import Section from "@/components/Section";
import NotFoundContent from "@/components/NotFoundContent";

export default function NotFound() {
  return (
    <Layout>
      <Section className="py-12 lg:py-16">
        <NotFoundContent />
      </Section>
    </Layout>
  );
}

