import api from "../../../shared/services/axios";

export interface UpdateTutorProfileDto {
    name?: string;
    avatarUrl?: string;
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

export const updateTutorProfileApi = async (data: UpdateTutorProfileDto) => {
    const response = await api.put("/users/profile", data);
    return response.data.data; // unwrap the nested .data
};
