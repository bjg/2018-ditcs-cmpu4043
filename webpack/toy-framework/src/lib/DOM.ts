import { Subject, from } from "rxjs";
import { startWith } from "rxjs/operators";

interface Renderable {
    render(): HTMLElement;
}

interface Dispatchable {
    dispatch(action: any, ...params: any[]) : void;
}

type Attrs = {};

const Events = {
    // Incomplete list ...
    onClick: "click",
    onHover: "hover"
};

class Node implements Renderable {
    type: string;
    attrs: Attrs;
    children: Renderable[];

    constructor(type: string, attrs: Attrs, children: Renderable[]) {
        this.type = type;
        this.attrs = attrs;
        this.children = children;
    }

    render() {
        const el : HTMLElement = document.createElement(this.type);
        if (this.attrs) {
            Object.keys(this.attrs).forEach(key => {
                if (Events[key]) {
                    const action : Action = this.attrs[key];
                    el.addEventListener(Events[key], action.dispatcher());
                } else {
                    el.setAttribute(key, this.attrs[key]);
                }
            });
        }
        if (this.children) {
            this.children.forEach((child : Renderable) => {
                if (typeof child === "number" || typeof child === "string" || typeof child === "boolean") {
                    el.innerText = child;
                } else {
                    el.appendChild(child.render());
                }
            });
        }
        return el;
    }
}

function node(type: string, attrs: Attrs, children: Renderable[]): Renderable {
    return new Node(type, attrs, children);
}

class Action {
    component: Dispatchable;
    name: string;
    params: any[];

    constructor(component: Dispatchable, name: string, ...params: [any]) {
        this.component = component;
        this.name = name;
        this.params = params;
    }

    dispatcher() {
        return () => this.component.dispatch(this.name, this.params);
    }
}

function action(component: Dispatchable, name: string, ...params: any[]): Action {
    return new Action(component, name, params);
}

export abstract class Component implements Renderable, Dispatchable {
    protected props : {};
    protected children : Renderable[];

    contructor(props: {}, children: Renderable[]) {
        this.props = props;
        this.children = children;
    }

    render() : HTMLElement {
        return this.view().render();
    }

    dispatch(action: any, params: any[]) {
        // Tell the component to update its view
        this.update(action, params);
        // Cause the DOM to update
        update$.next(this);
    }

    abstract view(): Renderable;
    abstract update(action: any, ...params: any[]) : any;
}

const update$ = new Subject();
function mount(dom: HTMLElement, root: Renderable) {
    let el;
    from(update$).pipe(startWith(root)).subscribe(component => {
        /*
         * XXX DO NOT DO THIS: Full DOM re-render!!!
         */
        if (el) {
            dom.removeChild(el);
        }
        el = component.render();
        dom.appendChild(el);
    });
}

export { node, action, mount };
