// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {getConfig} from 'mattermost-redux/selectors/entities/general';
import {getCurrentUser} from 'mattermost-redux/selectors/entities/users';
import {getInt} from 'mattermost-redux/selectors/entities/preferences';

import {Preferences, TutorialSteps} from 'utils/constants';
import * as Utils from 'utils/utils.jsx';
import {getLanguageInfo} from 'i18n/i18n';

import SidebarHeader from './sidebar_header.jsx';

function mapStateToProps(state) {
    const config = getConfig(state);
    const currentUser = getCurrentUser(state);

    const enableTutorial = config.EnableTutorial === 'true';

    const showTutorialTip = getInt(state, Preferences.TUTORIAL_STEP, currentUser.id) === TutorialSteps.MENU_POPOVER && !Utils.isMobile();
    let isRtl = false;
    try {
        const currentLocale = state.entities.users.profiles[state.entities.users.currentUserId].locale;
        isRtl = getLanguageInfo(currentLocale).direction === 'rtl';
    } catch (e) {}
    return {
        enableTutorial,
        showTutorialTip,
        isRtl: isRtl,
    };
}

export default connect(mapStateToProps)(SidebarHeader);
