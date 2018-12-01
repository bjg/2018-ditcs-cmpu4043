import App from "./components/App/App";
import { mount } from "./lib/DOM";
import "./style.css";

mount(document.querySelector("#app"), new App( {}, []));
