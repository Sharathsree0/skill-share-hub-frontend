import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/redux';
import { setSearch } from '../slice/courseSlice';
import { useDebounce } from 'use-debounce';

export default function CourseSearch() {
    const dispatch = useAppDispatch();
    const currentSearch = useAppSelector((state) => state.courses.search);
    const [localSearch, setLocalSearch] = useState(currentSearch);
    const [debouncedSearch] = useDebounce(localSearch, 300);

    useEffect(() => {
        if (debouncedSearch !== currentSearch) {
            dispatch(setSearch(debouncedSearch));
        }
    }, [debouncedSearch, dispatch, currentSearch]);

    useEffect(() => {
        setLocalSearch(currentSearch);
    }, [currentSearch]);

    return (
        <div className="relative w-full max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
                type="text"
                className="block w-full pl-11 pr-4 py-3.5 border-0 bg-white shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-green-600 rounded-2xl text-gray-900 placeholder:text-gray-400 sm:text-lg sm:leading-6 transition-shadow"
                placeholder="Search for courses, skills, or topics..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
            />
        </div>
    );
}
