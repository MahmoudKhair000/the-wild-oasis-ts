export type ID = number | string;

export type Settings = {
	id: number;
	created_at: string;
	minBookingLength: number;
	maxBookingLength: number;
	maxGuestsPerBooking: number;
	breakfastPrice: number;
};

export type Country = {
	names: {
		common: string;
		[key: string]: unknown;
	};
	flag: {
		colors: {
			dominant: string | null;
			palette: Array<{
				hex: string;
				proportion: number;
			}>;
			prominent: string | null;
			swatches: {
				dark_muted: string | null;
				dark_vibrant: string | null;
				light_muted: string | null;
				light_vibrant: string | null;
				muted: string | null;
				vibrant: string | null;
			};
		};
		description: string;
		emoji: string;
		html_entity: string;
		unicode: string;
		url_png: string;
		url_svg: string;
	};
	_meta: {
		lastUpdatedTimestamp: number;
	};
};

export type Countries = Array<Country>;
