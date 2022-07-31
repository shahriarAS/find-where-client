import { createUserWithEmailAndPassword, deleteUser, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaLock, FaRegEnvelope, FaRegEye, FaRegEyeSlash, FaUserCircle } from "react-icons/fa";
import FormDiv from "../../components/page/FormDiv";
import { auth, db } from "../../config/firebaseConfig.js";
import useResetState from "../../hooks/useResetState";


function RegForm({ loading, setLoading }) {
    const [showPass, setShowPass] = useState(false)
    const resetState = useResetState()
    const randomGameId = useId()
    const { register, handleSubmit, formState: { errors } } = useForm(
        {
            mode: 'onSubmit',
            reValidateMode: 'onChange'
        }
    );

    const onSubmit = data => {
        setLoading(true)
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                updateProfile(auth.currentUser, {
                    displayName: data.username, photoURL: `https://avatars.dicebear.com/api/jdenticon/${data.username}.svg?mood[]=happy`
                }).then(async () => {
                    // Profile updated!
                    // ...
                    const user = userCredential.user;
                    console.log(user)
                    await setDoc(doc(db, "users", user.uid), {
                        username: data.username,
                        email: data.email,
                        totalScore: 0,
                        totalTime: 0,
                        winCount: 0,
                        highScore: 0,
                        bestTime: 0,
                        totalMatch: 0,
                        settings: {
                            isSound: true,
                            isMusic: true
                        },
                        gamePlayed: {},
                        level: 1,
                    });
                    setLoading(false)
                    toast.success("Successfully Registered and Signed In.")
                    resetState()
                }).catch((error) => {
                    // An error occurred
                    // ...
                    console.log(error)
                    deleteUser(auth.currentUser).then(() => {
                        console.log("Deleted Errored User")
                        setLoading(false)
                    }).catch((error) => {
                        // An error ocurred
                        // ...
                        console.log(error)
                        setLoading(false)
                    });
                });
            })
            .catch((error) => {
                setLoading(false)
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(error)
                switch (error.code) {
                    case "auth/email-already-in-use":
                        toast.error("User with email is already exists. Try to login.")
                        break;
                    default:
                        toast.error("Something happende. Please try again.")
                        break;
                }
            });
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="register-form flex flex-col gap-4 mt-8 text-[#A900FD]">

            <FormDiv label="Username" icon={<FaUserCircle />} error={errors.username?.message}>

                <input {...register("username", {
                    required: "Username is required.", maxLength: { value: 20, message: "Username can't exceed 20 letters" }, pattern: {
                        value: /^[a-z0-9_.]+$/i,
                        message: "Usernames can only use letters, numbers, underscores, and periods."
                    }
                })} type="text" className="w-full bg-transparent outline-none" />

            </FormDiv>

            <FormDiv label="User Email" icon={<FaRegEnvelope />} error={errors.email?.message}>

                <input {...register("email", {
                    required: "Email is required", pattern: {
                        value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i,
                        message: "Invalid Email."
                    }
                })} type="email" className="w-full bg-transparent outline-none" />

            </FormDiv>

            <FormDiv setShowPass={setShowPass} label="Password" icon={<FaLock />} icon2={showPass ? <FaRegEyeSlash /> : <FaRegEye />} error={errors.password?.message}>

                <input {...register("password", { required: "Password is required", minLength: { value: 6, message: "Atleast 6 character long" } })} type={showPass ? "text" : "password"} className="w-full bg-transparent outline-none" />

            </FormDiv>

            <button type="submit" className="register-btn mt-8 px-12 py-2 bg-[#A900FD] text-white text-2xl rounded-3xl drop-shadow-2xl">
                Sign Up
            </button>
        </form>
    );
}

export default RegForm;