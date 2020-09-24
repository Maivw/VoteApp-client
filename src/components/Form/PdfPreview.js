import React, { useState } from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faArrowCircleLeft,
	faArrowCircleRight,
} from "@fortawesome/free-solid-svg-icons";

import file from "../Form/StateNominationPaperPoliticalBodyDSBE-PB2020.pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const options = {
	cMapUrl: "cmaps/",
	cMapPacked: true,
};

function FormExample() {
	const [numPagesFile, setNumPagesFile] = useState(null);
	const [pageNumber, setPageNumber] = useState(1);

	const onDocumentLoadSuccess = ({ numPages }) => {
		setNumPagesFile(numPages);
	};

	const setNextPage = () => {
		setPageNumber(pageNumber + 1);
	};

	const setPrevPage = () => {
		setPageNumber(pageNumber - 1);
	};

	return (
		<div
			className="container-pdf-preview"
			style={{
				overflow: "scroll",
				border: "1px dotted black",
				height: 450,
				position: "relative",
			}}
		>
			<Document
				file={file}
				onLoadSuccess={onDocumentLoadSuccess}
				options={options}
			>
				<Page pageNumber={pageNumber} />
				<div
					className={"text-center sticky-pagination"}
					style={{ color: "#888888" }}
				>
					<FontAwesomeIcon
						{...(pageNumber > 1 && { onClick: setPrevPage })}
						className={`page-button ${pageNumber > 1 ? "" : "disabled"}`}
						icon={faArrowCircleLeft}
					/>
					<span>
						{pageNumber} of {numPagesFile}
					</span>
					<FontAwesomeIcon
						{...(pageNumber < numPagesFile && { onClick: setNextPage })}
						className={`page-button ${
							pageNumber < numPagesFile ? "" : "disabled"
						}`}
						icon={faArrowCircleRight}
					/>
				</div>
			</Document>
		</div>
	);
}

export default FormExample;
