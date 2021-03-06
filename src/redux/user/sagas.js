import { takeLatest, put, call, all } from "redux-saga/effects";

import { USER } from "./types";
import {
  signInSuccess,
  signInFailure,
  signUpFailure,
  checkUserSessionEnd,
  signOutSuccess,
  signOutFailure,
  updateAvatarSuccess,
  updateAvatarFailure
} from "./actions";
import { openModal } from "../modal/actions";
import {
  auth,
  googleAuthProvider,
  checkUserProfileDocumentInFS,
  actionCodeSettings,
  getCurrentUserFromAuth,
  updateAvatarInFS
} from "../../firebase/firebase.utils";

// util function to check if user is registered in FS or register it and return the user reference object
export function* getSnapshotFromUserAuth(user) {
  try {
    const userRef = yield call(checkUserProfileDocumentInFS, user);
    const userSnapshot = yield userRef.get();
    const {
      displayName,
      email,
      photoURL,
      providerId,
      uid,
      createdAt,
      gender,
      age,
      country
    } = userSnapshot.data();
    yield put(
      signInSuccess({
        displayName,
        email,
        photoURL,
        providerId,
        uid,
        createdAt,
        gender,
        age,
        country
      })
    );
    const signInSuccessModalData = {
      modalType: "SYSTEM_MESSAGE",
      modalProps: {
        text: `Welcome back ${displayName}`
      }
    };
    yield put(openModal(signInSuccessModalData));
  } catch (error) {
    yield put(signInFailure(error));
    const sigInFailureModalData = {
      modalType: "SYSTEM_MESSAGE",
      modalProps: {
        text: error.message
      }
    };
    yield put(openModal(sigInFailureModalData));
    yield auth.signOut();
  }
}

// sign up with email and password
export function* onSignUpStart() {
  yield takeLatest(USER.SIGN_UP_START, signUp);
}

export function* signUp({ payload }) {
  const { email, password, displayName, ...aditionalData } = payload;
  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    // we send the user a verification email
    yield auth.currentUser.sendEmailVerification(actionCodeSettings);
    yield user.updateProfile({ displayName });
    yield call(checkUserProfileDocumentInFS, user, aditionalData);
    yield auth.signOut();
    const checkEmailForVerificationModalData = {
      modalType: "SYSTEM_MESSAGE",
      modalProps: {
        text: "Please look in your inbox to verify the email before signing in"
      }
    };
    yield put(openModal(checkEmailForVerificationModalData));
  } catch (error) {
    yield put(signUpFailure(error));
    const signUpFailureModalData = {
      modalType: "SYSTEM_MESSAGE",
      modalProps: {
        text: error.message
      }
    };
    yield put(openModal(signUpFailureModalData));
    yield auth.signOut();
  }
}

// google sign in sagas
export function* onGoogleSignInStart() {
  yield takeLatest(USER.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* signInWithGoogle() {
  try {
    const { user } = yield auth.signInWithPopup(googleAuthProvider);
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(signInFailure(error));
    const sigInFailureModalData = {
      modalType: "SYSTEM_MESSAGE",
      modalProps: {
        text: error.message
      }
    };
    yield put(openModal(sigInFailureModalData));
    yield auth.signOut();
  }
}

// email signin
export function* onEmailSignIn() {
  yield takeLatest(USER.EMAIL_PASSWORD_SIGN_IN_START, signInWithEmail);
}

export function* signInWithEmail({ payload }) {
  const { email, password } = payload;
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    // we check if the user has the email verified before signin
    if (
      !user.emailVerified &&
      user.providerData
        .map(provider => provider.providerId)
        .includes("password")
    ) {
      yield auth.signOut();
      const emailNotVerifiedModalData = {
        modalType: "SYSTEM_MESSAGE",
        modalProps: {
          text:
            "Please look in your inbox to verify the email before signing in"
        }
      };
      yield put(openModal(emailNotVerifiedModalData));
      throw new Error(
        "Please look in your inbox to verify the email before signing in"
      );
    }
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(signInFailure(error));
    const emailSignInFailureModalData = {
      modalType: "SYSTEM_MESSAGE",
      modalProps: {
        text: error.message
      }
    };
    yield put(openModal(emailSignInFailureModalData));
    yield auth.signOut();
  }
}

// check if user is loged in at app refresh
export function* onCheckUserSessionStart() {
  yield takeLatest(USER.CHECK_USER_SESSION_START, isUserAuthenticated);
}

export function* isUserAuthenticated() {
  try {
    const user = yield getCurrentUserFromAuth(); // there is no need to call because this getCurrentUserFromFB is a Promise
    if (!user) {
      yield put(checkUserSessionEnd());
      return;
    }
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(signInFailure(error));
    const checkUserSessionFailureModalData = {
      modalType: "SYSTEM_MESSAGE",
      modalProps: {
        text: error.message
      }
    };
    yield put(openModal(checkUserSessionFailureModalData));
  }
}

// sign out
export function* onSignOutStart() {
  yield takeLatest(USER.SIGN_OUT_START, signOut);
}

export function* signOut() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
    const signOutSuccessModalData = {
      modalType: "SYSTEM_MESSAGE",
      modalProps: {
        text: "Successfully signed out"
      }
    };
    yield put(openModal(signOutSuccessModalData));
  } catch (error) {
    yield put(signOutFailure(error));
    const signOutFailureModalData = {
      modalType: "SYSTEM_MESSAGE",
      modalProps: {
        text: error.message
      }
    };
    yield put(openModal(signOutFailureModalData));
  }
}

// update user avatar
export function* onUpdateAvatarStart() {
  yield takeLatest(USER.UPDATE_AVATAR_START, updateAvatar);
}

export function* updateAvatar({ payload }) {
  try {
    yield call(updateAvatarInFS, payload);
    yield put(updateAvatarSuccess(payload));
  } catch (error) {
    yield put(updateAvatarFailure(error));
    const updateAvatarFailureModalData = {
      modalType: "SYSTEM_MESSAGE",
      modalProps: {
        text: error.message
      }
    };
    yield put(openModal(updateAvatarFailureModalData));
  }
}

// root saga creator for users with all the tiggering generation functions of the saga
export function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignIn),
    call(onSignUpStart),
    call(onCheckUserSessionStart),
    call(onSignOutStart),
    call(onUpdateAvatarStart)
  ]);
}
