import { Helmet } from "react-helmet";
import duck from "./assets/rubber-duck.png";
import "./App.css";
import { Pooler } from "./pooler";
import { APP_TITLE, GITHUB_URL } from "./constants";

const Header = (): JSX.Element => {
  return (
    <div className="planned-pooling-calculator mx-10 my-4">
      <header className="planned-pooling-header">
        <h1 className="inline-block">{APP_TITLE}</h1>
        <img
          src={duck}
          className="App-logo inline-block animate-bounce"
          alt="duckie"
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

const Footer = () => {
  return (
    <div className="planned-pooling-footer mx-10 my-4">
      <a href={GITHUB_URL}>github</a>
    </div>
  );
};

const App = () => {
  return (
    <div className="application">
      <Helmet>
        <title>{APP_TITLE}</title>
        <meta
          name="viewport"
          content="width=device-width, height=device-height initial-scale=1.0"
        />
      </Helmet>
      <Header />
      <Body />
      <Footer />
    </div>
  );
};

export default App;
