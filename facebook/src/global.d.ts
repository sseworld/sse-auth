interface Window {
  FB: {
    init: (params: {
      appId: string;
      version: string;
      xfbml: boolean;
      cookie: boolean;
    }) => void;
    api: (
      path: string,
      params: { fields: string },
      callback: (response: any) => void,
    ) => void;
    getLoginStatus: (callback: (response: any) => void) => void;
    login: (
      callback: (response: any) => void,
      options: { scope: string },
    ) => void;
  };
  fbAsyncInit: () => void;
}
