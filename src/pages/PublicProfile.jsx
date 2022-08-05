import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import registerImg from "../assets/images/Page/Common/sideImage.jpeg";
import greyMap from "../assets/images/Page/Leaderboard/grey-map.png";
import MatchHistory from "../components/page/MatchHistory";
import ProfileChart from "../components/page/ProfileChart";
import Loading from "../components/root/Loading";
import { db } from '../config/firebaseConfig';
import useStore from "../store/index";

function PublicProfile() {
    const [loadingData, setLoadingData] = useState(true);
    const [userData, setUserData] = useState();
    const state = useStore((state) => state)
    let navigate = useNavigate()
    let { username } = useParams();


    const getDataOnce = async () => {
        setLoadingData(true)
        const docRef = doc(db, "users", username);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data()
            console.log(data)
            setUserData(data)
            setLoadingData(false)
        } else {
            // console.log("No such document!");
            setLoadingData(false)
            navigate("/page-not-found")
        }
    }

    useEffect(() => {
        if (username) {
            getDataOnce()
        } else {
            navigate("/page-not-found")
        }
    }, [username]);

    return (
        loadingData ? (<Loading />) : (
            <div className="register-page h-full flex flex-col justify-center font-Saira text-[#424242] uppercase">
                <h1 className="text-center text-4xl font-bold my-4 mt-8">Profile of {username}</h1>
                <div className="profile-top flex">
                    <div className="register-form p-10 relative flex-1 bg-cover bg-center bg-no-repeat bg-blend-overlay bg-white/50" style={{ backgroundImage: `url(${greyMap})` }}>
                        <div className="register-area w-full h-full p-6 m-auto flex flex-col items-center">
                            <h1 className="history-title text-4xl self-center">Match History</h1>
                            <MatchHistory userData={userData} />
                        </div>
                    </div>
                    <div className="register-side p-10 flex-1 bg-cover bg-center bg-no-repeat bg-blend-overlay bg-white/70" style={{ backgroundImage: `url(${registerImg})` }}>
                        <div className="register-area w-full h-full py-6 m-auto flex flex-col items-center">
                        <h1 className="history-title text-4xl self-center mb-4">Last 10 Match Score</h1>
                            <ProfileChart userData={userData} graphType={"score"} />
                        </div>
                    </div>
                </div>
                {/* <div className="profile-middle flex items-center justify-center my-8">
                    <h1 className="register-title text-4xl">Match Graph</h1>
                </div>
                <div className="profile-bottom my-8 flex h-96">
                    <div className="register-form relative flex-1">

                    </div>
                </div> */}
            </div>)
    );
}

export default PublicProfile;