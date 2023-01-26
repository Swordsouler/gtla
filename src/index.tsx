import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './redux/store';
import 'moment/locale/fr'
import moment from 'moment';
import { Amplify, AuthModeStrategyType } from 'aws-amplify';
import awsExports from './aws-exports';
moment.locale('fr');

Amplify.configure({
	...awsExports,
	DataStore: {
		authModeStrategyType: AuthModeStrategyType.MULTI_AUTH
	}
});

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
	<Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
	</Provider>
);
