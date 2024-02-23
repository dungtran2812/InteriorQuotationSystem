import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const LoginWithGG = () => {
  const handleGoogleSignIn = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Successfully signed in with Google:", user);
      // Add additional logic as needed, e.g., redirect to another page
    } catch (error) {
      console.error("Error signing in with Google:", error.message);
    }
  };

  return (
    <div>
      <button onClick={handleGoogleSignIn} style={{}}>
        <i className="fab fa-google"></i>Sign in with Google
      </button>
    </div>
  );
};

export default LoginWithGG;
