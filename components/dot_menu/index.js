// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getCurrentTeamId} from 'mattermost-redux/selectors/entities/teams';

import {getLicense, getConfig} from 'mattermost-redux/selectors/entities/general';
import {getLanguageInfo} from 'i18n/i18n';

import {openModal} from 'actions/views/modals';
import {
    flagPost,
    unflagPost,
    pinPost,
    unpinPost,
    setEditingPost,
    markPostAsUnread,
} from 'actions/post_actions.jsx';

import DotMenu from './dot_menu.jsx';

function mapStateToProps(state) {
    let isRtl = false;
    try {
        const currentLocale = state.entities.users.profiles[state.entities.users.currentUserId].locale;
        isRtl = getLanguageInfo(currentLocale).direction === 'rtl';
    } catch (e) {}
    return {
        components: state.plugins.components,
        postEditTimeLimit: getConfig(state).PostEditTimeLimit,
        isLicensed: getLicense(state).IsLicensed === 'true',
        teamId: getCurrentTeamId(state),
        pluginMenuItems: state.plugins.components.PostDropdownMenu,
        isRtl: isRtl,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            flagPost,
            unflagPost,
            setEditingPost,
            pinPost,
            unpinPost,
            openModal,
            markPostAsUnread,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DotMenu);
