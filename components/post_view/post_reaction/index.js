// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {addReaction} from 'actions/post_actions.jsx';
import {getLanguageInfo} from 'i18n/i18n';

import PostReaction from './post_reaction';

function matStateToProps(state) {
    let isRtl = false;
    try {
        const currentLocale = state.entities.users.profiles[state.entities.users.currentUserId].locale;
        isRtl = getLanguageInfo(currentLocale).direction === 'rtl';
    } catch (e) {}
    return {
        isRtl: isRtl,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            addReaction,
        }, dispatch),
    };
}

export default connect(matStateToProps, mapDispatchToProps)(PostReaction);
