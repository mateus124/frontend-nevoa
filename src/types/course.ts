import { User } from "./user";

export interface Course {
    id: number;
    title: string;
    description: string;
    duration: number;
    image?: string;
    status: boolean;
    author: User;
}