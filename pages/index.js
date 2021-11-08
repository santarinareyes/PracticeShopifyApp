import { useState } from "react";
import { Page, EmptyState, Layout } from "@shopify/polaris";
import { ResourcePicker } from "@shopify/app-bridge-react";
import store from "store-js";

const Index = () => {
  const [modal, setModal] = useState({ open: false });
  const emptyState = !store.get("ids");

  const handleSelection = ({ selection }) => {
    const idsFromSelection = selection.map((product) => product.id);
    setModal({ open: false });
    store.set("ids", idsFromSelection);
  };

  const handleClick = () => {
    setModal({ open: !modal });
  };

  return (
    <Page>
      <ResourcePicker
        resourceType="Product"
        open={modal.open}
        onCancel={handleClick}
        onSelection={handleSelection}
        showVariants={false}
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
