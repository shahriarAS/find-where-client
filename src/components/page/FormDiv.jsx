
function FormDiv({ setShowPass, label, icon, icon2, error, children }) {

    return (
        <div className="register-div">
            <p className="register-input bg-transparent-label text-md ml-2">
                {label}
            </p>
            <div className="register-box border-2 border-[#424242] rounded-2xl px-2 py-1 flex items-center justify-between">
                <div className="register-icon text-3xl">
                    {icon}
                </div>
                <div className="register-input text-xl mx-2">
                    {children}
                </div>
                <div className="register-icon text-xl" onClick={() => setShowPass(prevState => !prevState)}>
                    {icon2}
                </div>
            </div>
            <p className="text-xs ml-2 mt-2 text-red-600">{error}</p>
        </div>
    );
}

export default FormDiv;