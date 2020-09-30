import React from "react";
import { useSelector } from "react-redux";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { Button } from "reactstrap";

export default function FormPDF() {
	const submittedForm = useSelector((state) => state.formManagement.form);

	const url =
		"https://voteappbackend.herokuapp.com/uploads/StateNominationPaperPoliticalBodyDSBE-PB2020.pdf";
	const modifyPdf = async () => {
		const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());
		const pdfDoc = await PDFDocument.load(existingPdfBytes);
		const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
		const pages = pdfDoc.getPages();
		const firstPage = pages[0];
		const { width, height } = firstPage.getSize();

		firstPage.drawText(`${submittedForm.officeTitle} `, {
			x: 20,
			y: height / 2 + 246,
			size: 10,
			font: helveticaFont,
			color: rgb(0, 0, 0, 1),
			maxWidth: 100,
			lineHeight: height / 2 - 488,
		});

		firstPage.drawText(` ${submittedForm.disctrict}`, {
			x: 120,
			y: height / 2 + 246,
			size: 10,
			font: helveticaFont,
			color: rgb(0, 0, 0, 1),
			maxWidth: 100,
			lineHeight: height / 2 - 488,
		});
		firstPage.drawText(`${submittedForm.candidatename} `, {
			x: 200,
			y: height / 2 + 246,
			size: 10,
			font: helveticaFont,
			color: rgb(0, 0, 0, 1),
			maxWidth: 100,
			lineHeight: height / 2 - 488,
		});

		firstPage.drawText(` ${submittedForm.address} `, {
			x: 300,
			y: height / 2 + 246,
			size: 10,
			font: helveticaFont,
			color: rgb(0, 0, 0, 1),
			maxWidth: 200,
			lineHeight: height / 2 - 488,
		});
		firstPage.drawText(` ${submittedForm.occupation}`, {
			x: 520,
			y: height / 2 + 246,
			size: 10,
			font: helveticaFont,
			color: rgb(0, 0, 0, 1),
			maxWidth: 200,
			lineHeight: height / 2 - 488,
		});

		const pdfUrl = URL.createObjectURL(
			new Blob([await pdfDoc.save()], { type: "application/pdf" })
		);
		window.open(pdfUrl, "_blank");
	};

	return (
		<div className="App">
			<h1>After submit the form Click the button below to get the form</h1>
			<Button onClick={() => modifyPdf()}>Download</Button>
		</div>
	);
}
