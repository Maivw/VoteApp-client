import React from "react";
import GoogleLogin from "react-google-login";

function LoginWithGoogle() {
	const responseGoogle = (response) => {
		console.log(response);
		console.log(response.profile);
	};
	return (
		<div>
			<GoogleLogin
				clientId="790766416952-6igmrdakm3aedloh3rfco1ffdkrnsk6v.apps.googleusercontent.com"
				buttonText="Login with Google"
				isSignedIn={true}
				onSuccess={responseGoogle}
				onFailure={responseGoogle}
				cookiePolicy={"single_host_origin"}
			/>
		</div>
	);
}

export default LoginWithGoogle;
