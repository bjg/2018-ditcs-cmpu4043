import React from 'react';
import ChatRoomRoute from './components/routes/ChatRoomRoute'
import UsernamePageRoute from './components/routes/UsernamePageRoute'
import UsernamePage from './components/pages/UsernamePage'
import ChatRoomPage from './components/pages/ChatRoomPage'
import PropTypes from 'prop-types'

const App = ({ location }) => <div>
    <UsernamePageRoute location={location} path="/" exact component={UsernamePage} />
    <ChatRoomRoute location={location} path="/chatroom" exact component={ChatRoomPage} />
</div>


App.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
    }).isRequired
}

export default App;
