import ReactDOM from 'react-dom/client';

import { setUser } from '@stores/user';
import useFetch from '@utils/useFetch';

import Router from './routers/Router';

import 'react-loading-skeleton/dist/skeleton.css';
import 'react-quill/dist/quill.snow.css';

// set user store
useFetch({url: 'user'}).then(data => setUser({id: data._id}))

const Main = () => <Router />;

ReactDOM.createRoot(document.getElementById('root')).render(<Main />);
