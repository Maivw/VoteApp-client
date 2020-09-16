import React from "react";
import { Table, Button } from "reactstrap";
import RunforButton from "./RunforButton";

function TableOffices({ offices, showTable }) {
	return (
		<div>
			{offices && showTable && (
				<Table hover>
					<thead>
						<tr>
							<th>#</th>
							<th>Offfice Title</th>
							<th>Role</th>
							<th>Level</th>
							<th>
								<RunforButton offices={offices} />
							</th>
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
								<td>{/* <RunforButton officeTitle={office.name} /> */}</td>
							</tr>
						</tbody>
					))}
				</Table>
			)}
		</div>
	);
}

export default TableOffices;
