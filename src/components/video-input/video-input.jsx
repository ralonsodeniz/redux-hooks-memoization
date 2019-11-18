import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";

import { updateUrl } from "../../redux/video/actions";

import CustomButton from "../custom-button/custom-button";

import { VideoInputContainer, VideoInputForm } from "./video-input.styles";

const VideoInput = () => {
  const [url, setUrl] = useState("");
  const dispatch = useDispatch();
  const getVideoUrl = useCallback(
    url => {
      if (url !== "") {
        dispatch(updateUrl(url));
        setUrl("");
      } else {
        alert("video url cannot be empty");
      }
    },
    [dispatch]
  );
  const handleChange = event => {
    setUrl(event.target.value);
  };

  return (
    <VideoInputContainer>
      <VideoInputForm>
        <input
          type="text"
          value={url}
          name="videoUrl"
          placeholder="Insert video url"
          onChange={handleChange}
        />
        <CustomButton text={"Submit url"} onClick={() => getVideoUrl(url)} />
      </VideoInputForm>
      <CustomButton text={"Open video"} />
    </VideoInputContainer>
  );
};

export default VideoInput;
