import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

async function signInGoogle(): Promise<void> {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(getAuth(), provider);
}

export { signInGoogle };

/* async function createUser(
  email: string,
  password: string,
  auth = getAuth()
): Promise<void> {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      console.log("loggedin");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === "auth/weak-password") {
        alert("The password is too weak");
      } else if (errorCode === "auth/email-already-in-use") {
        alert("Please use another email");
      } else {
        alert(errorMessage);
      }
      console.error(error);
    });
} */
