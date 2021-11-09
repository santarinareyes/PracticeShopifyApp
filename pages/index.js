import { useState } from "react";
import { Page, EmptyState, Layout } from "@shopify/polaris";
import { ResourcePicker, TitleBar } from "@shopify/app-bridge-react";
import store from "store-js";
import ProductList from "./components/ProductList";
import axios from "axios";

const Index = () => {
  const [modal, setModal] = useState({ open: false });
  const emptyState = !store.get("ids");
  const url = "/api/products";

  const handleSelection = ({ selection }) => {
    clearApiData();
    const idsFromSelection = selection.map((product) => {
      makeApiCall(product);
      return product.id;
    });
    setModal({ open: false });
    store.set("ids", idsFromSelection);
  };

  const clearApiData = () => {
    axios.delete(url);
  };

  const makeApiCall = (products) => {
    axios
      .post(url, products)
      .then((res) => console.log("res", res))
      .catch((error) => console.log("error", error));
  };

  const handleClick = () => {
    setModal({ open: !modal });
  };

  return (
    <Page>
      <TitleBar
        primaryAction={{
          content: "Select New Products",
          onAction: () => setModal({ open: true }),
        }}
      />
      <ResourcePicker
        resourceType="Product"
        open={modal.open}
        onCancel={handleClick}
        onSelection={handleSelection}
        showVariants={false}
      />
      {emptyState ? (
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
      ) : (
        <ProductList />
      )}
    </Page>
  );
};
export default Index;
