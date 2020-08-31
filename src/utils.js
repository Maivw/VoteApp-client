const parties = {
	Democratic: 15,
	Republican: 15,
	Libertarian: 5,
	Others: 10,
};
export function convertPrice(parties) {
	for (let party in parties) {
		switch (party) {
			case party === "Democratic":
				return 15;
			case party === "Republican":
				return 15;

			case party === "Libertarian":
				return 5;

			case party === "Others":
				return 10;
			default:
				return 15;
		}
	}
}
