

const getTabStream = () => {
  chrome.tabCapture.capture({ audio: true, video: false }, (c) => {
    const audioCtx = new AudioContext();
    const gainNode = audioCtx.createGain();
    gainNode.gain.value = -1;
    const channelSplitterNode = audioCtx.createChannelSplitter();
    const channelMergerNode = audioCtx.createChannelMerger();
    const mediaStreamSource = audioCtx.createMediaStreamSource(c);

    splittedStream = mediaStreamSource.connect(channelSplitterNode);
    splittedStream.connect(channelMergerNode);
    //splittedStream.connect(gainNode).connect(channelMergerNode);

    channelMergerNode.connect(audioCtx.destination);
  });
}
chrome.browserAction.onClicked.addListener(() => {
  getTabStream();
});
