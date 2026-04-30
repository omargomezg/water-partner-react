export interface Content {
    id: string;
    permalink: string;
    title: string;
    summary: string;
    image: string;
    updatedAt: Date;
    category: string;
    tags: Array<string>;
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