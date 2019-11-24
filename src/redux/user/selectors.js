import { createSelector } from "reselect";

// input selector
const selectUser = state => state.user;

// output selector
export const selectCurrentUser = createSelector(
  [selectUser],
  user => user.currentUser
);

export const selectCurrentUserPhotoURL = createSelector(
  [selectCurrentUser],
  currentUser => (currentUser ? currentUser.photoURL : "")
);

export const selectCurrentUserId = createSelector(
  [selectCurrentUser],
  currentUser => (currentUser ? currentUser.uid : "")
);

export const selectCurrentUserDisplayName = createSelector(
  [selectCurrentUser],
  currentUser => (currentUser ? currentUser.displayName : "")
);

export const selectCurrentUserAge = createSelector(
  [selectCurrentUser],
  currentUser => (currentUser ? currentUser.age : 0)
);

export const selectCurrentUserEmail = createSelector(
  [selectCurrentUser],
  currentUser => (currentUser ? currentUser.email : "")
);

export const selectCurrentUserCountry = createSelector(
  [selectCurrentUser],
  currentUser => (currentUser ? currentUser.country : "")
);

export const selectCurrentUserGender = createSelector(
  [selectCurrentUser],
  currentUser => (currentUser ? currentUser.gender : "")
);
