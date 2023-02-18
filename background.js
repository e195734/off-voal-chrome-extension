let power = false;
let audioCtx;
let stream;

const getTabStream = () => {
  chrome.tabCapture.capture({ audio: true, video: false }, (c) => {
    audioCtx = new AudioContext();
    stream = c;
    const invertNode = audioCtx.createGain();
    invertNode.gain.value = -1;
    const channelSplitterNode = audioCtx.createChannelSplitter(2);
    const channelMergerNode = audioCtx.createChannelMerger(2);
    const mediaStreamSource = audioCtx.createMediaStreamSource(stream);
    const merge = audioCtx.createChannelMerger(1);

    console.log(mediaStreamSource.numberOfOutputs);

    mediaStreamSource.connect(channelSplitterNode);
    channelSplitterNode.connect(invertNode, 0);
    invertNode.connect(channelMergerNode, 0, 0);
    channelSplitterNode.connect(channelMergerNode, 1, 1);

    channelMergerNode.connect(merge);
    merge.connect(audioCtx.destination);
  });
}

chrome.browserAction.onClicked.addListener(() => {
  power = !power;
  if(power){
    getTabStream();
  }
  else{
    stream.getAudioTracks()[0].stop();
    audioCtx.close();
  }
});
