import { Component, node } from "../../lib/DOM";

export default class Title extends Component {
    constructor(props, children) {
        super(props, children);
        this.props = props;
    }
    view = () => {
        return node("p", { style: "font-size:30px" }, [this.props.title]);
    }
}
