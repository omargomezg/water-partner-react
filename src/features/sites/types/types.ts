export interface SiteSummary {
	id: string;
	name: string;
	description: string;
	url: string;
	googleTagID: string;
	sharedWithSites: string[];
	socialNetworks: SocialNetwork[];
}

export interface SocialNetwork {
	url: string;
	icon: string;
	name: string;
}

export interface Site {
	id: string;
	name: string;
	description: string;
	url: string;
	logo: string;
	favicon: string;
	googleTagId: string;
	mision: string;
	vision: string;
	keywords: string[];
	relatedSites: string[];
	homeTemplate: string;
}
