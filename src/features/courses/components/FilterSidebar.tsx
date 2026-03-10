import { useAppDispatch, useAppSelector } from '../../../shared/hooks/redux';
import { setFilters, clearFilters } from '../slice/courseSlice';
import type { CourseFilters } from '../types/course.types';
import { SlidersHorizontal, X } from 'lucide-react';

const CATEGORIES = [
    'Web Development',
    'Mobile Development',
    'Data Science',
    'Design',
    'Business',
    'AI & Machine Learning',
    'Marketing'
];

export default function FilterSidebar() {
    const dispatch = useAppDispatch();
    const filters = useAppSelector((state) => state.courses.filters);

    const handleFilterChange = (key: keyof CourseFilters, value: any) => {
        dispatch(setFilters({ [key]: value }));
    };

    const hasActiveFilters = Object.values(filters).some(val => val !== undefined && val !== '');

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-24">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center text-gray-900 font-semibold text-lg">
                    <SlidersHorizontal className="w-5 h-5 mr-2" />
                    Filters
                </div>
                {hasActiveFilters && (
                    <button
                        onClick={() => dispatch(clearFilters())}
                        className="text-sm text-gray-500 hover:text-red-500 flex items-center transition-colors font-medium"
                    >
                        <X className="w-4 h-4 mr-1" />
                        Clear All
                    </button>
                )}
            </div>

            <div className="space-y-8">
                {/* Category Filter */}
                <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">Category</h3>
                    <div className="space-y-3">
                        <label className="flex items-center group cursor-pointer">
                            <input
                                type="radio"
                                name="category"
                                checked={!filters.category}
                                onChange={() => handleFilterChange('category', '')}
                                className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-600"
                            />
                            <span className="ml-3 text-gray-600 group-hover:text-gray-900 transition-colors">All Categories</span>
                        </label>
                        {CATEGORIES.map((cat) => (
                            <label key={cat} className="flex items-center group cursor-pointer">
                                <input
                                    type="radio"
                                    name="category"
                                    value={cat}
                                    checked={filters.category === cat}
                                    onChange={(e) => handleFilterChange('category', e.target.value)}
                                    className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-600"
                                />
                                <span className="ml-3 text-gray-600 group-hover:text-gray-900 transition-colors">{cat}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Course Type Filter */}
                <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">Course Type</h3>
                    <div className="space-y-3">
                        <label className="flex items-center group cursor-pointer">
                            <input
                                type="radio"
                                name="priceType"
                                checked={!filters.priceType}
                                onChange={() => handleFilterChange('priceType', '')}
                                className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-600"
                            />
                            <span className="ml-3 text-gray-600 group-hover:text-gray-900 transition-colors">Any Type</span>
                        </label>
                        <label className="flex items-center group cursor-pointer">
                            <input
                                type="radio"
                                name="priceType"
                                value="paid"
                                checked={filters.priceType === 'paid'}
                                onChange={(e) => handleFilterChange('priceType', e.target.value)}
                                className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-600"
                            />
                            <span className="ml-3 text-gray-600 group-hover:text-gray-900 transition-colors">Paid ($)</span>
                        </label>
                        <label className="flex items-center group cursor-pointer">
                            <input
                                type="radio"
                                name="priceType"
                                value="credit"
                                checked={filters.priceType === 'credit'}
                                onChange={(e) => handleFilterChange('priceType', e.target.value)}
                                className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-600"
                            />
                            <span className="ml-3 text-gray-600 group-hover:text-gray-900 transition-colors">Credit Based</span>
                        </label>
                    </div>
                </div>

                {/* Price/Credit Range */}
                {filters.priceType === 'paid' && (
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">Price Range</h3>
                        <select
                            value={filters.priceRange || ''}
                            onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                            className="w-full rounded-lg border-gray-300 text-gray-700 shadow-sm focus:border-green-500 focus:ring-green-500"
                        >
                            <option value="">Any Price</option>
                            <option value="0-50">Under $50</option>
                            <option value="50-100">$50 - $100</option>
                            <option value="100-200">$100 - $200</option>
                            <option value="200+">Over $200</option>
                        </select>
                    </div>
                )}

                {filters.priceType === 'credit' && (
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">Credit Range</h3>
                        <select
                            value={filters.creditRange || ''}
                            onChange={(e) => handleFilterChange('creditRange', e.target.value)}
                            className="w-full rounded-lg border-gray-300 text-gray-700 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                        >
                            <option value="">Any Credits</option>
                            <option value="0-20">0 - 20 Credits</option>
                            <option value="20-50">20 - 50 Credits</option>
                            <option value="50+">50+ Credits</option>
                        </select>
                    </div>
                )}

                {/* Rating Filter */}
                <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">Minimum Rating</h3>
                    <div className="space-y-3">
                        {[4.5, 4.0, 3.5, 3.0].map((rating) => (
                            <label key={rating} className="flex items-center group cursor-pointer">
                                <input
                                    type="radio"
                                    name="rating"
                                    value={rating.toString()}
                                    checked={filters.rating === rating.toString()}
                                    onChange={(e) => handleFilterChange('rating', e.target.value)}
                                    className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-600"
                                />
                                <span className="ml-3 flex items-center text-gray-600 group-hover:text-gray-900 transition-colors">
                                    {rating} & up
                                </span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
