import "./Loading.css";

function Loading() {
    return (
        <div className="absolute inset-0 h-screen w-full bg-[#9B00F3] flex flex-col items-center justify-center gap-4 text-4xl text-white z-50">


            <div class="loader">
                <div class="loader__bar"></div>
                <div class="loader__bar"></div>
                <div class="loader__bar"></div>
                <div class="loader__bar"></div>
                <div class="loader__bar"></div>
                <div class="loader__ball"></div>
            </div>
            <div className="w-auto">
                <p className="line-1 anim-typewriter text-lg">Creating Your Question...</p>
            </div>


        </div>
    );
}

export default Loading;