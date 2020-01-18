// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getTeams} from 'mattermost-redux/actions/teams';
import {withRouter} from 'react-router-dom';

import {getConfig} from 'mattermost-redux/selectors/entities/general';
import {getMyTeams, getJoinableTeamIds, getTeamMemberships, getCurrentTeamId} from 'mattermost-redux/selectors/entities/teams';

import {getCurrentLocale} from 'selectors/i18n';
import {getIsLhsOpen} from 'selectors/lhs';
import {switchTeam} from 'actions/team_actions.jsx';
import {getLanguageInfo} from 'i18n/i18n';

import TeamSidebar from './team_sidebar_controller.jsx';

function mapStateToProps(state) {
    const config = getConfig(state);

    const experimentalPrimaryTeam = config.ExperimentalPrimaryTeam;
    const joinableTeams = getJoinableTeamIds(state);
    const moreTeamsToJoin = joinableTeams && joinableTeams.length > 0;
    let isRtl = false;
    try {
        const currentLocale = state.entities.users.profiles[state.entities.users.currentUserId].locale;
        isRtl = getLanguageInfo(currentLocale).direction === 'rtl';
    } catch (e) {}
    return {
        currentTeamId: getCurrentTeamId(state),
        myTeams: getMyTeams(state),
        myTeamMembers: getTeamMemberships(state),
        isOpen: getIsLhsOpen(state),
        experimentalPrimaryTeam,
        locale: getCurrentLocale(state),
        isRtl: isRtl,
        moreTeamsToJoin,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            getTeams,
            switchTeam,
        }, dispatch),
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TeamSidebar));
