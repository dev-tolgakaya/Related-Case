import HomePage from "./App/Pages/HomePage";
import Store from "./App/Redux/Store";
import {Provider} from 'react-redux';

function App() {
    return (
        <Provider store={Store}>
            <div>
                <HomePage/>
            </div>
        </Provider>
    );
}

export default App;
