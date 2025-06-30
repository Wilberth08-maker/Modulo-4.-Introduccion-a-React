const PagButtons = ({ info, onPrevious, onNext }) => {
    return (
        <div className="flex justify-end items-center gap-2 my-8 w-full max-w-7xl mx-auto px-6">
            <button
                className="w-6 h-6 flex items-center justify-center bg-gray-200 border border-gray-300 rounded-full text-gray-900 hover:bg-gray-300 transition-colors duration-200 disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200 disabled:cursor-not-allowed"
                onClick={onPrevious}
                disabled={!info.prev}
                aria-label="Previous page"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <button 
                className="w-6 h-6 flex items-center justify-center bg-gray-200 border border-gray-300 rounded-full text-gray-900 hover:bg-gray-300 transition-colors duration-200 disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200 disabled:cursor-not-allowed"
                onClick={onNext}
                disabled={!info.next}
                aria-label="Next page"
                >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
    );
};

export default PagButtons;
