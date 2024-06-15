!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t(require("react"),require("prop-types")):"function"==typeof define&&define.amd?define(["react","prop-types"],t):(e="undefined"!=typeof globalThis?globalThis:e||self).GithubLogin=t(e.React,e.PropTypes)}(this,(function(e,t){"use strict";function i(e,t="&"){const i=Object.keys(e);return i.reduce(((n,s,o)=>{let r=`${n}${s}=${e[s]}`;return o<i.length-1&&(r+=t),r}),"")}class n{constructor(e,t,i={}){this.id=e,this.url=t,this.options=i}open(){const{url:e,id:t,options:n}=this;this.window=window.open(e,t,i(n,","))}close(){this.cancel(),this.window.close()}poll(){this.promise=new Promise(((e,t)=>{this._iid=window.setInterval((()=>{try{const i=this.window;if(!i||!1!==i.closed)return this.close(),void t(new Error("The popup was closed"));if(i.location.href===this.url||"blank"===i.location.pathname)return;const n=i.location.search.replace(/^\?/,"").replace(/^\??\//,"").split("&").reduce(((e,t)=>{const[i,n]=t.split("=");return e[i]=n,e}),{});e(n),this.close()}catch(e){}}),500)}))}cancel(){this._iid&&(window.clearInterval(this._iid),this._iid=null)}then(...e){return this.promise.then(...e)}catch(...e){return this.promise.then(...e)}static open(...e){const t=new this(...e);return t.open(),t.poll(),t}}class s extends e.Component{static propTypes={buttonText:t.string,children:t.node,className:t.string,clientId:t.string.isRequired,onRequest:t.func,onSuccess:t.func,onFailure:t.func,redirectUri:t.string,scope:t.string};static defaultProps={buttonText:"Sign in with GitHub",redirectUri:"",scope:"user:email",onRequest:()=>{},onSuccess:()=>{},onFailure:()=>{}};onBtnClick=()=>{const{clientId:e,scope:t,redirectUri:s}=this.props,o=i({client_id:e,scope:t,redirect_uri:s}),r=this.popup=n.open("github-oauth-authorize",`https://github.com/login/oauth/authorize?${o}`,{height:1e3,width:600});this.onRequest(),r.then((e=>this.onSuccess(e)),(e=>this.onFailure(e)))};onRequest=()=>{this.props.onRequest()};onSuccess=e=>{if(!e.code)return this.onFailure(new Error("'code' not found"));this.props.onSuccess(e)};onFailure=e=>{this.props.onFailure(e)};render(){return this.props,this.onBtnClick,null}}return s}));
