import { signOut } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import toast from "react-hot-toast";
import { BiBarChartAlt2, BiHomeAlt, BiLogIn, BiLogOut, BiUser } from "react-icons/bi";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import { auth } from "../../config/firebaseConfig";
import useStore from "../../store";
import Loading from "./Loading";

function Navbar() {
    const state = useStore((state) => state)
    const [user, loading, error] = useAuthState(auth);

    const logOut = () => {
        signOut(auth)
        toast("Signed Out.")
    }

    if (state.gameMode != "multiplayer") {
        return (
            loading ? (<Loading />) : (
                <div className="navbar w-full h-16 flex justify-between items-center bg-[#a60cff] text-white px-10 py-4">
                    <div className="left-nav flex justify-between items-center">
                        <div className="nav-item flex items-center justify-between gap-2">
                            <Link to="/">
                                <img src={logo} alt="Find The Object" className='w-40' />
                            </Link>
                        </div>
                    </div>
                    <div className="right-nav flex justify-between items-center gap-8 font-bold text-2xl">
                        <Link to="/">
                            <div className="nav-item flex items-center justify-between gap-1">
                                <BiHomeAlt />
                                <p className=''>Home</p>
                            </div>
                        </Link>
                        {/* <div className="nav-item flex items-center justify-between gap-1">
                            <BiInfoCircle />
                            <p className=''>About Us</p>
                        </div> */}
                        <Link to="/leaderboard">
                            <div className="nav-item flex items-center justify-between gap-1">
                                <BiBarChartAlt2 />
                                <p className=''>Leaderboard</p>
                            </div>
                        </Link>
                        {
                            user ? (
                                <>
                                    <Link to="/profile">
                                        <div className="nav-item flex items-center justify-between gap-1">
                                            <BiUser />
                                            <p className=''>Profile</p>
                                        </div>
                                    </Link>
                                    <div onClick={logOut} className="nav-item flex items-center justify-between gap-1 cursor-pointer">
                                        <BiLogOut />
                                        <p className=''>Logout</p>
                                    </div>
                                </>
                            ) : (
                                <Link to="/login">
                                    <div className="nav-item flex items-center justify-between gap-1 cursor-pointer">
                                        <BiLogIn />
                                        <p className=''>Login</p>
                                    </div>
                                </Link>
                            )
                        }
                    </div>
                </div>)
        );
    } else {
        return (<></>)
    }
}

export default Navbar;