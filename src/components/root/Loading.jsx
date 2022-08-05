import "./Loading.css";

function Loading({ msg }) {
    return (
        <div className="absolute inset-0 h-screen w-full bg-[#9B00F3] flex flex-col items-center justify-center gap-4 text-4xl text-white z-50">


            <div className="loader">
                <div className="loader__bar"></div>
                <div className="loader__bar"></div>
                <div className="loader__bar"></div>
                <div className="loader__bar"></div>
                <div className="loader__bar"></div>
                <div className="loader__ball"></div>
            </div>
            {
                msg ? (
                    <div className="w-auto">
                        <p className="line-1 anim-typewriter text-lg">{msg}</p>
                    </div>
                ) : null
            }


        </div>
    );
}

export default Loading;