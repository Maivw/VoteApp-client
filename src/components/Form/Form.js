import React, { useState } from "react";
import { Row, Col } from "reactstrap";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import InputForm from "./InputForm";
import PdfPreviewFilled from "../Form/PdfPreviewFilled";
import { template } from "./template";

const url =
	"https://voteappbackend.herokuapp.com/uploads/StateNominationPaperPoliticalBodyDSBE-PB2020.pdf";

function FormScreen(props) {
	const [pdfFile, setPdfFile] = useState();

	const onSetInputForm = async (data, type) => {
		const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());
		const pdfDoc = await PDFDocument.load(existingPdfBytes);
		const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
		const pages = pdfDoc.getPages();
		const firstPage = pages[0];
		const { height } = firstPage.getSize();

		for (let i = 0; i < template({ helveticaFont, height, rgb }).length; i++) {
			console.log(data[template({ helveticaFont, height, rgb })[i].name]);
			firstPage.drawText(
				data[template({ helveticaFont, height, rgb })[i].name],
				template({ helveticaFont, height, rgb })[i]
			);
		}

		const pdfUrl = URL.createObjectURL(
			new Blob([await pdfDoc.save()], { type: "application/pdf" })
		);
		setPdfFile(pdfUrl);
		if (type === "download") window.open(pdfUrl, "_blank");
	};

	return (
		<div>
			<Row className="justify-content-center pt-4">
				<Col xl={5} md={5}>
					<InputForm onGetData={onSetInputForm} />
				</Col>
				<Col xl={6} md={6}>
					<PdfPreviewFilled data={pdfFile} />
				</Col>
			</Row>
		</div>
	);
}

export default FormScreen;
