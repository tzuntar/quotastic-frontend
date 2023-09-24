import React from "react";
import logo from '../../assets/quotastic_logo_small.png';

const Footer: React.FC = () => {
    return (
        <footer className="bg-orange flex justify-between items-center px-10">
            <img src={logo} alt="Quotastic" className="w-8 m-4"/>
            <p className="text-white text-sm">All rights reserved | SkillUpMentor</p>
        </footer>
    );
};

export default Footer;
