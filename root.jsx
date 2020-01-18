// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import './entry.js';

import React from 'react';
import ReactDOM from 'react-dom';
import {logError} from 'mattermost-redux/actions/errors';
import PDFJS from 'pdfjs-dist';

// Import our styles
import 'bootstrap-colorpicker/dist/css/bootstrap-colorpicker.css';
import 'sass/styles.scss';
import 'katex/dist/katex.min.css';

import {isDevMode, setCSRFFromCookie} from 'utils/utils';
import store from 'stores/redux_store.jsx';
import App from 'components/app';
import {getLanguageInfo} from 'i18n/i18n';

PDFJS.disableWorker = true;

store.subscribe(() => {
    let isRtl = false;
    try {
        const state = store.getState();
        const currentLocale = state.entities.users.profiles[state.entities.users.currentUserId].locale;
        isRtl = getLanguageInfo(currentLocale).direction === 'rtl';
    } catch (e) {}
    if (isRtl && !document.body.classList.contains('rtl')) {
        if (document.body.classList.contains('ltr')) {
            document.body.classList.remove('ltr');
        }
        document.body.classList.add('rtl');
    } else if (!isRtl && !document.body.classList.contains('ltr')) {
        if (document.body.classList.contains('rtl')) {
            document.body.classList.remove('rtl');
        }
        document.body.classList.add('ltr');
    }
});

// This is for anything that needs to be done for ALL react components.
// This runs before we start to render anything.
function preRenderSetup(callwhendone) {
    window.onerror = (msg, url, line, column, stack) => {
        if (msg === 'ResizeObserver loop limit exceeded') {
            return;
        }
        var l = {};
        l.level = 'ERROR';
        l.message = 'msg: ' + msg + ' row: ' + line + ' col: ' + column + ' stack: ' + stack + ' url: ' + url;

        const req = new XMLHttpRequest();
        req.open('POST', '/api/v4/logs');
        req.setRequestHeader('Content-Type', 'application/json');
        req.send(JSON.stringify(l));

        if (isDevMode()) {
            store.dispatch(logError({type: 'developer', message: 'DEVELOPER MODE: A JavaScript error has occurred.  Please use the JavaScript console to capture and report the error (row: ' + line + ' col: ' + column + ').'}, true));
        }
    };
    setCSRFFromCookie();
    callwhendone();
}

function renderRootComponent() {
    ReactDOM.render((
        <App/>
    ),
    document.getElementById('root'));
}

/**
 * Adds a function to be invoked onload appended to any existing onload
 * event handlers.
 *
 * @param   {function} fn onload event handler
 *
 */
function appendOnLoadEvent(fn) {
    if (window.attachEvent) {
        window.attachEvent('onload', fn);
    } else if (window.onload) {
        const curronload = window.onload;
        window.onload = (evt) => {
            curronload(evt);
            fn(evt);
        };
    } else {
        window.onload = fn;
    }
}

appendOnLoadEvent(() => {
    // Do the pre-render setup and call renderRootComponent when done
    preRenderSetup(renderRootComponent);
});
