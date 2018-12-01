import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import * as firebase from 'firebase';
import TextField from 'material-ui/TextField';
import Avatar from 'material-ui/Avatar';

/* 

The ability to register and log in with profile photos is my extra feature

Authentication is also involved

Users can choose a profile photo and it is reflected in the chat room

*/


class LoginPage extends React.Component
{
  //state information for the login page
  state = {
    //boolean variables for if the user is on the login page or the register page
    loginOpen: true,
    registerOpen: false,

    //error text for the login screen input
    passwordErrorText: "",
    usernameErrorText: "",

    //error text for the register screen input
    registerUsernameErrorText: "",
    registerEmailErrorText: "",
    registerPasswordErrorText: "",
    registerReEnterPasswordErrorText: "",

    //currently selected profile image file
    imageFile: null,

    //link to current image selected image, initially the default user profile image
    registerImage: "https://www.qualiscare.com/wp-content/uploads/2017/08/default-user.png",

    //if the user has logged in or not
    logged: false,
  };

  //changes the login page state to true which opens the login page
  handleOpen = () => {
    this.setState({loginOpen: true});
  };

  //method that runs when the user enters in their login details
  handleClose = (event) => {

    //if the values are empty, change the error text for the respective fields
    if (this.refs.loginEmail.getValue() === "")
    {
      this.setState({usernameErrorText: "This field is required"});
    }
    else
    {
      this.setState({usernameErrorText: ""});
    }

    if (this.refs.loginPassword.getValue() === "")
    {
      this.setState({passwordErrorText: "This field is required"});
    }
    else
    {
      this.setState({passwordErrorText: ""});
    }

    //log in user, ensure values are not empty
    if (this.refs.loginEmail.getValue() !== "" && this.refs.loginPassword.getValue() !== "")
    {
      //use google authentication sign in with email and password
      firebase.auth().signInWithEmailAndPassword(this.refs.loginEmail.getValue(), this.refs.loginPassword.getValue()).then( (e) => {
          //set the local storage (cookies) to the value 1 (aka the user has logged in)
          localStorage.setItem('chatRoomLogged', '1');
          //assign and call the login handler from App.js
          let isLoggedHandler = this.props.isLoggedHandler;
          isLoggedHandler('1');
        }
      )
      //catch any sign in error
      .catch(function(error)
      {
        let errorMessage = error.message;
        alert(errorMessage);
      });
    }
  };

  //method to handle the register submit
  handleRegisterSumbit = (event) => {

    //set error texts for required fields
    if (this.refs.registerUsername.getValue() === "")
    {
      this.setState({registerUsernameErrorText: "This field is required"});
    }
    else
    {
      this.setState({registerUsernameErrorText: ""});
    }

    if (this.refs.registerEmail.getValue() === "")
    {
      this.setState({registerEmailErrorText: "This field is required"});
    }
    else
    {
      this.setState({registerEmailErrorText: ""});
    }

    if (this.refs.registerPassword.getValue() === "")
    {
      this.setState({registerPasswordErrorText: "This field is required"});
    }
    else
    {
      this.setState({registerPasswordErrorText: ""});
    }

    if (this.refs.registerReEnterPassword.getValue() === "")
    {
      this.setState({registerReEnterPasswordErrorText: "This field is required"});
    }
    else
    {
      this.setState({registerReEnterPasswordErrorText: ""});
    }

    //if all values filled in
    if (this.refs.registerUsername.getValue() !== "" && this.refs.registerEmail.getValue() !== "" && this.refs.registerPassword.getValue() !== "" && this.refs.registerReEnterPassword.getValue() !== "")
    {
      //passwords do not match
      if (this.refs.registerPassword.getValue() !== this.refs.registerReEnterPassword.getValue())
      {
        this.setState({registerPasswordErrorText: "Passwords do not Match", registerReEnterPasswordErrorText: "Passwords do not Match"});
      }
      //if they do
      else
      {
        let username = this.refs.registerUsername.getValue();
        let backToLogin = this.backToLogin;

        //use fireabse authentication to create a valid user using the email and password
        firebase.auth().createUserWithEmailAndPassword(this.refs.registerEmail.getValue(), this.refs.registerPassword.getValue()).then( (user) =>
        {
          if (firebase.auth().currentUser !== null)
          {
            //if the user chose their own profile image
            if (this.state.imageFile !== null)
            {
              //store image to firebase storage then store username and image url to firebase realtime database
              firebase.storage().ref('users').child(firebase.auth().currentUser.uid).put(this.state.imageFile).then( (image) =>
              {
                //add profile image url to firebase for quick access
                firebase.storage().ref('users').child(firebase.auth().currentUser.uid).getDownloadURL().then( function(url)
                {
                  firebase.database().ref('users/' + firebase.auth().currentUser.uid).set({username: username, profilePicture: url}).then( (user) =>
                  {
                    //return to login page
                    backToLogin();
                  });
                });
              }).catch(function(error)
              {
                let errorMessage = error.message;
                alert(errorMessage);
              });
            }
            else
            {
              //if they didnt not chose their own profile image
              firebase.database().ref('users/' + firebase.auth().currentUser.uid).set({username: username}).then( (user) =>
              {
                backToLogin();
              }).catch(function(error)
              {
                let errorMessage = error.message;
                alert(errorMessage);
              });
            }
          }
        }).catch(function(error)
        {
          let errorMessage = error.message;
          alert(errorMessage);
        });
      }
    }
  };

