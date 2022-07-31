import { useState } from "react";
import { Link } from "react-router-dom";
import globeImg from "../assets/images/Page/Common/globe.png";
import registerImg from "../assets/images/Page/Common/sideImage.png";
import LoginForm from "../components/page/LoginForm";
import Loading from "../components/root/Loading";

function Login() {
    const [loading, setLoading] = useState(false)
    return (
        loading ? (<Loading />) : (<div className="register-page h-full max-h-[800px] flex font-bubblegum text-[#424242] uppercase">
            <div className="register-form relative flex-1 bg-cover bg-center bg-no-repeat bg-blend-multiply bg-gray-200">
                <img src={globeImg} alt="Globe" className="absolute w-64 bottom-0 -left-40" />
                <div className="register-area w-1/2 h-full py-6 m-auto flex flex-col items-center justify-center">
                    <h1 className="register-title text-5xl self-start">Sign In</h1>

                    <LoginForm loading={loading} setLoading={setLoading}/>
                    <div className="register-tag mt-8">
                        <p>Don't have an account? <Link to="/register" className="text-[#A900FD]">Sign Up</Link></p>
                    </div>
                </div>
            </div>
            <div className="register-side flex-1 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${registerImg})` }}>

            </div>
        </div>)
    );
}

export default Login;