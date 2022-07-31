import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import firstRank from "../assets/images/Page/Leaderboard/1.png";
import secondRank from "../assets/images/Page/Leaderboard/2.png";
import thirdRank from "../assets/images/Page/Leaderboard/3.png";
import greyMap from "../assets/images/Page/Leaderboard/grey-map.png";
import Loading from "../components/root/Loading";
import { auth, db } from '../config/firebaseConfig';
import useStore from "../store/index";
import globalVariable from "../utils/globalVariable";
import secondsToMinute from "../utils/secondsToMinute";

function Leaderboard() {
    const [loadingData, setLoadingData] = useState(true);
    const [allUserData, setAllUserData] = useState([]);
    const state = useStore((state) => state)
    const [user] = useAuthState(auth);


    const getDataOnce = async () => {
        setLoadingData(true)

        const querySnapshot = await getDocs(collection(db, "users"));
        const toAddAllData = []

        querySnapshot.forEach((doc) => {
            toAddAllData.push(doc.data())
        });

        function rankingFunction(userDataOne, userDataTwo) {
            // Ranking Algorithm
            return (globalVariable.maxTime - userDataTwo.bestTime + userDataTwo.totalScore + userDataTwo.winCount) - (globalVariable.maxTime - userDataOne.bestTime + userDataOne.totalScore + userDataOne.winCount);
        }

        toAddAllData.sort(rankingFunction);

        setAllUserData(toAddAllData)
        setLoadingData(false)

        console.log(toAddAllData)
    }

    useEffect(() => {
        getDataOnce()
    }, []);

    return (
        loadingData ? (<Loading />) : (
            <div className="min-h-screen w-full font-bubblegum bg-cover bg-blend-overlay bg-white/40 text-[#424242]  uppercase flex flex-col items-center p-10" style={{ backgroundImage: `url(${greyMap})` }
            }>
                <h1 className="leaderboard-title uppercase text-5xl">
                    Leaderboard
                </h1>
                <h1 className="leaderboard-tagline text-lg text-white bg-gray-900 px-2 py-1">The following are the top 50 players in points and rankings.</h1>
                <div className="leaderboard-table w-full">
                    <div className="flex flex-col mt-6 w-full">
                        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="py-2 align-middle inline-block w-full sm:px-6 lg:px-8">
                                <div className="shadow overflow-hidden sm:rounded-lg w-full">
                                    <table className="text-xl text-black w-full">
                                        <thead className="bg-gradient-to-r from-[#ff0000] to-[#e6ed5f] text-lg uppercase font-medium w-full">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 tracking-wider">
                                                    Rank
                                                </th>
                                                <th scope="col" className="px-6 py-3 tracking-wider">
                                                    Username
                                                </th>
                                                <th scope="col" className="px-6 py-3 tracking-wider">
                                                    Match Played
                                                </th>
                                                <th scope="col" className="px-6 py-3 tracking-wider">
                                                    Match Won
                                                </th>
                                                <th scope="col" className="px-6 py-3 tracking-wider">
                                                    Total Score
                                                </th>
                                                <th scope="col" className="px-6 py-3 tracking-wider">
                                                    Best Time
                                                </th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-[#46474B] text-white">
                                            {
                                                allUserData.map((userData, index) => (
                                                    <tr className={`text-center border-t-8 ${index < 3 ? "bg-gradient-to-r from-[#3561ac] to-[#8b54cb]" : "hover:bg-black hover:bg-opacity-20"}`} key={userData.email}>
                                                        <td className="pl-4">
                                                            {index + 1}
                                                        </td>
                                                        <td className="flex justify-center px-6 py-4 whitespace-nowrap">
                                                            {/* <img className="w-5" src="https://ssl.gstatic.com/onebox/media/sports/logos/JTre94vh6WJeLmIL-Dfc1g_48x48.png" alt="" /> */}
                                                            <span className="ml-2 font-medium">{userData.username}</span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            {userData.totalMatch}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            {userData.winCount}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            {userData.totalScore}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            {secondsToMinute(userData.bestTime).minutes} : {secondsToMinute(userData.bestTime).seconds}
                                                        </td>
                                                        {
                                                            index == 0 ? (
                                                                <td className="pr-4">
                                                                    <img src={firstRank} alt="First Rank" className="w-12" />
                                                                </td>
                                                            ) : index == 1 ? (
                                                                <td className="pr-4">
                                                                    <img src={secondRank} alt="Second Rank" className="w-12" />
                                                                </td>
                                                            ) : index == 2 ? <td className="pr-4">
                                                                <img src={thirdRank} alt="Third Rank" className="w-12" />
                                                            </td>
                                                                : <td className="pr-4"></td>
                                                        }
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)
    );
}

export default Leaderboard;