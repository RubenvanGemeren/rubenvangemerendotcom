import Layout from "@/components/Layout";
import Section from "@/components/Section";
import BlogPostContent from "@/components/blog/BlogPostContent";

export const dynamic = "force-dynamic";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  return (
    <Layout>
      <Section className="py-12 lg:py-16">
        <BlogPostContent slug={slug} />
      </Section>
    </Layout>
  );
}
