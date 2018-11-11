import "./style.css";

function Component() {
    const component = document.createElement("div");
    component.innerText = "Hello, World!"
    component.classList.add("component")
    return component;
}

export default Component;
