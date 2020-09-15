import React from "react";

export default function ModalRunFor() {
	return (
		<Modal isOpen={modal} toggle={toggle}>
			<ModalHeader toggle={toggle}>For example</ModalHeader>
			<ModalBody>
				{showPaypal && (
					<Payment amount={200} currency={"USD"} onSuccess={paymentHandler} />
				)}
				<FormExample />
			</ModalBody>
			<ModalFooter>
				<Button color="primary" onClick={showPaypalButtons}>
					Pay to get the for
				</Button>
				<Button color="secondary" onClick={toggle}>
					Cancel
				</Button>
			</ModalFooter>
		</Modal>
	);
}
