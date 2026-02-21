import Layout from "@/components/Layout";
import Section from "@/components/Section";
import BlogListContent from "@/components/blog/BlogListContent";
import HeaderV2 from "@/components/Headerv2";

export const dynamic = "force-dynamic";

export default function BlogPage() {
  return (
    <Layout>
      <HeaderV2 />
      <Section>
        <BlogListContent />
      </Section>
    </Layout>
  );
}
