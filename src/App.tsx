import logo from "./assets/logo.svg";
import "./App.css";

import { Pooler } from "./pooler";
import Canvas from "./canvas/canvas";

const Header = (): JSX.Element => {
  return (
    <div className="planned-pooling-calculator m-10">
      <header className="planned-pooling-header">
        <h1 className="inline-block">Planned Pooling Calculator</h1>
        <img
          src={logo}
          className="App-logo inline-block animate-bounce"
          alt="logo"
        />
      </header>
    </div>
  );
};

const Body = () => {
  return (
    <div className="planned-pooling-body m-10">
      <Pooler />
    </div>
  );
};

const App = () => {
  return (
    <>
      <Header />
      <Body />
    </>
  );
};

export default App;
