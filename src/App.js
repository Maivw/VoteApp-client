import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Form from "./components/Form/Form";
import Logout from "./components/Logout/Logout";
import Signup from "./components/Signup/Signup";

function App() {
	return (
		<>
			<BrowserRouter>
				<Switch>
					<Route exact path="/login" component={Login} />
					<Route exact path="/logout" component={Logout} />
					<Route exact path="/signup" component={Signup} />
					<Route exact path="/" component={Home} />
					<Route exact path="/form" component={Form} />
				</Switch>
			</BrowserRouter>
		</>
	);
}

export default App;
