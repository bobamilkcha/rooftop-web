import React from 'react';

const Footer = () => {
    const socialLinks = {
        instagram: 'https://www.instagram.com/rooftop.my/',
        linkedin: 'https://my.linkedin.com/company/rooftop-my?trk=public_jobs_topcard_logo',
        facebook: 'https://www.facebook.com/profile.php?id=61572728757164',
        whatsapp: 'https://wa.me/message/XFIYMAVF27EBE1',
        email: 'mailto:sales@rooftop.my',
    };

    return (
        <footer className="bg-[#F2BE03] text-black p-6 scale-100">
            {/* Social Links */}
            <div className="flex justify-center space-x-6 mb-6">
                {Object.entries(socialLinks).map(([platform, url]) => (
                    <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-[#D9A003] flex items-center justify-center rounded-full transition-colors duration-300 hover:bg-white"
                    >
                        <img
                            src={platform === 'email' ? '/mailicon.svg' : `/${platform}.svg`}
                            alt={platform.charAt(0).toUpperCase() + platform.slice(1)}
                            className="w-5 h-5"
                        />
                    </a>
                ))}
            </div>

            {/* Divider */}
            <div className="w-3/4 mx-auto border-t-2 border-[#D9A003] my-6"></div>

            {/* Contact Info */}
            <div className="flex flex-col items-center">
                <div className="text-left w-full max-w-md mx-auto mb-7">
                    <p className="text-[17px] text-[#301e03]">Rooftop Energy Tech Sdn Bhd</p>
                    <p className="text-[17px] text-[#301e03]">202501013544 (1613958-P)</p>
                    <p className="text-[17px] text-[#301e03] md:whitespace-nowrap">
                        3-5, Block D2, Dataran Prima,<br className="md:hidden" />
                        47301 Petaling Jaya,<br className="md:hidden" />
                        Selangor, Malaysia
                    </p>
                </div>
            </div>

            {/* Copyright */}
            <p className="text-black text-s mt-6 text-center">Rooftop Energy © 2025</p>
        </footer>
    );
};

export default Footer;