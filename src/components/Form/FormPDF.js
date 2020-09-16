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
		const pdfDoc = await PDFDocument.load(existingPdfBytes);
		const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
		const pages = pdfDoc.getPages();
		const firstPage = pages[0];
		const { width, height } = firstPage.getSize();

		firstPage.drawText(`${submittedForm.officeTitle} `, {
			x: 20,
			y: height / 2 + 245,
			size: 10,
			font: helveticaFont,
			color: rgb(0, 0, 0, 1),
			maxWidth: 100,
			lineHeight: height / 2 - 490,
		});

		firstPage.drawText(` ${submittedForm.disctrict}`, {
			x: 120,
			y: height / 2 + 245,
			size: 10,
			font: helveticaFont,
			color: rgb(0, 0, 0, 1),
			maxWidth: 100,
		});
		firstPage.drawText(`${submittedForm.candidatename} `, {
			x: 200,
			y: height / 2 + 245,
			size: 10,
			font: helveticaFont,
			color: rgb(0, 0, 0, 1),
			maxWidth: 100,
		});

		firstPage.drawText(` ${submittedForm.address} `, {
			x: 300,
			y: height / 2 + 245,
			size: 10,
			font: helveticaFont,
			color: rgb(0, 0, 0, 1),
			maxWidth: 200,
			lineHeight: height / 2 - 490,
		});
		firstPage.drawText(` ${submittedForm.occupation}`, {
			x: 520,
			y: height / 2 + 245,
			size: 10,
			font: helveticaFont,
			color: rgb(0, 0, 0, 1),
			maxWidth: 200,
		});

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
