import React, { useState } from 'react';
import vrooli from '../../assets/vrooli-logo.png';
import email from '../../assets/email.svg';
import discord from '../../assets/discord.svg';
import github from '../../assets/github.svg';
import goodreads from '../../assets/goodreads.svg';
import linkedin from '../../assets/linkedin.svg';
import twitter from '../../assets/twitter.svg';
import youtube from '../../assets/youtube.svg';
import { AddressModal } from '../../components/AddressModal/AddressModal';
import { DiscordModal } from '../../components/DiscordModal/DiscordModal';

function Links() {
    const [addressModalOpen, setAddressModalOpen] = useState(false);
    const [discordModalOpen, setDiscordModalOpen] = useState(false);

    return (
        <div id='main-container'>
            <AddressModal open={addressModalOpen} onClose={() => setAddressModalOpen(false)} />
            <DiscordModal open={discordModalOpen} onClose={() => setDiscordModalOpen(false)} />

            <div id='main-info'>
                <img id="main-logo" class='no-select' src={vrooli} alt="" />
                <h1>Matt Halloran</h1>
                <div>Software Developer💻 Philosopher💭 Dreamer🧐</div>
                <div>Let&#x27;s change the world together</div>
            </div>

            <div id='links-div' class='no-select'>
                {/* <a href="https://vrooli.com"><div class='link-button'><span>Vrooli - Your Ideas Matter</span></div></a> */}
                <a href="https://medium.com/@matthalloran8"><div class='link-button'><span>Blog</span></div></a>
                <a href="https://cardano.ideascale.com/a/pmd/3070972-48088?"><div class='link-button'><span>Project Catalyst Proposals</span></div></a>
                <a href="https://ko-fi.com/matthalloran"><div class='link-button'><span>Donate - Paypal/Stripe</span></div></a>
                <div class='link-button' style={{ cursor: 'pointer' }} onClick={() => setAddressModalOpen(true)}><span>Donate - ADA</span></div>
            </div>

            <div class='social-icons no-select'>
                <ul>
                    <li><a href="https://twitter.com/mdhalloran"><img src={twitter} alt="Follow me on Twitter" /></a></li>
                    <li onClick={() => setDiscordModalOpen(true)}><span><img src={discord} alt="Add me on Discord" /></span></li>
                    <li><a href="https://github.com/MattHalloran"><img src={github} alt="Check out my GitHub" /></a></li>
                    <li><a href="https://linkedin.com/in/matthew-halloran/"><img src={linkedin} alt="Connect with me on LinkedIn" /></a></li>
                    <li><a href="mailto:matthalloran8@gmail.com"><img src={email} alt="Shoot me an email" /></a></li>
                    <li><a href="https://goodreads.com/matthalloran"><img src={goodreads} alt="See what books I like" /></a></li>
                    <li><a href="https://youtube.com/channel/UC4qvcwbFxx06vBD3wKjXscg"><img src={youtube} alt="Subscribe to my YouTube, in case I ever post" /></a></li>
                </ul>
            </div>
        </div>
    );
}

export { Links };