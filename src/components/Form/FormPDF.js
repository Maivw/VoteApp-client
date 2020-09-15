import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { degrees, PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { Document, Page } from "react-pdf";
import download from "downloadjs";

export default function FormPDF() {
	const submittedForm = useSelector((state) => state.formManagement.form);
	console.log("cccccc", submittedForm);
	const url =
		"http://localhost:8080/uploads/StateNominationPaperPoliticalBodyDSBE-PB2020.pdf";
	const modifyPdf = async () => {
		const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());
		// Load a PDFDocument from the existing PDF bytes
		const pdfDoc = await PDFDocument.load(existingPdfBytes);

		// Embed the Helvetica font
		const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

		// Get the first page of the document
		const pages = pdfDoc.getPages();
		const firstPage = pages[0];

		// Get the width and height of the first page
		const { width, height } = firstPage.getSize();

		// Draw a string of text diagonally across the first page
		firstPage.drawText(
			`${submittedForm.officeTitle} \n ${submittedForm.candidatename} \n ${submittedForm.district} \n ${submittedForm.address} \n ${submittedForm.occupation}`,
			{
				x: 300,
				y: height / 2 + 300,
				size: 25,
				font: helveticaFont,
				color: rgb(0.5, 0.1, 0.1),
				maxWidth: 20,
				// lineHeight
			}
		);

		// Serialize the PDFDocument to bytes (a Uint8Array)
		// const pdfBytes = await pdfDoc.save();
		// download(pdfBytes, "pdf-lib_modification_example.pdf", "application/pdf");
		// setPdfFile(pdfBytes);
		const pdfUrl = URL.createObjectURL(
			new Blob([await pdfDoc.save()], { type: "application/pdf" })
		);
		window.open(pdfUrl, "_blank");
	};

	return (
		<div className="App">
			<h1>After submit the form Click the button below to download</h1>
			<h2 onClick={() => modifyPdf()}>Download</h2>
		</div>
	);
}
