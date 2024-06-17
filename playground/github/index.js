import React from "react";
import ReactDom from "react-dom";
import { GitHubLogin } from "../../packages/github/src/index";

const onSuccess = (response) => console.log(response);
const onFailure = (response) => console.error(response);

ReactDom.render(
  <GitHubLogin
    clientId="03d37407ddbb08b90ec7"
    redirectUri="http://localhost:3000"
    onSuccess={(response) => console.log(response)}
    onFailure={(error) => console.error(error)}
  />,
  document.getElementById("root"),
);
