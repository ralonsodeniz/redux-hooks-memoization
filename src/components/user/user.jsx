import React, { useCallback } from "react";
import { useDispatch } from "react-redux";

import { signOutStart } from "../../redux/user/actions";

import CustomButton from "../custom-button/custom-button";
import UserAvatar from "./user-avatar";
import UserData from "./user-data";

import { UserContainer, LogOutButtonContainer } from "./user.styles";

const User = () => {
  const dispatch = useDispatch();
  const handleSignOut = useCallback(() => {
    dispatch(signOutStart());
  }, [dispatch]);
  return (
    <UserContainer>
      <LogOutButtonContainer>
        <CustomButton type="button" text="Sign out" onClick={handleSignOut} />
      </LogOutButtonContainer>
      <UserAvatar />
      <UserData />
    </UserContainer>
  );
};

export default User;
