import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactPDF from "@react-pdf/renderer";
import { Document, Page } from "react-pdf";
import { fetchExampleForm } from "../../reducers/formManagement";
// import { Document, Page } from "react-pdf/dist/entry.webpack";

const options = {
	cMapUrl: "cmaps/",
	cMapPacked: true,
};

function FormExample() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchExampleForm());
	});
	const [fileObject, setFileObject] = useState({
		file: "./StateNominationPaperPoliticalBodyDSBE-PB2020.pdf",
		numPages: null,
	});

	const onDocumentLoadSuccess = ({ numPages }) => {
		setFileObject({ numPages });
	};

	return (
		<div>
			<header>
				<h1>StateNominationPaperPoliticalBodyDSBE-PB2020</h1>
			</header>
			<div>
				<Document
					file={fileObject.file}
					onLoadSuccess={onDocumentLoadSuccess}
					options={options}
				>
					{Array.from(new Array(fileObject.numPages), (el, index) => (
						<Page key={`page_${index + 1}`} pageNumber={index + 1} />
					))}
				</Document>
			</div>
		</div>

		// <div>
		// 	<Document
		// 		file={fileObject.file}
		// 		onLoadSuccess={onDocumentLoadSuccess}
		// 	></Document>
		// </div>
	);
}

export default FormExample;
