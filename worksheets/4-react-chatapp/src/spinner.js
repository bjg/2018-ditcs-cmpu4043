/***
 * Name: spinner.js
 *
 * Description: - Loading wheel while a query is processed.
 **/

import React from 'react';
import { Loader, Dimmer } from 'semantic-ui-react';

// Stateless state for spinner.
const Spinner = () => (

    // Dimmer used to display the spinner.
    <Dimmer active>
        <Loader size="huge" content={ "Loading, please wait..." } />
    </Dimmer>
);

export default Spinner;