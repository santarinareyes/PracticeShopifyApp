import { useState } from "react";
import { Heading, Page, EmptyState, Layout } from "@shopify/polaris";
import createApp from "@shopify/app-bridge";
import { ResourcePicker } from "@shopify/app-bridge-react";

const Index = () => {
  const [modal, setModal] = useState({ open: false });

  const handleClick = () => {
    setModal({ open: !modal });
  };

  return (
    <Page>
      <ResourcePicker
        resourceType="Product"
        open={modal.open}
        onCancel={handleClick}
      />
      <Layout>
        <EmptyState
          heading="Manage your inventory transfers"
          action={{
            content: "Select products",
            onAction: () => setModal({ open: true }),
          }}
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
};
export default Index;
