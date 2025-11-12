const Loader = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
            <div className="flex flex-col items-center gap-3">
                {/* Spinner */}
                <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>

                {/* Text */}
                <p className="text-gray-600 text-sm">Loading...</p>
            </div>
        </div>
    );
};

export default Loader;