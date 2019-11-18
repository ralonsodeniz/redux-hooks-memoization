import React from "react";
// we import new redux hooks from react-redux to select from the store what we need and dispatch the actions
// shalllowEqual makes a shallow comparation for returned object when you get more than one thing from the store
import { useSelector, shallowEqual } from "react-redux";

import CustomButton from "../custom-button/custom-button";

import { CounterContainer, CounterTextContainer } from "./counter.styles";

const Counter = () => {
  const count = useSelector(state => state.counter.count, shallowEqual);
  return (
    <CounterContainer>
      <CounterTextContainer>Current count is: {count}</CounterTextContainer>
      <CustomButton text={"Open counter manager"} />
    </CounterContainer>
  );
};

export default Counter;
