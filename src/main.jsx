import ReactDOM from 'react-dom/client';

import Router from './routers/Router';

import 'react-loading-skeleton/dist/skeleton.css';
import 'react-quill/dist/quill.snow.css';

const Main = () => <Router />;

ReactDOM.createRoot(document.getElementById('root')).render(<Main />);
