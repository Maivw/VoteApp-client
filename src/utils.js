const parties = {
	Democratic: 15,
	Republican: 15,
	Libertarian: 5,
	Others: 10,
};
// export function convertPrice(party) {
// 	switch (party) {
// 		case party === "Libertarian":
// 			return 5;
// 		case party === "Democratic":
// 			return 15;
// 		case party === "Republican":
// 			return 15;

// 		case party === "Others":
// 			return 10;
// 		default:
// 			return 15;
// 	}
// }

export function convertPrice(party) {
	if (party === "Libertarian") return 5;
	if (party === "Democratic") return 15;
	if (party === "Republican") return 15;
	if (party === "Others") return 10;
}
