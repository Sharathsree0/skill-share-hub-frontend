import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/redux';
import { setPage } from '../slice/courseSlice';

export default function Pagination() {
    const dispatch = useAppDispatch();
    const { page, totalPages } = useAppSelector((state) => state.courses);

    if (totalPages <= 1) return null;

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            dispatch(setPage(newPage));
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const getVisiblePages = () => {
        const delta = 2;
        const range: number[] = [];

        for (
            let i = Math.max(2, page - delta);
            i <= Math.min(totalPages - 1, page + delta);
            i++
        ) {
            range.push(i);
        }

        if (page - delta > 2) {
            range.unshift(-1);
        }
        if (page + delta < totalPages - 1) {
            range.push(-1);
        }

        // Always show first and last
        range.unshift(1);
        if (totalPages > 1) {
            range.push(totalPages);
        }

        return range;
    };

    return (
        <div className="flex items-center justify-center space-x-2 mt-12 pb-12">
            <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex space-x-1">
                {getVisiblePages().map((p, idx) => {
                    if (p === -1) {
                        return <span key={`dots-${idx}`} className="px-3 py-2 text-gray-400">...</span>;
                    }
                    return (
                        <button
                            key={p}
                            onClick={() => handlePageChange(p)}
                            className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-medium transition-all ${page === p
                                    ? 'bg-green-600 text-white shadow-md'
                                    : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            {p}
                        </button>
                    );
                })}
            </div>

            <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
                className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                <ChevronRight className="w-5 h-5" />
            </button>
        </div>
    );
}
