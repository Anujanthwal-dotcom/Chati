import React from 'react'
import MessagingSection from "./main_section_components/MessageSection.jsx"
import PromoSection from "./main_section_components/PromoSection.jsx";

function MainSectionComponent({isMessaging,currentChat}) {

    if(isMessaging===true){
        return <MessagingSection currentChat={currentChat}/>
    }

    if(isMessaging===false){
        return <PromoSection/>
    }

}

export default MainSectionComponent
