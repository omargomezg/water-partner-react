export interface Content {
    id?: string;
    permalink: string;
    summary: string;
    content?: string | null;
    referringSite?: string | null;
    category: string;
    createdBy: any;
    createdAt: Date;
    updatedAt: Date;
    featureImage: FeatureImage;
    tags: Tags[];
    title: string;
    numberOfViews: number;
    status: string;
}

export interface Tags {
    id?: string;
    name?: string;
    slug?: string;
}

export interface FeatureImage {
    id?: string;
    alt?: string;
    title?: string;
}

export interface Category {
    id: string;
    name: string;
    parent: string;
    slug: string;
    keywords: string[];
    totalArticles: number;
}

export interface AiResponse {
    text: string;
    texts: string[];
}

export interface AiRequest {
    content: string;
}