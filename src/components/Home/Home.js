import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAddress, FindOffices } from "../../reducers/address";
import { Link } from "react-router-dom";
import PlacesAutocomplete, {
	geocodeByAddress,
	geocodeByPlaceId,
	getLatLng,
} from "react-places-autocomplete";
import { Table, Button } from "reactstrap";
import RunforButton from "./RunforButton";
const KEY = "AIzaSyBz6nwfaz00TcGhrBTs69sZdNgd0JPVP3g";
function Home(props) {
	const dispatch = useDispatch();
	const userAddress = useSelector((state) => state.address.userAddress);
	const offices = useSelector((state) => state.address.offices);
	console.log("gggg", offices);
	const [showTable, setShowTable] = useState(false);
	const [address, setAddress] = useState("");

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

			{offices && showTable && (
				<Table hover>
					<thead>
						<tr>
							<th>#</th>
							<th>Offfice Title</th>
							<th>Role</th>
							<th>Level</th>
							<th></th>
						</tr>
					</thead>
					{offices?.map((office, index) => (
						<tbody key={index}>
							<tr>
								<th scope="row">{index + 1}</th>
								<td>{office.name}</td>
								<td>
									{office.roles?.map((role) => (
										<li>{role}</li>
									))}
								</td>
								<td>
									{office.levels?.map((level) => (
										<li>{level}</li>
									))}
								</td>
								<td>
									<RunforButton officeTitle={office.name} />
								</td>
							</tr>
						</tbody>
					))}
				</Table>
			)}
		</div>
	);
}

export default Home;

//AIzaSyD6XtRWC2ScTNPOfgwLtnozq1nRbuMtEfA
