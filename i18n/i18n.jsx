// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

/* eslint-disable import/order */

const fa = require('./fa.json');

const de = require('./de.json');

const es = require('./es.json');

const fr = require('./fr.json');

const it = require('./it.json');

const ja = require('./ja.json');

const ko = require('./ko.json');

const nl = require('./nl.json');

const pl = require('./pl.json');

const ptBR = require('./pt-BR.json');

const ro = require('./ro.json');

const ru = require('./ru.json');

const tr = require('./tr.json');

const uk = require('./uk.json');

const zhTW = require('./zh-TW.json');

const zhCN = require('./zh-CN.json');

import {addLocaleData} from 'react-intl';
import faLocaleData from 'react-intl/locale-data/fa';
import deLocaleData from 'react-intl/locale-data/de';
import enLocaleData from 'react-intl/locale-data/en';
import esLocaleData from 'react-intl/locale-data/es';
import frLocaleData from 'react-intl/locale-data/fr';
import itLocaleData from 'react-intl/locale-data/it';
import jaLocaleData from 'react-intl/locale-data/ja';
import koLocaleData from 'react-intl/locale-data/ko';
import nlLocaleData from 'react-intl/locale-data/nl';
import plLocaleData from 'react-intl/locale-data/pl';
import ptLocaleData from 'react-intl/locale-data/pt';
import roLocaleData from 'react-intl/locale-data/ro';
import ruLocaleData from 'react-intl/locale-data/ru';
import trLocaleData from 'react-intl/locale-data/tr';
import ukLocaleData from 'react-intl/locale-data/uk';
import zhLocaleData from 'react-intl/locale-data/zh';
import {getConfig} from 'mattermost-redux/selectors/entities/general';

import store from 'stores/redux_store.jsx';

// should match the values in model/config.go
const languages = {
    fa: {
        value: 'fa',
        name: 'Persian',
        order: 0,
        url: fa,
        direction: 'rtl',
    },
    de: {
        value: 'de',
        name: 'Deutsch',
        order: 1,
        url: de,
        direction: 'ltr',
    },
    en: {
        value: 'en',
        name: 'English',
        order: 2,
        url: '',
        direction: 'ltr',
    },
    es: {
        value: 'es',
        name: 'Español',
        order: 3,
        url: es,
        direction: 'ltr',
    },
    fr: {
        value: 'fr',
        name: 'Français',
        order: 4,
        url: fr,
        direction: 'ltr',
    },
    it: {
        value: 'it',
        name: 'Italiano',
        order: 5,
        url: it,
        direction: 'ltr',
    },
    ja: {
        value: 'ja',
        name: '日本語',
        order: 15,
        url: ja,
        direction: 'ltr',
    },
    ko: {
        value: 'ko',
        name: '한국어 (Alpha)',
        order: 16,
        url: ko,
        direction: 'ltr',
    },
    nl: {
        value: 'nl',
        name: 'Nederlands (Alpha)',
        order: 6,
        url: nl,
        direction: 'ltr',
    },
    pl: {
        value: 'pl',
        name: 'Polski',
        order: 7,
        url: pl,
        direction: 'ltr',
    },
    'pt-BR': {
        value: 'pt-BR',
        name: 'Português (Brasil)',
        order: 8,
        url: ptBR,
        direction: 'ltr',
    },
    ro: {
        value: 'ro',
        name: 'Română',
        order: 9,
        url: ro,
        direction: 'ltr',
    },
    ru: {
        value: 'ru',
        name: 'Pусский (Alpha)',
        order: 10,
        url: ru,
        direction: 'ltr',
    },
    tr: {
        value: 'tr',
        name: 'Türkçe',
        order: 11,
        url: tr,
        direction: 'ltr',
    },
    uk: {
        value: 'uk',
        name: 'Yкраїнська (Alpha)',
        order: 12,
        url: uk,
        direction: 'ltr',
    },
    'zh-TW': {
        value: 'zh-TW',
        name: '中文 (繁體)',
        order: 13,
        url: zhTW,
        direction: 'ltr',
    },
    'zh-CN': {
        value: 'zh-CN',
        name: '中文 (简体)',
        order: 14,
        url: zhCN,
        direction: 'ltr',
    },
};

export function getAllLanguages() {
    return languages;
}

export function getLanguages() {
    const config = getConfig(store.getState());
    if (!config.AvailableLocales) {
        return getAllLanguages();
    }
    return config.AvailableLocales.split(',').reduce((result, l) => {
        if (languages[l]) {
            result[l] = languages[l];
        }
        return result;
    }, {});
}

export function getLanguageInfo(locale) {
    return getAllLanguages()[locale];
}

export function isLanguageAvailable(locale) {
    return Boolean(getLanguages()[locale]);
}

export function doAddLocaleData() {
    addLocaleData(enLocaleData);
    addLocaleData(faLocaleData);
    addLocaleData(deLocaleData);
    addLocaleData(esLocaleData);
    addLocaleData(frLocaleData);
    addLocaleData(itLocaleData);
    addLocaleData(jaLocaleData);
    addLocaleData(koLocaleData);
    addLocaleData(nlLocaleData);
    addLocaleData(plLocaleData);
    addLocaleData(ptLocaleData);
    addLocaleData(roLocaleData);
    addLocaleData(ruLocaleData);
    addLocaleData(trLocaleData);
    addLocaleData(ukLocaleData);
    addLocaleData(zhLocaleData);
}
