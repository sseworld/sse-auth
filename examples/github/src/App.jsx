import React from "react";
// import { GitHubLogin } from "../../../github/dist/index";
import { GitHubLogin } from "@sse-auth/github/src/GithubLogin";

function App() {
  const onSuccess = (response) => console.log(response);
  const onFailure = (error) => console.error(error);

  return (
    <>
      <GitHubLogin
        clientId="Ov23liiLLI41odEdI1pl"
        clientSecret="cf306a48f33d241e3a77ed3ff1c45a67f7af59bd"
        onSuccess={(userDetails) => {
          console.log("User details:", userDetails);
          const username = userDetails.login;
          const email = userDetails.email;
          console.log("Username:", username);
          console.log("Email:", email);
        }}
        onFailure={onFailure}
      />
    </>
  );
}

export default App;
