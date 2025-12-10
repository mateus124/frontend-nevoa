export interface Author {
    id: number;
    name: string;
    email: string;
}

export interface Course {
    id: number;
    title: string;
    description: string;
    duration: number;
    image?: string;
    status: boolean;
    author: Author;
}
