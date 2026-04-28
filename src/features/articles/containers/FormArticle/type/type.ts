export interface Content {
    id?: string;
    permalink: string;
    summary: string;
    content?: string | null;
    referringSite?: string | null;
    category: Category;
    createdBy: any;
    createdAt: Date;
    updatedAt: Date;
    featureImage: FeatureImage;
    listOfTags: Array<any>;
    tags: Array<string>;
    title: string;
    numberOfViews: number;
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