import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./components/Login/Login";
import Form from "./components/Form/Form";
import Logout from "./components/Logout/Logout";
import Container from "./components/Container/index";

function App() {
	return (
		<>
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={Container} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/logout" component={Logout} />
					<Route exact path="/form" component={Form} />
				</Switch>
			</BrowserRouter>
		</>
	);
}

export default App;
