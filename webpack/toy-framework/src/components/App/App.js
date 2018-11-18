import { Component } from "../../lib/DOM";
import Counter from "../Counter/Counter";

export default class App extends Component {
    constructor(props, children) {
        super(props, children);
    }

    view() {
        return new Counter({ initialValue: 100 });
    }
}
