import React, {lazy, Suspense} from 'react';
import ReactDOM from 'react-dom';

import CircularProgress from '@material-ui/core/CircularProgress';

import './sass/index.scss';

const App = lazy(() => import('./js/App'));

ReactDOM.render((
  <Suspense fallback={<CircularProgress className={'loadingSpinner'} />}>
    <App />
  </Suspense>
), document.getElementById('root'));
