import VideoComp from "./components/VideoComp";
import ContentList from "./components/ContentList";
import CourseSummary from "./components/CourseSummary";
import ModuleSummary from "./components/ModuleSummary";

export default function Content() {
    return (
        <div className="flex flex-col bg-gradient-to-b from-gray-50 via-white to-gray-50 font-sans transition-colors duration-300">
            {/* Main Content Area */}
            <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    
                    {/* Left Column: Video & Summary */}
                    <div className="w-full lg:w-2/3 flex flex-col gap-8">
                        {/* Video Player Section */}
                        <section aria-label="Course Video Player">
                            <VideoComp />
                        </section>

                        {/* Module Summary Section */}
                        <section aria-label="Module Summary">
                            <ModuleSummary />
                        </section>

                        {/* Course Details / Summary Section */}
                        <section aria-label="Course Overview">
                            <CourseSummary />
                        </section>
                    </div>

                    {/* Right Column: Course Content List (Sidebar) */}
                    <aside className="w-full lg:w-1/3 lg:sticky lg:top-28">
                        <section aria-label="Course Content Modules">
                            <ContentList />
                        </section>
                    </aside>

                </div>
            </main>
        </div>
    );
}