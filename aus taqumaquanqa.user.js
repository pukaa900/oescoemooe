// ==UserScript==
// @name         Age verification bypass for aliexpress
// @namespace    http://tampermonkey.net/
// @version      2026-04-11
// @description  Bypasses age verification so you don't have to send your biometric data/ID to that one company whose data was leaked 1 year ago :)
// @author       HardeQ
// @match        https://*.aliexpress.com/w/*
// @match        https://*.aliexpress.com/item/*
// @match        https://*.aliexpress.com/p/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=aliexpress.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const style = document.createElement('style');
    style.textContent = `
        .lw_ki,
        .nl_kp,
        .J_SAFETY_FILER_MODAL {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            pointer-events: none !important;
        }

        /* Prevent body lock from modal */
        body {
            overflow: auto !important;
        }
    `;
    document.documentElement.appendChild(style);

    function clean() {
        document.querySelectorAll('.J_SAFETY_FILER_MODAL').forEach(el => el.remove());
        document.querySelectorAll('.card-dsa-wrapper').forEach(el => {
            el.classList.remove('card-dsa-wrapper');
        });
        document.querySelectorAll('.lw_ki, .nl_kp').forEach(el => {
            el.style.setProperty('display', 'none', 'important');
        });
        document.body.style.overflow = 'auto';
    }
    const interval = setInterval(clean, 500);
    setTimeout(() => clearInterval(interval), 20000);
    const observer = new MutationObserver(() => clean());
    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });

})();
