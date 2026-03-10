import { Link } from 'react-router-dom';
import type { Course } from '../types/course.types';
import { Star, Users } from 'lucide-react';
import { memo } from 'react';

interface CourseCardProps {
    course: Course;
}

const CourseCard = memo(function CourseCard({ course }: CourseCardProps) {
    const isCredit = course.courseType === 'credit';

    return (
        <Link
            to={`/courses/${course._id}`}
            className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
        >
            {/* Thumbnail */}
            <div className="relative aspect-video overflow-hidden bg-gray-100">
                <img
                    src={course.thumbnailUrl || '/placeholder-course.jpg'}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                />
                <div className="absolute top-3 inset-x-3 flex justify-between items-start">
                    <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium text-gray-700 rounded-full shadow-sm">
                        {course.category}
                    </span>
                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full shadow-sm backdrop-blur-sm ${isCredit
                        ? 'bg-purple-100/90 text-purple-700'
                        : 'bg-green-100/90 text-green-700'
                        }`}>
                        {isCredit ? 'Credit' : 'Paid'}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-grow">
                <h3 className="font-semibold text-gray-900 leading-tight mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
                    {course.title}
                </h3>

                <p className="text-sm text-gray-500 mb-4 line-clamp-1">
                    by {course.tutor.name}
                </p>

                <div className="mt-auto flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-3 text-gray-600">
                        <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                            <span className="font-medium text-gray-700">{course.ratingsAverage.toFixed(1)}</span>
                        </div>
                        <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1 opacity-70" />
                            <span>{course.totalEnrollments}</span>
                        </div>
                    </div>

                    <div className="font-bold text-gray-900">
                        {isCredit ? (
                            <span className="text-purple-600 flex items-center">
                                {course.creditCost} <span className="text-xs ml-1 font-medium">credits</span>
                            </span>
                        ) : (
                            <span className="text-green-600">
                                ${course.price}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
});

export default CourseCard;
