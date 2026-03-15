import { Play, Volume2, Maximize, CheckCircle } from "lucide-react";

export default function VideoComp() {
    return (
        <div className="w-full flex flex-col gap-4">
            <div className="relative w-full aspect-video bg-gray-900 rounded-xl overflow-hidden shadow-2xl group border border-gray-800">
                {/* 
                    Placeholder for video player
                */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900/80 backdrop-blur-sm">
                    <div className="w-20 h-20 bg-[#166534]/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 pointer-events-none">
                        <div className="w-16 h-16 bg-[#166534] rounded-full flex items-center justify-center pl-1 shadow-lg shadow-[#166534]/30">
                            <Play className="w-8 h-8 text-white" fill="currentColor" />
                        </div>
                    </div>
                    <p className="text-gray-300 font-medium pointer-events-none">Preview available soon</p>
                </div>

                {/* Custom Overlay Controls */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center gap-4">
                        <button className="text-white hover:text-[#166534] transition-colors">
                            <Play className="w-5 h-5" fill="currentColor" />
                        </button>
                        <div className="h-1 w-32 bg-gray-600 rounded-full overflow-hidden cursor-pointer">
                            <div className="h-full bg-[#166534] w-1/3"></div>
                        </div>
                        <span className="text-xs font-medium text-gray-300">03:45 / 12:30</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="text-white hover:text-[#166534] transition-colors">
                            <Volume2 className="w-5 h-5" />
                        </button>
                        <button className="text-white hover:text-[#166534] transition-colors">
                            <Maximize className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
                <h2 className="text-2xl font-bold text-gray-900 capitalize">Introduction to the Course</h2>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#166534] hover:bg-[#14532D] rounded-lg shadow-sm transition-colors cursor-pointer">
                        <CheckCircle className="w-4 h-4" />
                        Mark as Completed
                    </button>
                </div>
            </div>
        </div>
    );
}
