/***
 * Name: MessagesHeader.js
 *
 * Description: - Header of the Channel
 *              - Display of Channel Name
 *              - Display the amount of users in a channel.
 *              - Ability to search for Messages.
 **/

import React from 'react';
import { Header, Segment, Input } from 'semantic-ui-react';

class MessagesHeader extends React.Component {

    render() {

        const { channelName, uniqueUsers, handleSearch, isSearchLoading } = this.props;

        return(

            <Segment clearing>

                { /* Title of Channel */ }
                <Header fluid="true" as="h2" floated="left" style={{ marginBottom: 0 }}>
                    <span>
                    {channelName}
                    </span>
                    <Header.Subheader>{ uniqueUsers }</Header.Subheader>
                </Header>

                { /* Search Input of Channel */ }
                <Header floated="right">
                    <Input
                        loading={isSearchLoading}
                        onChange={handleSearch} 
                        size="mini" 
                        icon="search" 
                        name="searchTerm" 
                        placeholder="Search Messages"

                    />
                </Header>

            </Segment>
        )
    };
}

export default MessagesHeader