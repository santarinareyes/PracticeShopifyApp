import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  Card,
  ResourceList,
  Stack,
  Button,
  Layout,
  Page,
} from "@shopify/polaris";

const ScriptPage = () => {
  const [createScriptTag] = useMutation(CREATE_SCRIPT_TAG);
  const [deleteScriptTag] = useMutation(DELETE_SCRIPT_TAG);
  const { loading, error, data } = useQuery(GET_SCRIPT_TAGS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  console.log("data", data);

  return (
    <Page>
      <Layout>
        <Layout.Section>
          <Card title="Script Tags:" sectioned>
            <p>Inside</p>
          </Card>
        </Layout.Section>
        <Layout.Section secondary>
          <Card title="Create Tag" sectioned>
            <Button
              primary
              size="slim"
              type="submit"
              onClick={() =>
                createScriptTag({
                  variables: {
                    input: {
                      src:
                        "https://2d48-188-149-211-205.ngrok.io/test-script.js",
                      displayScope: "ALL",
                    },
                  },
                  refetchQueries: [{ query: GET_SCRIPT_TAGS }],
                })
              }
            >
              Create Tag
            </Button>
          </Card>
        </Layout.Section>
        <Layout.Section>
          <Card>
            <ResourceList
              showHeader
              resourceName={{ singular: "Script", plural: "Scripts" }}
              items={data.scriptTags.edges}
              renderItem={(item) => {
                return (
                  <ResourceList.Item id={item.id}>
                    <Stack>
                      <Stack.Item>
                        <p>{item.node.id}</p>
                      </Stack.Item>
                      <Button
                        type="submit"
                        onClick={() =>
                          deleteScriptTag({
                            variables: {
                              id: item.node.id,
                            },
                            refetchQueries: [{ query: GET_SCRIPT_TAGS }],
                          })
                        }
                      >
                        Delete Script Tag
                      </Button>
                    </Stack>
                  </ResourceList.Item>
                );
              }}
            />
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default ScriptPage;

const CREATE_SCRIPT_TAG = gql`
  mutation scriptTagCreate($input: ScriptTagInput!) {
    scriptTagCreate(input: $input) {
      scriptTag {
        id
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const GET_SCRIPT_TAGS = gql`
  query {
    scriptTags(first: 5) {
      edges {
        node {
          id
          src
          displayScope
        }
      }
    }
  }
`;

const DELETE_SCRIPT_TAG = gql`
  mutation scriptTagDelete($id: ID!) {
    scriptTagDelete(id: $id) {
      deletedScriptTagId
      userErrors {
        field
        message
      }
    }
  }
`;
