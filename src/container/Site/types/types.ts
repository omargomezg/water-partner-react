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