export interface Content {
    id?: string;
    permalink: string;
    summary: string;
    content?: string | null;
    referringSite?: string | null;
    category: Category;
    createdBy: CreatedBy;
    createdAt: number;
    updatedAt: number;
    featureImage: FeatureImage;
    listOfTags: Array<ListOfTags>;
    tags: Array<string>;
    title: string;
    numberOfViews: number;
}

export interface ListOfTags {
    createdAt: number | null;
    name: string;
    slug: string;
}

export interface FeatureImage {
    id: string | null;
    alt: string | null;
    title: string | null;    
}

export interface Category {
    id?: string;
    parent?: string;
    keywords?: Array<string>;
    name: string;
    slug: string;
    totalArticles: number;
}

export interface CreatedBy {
    createdAt: Date | null;
    alias: string;
    email: string;
}

export interface ApiResponse<T> {
    content: Array<T>;
    hasContenr: boolean;
    hastNext: boolean;
    last: boolean;
    totalElements: number;
    totalPages: number;
}