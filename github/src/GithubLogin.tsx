import { Component, ReactNode } from "react";
import PopupWindow from "./PopupWindow";
import { toQuery } from "./utils";

interface GitHubLoginProps {
  buttonText?: string;
  children?: ReactNode;
  className?: string;
  clientId: string;
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

  onBtnClick = () => {
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
      (data: any) => this.onSuccess(data),
      (error: Error) => this.onFailure(error),
    );
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
