import React from "react";
import PropTypes from 'prop-types';


export class Home extends React.Component{

    //Set the intial state of this component
    constructor(props){
        super();
        this.state = {
            age: props.intialAge,
            status:0,
            homeLink: "BOOOOM"
        };
    }

    componentWillMount(){
        console.log("Component Will mount");
    }

    componentDidMount(){
        console.log("Component did mount");     
    }

    componentWillReceiveProps(nextProps){
        console.log("Component Will receive props",nextProps);

    }

    shouldComponentUpdate(nextProps, nextState){
        console.log("Should Component update", nextProps,nextState);
        return true;
    }

    componentWillUpdate(nextProps, nextState){
        console.log("Component Will update",nextProps, nextState);
    }

    componentDidUpdate(prevProps, prevState){
        console.log("Component did update",prevProps, prevState);

    }

    componentWillUnmount(){
        console.log("Component Will Unmount");
    }

    onMakeOlder(){
        //will trigger a re-render of the UI
        this.setState({
            age:this.state.age + 3
        });
    }

    onMakeYounger(){
        //will trigger a re-render of the UI
        this.setState({
            age:this.state.age -3
        });
    }


    onChangeLink(){
        //When onChangeLink is called from button click it looks at the props that was passed to this component(the onChangeLinkName call in index.js)
        //It will then pass into onChangeLinkName the homeLink: BOOOM from the state in this component as an argument
        this.props.changeLink(this.state.homeLink);
    }
    render(){
        return(
            <div>
                <p>In a new Component!</p>
                <p>Your name is {this.props.name}</p>
                <p>Your age is {this.state.age}</p>
                <p>Status: {this.state.status}</p>
                <hr/>
                <button onClick={this.onMakeOlder.bind(this)} className="btn btn-primary">Make me older!</button>
                <button onClick={this.onMakeYounger.bind(this)} className="btn btn-primary">Make me younger!</button>
                <hr/>
                {/*This is how you call a function that is passed from a parent */}
                <button onClick={this.props.greet} className="btn btn-primary">Greet</button>
                <hr/>
                {/*When this button is clock it will call the onChangeLink function in this component */}
                <button onClick={this.onChangeLink.bind(this)} className="btn btn-primary">Change Header</button>


            </div>
        );
    }
}

//Ensure you only use the types you want to

Home.propTypes = {
    name: PropTypes.string,
    intialAge: PropTypes.number,
    greet: PropTypes.func

}
