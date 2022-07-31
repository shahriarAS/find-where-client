import { useState } from "react";
import { Link } from "react-router-dom";
import globeImg from "../assets/images/Page/Common/globe.png";
import registerImg from "../assets/images/Page/Common/sideImage.png";
import RegForm from "../components/page/RegForm";
import Loading from "../components/root/Loading";

function Register() {
    const [loading, setLoading] = useState(false)
    return (
        loading ? (<Loading />) : (<div className="register-page h-full max-h-[800px] flex font-bubblegum text-[#424242] uppercase">
            <div className="register-form relative flex-1 bg-cover bg-center bg-no-repeat bg-blend-multiply bg-gray-200">
                <img src={globeImg} alt="Globe" className="absolute w-64 bottom-0 -left-40" />
                <div className="register-area w-1/2 h-full py-6 m-auto flex flex-col items-center">
                    <h1 className="register-title text-7xl self-start">Sign Up</h1>
                    <RegForm loading={loading} setLoading={setLoading} />
                    <div className="register-tag mt-8">
                        <p>Already have an account? <Link to="/login" className="text-[#A900FD]">Sign In</Link></p>
                    </div>
                </div>
            </div>
            <div className="register-side flex-1 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${registerImg})` }}>

            </div>
        </div>)
    );
}

export default Register;