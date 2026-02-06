import Layout from "@/components/Layout";
import Section from "@/components/Section";
import BlogListContent from "@/components/blog/BlogListContent";

export const dynamic = "force-dynamic";

export default function BlogPage() {
  return (
    <Layout>
      <Section className="py-12 lg:py-16">
        <BlogListContent />
      </Section>
    </Layout>
  );
}
