import React from "react";
import { useSelector, shallowEqual } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  selectCurrentUserDisplayName,
  selectCurrentUserAge,
  selectCurrentUserEmail,
  selectCurrentUserCountry,
  selectCurrentUserGender
} from "../../redux/user/selectors";

import {
  UserDataContainer,
  UserDataTextTitle,
  UserDataText,
  DisplayNameContainer,
  AgeContainer,
  EmailContainer,
  CountryContainer,
  GenderContainer
} from "./user.styles";

const userDataSelector = createStructuredSelector({
  displayName: selectCurrentUserDisplayName,
  age: selectCurrentUserAge,
  email: selectCurrentUserEmail,
  country: selectCurrentUserCountry,
  gender: selectCurrentUserGender
});

const UserData = () => {
  const selectUserData = useSelector(userDataSelector, shallowEqual);
  const { displayName, age, email, country, gender } = selectUserData;

  return (
    <UserDataContainer>
      <DisplayNameContainer>
        <UserDataTextTitle>Display name:</UserDataTextTitle>
        <UserDataText>{displayName}</UserDataText>
      </DisplayNameContainer>
      <AgeContainer>
        <UserDataTextTitle>Age:</UserDataTextTitle>
        <UserDataText>{age}</UserDataText>
      </AgeContainer>
      <EmailContainer>
        <UserDataTextTitle>Email:</UserDataTextTitle>
        <UserDataText>{email}</UserDataText>
      </EmailContainer>
      <CountryContainer>
        <UserDataTextTitle>Country:</UserDataTextTitle>
        <UserDataText>{country}</UserDataText>
      </CountryContainer>
      <GenderContainer>
        <UserDataTextTitle>Gender:</UserDataTextTitle>
        <UserDataText>{gender}</UserDataText>
      </GenderContainer>
    </UserDataContainer>
  );
};

export default UserData;
