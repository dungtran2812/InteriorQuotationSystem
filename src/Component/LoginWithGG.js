import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { loginWithGG } from "../api/auth/loginWithGG";
import { app } from "../service/firebase";
const LoginWithGG = ({ setUser }) => {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.removeItem("token");
      setUser(user);
      console.log(user);
      const data = await loginWithGG(user.accessToken);
      console.log("data", data);
      navigate("/", {state:data});
      // Add additional logic as needed, e.g., redirect to another page
    } catch (error) {
      console.error("Error signing in with Google:", error.message);
    }
  };

  return (
    <div>
      <button
        onClick={handleGoogleSignIn}
        style={{
          background: "white",
          border: "1px solid #171717",
          cursor: "pointer",
          margin: "10px 20px",
          display: "flex",
          alignItems: "center",
          padding: "4px 8px",
          borderRadius: 4,
        }}
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/24px-Google_%22G%22_logo.svg.png"
          alt="gg"
        />
        <span style={{ marginLeft: 10 }}>Sign in with Google</span>
      </button>
    </div>
  );
};

export default LoginWithGG;
