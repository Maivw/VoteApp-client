import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Form from "./components/Form/Form";

function App() {
	return (
		<>
			<BrowserRouter>
				<Switch>
					<Route exact path="/login" component={Login} />
					<Route exact path="/" component={Home} />
					<Route exact path="/form" component={Form} />
				</Switch>
			</BrowserRouter>
		</>
	);
}

export default App;
