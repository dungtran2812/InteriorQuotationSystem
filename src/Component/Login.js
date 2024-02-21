import { GoogleLogin } from "react-google-login";

const clientId = "423567540491-42aoheb5ltla2j4nb5h0a36hev870a8e.apps.googleusercontent.com";

function Login(){
    const onSuccess = (res) => {
        console.log("LOGIN SUCCESS! Current user: ", res.profileObj);
    }
    const onFailure = (res) => {
        console.log("LOGIN FAILED! res: : ", res);
    }
    return(
        <div id="signInButton">
        <GoogleLogin>
            clientId={clientId}
            buttonText="login" 
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'signle_host_origin'}
            isSignedIn={true}
        </GoogleLogin>
    </div>
    )
    
}

export default Login;