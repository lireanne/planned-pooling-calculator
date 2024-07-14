import { Helmet } from "react-helmet";
import logo from "./assets/logo.svg";
import "./App.css";
import { Pooler } from "./pooler";

const Header = (): JSX.Element => {
  return (
    <div className="planned-pooling-calculator mx-10 my-4">
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
    <div className="planned-pooling-body mx-10 my-4">
      <Pooler />
    </div>
  );
};

const App = () => {
  return (
    <div className="application">
      <Helmet>
        <title>Planned Pooling Calculator</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      <Header />
      <Body />
    </div>
  );
};

export default App;
