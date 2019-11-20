import React, { useState, useCallback } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import { updateUrl } from "../../redux/video/actions";
import { openModal } from "../../redux/modal/actions";
import { selectVideoUrl } from "../../redux/video/selectors";

import CustomButton from "../custom-button/custom-button";

import { VideoInputContainer, VideoInputForm } from "./video-input.styles";

const VideoInput = () => {
  const [url, setUrl] = useState("");
  const videoUrl = useSelector(selectVideoUrl, shallowEqual);
  const videoPlayerData = {
    modalType: "VIDEO_PLAYER",
    modalProps: {}
  };
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
  const openVideoInModal = useCallback(() => {
    if (videoUrl !== "") {
      dispatch(openModal(videoPlayerData));
    } else {
      alert("video url cannot be empty");
    }
  }, [dispatch, videoPlayerData, videoUrl]);
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
      <CustomButton text={"Open video"} onClick={openVideoInModal} />
    </VideoInputContainer>
  );
};

export default VideoInput;
