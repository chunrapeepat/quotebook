import React from 'react'
import Document, {Head, Main, NextScript} from 'next/document'
import {ServerStyleSheet} from 'styled-components'

export default class BaseDocument extends Document {
  // This will extract the stylesheets ane render to the page.
  static getInitialProps({renderPage}) {
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />))
    const styleTags = sheet.getStyleElement()

    return {
      ...page,
      styleTags,
    }
  }

  render = () => (
    <html lang="en">
      <Head>
        <title>QuoteBook</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css?family=Abril+Fatface|Chonburi|Merriweather:400,700|Trirong:400,700" rel="stylesheet"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/material-design-iconic-font/2.2.0/css/material-design-iconic-font.min.css"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.6.2/antd.css"/>
        <link rel="stylesheet" href="/static/progress.css"/>
        <link rel="shortcut icon" type="image/x-icon" href='/static/favicon.ico' />
        {this.props.styleTags}
        {/* Google Analytic */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-121110022-1"></script>
        <script dangerouslySetInnerHTML={{__html: `window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'UA-121110022-1');`}}></script>
        {/* Fullstory Analytic */}
        <script dangerouslySetInnerHTML={{__html: `
          window['_fs_debug'] = false;
          window['_fs_host'] = 'fullstory.com';
          window['_fs_org'] = 'CWF51';
          window['_fs_namespace'] = 'FS';
          (function(m,n,e,t,l,o,g,y){
              if (e in m) {if(m.console && m.console.log) { m.console.log('FullStory namespace conflict. Please set window["_fs_namespace"].');} return;}
              g=m[e]=function(a,b){g.q?g.q.push([a,b]):g._api(a,b);};g.q=[];
              o=n.createElement(t);o.async=1;o.src='https://'+_fs_host+'/s/fs.js';
              y=n.getElementsByTagName(t)[0];y.parentNode.insertBefore(o,y);
              g.identify=function(i,v){g(l,{uid:i});if(v)g(l,v)};g.setUserVars=function(v){g(l,v)};
              g.shutdown=function(){g("rec",!1)};g.restart=function(){g("rec",!0)};
              g.consent=function(a){g("consent",!arguments.length||a)};
              g.identifyAccount=function(i,v){o='account';v=v||{};v.acctId=i;g(o,v)};
              g.clearUserCookie=function(){};
          })(window,document,window['_fs_namespace'],'script','user');
        `}}></script>
      </Head>
      <body>
        {/* Facebook Customer Chat */}
        <div id="fb-root"></div>
        <script dangerouslySetInnerHTML={{__html: `
          (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js#xfbml=1&version=v2.12&autoLogAppEvents=1';
            fjs.parentNode.insertBefore(js, fjs);
          }(document, 'script', 'facebook-jssdk'));
        `}}/>
        <div class="fb-customerchat"
          attribution="setup_tool"
          page_id="222466318345424"
          theme_color="#333333"
          logged_in_greeting="Hello, How can we help you? (Bugs, Questions, Feature Request & more...)"
          logged_out_greeting="Hello, How can we help you? (Bugs, Questions, Feature Request & more...)">
        </div>

        <Main />
        <NextScript />
      </body>
    </html>
  )
}
