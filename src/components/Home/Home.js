import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { getAddress, FindOffices } from "../../reducers/address";
import Logout from "../Logout/Logout";
import TableOffices from "./TableOffices";
import RunforButton from "./RunforButton";

import PlacesAutocomplete, {
	geocodeByAddress,
	geocodeByPlaceId,
	getLatLng,
} from "react-places-autocomplete";

const KEY = "AIzaSyBz6nwfaz00TcGhrBTs69sZdNgd0JPVP3g";

function Home(props) {
	const dispatch = useDispatch();
	const userAddress = useSelector((state) => state.address.userAddress);
	const offices = useSelector((state) => state.address.offices);
	const [showTable, setShowTable] = useState(false);
	const [address, setAddress] = useState("");
	const user = useSelector((state) => state.authentication.user);

	const [lat, setLat] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [coordinates, setCoordinates] = useState({
		lat: null,
		lng: null,
	});

	const handleSelect = async (value) => {
		const results = await geocodeByAddress(value);
		const latLng = await getLatLng(results[0]);
		setAddress(value);
		dispatch(getAddress(value));
		setCoordinates(latLng);
	};

	const onFindMe = () => {
		window.navigator.geolocation.getCurrentPosition(
			(position) => setLat({ lat: position.coords.latitude }),
			(err) => setErrorMessage({ errorMessage: err.message })
		);
	};

	const onFindOffice = (e) => {
		e.preventDefault();
		dispatch(FindOffices({ address: userAddress, key: KEY }));
		setShowTable(true);
		setAddress("");
	};

	return (
		<div>
			<Logout />
			<p>Enter your address to find put the offices you can run for</p>
			<PlacesAutocomplete
				value={address}
				onChange={setAddress}
				onSelect={handleSelect}
			>
				{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
					<div>
						<input {...getInputProps({ placeholder: "Type your address" })} />
						<div>
							{loading ? <div>...loading</div> : null}

							{suggestions.map((suggestion) => {
								const style = {
									backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
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
			<button onClick={onFindOffice}>Search</button>
			<button onClick={onFindMe}>Find me</button>
			<TableOffices offices={offices} showTable={showTable} />
		</div>
	);
}

export default Home;

//AIzaSyD6XtRWC2ScTNPOfgwLtnozq1nRbuMtEfA
