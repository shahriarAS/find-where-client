import globalVariable from "../../utils/globalVariable";

function MatchHistory({ userData }) {
    return (
        <>
            <h1 className="history-title text-5xl self-center">Match History</h1>
            <div className="profile-history w-full grid grid-cols-2 gap-4 mt-8 text-[#A900FD]">
                <div className="history-item">
                    <div className="mb-1 text-lg font-medium text-[#A900FD]">Total Score: </div>
                    <div className="w-full bg-gray-200 rounded-full h-4.5 mb-4">
                        <div className="bg-[#A900FD] text-sm font-medium text-white text-center p-1 leading-none rounded-full" style={{
                            width: `${userData?.totalScore ? (userData?.totalScore / (((Object.keys(userData?.gamePlayed)).length) * globalVariable?.maxScore)) * 100 : 100
                                }%`
                        }}>
                            {userData?.totalScore} / {(Object.keys(userData?.gamePlayed)).length * globalVariable?.maxScore}</div>
                    </div>
                </div>

                <div className="history-item">
                    <div className="mb-1 text-lg font-medium text-[#A900FD]">Average Score: </div>
                    <div className="w-full bg-gray-200 rounded-full h-4.5 mb-4">
                        <div className="bg-[#A900FD] text-sm font-medium text-white text-center p-1 leading-none rounded-full" style={{
                            width: `${userData?.totalScore ? (userData?.totalScore / (((Object.keys(userData?.gamePlayed)).length)) / globalVariable?.maxScore) * 100 : 100
                                }%`
                        }}>
                            {(userData?.totalScore / (((Object.keys(userData?.gamePlayed)).length)))} / {globalVariable?.maxScore}
                        </div>
                    </div>
                </div>
                <div className="history-item">
                    <div className="mb-1 text-lg font-medium text-[#A900FD]">Best Score: </div>
                    <div className="w-full bg-gray-200 rounded-full h-4.5 mb-4">
                        <div className="bg-[#A900FD] text-sm font-medium text-white text-center p-1 leading-none rounded-full" style={{
                            width: `${userData?.highScore ? (userData?.highScore / globalVariable?.maxScore) * 100 : 100
                                }%`
                        }}>
                            {userData?.highScore} / {globalVariable?.maxScore}
                        </div>
                    </div>
                </div>

                <div className="history-item">
                    <div className="mb-1 text-lg font-medium text-[#A900FD]">Match Won: </div>
                    <div className="w-full bg-gray-200 rounded-full h-4.5 mb-4">
                        <div className="bg-[#A900FD] text-sm font-medium text-white text-center p-1 leading-none rounded-full" style={{
                            width: `${userData?.winCount ? (userData?.winCount / userData?.totalMatch) * 100 : 100
                                }%`
                        }}>
                            {userData?.winCount} / {userData?.totalMatch}
                        </div>
                    </div>
                </div>
                <div className="history-item">
                    <div className="mb-1 text-lg font-medium text-[#A900FD]">Average Time: </div>
                    <div className="w-full bg-gray-200 rounded-full h-4.5 mb-4">
                        <div className="bg-[#A900FD] text-sm font-medium text-white text-center p-1 leading-none rounded-full" style={{
                            width: `${userData?.totalTime ? (userData?.totalTime / (((Object.keys(userData?.gamePlayed)).length)) / globalVariable?.maxTime) * 100 : 100
                                }%`
                        }}>
                            {(userData?.totalTime / (((Object.keys(userData?.gamePlayed)).length)))} s / {globalVariable?.maxTime} s
                        </div>
                    </div>
                </div>
                <div className="history-item">
                    <div className="mb-1 text-lg font-medium text-[#A900FD]">Best Time: </div>
                    <div className="w-full bg-gray-200 rounded-full h-4.5 mb-4">
                        <div className="bg-[#A900FD] text-sm font-medium text-white text-center p-1 leading-none rounded-full" style={{
                            width: `${userData?.bestTime ? (userData?.bestTime / globalVariable?.maxTime) * 100 : 100
                                }%`
                        }}>
                            {userData?.bestTime} / {globalVariable?.maxTime}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MatchHistory;