import React from "react";

import { GlobalStyles } from "../../global.styles";
import { AppContainer, AppTitleText } from "./App.styles";

function App() {
  return (
    <AppContainer>
      <GlobalStyles />
      <header>
        <AppTitleText>Test App</AppTitleText>
      </header>
    </AppContainer>
  );
}

export default App;