  //method to switch the screen to the register screen from the login screen
  register = () => {
    this.setState({loginOpen: false, registerOpen: true});
  };

  backToLogin = () => {
    this.setState({loginOpen: true, registerOpen: false, registerImage: "http://popwrapped.com/images/default/user-blank.png"});
  };

  readImage = (imageInput) => {

    //get file extension
    let ext = imageInput.target.files[0].type.split("/")[1];

    //check file extension is an image
    if (ext === "jpeg" || ext === "jpg" || ext === "png" || ext === "svg" || ext === "bmp")
    {
      //if there is files and there is at least one file, then read in image and set the state for a register image
      if (imageInput.target.files && imageInput.target.files[0])
      {
        let reader = new FileReader();
        reader.onload = function (e)
        {
          this.setState({registerImage: e.target.result});
        }.bind(this);

        //set the state for the file input
        this.setState({imageFile: imageInput.target.files[0]});
        reader.readAsDataURL(imageInput.target.files[0]);
      }
    }
    else
    {
      alert("This is not a valid Image!");
    }
  };

  render() {

    //set background image
    document.body.style.backgroundImage = 'url(\'https://66.media.tumblr.com/c8614a53f5abccf81835671a62cde02a/tumblr_opy8alC1rj1u25kiio1_500.gif\')';
    document.body.style.backgroundSize = 'cover';

    //buttons for login and register
    const loginActions = [
      <FlatButton
        label="Log In"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose}
      />,
       <FlatButton
        label="Register"
        primary={true}
        keyboardFocused={true}
        onClick={this.register}
      />,
    ];

    //buttons for register
    const registerActions = [
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleRegisterSumbit}
      />,
       <FlatButton
        label="Back"
        primary={true}
        keyboardFocused={true}
        onClick={this.backToLogin}
      />,
    ]

    return (
      <MuiThemeProvider>
        <div>
        {/*show login inputs in a dialog*/}
          <Dialog
            title="Log In to Join the ChatRoom"
            actions={loginActions}
            modal={false}
            open={this.state.loginOpen}
            onRequestClose={this.handleClose.bind(this)}>

            {/*text field for email input*/}
            <TextField
              ref= "loginEmail"
              hintText="Email"
              floatingLabelText="Email"
              errorText= {this.state.usernameErrorText}
            /><br />

            {/*text field for password input*/}
            <TextField
              ref= "loginPassword"
              hintText="Password"
              floatingLabelText="Password"
              type="password"
              errorText= {this.state.passwordErrorText}
            />
          </Dialog>
       </div>

       {/*dialog for register data input*/}
       <div style={{display: 'inline-block'}}>
          <Dialog
            title="Register for the the ChatRoom"
            actions={registerActions}
            modal={false}
            open={this.state.registerOpen}
            onRequestClose={this.handleRegisterSumbit.bind(this)}>

            {/*input field for username*/}
            <div style={{display: 'inline-block', width: '50%'}}>
              <TextField
                ref= "registerUsername"
                hintText="Username"
                floatingLabelText="Username"
                errorText= {this.state.registerUsernameErrorText}
              /><br />

              {/*input field for email*/}
              <TextField
                ref= "registerEmail"
                hintText="Email"
                floatingLabelText="Email"
                type= "email"
                errorText= {this.state.registerEmailErrorText}
              /><br />

              {/*input field for password*/}
              <TextField
                ref= "registerPassword"
                hintText="Password"
                floatingLabelText="Password"
                type="password"
                errorText= {this.state.registerPasswordErrorText}
              /><br />

              {/*input field for re entered password*/}
              <TextField
                ref= "registerReEnterPassword"
                hintText="Re-Enter Password"
                floatingLabelText="Re-Enter Password"
                type="password"
                errorText= {this.state.registerReEnterPasswordErrorText}
              /><br /><br /><br />

              {/*button for chosing profile picture*/}
              <FlatButton
                ref= "profilePicture"
                label="Choose a Profile Image"
                secondary= {true}
                containerElement="label"
                labelPosition="left"
                style={{border: '1px solid'}}
              >
              <input type="file" accept=".jpg,.png,.bmp,.jpeg,.svg" onChange={this.readImage.bind(this)} style={{position:'absolute', opacity: 0}} />
             </FlatButton>
            </div>

              {/*div for the chosen profile picture*/}
            <div style={{display: 'inline-block', width: "50%", marginBottom: '5em'}}>
              <Avatar src={this.state.registerImage} style={{margin: '0 auto', display: 'block'}} size={200}/>
            </div>
          </Dialog>
       </div>
      </MuiThemeProvider>
    );
  }
}

export default LoginPage;
