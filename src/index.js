import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore, persistReducer } from "redux-persist";
import { Auth0Provider } from "@auth0/auth0-react";

export const store = configureStore();
let persistor = persistStore(store);

ReactDOM.render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<Auth0Provider
				domain="maivw.us.auth0.com"
				clientId="q03HQ27c80pCtCXoYpBGKSftq2yWx4qX"
				redirectUri={window.location.origin}
				audience="https://voteApp/api"
				scope="read:current_user update:current_user_metadata"
			>
				<App />
			</Auth0Provider>
		</PersistGate>
	</Provider>,
	document.getElementById("root")
);
