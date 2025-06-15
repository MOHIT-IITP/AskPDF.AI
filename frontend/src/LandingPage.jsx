import React from 'react'

const LandingPage = () => {
    const handleHomeClick = () => {
        window.location.href = '/home';
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-700 to-gray-400 p-4">
            <div className="w-full flex justify-center items-center flex-col max-w-2xl backdrop-blur-md  p-8 transition-all duration-300">
                <h1 className="text-5xl md:text-7xl font-extrabold mb-12 text-white/80 text-center drop-shadow-lg">
                    Turn PDFs Into Conversations.
                </h1>
                <p className="text-xl md:text-2xl text-white/60 font-sans mb-8 text-center">
                    Upload any document. Ask any question. Get smart answers.
                </p>
                <button
                    className="px-8 py-3 bg-gradient-to-r from-black-500 to-grey-600 bg-black/20 text-white font-semibold rounded-lg shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    onClick={handleHomeClick}
                >
                    Go To App 
                </button>
            </div>
        </div>
    )
}

export default LandingPage