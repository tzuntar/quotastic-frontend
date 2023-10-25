import React, {EventHandler, useState} from "react";
import {PasswordUpdateFields} from "../../hooks/react-hook-form/useUpdateUserPrefs";

interface Props {
    onSave: EventHandler<any>,
    onClose: () => void,
}

const UserPrefsModal: React.FC<Props> = ({onSave, onClose}) => {
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setPassword(e.target.value);

    const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewPassword(e.target.value);
        setPasswordsMatch(e.target.value === confirmPass);
    };

    const handleConfirmPassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPass(e.target.value);
        setPasswordsMatch(e.target.value === newPassword);
    };

    const handleSave = () => {
        if (newPassword.trim() === '') return;
        if (!passwordsMatch) return;
        const data: PasswordUpdateFields = {
            currentPassword: password,
            newPassword: newPassword
        };
        onSave(data);
        onClose();
    }

    return (
        <div
            className={`fixed left-0 top-0 z-[1500] h-full w-full overflow-y-auto overflow-x-hidden
                        bg-[#0000005F] backdrop-blur-sm outline-none`}>
            {/* ToDo: add 'opacity-0' to the following div to enable fade-in-out */}
            <div className="relative flex min-h-[calc(100%-1rem)] w-auto translate-y-[-50px] items-center
                            transition-all duration-300 ease-in-out
                            min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:min-h-[calc(100%-3.5rem)] min-[576px]:max-w-[500px]">
                <div className="relative flex w-full flex-col rounded-2xl
                                bg-white bg-clip-padding text-current shadow-lg p-6 space-y-6">
                    <h1 className="text-2xl lg:font-extralight">User <span
                        className="text-orange">Preferences.</span></h1>

                    <label htmlFor="current_password">Your current password is required to make any changes</label>
                    
                    <input type="password" name="current_password"
                           className="outline-orange border-alt-orange border-2 rounded-full px-5 py-1.5 mt-3
                                      focus:drop-shadow-sm resize-none"
                           placeholder="Enter your current password"
                           onChange={handlePasswordChange}/>

                    <label htmlFor="new_password" className="">Type a new password in these two fields to use it instead
                        of your current one.</label>

                    <input type="password" name="new_password"
                           className="outline-orange border-alt-orange border-2 rounded-full px-5 py-1.5 mt-3
                                      focus:drop-shadow-sm resize-none"
                           placeholder="Make up a new password"
                           onChange={handleNewPasswordChange}/>

                    <input type="password" name="confirm_new_password"
                           className="outline-orange border-alt-orange border-2 rounded-full px-5 py-1.5 mt-3
                                      focus:drop-shadow-sm resize-none"
                           placeholder="Type that same new password again"
                           onChange={handleConfirmPassChange}/>

                    {!passwordsMatch &&
                        <p className="text-alt-orange">Please enter the same password in both fields.</p>
                    }

                    <div className="flex flex-row space-x-5">
                        <button className="inline bg-orange
                                           py-1.5 px-8 rounded-full text-white cursor-pointer
                                           drop-shadow-md hover:shadow-lightener active:brightness-90"
                                onClick={handleSave}>Save
                        </button>
                        <button className="hover:shadow-lightener active:brightness-90 cursor-pointer"
                                onClick={() => onClose()}>Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default UserPrefsModal;
