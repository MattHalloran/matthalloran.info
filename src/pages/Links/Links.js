import React, { useState } from 'react';
import cardano from '../../assets/cardano-ada-logo.png';
import email from '../../assets/email.svg';
import github from '../../assets/github.svg';
import goodreads from '../../assets/goodreads.svg';
import linkedin from '../../assets/linkedin.svg';
import twitter from '../../assets/twitter.svg';
import youtube from '../../assets/youtube.svg';
import { AddressModal } from '../../components/AddressModal/AddressModal';

function Links() {
    const [popupOpen, setPopupOpen] = useState(false);

    return (
        <div id='main-container'>
            <AddressModal open={popupOpen} onClose={() => setPopupOpen(false)} />

            <div id='main-info'>
                <img id="main-logo" class='no-select' src={cardano} alt="" />
                <h1>Matt Halloran</h1>
                <div>Software Developer💻 Philosopher💭 Dreamer🧐</div>
                <div>Let&#x27;s change the world together</div>
            </div>

            <div id='links-div' class='no-select'>
                <a href="https://vrooli.com"><div class='link-button'><span>Vrooli - Your Ideas Matter</span></div></a>
                <a href="https://medium.com/@matthalloran8"><div class='link-button'><span>Blog</span></div></a>
                <a href="https://cardano.ideascale.com/a/pmd/3070972-48088?"><div class='link-button'><span>Project Catalyst Proposals</span></div></a>
                <a href="https://ko-fi.com/matthalloran"><div class='link-button'><span>Donate - Paypal/Stripe</span></div></a>
                <div class='link-button' style={{ cursor: 'pointer' }} onClick={() => setPopupOpen(true)}><span>Donate - ADA</span></div>
            </div>

            <div class='social-icons no-select'>
                <ul>
                    <li><a href="https://twitter.com/mdhalloran"><img src={twitter} alt="" /></a></li>
                    <li><a href="https://github.com/MattHalloran"><img src={github} alt="" /></a></li>
                    <li><a href="https://www.linkedin.com/in/matthew-halloran/"><img src={linkedin} alt="" /></a></li>
                    <li><a href="mailto:matthalloran8@gmail.com"><img src={email} alt="" /></a></li>
                    <li><a href="https://www.goodreads.com/matthalloran"><img src={goodreads} alt="" /></a></li>
                    <li><a href="https://www.youtube.com/channel/UC4qvcwbFxx06vBD3wKjXscg"><img src={youtube} alt="" /></a></li>
                </ul>
            </div>
        </div>
    );
}

export { Links };