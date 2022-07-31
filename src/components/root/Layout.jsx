import Footer from "./Footer";
import Navbar from "./Navbar";

function Layout({ childComp }) {
    return (
        <>
            <Navbar />
            {childComp}
            <Footer />
        </>
    );
}

export default Layout;