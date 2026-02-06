import Layout from "@/components/Layout";
import Section from "@/components/Section";
import AdminPageContent from "@/components/blog/AdminPageContent";

export const dynamic = "force-dynamic";

export default function BlogAdminPage() {
  return (
    <Layout>
      <Section className="py-12 lg:py-16">
        <AdminPageContent />
      </Section>
    </Layout>
  );
}
