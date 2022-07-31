import { Link } from "react-router-dom";
import icon from "../../assets/images/icon.svg";

function Footer() {
    return (
        <footer class="footer mt-12 w-full flex justify-between items-center bg-[#a60cff] text-white px-10 py-2">
            <div className="left-nav flex justify-between items-center">
                <Link to="/" className="nav-item flex items-center justify-between gap-2">
                    <img src={icon} alt="Find The Object" className='w-16' />
                    <h1>&copy; 2022 - Find The Object</h1>
                </Link>
            </div>
            <div className="right-nav flex justify-between items-center gap-8 font-bold text-sm">
                <Link to="/page/about">About</Link>
                <Link to="/page/terms-condition">Terms & Condition</Link>
                <Link to="/page/privacy-policy">Privacy Policy</Link>
            </div>
        </footer>
    );
}

export default Footer;