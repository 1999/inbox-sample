'use strict';

import store from 'store';
import RootElement from 'components/inbox-sample-root';

const rootElem = RootElement(store);
document.body.appendChild(rootElem);
