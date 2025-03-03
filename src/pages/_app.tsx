import AlertComponent from '@/components/Common/AlertComponent';
import { store } from '@/redux/store';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <AlertComponent />
            <div className="min-h-screen flex flex-col">
                {/* Main Content */}
                <div className="flex-grow bg-slate-50">
                    <Component {...pageProps} />
                </div>
            </div>
        </Provider>
      );
}

export default MyApp;
