import { Heading, Page, EmptyState, Layout } from "@shopify/polaris";

const Index = () => (
  <Page>
    <Layout>
      <EmptyState
        heading="Manage your inventory transfers"
        action={{ content: "Select products" }}
        secondaryAction={{
          content: "Learn more",
          url: "https://help.shopify.com",
        }}
        image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
      >
        <p>Select Products</p>
      </EmptyState>
    </Layout>
  </Page>
);

export default Index;
