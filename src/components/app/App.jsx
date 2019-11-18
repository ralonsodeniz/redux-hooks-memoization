import React from "react";

import Counter from "../counter/counter";
import VideoInput from "../video-input/video-input";

import { GlobalStyles } from "../../global.styles";
import { AppContainer, AppTitleText } from "./App.styles";

function App() {
  return (
    <AppContainer>
      <GlobalStyles />
      <header>
        <AppTitleText>Test App</AppTitleText>
      </header>
      <Counter />
      <VideoInput />
    </AppContainer>
  );
}

export default App;
