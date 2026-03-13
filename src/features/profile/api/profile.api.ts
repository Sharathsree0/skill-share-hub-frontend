import api from "../../../shared/services/axios";

export interface UpdateUserProfileDto {
    name?: string;
    avatarUrl?: string;
    studentProfile?: {
        bio?: string;
        skills?: string[];
        interests?: string[];
    };
    tutorProfile?: {
        bio?: string;
        skills?: string[];
        experience?: string;
    };
}

// Backend wraps response as { success, data: User }
export const getProfie = async () => {
    const response = await api.get("/users/profile");
    return response.data.data; // unwrap the nested .data
};

export const updateUserProfileApi = async (data: UpdateUserProfileDto) => {
    const response = await api.put("/users/profile", data);
    return response.data.data; // unwrap the nested .data
};
