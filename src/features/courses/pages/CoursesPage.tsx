import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/redux';
import { fetchCourses } from '../slice/courseSlice';
import CourseCard from '../components/CourseCard';
import CourseSearch from '../components/CourseSearch';
import FilterSidebar from '../components/FilterSidebar';
import CourseSkeleton from '../components/CourseSkeleton';
import Pagination from '../components/Pagination';
import { BookOpen } from 'lucide-react';

export default function CoursesPage() {
    const dispatch = useAppDispatch();
    const { list: courses, loading, error, filters, search, page } = useAppSelector(
        (state) => state.courses
    );

    useEffect(() => {
        dispatch(fetchCourses());
    }, [dispatch, filters, search, page]);

    return (
        <div className="min-h-screen bg-gray-50/50 flex flex-col font-sans">
            <div className="flex-1 pt-24 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header Section */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
                            Explore Courses
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                            Discover thousands of courses in professional skills, technology, and business to advance your career.
                        </p>
                        <div className="relative z-20">
                            <CourseSearch />
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Sidebar */}
                        <div className="lg:w-1/4 flex-shrink-0">
                            <FilterSidebar />
                        </div>

                        {/* Main Content Area */}
                        <div className="lg:w-3/4 flex-1">
                            {/* Error State */}
                            {error && !loading && (
                                <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6">
                                    Failed to load courses: {error}
                                </div>
                            )}

                            {/* Courses Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {loading ? (
                                    Array.from({ length: 9 }).map((_, i) => (
                                        <CourseSkeleton key={`skeleton-${i}`} />
                                    ))
                                ) : courses.length > 0 ? (
                                    courses.map((course) => (
                                        <CourseCard key={course._id} course={course} />
                                    ))
                                ) : (
                                    <div className="col-span-full flex flex-col items-center justify-center py-24 px-4 text-center bg-white rounded-2xl border border-gray-100 shadow-sm">
                                        <div className="bg-green-50 w-20 h-20 rounded-full flex items-center justify-center mb-6">
                                            <BookOpen className="w-10 h-10 text-green-600" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">No courses found</h3>
                                        <p className="text-gray-500 max-w-md">
                                            We couldn't find any courses matching your current search and filters. Try adjusting them to see more results.
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Pagination Component */}
                            {!loading && courses.length > 0 && <Pagination />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
