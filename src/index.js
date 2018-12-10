import React, {lazy, Suspense} from 'react';
import ReactDOM from 'react-dom';

import CircularProgress from '@material-ui/core/CircularProgress';

import '_sass/index.scss';

const App = lazy(() => import('_js/App'));

ReactDOM.render((
  <Suspense fallback={<CircularProgress className={'loadingSpinner'} />}>
    <App />
  </Suspense>
), document.getElementById('root'));
