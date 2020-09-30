import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { getAddress, findOffices } from "../../reducers/address";
import Logout from "../Logout/Logout";
import TableOffices from "./TableOffices";
import RunforModal from "./RunforButton";
import "./Home.css";
import { Input, Button } from "reactstrap";
import Footer from "./Footer";

import PlacesAutocomplete, {
	geocodeByAddress,
	getLatLng,
} from "react-places-autocomplete";

function Home(props) {
	const dispatch = useDispatch();
	const history = useHistory();
	const { loginWithRedirect, isAuthenticated } = useAuth0();

	const user = useSelector((state) => state.authentication.user);
	const userAddress = useSelector((state) => state.address.userAddress);
	const offices = useSelector((state) => state.address.offices);

	const [showTable, setShowTable] = useState(false);
	const [showFormToFill, setShowFormToFill] = useState(false);
	const [address, setAddress] = useState("");
	const [modal, setModal] = useState(false);

	const [coordinates, setCoordinates] = useState({
		lat: null,
		lng: null,
	});

	useEffect(() => {}, []);

	const handleSelect = async (value) => {
		const results = await geocodeByAddress(value);
		const latLng = await getLatLng(results[0]);
		setAddress(value);
		dispatch(getAddress(value));
		setCoordinates(latLng);
	};

	const onFindOffice = (e) => {
		e.preventDefault();
		dispatch(
			findOffices({ address: userAddress, key: process.env.REACT_APP_KEY })
		);
		setShowTable(true);
		setAddress("");
	};

	const display = () => {
		user?.alreadyPaid && history.push("/form");
		setShowTable(!showTable);
		setModal(true);
		setShowFormToFill(true);
	};
	const toggle = () => {
		setModal(false);
	};

	return (
		<div className="home">
			<div className="home__content">
				{!isAuthenticated ? (
					<Button
						style={{
							float: "left",
							marginTop: 10,
							marginBottom: 10,
						}}
						color="warning"
						onClick={() => loginWithRedirect()}
					>
						Log In
					</Button>
				) : (
					<Logout />
				)}
				<h3
					style={{
						color: "white",
						textShadow: "1px 1px black",
						marginBottom: 50,
					}}
				>
					Enter your address to find all the offices you can run for
				</h3>
				<PlacesAutocomplete
					value={address}
					onChange={setAddress}
					onSelect={handleSelect}
				>
					{({
						getInputProps,
						suggestions,
						getSuggestionItemProps,
						loading,
					}) => (
						<div>
							<Input
								className="shadow-sm p-3 mb-5 bg-white rounded"
								{...getInputProps({ placeholder: "Type your address" })}
							/>
							<div>
								{loading ? <div>...loading</div> : null}

								{suggestions.map((suggestion) => {
									const style = {
										backgroundColor: suggestion.active ? "#41b6e6" : "#f1eeee",
										color: "#666464",
									};

									return (
										<div {...getSuggestionItemProps(suggestion, { style })}>
											{suggestion.description}
										</div>
									);
								})}
							</div>
						</div>
					)}
				</PlacesAutocomplete>
				<Button
					color="warning"
					style={{
						float: "right",
						marginTop: 10,
						marginBottom: 10,
						marginRight: 10,
					}}
					onClick={onFindOffice}
				>
					Search
				</Button>
				{/* <Button
					color="warning"
					style={{ marginLeft: "45%" }}
					onClick={onFindMe}
				>
					Find me
				</Button> */}
				{offices.length > 0 && (
					<Button
						color="warning"
						style={{
							float: "right",
							marginTop: 10,
							marginRight: 10,
							marginBottom: 10,
						}}
						onClick={display}
					>
						Run for
					</Button>
				)}

				<TableOffices />
				<div className="footerBox">
					<Footer />
				</div>
				<RunforModal
					isOpen={modal}
					offices={offices}
					toggle={toggle}
					showFormToFill={showFormToFill}
				/>
			</div>
		</div>
	);
}

export default Home;

//AIzaSyD6XtRWC2ScTNPOfgwLtnozq1nRbuMtEfA
