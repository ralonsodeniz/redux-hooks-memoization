import React, { lazy, Suspense, useCallback } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";

import { closeModal } from "../../redux/modal/actions";
import { selectModalData } from "../../redux/modal/selectors";

import Spinner from "../spinner/spinner";
import OnClickOutSide from "../onclick-outside/onclick-outside";

import {
  InnerModalContainer,
  InnerModalComponentContainer
} from "./inner-modal.styles";

const lazyCounterManager = lazy(() =>
  import("../counter-manager/counter-manager")
);
const lazyVideoPlayer = lazy(() => import("../video-player/video-player"));

const MODAL_OPTIONS = {
  COUNTER_MANAGER: lazyCounterManager,
  VIDEO_PLAYER: lazyVideoPlayer
};

const InnerModal = () => {
  const dispatch = useDispatch();
  const modalData = useSelector(selectModalData, shallowEqual);
  const closeModalOnClickOutside = useCallback(() => dispatch(closeModal()), [
    dispatch
  ]);
  const SpecificModal = MODAL_OPTIONS[modalData.modalType];

  return (
    <InnerModalContainer>
      <OnClickOutSide enabled action={closeModalOnClickOutside}>
        <InnerModalComponentContainer>
          <span>This is the modal (React Portal)</span>
          <Suspense fallback={<Spinner />}>
            <SpecificModal {...modalData.modalProps} />
          </Suspense>
        </InnerModalComponentContainer>
      </OnClickOutSide>
    </InnerModalContainer>
  );
};

export default InnerModal;
