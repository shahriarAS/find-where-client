import { updateProfile } from "firebase/auth";
import { useState } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaLink, FaRegEnvelope, FaUserCircle } from "react-icons/fa";
import { auth } from "../../config/firebaseConfig.js";
import FormDiv from "./FormDiv";


function UpdateForm() {
    const [user, loading, error] = useAuthState(auth);
    const [profileURL, setPublicURL] = useState(`${import.meta.env.VITE_CLIENT_URL}/user/${user.displayName}`)

    const { register, handleSubmit, formState: { errors } } = useForm(
        {
            mode: 'onSubmit',
            reValidateMode: 'onChange',
            defaultValues: {
                username: user.displayName,
                email: user.email
            }
        }
    );



    const onSubmit = data => {
        updateProfile(auth.currentUser, {
            displayName: data.username
        }).then(() => {
            // Profile updated!
            // ...
            toast.success("Successfully Updated User Profile.")
        }).catch((error) => {
            // An error occurred
            // ...
            // console.log(error)
        });
    }

    const copyGameCodeOnClick = () => {
        navigator.clipboard.writeText(profileURL)
        toast("Copied. Your public profile URL.", {
            duration: 1000,
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="register-form flex flex-col gap-4 mt-8 text-[#A900FD]">

            <FormDiv label="Username" icon={<FaUserCircle />} error={errors.username?.message}>

                <input {...register("username", {
                    required: "Username is required.", maxLength: { value: 20, message: "Username can't exceed 20 letters" }, pattern: {
                        value: /^[a-z0-9_.]+$/i,
                        message: "Usernames can only use letters, numbers, underscores, and periods."
                    }
                })} type="text" className="w-full bg-transparent" />

            </FormDiv>

            <FormDiv label="User Email" icon={<FaRegEnvelope />} error={errors.email?.message}>

                <input value={user.email} disabled type="email" className="w-full bg-transparent" />

            </FormDiv>

            <div className="flex items-center justify-center gap-4">
                <FormDiv label="Profile URL" icon={<FaLink />} error={errors.profileURL?.message}>

                    <input value={profileURL} disabled type="text" className="w-full bg-transparent" />

                </FormDiv>
                <p className="register-input bg-transparent-label text-md p-1 px-2 cursor-default bg-[#424242] text-white rounded mt-3" onClick={copyGameCodeOnClick}>
                    Copy
                </p>
            </div>

            <button type="submit" className="register-btn mt-8 px-12 py-2 bg-[#A900FD] text-white text-2xl rounded-3xl drop-shadow-2xl">
                Update
            </button>
        </form>
    );
}

export default UpdateForm;