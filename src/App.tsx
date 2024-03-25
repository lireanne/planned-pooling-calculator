import logo from "./assets/logo.svg";
import "./App.css";

import RepeatsInput from "./inputs/repeats-input/index";
import Canvas from "./canvas/Canvas";

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
      <RepeatsInput />
      <Canvas />
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
