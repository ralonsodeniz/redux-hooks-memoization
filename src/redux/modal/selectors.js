import { createSelector } from "reselect";

// input selector
const selectModal = state => state.modal;

// output selectors
export const selectShowModal = createSelector(
  [selectModal],
  modal => modal.showModal
);
export const selectModalData = createSelector(
  [selectModal],
  modal => modal.modalData
);
