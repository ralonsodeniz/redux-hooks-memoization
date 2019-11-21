import { createSelector } from "reselect";

// input selector
const selectUser = state => state.user;

// output selector
export const selectCurrentUser = createSelector(
  [selectUser],
  user => user.currentUser
);
