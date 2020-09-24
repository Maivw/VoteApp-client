import React from "react";
import { Container, Row, Col } from "reactstrap";
import "./Home.css";

function Footer() {
	return (
		<div className="mb-5 p-5" style={{ marginTop: "15%" }}>
			<Container>
				<Row>
					<Col xs="4" sm="4" md="4" lg="4">
						<p className="footer__text">
							This is a tool that looks up which offices you can run for based
							on your address. This tool will also help automatically fill out
							the paperwork that is required for running for that office.
						</p>
					</Col>
					<Col xs="8" sm="8" md="8" lg="8">
						<img
							className="footer__image"
							src="https://res.cloudinary.com/maivw/image/upload/v1600918076/VoteApp/usamap_i30tjv.svg"
						/>
					</Col>
				</Row>
			</Container>
		</div>
	);
}

export default Footer;
