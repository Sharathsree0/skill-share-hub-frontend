import { PlayCircle, CheckCircle2, Lock } from "lucide-react";

export default function ContentList() {
    return (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="p-5 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                <h3 className="font-bold text-lg text-gray-900">Course Content</h3>
                <span className="text-sm font-medium text-[#166534] bg-[#166534]/10 px-3 py-1 rounded-full">
                    3 Lessons
                </span>
            </div>

            <div className="divide-y divide-gray-200">
                <ul className="bg-white">
                    {/* Item 1: Completed */}
                    <li>
                        <button className="w-full flex items-start gap-3 px-6 py-4 text-left transition-all hover:bg-gray-50 border-l-4 border-transparent hover:pl-5">
                            <div className="flex-shrink-0 mt-0.5">
                                <CheckCircle2 className="w-5 h-5 text-[#166534]" />
                            </div>
                            <div className="flex-grow min-w-0 flex flex-col gap-1">
                                <p className="text-sm font-medium truncate text-gray-700">
                                    Introduction to the Course
                                </p>
                                <p className="text-xs text-gray-500 line-clamp-1">
                                    Getting started with the basics.
                                </p>
                            </div>
                            <div className="flex-shrink-0 text-xs font-medium text-gray-400 bg-gray-100 px-2 py-1 rounded">
                                15 min
                            </div>
                        </button>
                    </li>

                    {/* Item 2: Active */}
                    <li>
                        <button className="w-full flex items-start gap-3 px-6 py-4 text-left transition-all bg-[#166534]/10 border-l-4 border-[#166534] pl-5">
                            <div className="flex-shrink-0 mt-0.5">
                                <PlayCircle className="w-5 h-5 text-[#166534]" />
                            </div>
                            <div className="flex-grow min-w-0 flex flex-col gap-1">
                                <p className="text-sm font-medium truncate text-[#166534]">
                                    Core Concepts
                                </p>
                                <p className="text-xs text-gray-500 line-clamp-1">
                                    Deep dive into core concepts.
                                </p>
                            </div>
                            <div className="flex-shrink-0 text-xs font-medium text-gray-400 bg-gray-100 px-2 py-1 rounded">
                                45 min
                            </div>
                        </button>
                    </li>

                    {/* Item 3: Locked */}
                    <li>
                        <button disabled className="w-full flex items-start gap-3 px-6 py-4 text-left transition-all opacity-60 cursor-not-allowed bg-gray-50/50 grayscale-[50%]">
                            <div className="flex-shrink-0 mt-0.5">
                                <Lock className="w-5 h-5 text-gray-400" />
                            </div>
                            <div className="flex-grow min-w-0 flex flex-col gap-1">
                                <p className="text-sm font-medium truncate text-gray-500">
                                    Advanced Techniques
                                </p>
                                <p className="text-xs text-gray-500 line-clamp-1">
                                    Mastering advanced techniques.
                                </p>
                            </div>
                            <div className="flex-shrink-0 text-xs font-medium text-gray-400 bg-gray-100 px-2 py-1 rounded">
                                60 min
                            </div>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
}
