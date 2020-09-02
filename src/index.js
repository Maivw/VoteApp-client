import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import { Auth0Provider } from "./react-auth0-spa";
import config from "./auth_config.json";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore, persistReducer } from "redux-persist";

export const store = configureStore();
let persistor = persistStore(store);

const onRedirectCallback = (appState) => {
	history.push(
		appState && appState.targetUrl
			? appState.targetUrl
			: window.location.pathname
	);
};

ReactDOM.render(
	<Auth0Provider
		domain={config.domain}
		client_id={config.clientId}
		redirect_uri={window.location.origin}
		audience={config.audience}
		onRedirectCallback={onRedirectCallback}
	>
		<React.StrictMode>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<App />
				</PersistGate>
			</Provider>
		</React.StrictMode>
	</Auth0Provider>,
	document.getElementById("root")
);
