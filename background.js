

const getTabStream = () => {
  chrome.tabCapture.capture({ audio: true, video: false }, (c) => {
    console.log(c);
  });
}
getTabStream();