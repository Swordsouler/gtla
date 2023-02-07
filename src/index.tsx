import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './redux/store';
import 'moment/locale/fr'
import moment from 'moment';
import { Amplify, AuthModeStrategyType, DataStore, syncExpression } from 'aws-amplify';
import awsExports from './aws-exports';
import "react-activity/dist/library.css";
import { Review, User } from './models';
moment.locale('fr');

export let deviceId = "";

Amplify.configure({
	...awsExports,
	DataStore: {
		authModeStrategyType: AuthModeStrategyType.MULTI_AUTH,
		syncExpressions: [
			syncExpression(User, () => {
			  	return user => user.id.eq(deviceId);
			}),
			syncExpression(Review, () => {
			  	return review => review.userID.eq(deviceId);
			})
		]
	}
});

export async function changeSync(id: string) {
	if(id === deviceId) return;
	deviceId = id;
	console.log("changeSync", deviceId);
	await DataStore.stop();
	await DataStore.start();
}

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
