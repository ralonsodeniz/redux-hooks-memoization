import React from "react";
import { useSelector, shallowEqual } from "react-redux";

import { VideoFrame } from "./video-player.styles";

const VideoPlayer = () => {
  const videoUrl = useSelector(state => state.video.videoUrl, shallowEqual);
  return (
    <VideoFrame
      src={videoUrl}
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      frameBorder="0"
      title="Video"
    />
  );
};

export default VideoPlayer;
