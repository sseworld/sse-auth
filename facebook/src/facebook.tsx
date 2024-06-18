import React from "react";
import styles from "../styles/facebook.scss";

interface FacebookLoginProps {
  callback: (response: any) => void;
  appId: string;
  xfbml?: boolean;
  cookie?: boolean;
  scope?: string;
  textButton?: string;
  autoLoad?: boolean;
  size?: string;
  fields?: string;
  cssClass?: string;
  version?: string;
  icon?: string;
  language?: string;
}

class FacebookLogin extends React.Component<FacebookLoginProps> {
  static defaultProps = {
    textButton: "Login with Facebook",
    scope: "public_profile,email",
    xfbml: false,
    cookie: false,
    size: "metro",
    fields: "name",
    cssClass: "kep-login-facebook",
    version: "2.3",
    language: "en_US",
  };

  constructor(props: FacebookLoginProps) {
    super(props);
  }

  componentDidMount() {
    const { appId, xfbml, cookie, version, autoLoad, language } = this.props;
    const fbRoot = document.createElement("div");
    fbRoot.id = "fb-root";

    document.body.appendChild(fbRoot);

    window.fbAsyncInit = () => {
      window.FB.init({
        version: `v${version}`,
        appId,
        xfbml: xfbml as boolean,
        cookie: cookie as boolean,
      });

      if (autoLoad || window.location.search.includes("facebookdirect")) {
        window.FB.getLoginStatus(this.checkLoginState);
      }
    };

    // Load the SDK asynchronously
    ((d, s, id) => {
      const element = d.getElementsByTagName(s)[0];
      const fjs = element;
      // let js = element;
      let js: HTMLScriptElement;
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s) as HTMLScriptElement;
      js.id = id;
      js.src = `//connect.facebook.net/${language}/all.js`;
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }

  responseApi = (authResponse: any) => {
    window.FB.api("/me", { fields: this.props.fields as string }, (me: any) => {
      Object.assign(me, authResponse);
      this.props.callback(me);
    });
  };

  checkLoginState = (response: any) => {
    if (response.authResponse) {
      this.responseApi(response.authResponse);
    } else {
      if (this.props.callback) {
        this.props.callback({ status: response.status });
      }
    }
  };

  click = () => {
    const { scope = "public_profile,email", appId } = this.props;
    if (navigator.userAgent.match("CriOS")) {
      window.location.href = `https://www.facebook.com/dialog/oauth?client_id=${appId}&redirect_uri=${window.location.href}&state=facebookdirect&${scope}`;
    } else {
      window.FB.login(this.checkLoginState, { scope });
    }
  };

  renderWithFontAwesome() {
    const { cssClass, size, icon, textButton } = this.props;
    return (
      <span>
        <link
          rel="stylesheet"
          href="//maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"
        />
        <button className={`${cssClass} ${size}`} onClick={this.click}>
          <i className={`fa ${icon}`}></i> {textButton}
        </button>
        <style dangerouslySetInnerHTML={{ __html: styles }}></style>
      </span>
    );
  }

  render() {
    const { cssClass, size, icon, textButton } = this.props;
    if (icon) {
      return this.renderWithFontAwesome();
    }

    return (
      <span>
        <button className={`${cssClass} ${size}`} onClick={this.click}>
          {textButton}
        </button>
        <style dangerouslySetInnerHTML={{ __html: styles }}></style>
      </span>
    );
  }
}

export default FacebookLogin;
