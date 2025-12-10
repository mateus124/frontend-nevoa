import { User } from "./user";

export interface LoginResponse {
    token: string;
    name: string;
    email: string;
}

export interface RegisterResponse {
    id: number;
    name: string;
    email: string;
}

export interface AuthContextType {
    user: (User & { token: string }) | null;
    login: (userData: User & { token: string }) => void;
    logout: () => void;
}
