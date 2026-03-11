import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState, AppDispatch } from "../../../../store/store";
import { updateUserProfile } from "../../thunk/profile.thunk";
import { clearProfileErrors } from "../../slice/profile.slice";
import FullScreenLoader from "../../../../shared/components/FullScreenLoader";
import { User, PenTool, Save, ArrowLeft, Image as ImageIcon } from "lucide-react";
import { toast } from "react-hot-toast";

export default function EditTutorProfilePage() {
    const { user, loading } = useSelector((state: RootState) => state.user);
    const { updating, updateError } = useSelector((state: RootState) => state.profile);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        avatarUrl: "",
        bio: "",
        skills: "",
        experience: "",
    });

    // Pre-fill from auth state (the logged-in user already has profile)
    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "",
                avatarUrl: user.avatarUrl || "",
                bio: user.tutorProfile?.bio || "",
                skills: user.tutorProfile?.skills?.join(", ") || "",
                experience: user.tutorProfile?.experience || "",
            });
        }
    }, [user]);

   
    useEffect(() => {
        if (updateError) {
            toast.error(updateError);
            dispatch(clearProfileErrors());
        }
    }, [updateError, dispatch]);

    if (loading) return <FullScreenLoader />;

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <h2 className="text-xl font-bold">Please log in to edit your profile.</h2>
            </div>
        );
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const skillsArray = formData.skills
            .split(",")
            .map((s) => s.trim())
            .filter((s) => s.length > 0);

        const result = await dispatch(
            updateUserProfile({
                name: formData.name,
                avatarUrl: formData.avatarUrl || undefined,
                tutorProfile: {
                    bio: formData.bio,
                    skills: skillsArray,
                    experience: formData.experience,
                },
            })
        );

        if (updateUserProfile.fulfilled.match(result)) {
            toast.success("Profile updated successfully!");
            navigate("/profile");
        }
        
    };

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full min-h-screen bg-transparent">

            {/* Back Nav */}
            <button
                onClick={() => navigate("/profile")}
                className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-green-600 transition-colors mb-6"
            >
                <ArrowLeft className="w-4 h-4" /> Back to Profile
            </button>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

                {/* Header Ribbon */}
                <div className="px-8 py-6 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <PenTool className="w-5 h-5 text-green-600" />
                            Edit Profile
                        </h1>
                        <p className="text-sm text-gray-500 font-medium mt-1">Keep your teaching profile up to date to attract more students.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-8">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Basic Info */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-bold text-gray-800 border-b pb-2">Basic Information</h3>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    <User className="w-4 h-4 text-gray-400" /> Full Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-600/20 focus:border-green-600 transition-all text-sm font-medium"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    <ImageIcon className="w-4 h-4 text-gray-400" /> Avatar Image URL
                                </label>
                                <input
                                    type="url"
                                    name="avatarUrl"
                                    value={formData.avatarUrl}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-600/20 focus:border-green-600 transition-all text-sm font-medium"
                                    placeholder="https://example.com/avatar.jpg"
                                />
                                <p className="text-xs text-gray-400">Leave blank to use a dynamically generated avatar.</p>
                            </div>
                        </div>

                        {/* Teaching Info */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-bold text-gray-800 border-b pb-2">Professional Summary</h3>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Bio <span className="text-gray-400 font-normal">(Markdown/Text)</span></label>
                                <textarea
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleChange}
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-600/20 focus:border-green-600 transition-all resize-none text-sm font-medium leading-relaxed"
                                    placeholder="Tell students about your teaching philosophy and background..."
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Skills <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    name="skills"
                                    value={formData.skills}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-600/20 focus:border-green-600 transition-all text-sm font-medium"
                                    placeholder="React, Node.js, NextJS"
                                    required
                                />
                                <p className="text-xs text-gray-400">Separate skills using commas.</p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Experience</label>
                                <input
                                    type="text"
                                    name="experience"
                                    value={formData.experience}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-600/20 focus:border-green-600 transition-all text-sm font-medium"
                                    placeholder="e.g. 5 years in Full-Stack Development"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-gray-100 flex items-center justify-end gap-4">
                        <button
                            type="button"
                            onClick={() => navigate("/profile")}
                            className="px-6 py-2.5 rounded-xl font-bold text-gray-600 bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-all text-sm"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={updating}
                            className="flex items-center gap-2 px-8 py-2.5 rounded-xl font-bold text-white bg-[#1F5E45] hover:bg-[#164733] shadow-md transition-all active:scale-95 text-sm disabled:opacity-70 disabled:active:scale-100"
                        >
                            {updating ? (
                                "Saving..."
                            ) : (
                                <>
                                    <Save className="w-4 h-4" /> Save Profile
                                </>
                            )}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}
