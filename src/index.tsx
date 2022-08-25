import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./state/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import {QueryClientProvider, QueryClient} from 'react-query'

let persistedStore = persistStore(store);
let queryClient = new QueryClient()

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    // <React.StrictMode>

    <Provider store={store}>
        <QueryClientProvider client={queryClient}>
            <PersistGate loading={null} persistor={persistedStore}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </PersistGate>
        </QueryClientProvider>
    </Provider>

    // {/* </React.StrictMode> */}
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
