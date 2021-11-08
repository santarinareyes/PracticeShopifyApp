import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";

const ScriptPage = () => {
  const [createScriptTag] = useMutation(CREATE_SCRIPT_TAG);
  const { loading, error, data } = useQuery(GET_SCRIPT_TAGS);

  const handleCreateScriptTag = () => {
    console.log("Script tag created");

    createScriptTag({
      variables: {
        input: {
          src: "https://4587-188-149-211-205.ngrok.io/test-script.js",
          displayScope: "ALL",
        },
      },
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  console.log("data", data);

  return (
    <div>
      <h1>Current script tags:</h1>
      <button onClick={handleCreateScriptTag}>Create Script Tag</button>
      {data.scriptTags.edges.map((item) => {
        return (
          <div key={item.node.id}>
            <p>{item.node.id}</p>
          </div>
        );
      })}
    </div>
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
