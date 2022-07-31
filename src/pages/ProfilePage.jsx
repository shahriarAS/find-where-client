import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import globeImg from "../assets/images/Page/Common/globe.png";
import registerImg from "../assets/images/Page/Common/sideImage.png";
import greyMap from "../assets/images/Page/Leaderboard/grey-map.png";
import MatchHistory from "../components/page/MatchHistory";
import ProfileChart from "../components/page/ProfileChart";
import UpdateForm from "../components/page/UpdateForm";
import Loading from "../components/root/Loading";
import { auth, db } from '../config/firebaseConfig';
import useStore from "../store/index";

function ProfilePage() {
    const [loadingData, setLoadingData] = useState(true);
    const [userData, setUserData] = useState();
    const state = useStore((state) => state)
    const [user] = useAuthState(auth);


    const getDataOnce = async () => {
        setLoadingData(true)
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data()
            console.log(data)
            setUserData(data)
            setLoadingData(false)
        } else {
            console.log("No such document!");
            setLoadingData(false)
        }
    }

    useEffect(() => {
        if (user) {
            getDataOnce()
        }
    }, [user]);

    return (
        loadingData ? (<Loading />) : (
            <div className="register-page h-full flex flex-col justify-center font-bubblegum text-[#424242] uppercase">
                <div className="profile-top flex">
                    <div className="register-form p-10 relative flex-1 bg-cover bg-center bg-no-repeat bg-blend-overlay bg-white/50" style={{ backgroundImage: `url(${greyMap})` }}>
                        <img src={globeImg} alt="Globe" className="absolute w-64 bottom-0 -left-40" />
                        <div className="register-area w-1/2 h-full py-6 m-auto flex flex-col items-center">
                            <h1 className="register-title text-7xl self-start">Profile</h1>
                            <UpdateForm />
                        </div>
                    </div>
                    <div className="register-side p-10 flex-1 bg-cover bg-center bg-no-repeat bg-blend-overlay bg-white/70" style={{ backgroundImage: `url(${registerImg})` }}>
                        <div className="register-area w-full h-full p-6 m-auto flex flex-col items-center">
                            <MatchHistory userData={userData} />
                        </div>
                    </div>
                </div>
                <div className="profile-middle flex items-center justify-center my-8">
                    <h1 className="register-title text-4xl">Match Graph</h1>
                </div>
                <div className="profile-bottom my-8 flex h-96">
                    <div className="register-form relative flex-1">
                        <div className="register-area w-full h-full py-6 m-auto flex flex-col items-center">
                            <h1 className="register-title text-2xl text-[#A900FD] mb-4">Last 10 Match Score</h1>
                            <ProfileChart userData={userData} graphType={"score"} />
                        </div>
                    </div>
                    <div className="register-form relative flex-1">
                        <div className="register-area w-full h-full py-6 m-auto flex flex-col items-center">
                            <h1 className="register-title text-2xl text-[#A900FD] mb-4">Last 10 Match Time</h1>
                            <ProfileChart userData={userData} graphType={"time"} />
                        </div>
                    </div>
                </div>
            </div>)
    );
}

export default ProfilePage;