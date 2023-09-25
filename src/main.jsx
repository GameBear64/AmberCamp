import ReactDOM from 'react-dom/client';

import Router from './routes/Router';

import 'react-loading-skeleton/dist/skeleton.css';

const Main = () => <Router />;

ReactDOM.createRoot(document.getElementById('root')).render(<Main />);
