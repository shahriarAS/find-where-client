import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import bannerBG from "../assets/images/Page/Homepage/17.jpeg";
import cardBG from "../assets/images/Page/Homepage/69.jpeg";
import countryCardImg from "../assets/images/Page/Homepage/country-card.jpeg";
import settingImg from "../assets/images/Page/Homepage/setting-card.jpeg";
import stateCardImg from "../assets/images/Page/Homepage/state-card.jpeg";
import useStore from '../store';

function HomePage() {
    const state = useStore((state) => state)

    useEffect(() => {
        state.resetState()
    }, []);
    return (
        <div className='w-full h-full flex flex-col items-center font-Saira'>
            <div className="home-banner w-full h-[350px] bg-cover bg-center" style={{ backgroundImage: `url(${bannerBG})` }}>
                <div className="banner-inner w-full h-full flex items-center justify-center text-white bg-gradient-to-b from-[#a31cf1]/70 to-[#cf7bff]/40">
                    <h1 className="banner-title text-9xl drop-shadow-2xl">Find Where I Am</h1>
                    {/* <img src={binoImg} alt="Find Where I Am" className='w-32' /> */}
                </div>
            </div>
            <div className="home-cards h-full w-full p-8 bg-cover bg-center grid grid-cols-3 gap-12 justify-center items-center bg-blend-lighten bg-white/40" style={{ backgroundImage: `url(${cardBG})` }}>
                <Link to="/world-country">
                    <div className="game-card h-60 border-4 border-[#181818] rounded-md bg-cover flex items-end justify-center" style={{ backgroundImage: `url(${countryCardImg})` }}>
                        <h1 className="card-title w-full bg-[#181818] text-white px-4 py-1 text-4xl font-bold text-center">
                            Play By Country
                        </h1>
                    </div>
                </Link>
                <Link to="/us-state">
                    <div className="game-card h-60 border-4 border-[#D10203] rounded-md bg-cover flex items-end justify-center" style={{ backgroundImage: `url(${stateCardImg})` }}>
                        <h1 className="card-title w-full bg-[#D10203] text-white px-4 py-1 text-4xl font-bold text-center">
                            Play by US State
                        </h1>
                    </div>
                </Link>
                <Link to="/settings">
                    <div className="game-card h-60 border-4 border-[#069CCE] rounded-md bg-cover flex items-end justify-center" style={{ backgroundImage: `url(${settingImg})` }}>
                        <h1 className="card-title w-full bg-[#069CCE] text-white px-4 py-1 text-4xl font-bold text-center">
                            Game Settings
                        </h1>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default HomePage;