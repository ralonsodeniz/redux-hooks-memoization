import React, { useEffect } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectShowModal } from "../../redux/modal/selectors";
import { selectCurrentUser } from "../../redux/user/selectors";
import { checkUserSessionStart } from "../../redux/user/actions";

import Counter from "../counter/counter";
import VideoInput from "../video-input/video-input";
import InnerModal from "../modal/inner-modal";
import Modal from "../modal/modal";
import SignInSignUpContainer from "../signin-signup-container/signin-signup-container";
import User from "../user/user";

import { GlobalStyles } from "../../global.styles";
import { AppContainer, AppLogo } from "./App.styles";

const selectAppData = createStructuredSelector({
  showModal: selectShowModal,
  currentUser: selectCurrentUser
});

const App = () => {
  const appData = useSelector(selectAppData, shallowEqual);
  const { showModal, currentUser } = appData;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkUserSessionStart());
  }, [dispatch]);

  return (
    <AppContainer>
      <GlobalStyles />
      <header>
        <AppLogo />
      </header>
      {!currentUser ? (
        <section>
          <SignInSignUpContainer />
        </section>
      ) : (
        <section>
          <User />
          <Counter />
          <VideoInput />
        </section>
      )}
      {showModal && (
        <Modal>
          <InnerModal />
        </Modal>
      )}
    </AppContainer>
  );
};

export default App;
