

const getTabStream = () => {
  chrome.tabCapture.capture({ audio: true, video: false }, (c) => {
    console.log(c);
  });
}
chrome.browserAction.onClicked.addListener(() => {
  getTabStream();
});
