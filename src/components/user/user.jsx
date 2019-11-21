import React, { useCallback } from "react";
import { useDispatch } from "react-redux";

import { signOutStart } from "../../redux/user/actions";

import CustomButton from "../custom-button/custom-button";

import { UserContainer } from "./user.styles";

const User = () => {
  const dispatch = useDispatch();
  const handleSignOut = useCallback(() => {
    dispatch(signOutStart());
  }, [dispatch]);
  return (
    <UserContainer>
      <CustomButton type="button" text="Sign out" onClick={handleSignOut} />
    </UserContainer>
  );
};

export default User;
