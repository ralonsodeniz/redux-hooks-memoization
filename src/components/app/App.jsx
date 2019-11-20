import React from "react";
import { useSelector, shallowEqual } from "react-redux";

import { selectShowModal } from "../../redux/modal/selectors";

import Counter from "../counter/counter";
import VideoInput from "../video-input/video-input";
import InnerModal from "../modal/inner-modal";
import Modal from "../modal/modal";

import { GlobalStyles } from "../../global.styles";
import { AppContainer, AppTitleText } from "./App.styles";

function App() {
  const showModal = useSelector(selectShowModal, shallowEqual);

  return (
    <AppContainer>
      <GlobalStyles />
      <header>
        <AppTitleText>Test App</AppTitleText>
      </header>
      <section>
        <Counter />
        <VideoInput />
        {showModal && (
          <Modal>
            <InnerModal />
          </Modal>
        )}
      </section>
    </AppContainer>
  );
}

export default App;
