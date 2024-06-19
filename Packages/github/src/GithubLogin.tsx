import { Component, ReactNode } from "react";
import axios from "axios";
import PopupWindow from "./PopupWindow";
import { toQuery } from "./utils";

interface GitHubLoginProps {
  buttonText?: string;
  children?: ReactNode;
  className?: string;
  clientId: string;
  clientSecret: string;
  onRequest?: () => void;
  onSuccess?: (data: any) => void;
  onFailure?: (error: Error) => void;
  redirectUri: string;
  scope: string;
}

interface GitHubLoginState {}

class GitHubLogin extends Component<GitHubLoginProps, GitHubLoginState> {
  static defaultProps = {
    buttonText: "Sign in with GitHub",
    redirectUri: "",
    scope: "user:email",
    onRequest: () => {},
    onSuccess: () => {},
    onFailure: () => {},
  };

  popup: any;

  onBtnClick = async () => {
    const { clientId, scope, redirectUri } = this.props;
    const search = toQuery({
      client_id: clientId,
      scope,
      redirect_uri: redirectUri,
    });
    const popup = (this.popup = PopupWindow.open(
      "github-oauth-authorize",
      `https://github.com/login/oauth/authorize?${search}`,
      { height: 1000, width: 600 },
    ));

    this.onRequest();
    popup.then(
      (data: any) => {
        if (!data.code) {
          throw new Error("'code' not found");
        }
        this.onSuccess(data);
        // Get user details after successful login
        const userDetails = this.getUserDetails(data.code);
        if (this.props.onSuccess) {
          this.props.onSuccess(userDetails);
        }
      },
      (error: any) => {
        this.onFailure(error);
      },
    );
    // try {
    //   const data = await popup;
    //   if (!data.code) {
    //     throw new Error("'code' not found");
    //   }
    //   this.onSuccess(data);
    //   // Get user details after successful login
    //   const userDetails = await this.getUserDetails(data.code);
    //   if (this.props.onSuccess) {
    //     this.props.onSuccess(userDetails);
    //   }
    // } catch (error) {
    //   // this.onFailure(error);
    // }
  };

  getUserDetails = async (code: string) => {
    const { clientId, redirectUri, clientSecret } = this.props;
    const tokenResponse = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        code,
      },
      { headers: { Accept: "application/json" } },
    );

    const accessToken = tokenResponse.data.access_token;
    const userDetailsResponse = await axios.get(`https://api.github.com/user`, {
      headers: { Authorization: `token ${accessToken}` },
    });
    return userDetailsResponse.data;
  };

  onRequest = () => {
    if (this.props.onRequest) {
      this.props.onRequest();
    }
  };

  onSuccess = (data: any) => {
    if (!data.code) {
      return this.onFailure(new Error("'code' not found"));
    }

    if (this.props.onSuccess) {
      this.props.onSuccess(data);
    }
  };

  onFailure = (error: Error) => {
    if (this.props.onFailure) {
      this.props.onFailure(error);
    }
  };

  render() {
    const { className, buttonText, children } = this.props;
    const attrs: any = { onClick: this.onBtnClick };

    if (className) {
      attrs.className = className;
    }

    return <button {...attrs}>{children || buttonText}</button>;
  }
}

export default GitHubLogin;
