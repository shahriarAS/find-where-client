import Footer from "./Footer";
import Navbar from "./Navbar";
import SocialShareBar from "./SocialShareBar";

function Layout({ childComp }) {
    return (
        <>
            <Navbar />
            <SocialShareBar />
            {childComp}
            <Footer />
        </>
    );
}

export default Layout;