import React, { useState } from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import file from "../Form/StateNominationPaperPoliticalBodyDSBE-PB2020.pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const options = {
	cMapUrl: "cmaps/",
	cMapPacked: true,
};

function FormExample() {
	const [pdfSrc, setPdfSrc] = useState(
		"../Form/StateNominationPaperPoliticalBodyDSBE-PB2020.pdf"
	);
	const [numPages, setNumPages] = useState(null);

	const onDocumentLoadSuccess = ({ numPages }) => {
		setNumPages(numPages);
	};

	return (
		<div
			style={{
				overflow: "scroll",
				border: "1px dotted black",
				height: 600,
			}}
		>
			<Document
				file={file}
				onLoadSuccess={onDocumentLoadSuccess}
				options={options}
			>
				{Array.from(new Array(numPages), (el, index) => (
					<Page key={`page_${index + 1}`} pageNumber={index + 1} />
				))}
			</Document>
		</div>
	);
}

export default FormExample;
