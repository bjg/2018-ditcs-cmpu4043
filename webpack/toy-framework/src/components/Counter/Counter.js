import { Component, node, action } from "../../lib/DOM";
import Title from "../Title/Title";
import "./Counter.css";

const Action = Object.freeze({
    INC: Symbol(0),
    DEC: Symbol(1),
    RST: Symbol(2)
});

export default class Counter extends Component {
    constructor(props, children) {
        super(props, children);
        this.props = props;
        this.model = {
            counter: (props || {}).initialValue || 0
        };
    }

    update = (action, ...params) => {
        const n = Number(params[0]);
        switch (action) {
            case Action.INC:
                this.model.counter += n;
                break;
            case Action.DEC:
                this.model.counter -= n;
                break;
            case Action.RST:
                this.model.counter = n;
                break;
        }
        return this.model;
    };

    view = () => {
        return node("div", { class: "counter" }, [
            new Title({ title: "Counter" }),
            node("input", { class: "display", value: this.model.counter }, []),
            node("button", { onClick: action(this, Action.INC, 1) }, ["⬆️"]),
            node("button", { onClick: action(this, Action.DEC, 1) }, ["⬇️"]),
            node("button", { onClick: action(this, Action.RST, this.props.initialValue || 0) }, ["⏹"])
        ]);
    };
}
