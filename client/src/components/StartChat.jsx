import React from 'react';
import { WhatsappIcon} from "react-share";

const WhatsAppChatButton = () => {
    const phoneNumber = '3546455624';

    const handleWhatsAppChat = () => {
        const formattedPhoneNumber = phoneNumber.replace(/\D/g, '');
        const whatsappLink = `https://wa.me/${formattedPhoneNumber}`;
        window.open(whatsappLink, '_blank');
    };

    return (
        <button onClick={handleWhatsAppChat} className=' flex place-content-end mb-3 ' style={{
            position: 'sticky',
            bottom: '20px',
        }}>
            <WhatsappIcon size={60} round={true} />
        </button>
    );
};

export default WhatsAppChatButton;
    
