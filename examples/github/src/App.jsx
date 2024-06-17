import React from "react";
import { GitHubLogin } from "../../../packages/github/src/index";

function App() {
  const onSuccess = (response) => console.log(response);
  const onFailure = (error) => console.error(error);

  return (
    <>
      <GitHubLogin
        clientId="Ov23liiLLI41odEdI1pl"
        onSuccess={onSuccess}
        onFailure={onFailure}
      />
    </>
  );
}

export default App;
