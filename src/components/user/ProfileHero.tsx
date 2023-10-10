import React from "react";
import {UserKarmaType, UserType} from "../../models/user";
import default_avatar from "../../assets/default_avatar.png";

interface Props {
    user: UserType,
    karma: UserKarmaType,
}

const ProfileHero: React.FC<Props> = ({user, karma}) => {
    return (
        <div className="bg-orange w-full flex flex-col items-center py-10 space-y-6 max-h-60">
            <img src={user.avatarUrl ? user.avatarUrl : default_avatar}
                 alt="Profile" className="w-14 h-14 drop-shadow-sm"/>
            <p className="text-3xl text-white">{user.firstName} {user.lastName}</p>
            <div className="bg-white rounded-2xl flex flex-row space-x-4 justify-around px-6 py-4
                            shadow-md text-center w-3/4 md:w-72 relative">
                <div className="w-1/2">
                    <p className="text-sm h-1/3">Quotes</p>
                    <p className="text-orange text-2xl font-extralight">{karma.quotesCount}</p>
                </div>
                <div className="w-1/2">
                    <p className="text-sm h-1/3">Quotastic Karma</p>
                    <p className="text-2xl font-extralight">{karma.karma}</p>
                </div>
            </div>
        </div>
    )
};

export default ProfileHero;