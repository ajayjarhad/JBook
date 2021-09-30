import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { store } from "./state";
import CellList from "./components/cell-list";
import "bulmaswatch/superhero/bulmaswatch.min.css";

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <CellList />
      </div>
    </Provider>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
