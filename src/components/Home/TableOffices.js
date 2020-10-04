import React from "react";
import { Table } from "reactstrap";
import { useSelector } from "react-redux";
import "./TableOffices.css";

function TableOffices() {
	const offices = useSelector((state) => state.address.offices);

	return (
		<div className="table__offices">
			{offices.length > 0 && (
				<Table responsive hover className="table__offices">
					<thead>
						<tr>
							<th>#</th>
							<th>Offfice Title</th>
							<th>Role</th>
						</tr>
					</thead>
					{offices?.map((office, index) => (
						<tbody key={index}>
							<tr>
								<th scope="row">{index + 1}</th>
								<td>{office.name}</td>
								<td>
									{office.roles?.map((role, i) => (
										<li key={i}>{role}</li>
									))}
								</td>
							</tr>
						</tbody>
					))}
				</Table>
			)}
		</div>
	);
}

export default TableOffices;
