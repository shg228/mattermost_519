// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {getChannel} from 'mattermost-redux/selectors/entities/channels';
import {makeGetReactionsForPost} from 'mattermost-redux/selectors/entities/posts';
import {getConfig} from 'mattermost-redux/selectors/entities/general';
import {getLanguageInfo} from 'i18n/i18n';

import {addReaction} from 'actions/post_actions.jsx';

import ReactionList from './reaction_list.jsx';

function makeMapStateToProps() {
    const getReactionsForPost = makeGetReactionsForPost();

    return function mapStateToProps(state, ownProps) {
        const config = getConfig(state);
        const enableEmojiPicker = config.EnableEmojiPicker === 'true' && !ownProps.isReadOnly;

        const channel = getChannel(state, ownProps.post.channel_id) || {};
        const teamId = channel.team_id;
        let isRtl = false;
        try {
            const currentLocale = state.entities.users.profiles[state.entities.users.currentUserId].locale;
            isRtl = getLanguageInfo(currentLocale).direction === 'rtl';
        } catch (e) {}
        return {
            teamId,
            reactions: getReactionsForPost(state, ownProps.post.id),
            enableEmojiPicker,
            isRtl: isRtl,
        };
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            addReaction,
        }, dispatch),
    };
}

export default connect(makeMapStateToProps, mapDispatchToProps)(ReactionList);
