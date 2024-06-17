// import React from "react";
// import PropTypes from "prop-types";

// import PopupWindow from "./PopupWindow";
// import { toQuery } from "./utils";

// interface GitHubLoginProps {
//   buttonText?: string;
//   children?: React.ReactNode;
//   className?: string;
//   clientId: string;
//   onRequest: () => void;
//   onSuccess: (data: Record<string, string>) => void;
//   onFailure: (error: Error) => void;
//   redirectUri?: string;
//   scope?: string;
// }

// const defaultProps: GitHubLoginProps = {
//   buttonText: "Sign in with GitHub",
//   redirectUri: "",
//   scope: "user:email",
//   onRequest: () => {},
//   onSuccess: () => {},
//   onFailure: () => {},
// };

// class GithubLogin extends React.Component<GitHubLoginProps> {
//   private popup?: PopupWindow;

//   public onBtnClick = (): void => {
//     const { clientId, scope, redirectUri } = this.props;
//     const search = toQuery({
//       client_id: clientId,
//       scope,
//       redirect_uri: redirectUri,
//     });
//     this.popup = PopupWindow.open(
//       "github-oauth-authorize",
//       `https://github.com/login/oauth/authorize?${search}`,
//       { height: 1000, width: 600 },
//     );

//     this.props.onRequest();
//     this.popup.then(this.onSuccess, this.onFailure);
//   };

//   private onSuccess = (data: Record<string, string>): void => {
//     if (!data.code) {
//       return this.onFailure(new Error("'code' not found"));
//     }
//     this.props.onSuccess(data);
//   };

//   private onFailure = (error: Error): void => {
//     this.props.onFailure(error);
//   };

//   public render(): JSX.Element {
//     const { className, buttonText, children } = this.props;
//     const attrs: React.ButtonHTMLAttributes<HTMLButtonElement> = {
//       onClick: this.onBtnClick,
//     };

//     if (className) {
//       attrs.className = className;
//     }

//     return <button {...attrs}>{children || buttonText}</button>;
//   }
// }

// GitHubLogin.propTypes = {
//   buttonText: PropTypes.string,
//   children: PropTypes.node,
//   className: PropTypes.string,
//   clientId: PropTypes.string.isRequired,
//   onRequest: PropTypes.func.isRequired,
//   onSuccess: PropTypes.func.isRequired,
//   onFailure: PropTypes.func.isRequired,
//   redirectUri: PropTypes.string,
//   scope: PropTypes.string,
// };

// GitHubLogin.defaultProps = defaultProps;

// export default GitHubLogin;

import React, { FC, ButtonHTMLAttributes } from "react";
import PropTypes from "prop-types";

import PopupWindow from "./PopupWindow";
import { toQuery } from "./utils";

interface GitHubLoginProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonText: PropTypes.Requireable<string>;
  children?: React.ReactNode;
  className?: string;
  clientId: string;
  onRequest?: () => void;
  onSuccess: (data: Record<string, string>) => void;
  onFailure: (error: Error) => void;
  redirectUri?: string;
  scope?: string;
}

const GitHubLogin: FC<GitHubLoginProps> = ({
  buttonText = "Sign in with GitHub",
  redirectUri = "",
  scope = "user:email",
  onRequest = () => {},
  onSuccess,
  onFailure,
  ...rest
}) => {
  const onBtnClick = () => {
    const { clientId, scope, redirectUri } = rest;
    const search = toQuery({
      client_id: clientId,
      scope,
      redirect_uri: redirectUri,
    });
    const popup = new PopupWindow.open(
      "github-oauth-authorize",
      `https://github.com/login/oauth/authorize?${search}`,
      { height: 1000, width: 600 },
    );

    onRequest();
    popup.then(onSuccess, onFailure);
  };

  return (
    <button {...rest} onClick={onBtnClick}>
      {children || buttonText}
    </button>
  );
};

export default GitHubLogin;
