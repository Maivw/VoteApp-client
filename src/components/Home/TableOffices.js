import React from "react";
import { Table } from "reactstrap";
import { useSelector } from "react-redux";
import "./TableOffices.css";

function TableOffices() {
	const offices = useSelector((state) => state.address.offices);

	return (
		<div className="table__offices">
			{offices.length > 0 && (
				<Table hover className="table__offices">
					<thead>
						<tr>
							<th>#</th>
							<th>Offfice Title</th>
							<th>Role</th>
							<th>Level</th>
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
							</tr>
						</tbody>
					))}
				</Table>
			)}
		</div>
	);
}

export default TableOffices;
