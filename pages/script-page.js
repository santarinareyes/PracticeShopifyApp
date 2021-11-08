import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";

const ScriptPage = () => {
  return (
    <div>
      <h1>Script Page</h1>
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
