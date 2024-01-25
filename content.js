const injectScript = () => {
  var script = document.createElement('script');
  script.setAttribute('src', chrome.runtime.getURL('injected.js'));
  script.type = "module"
  (document.head || document.documentElement).appendChild(script);
  script.remove();
};
injectScript()