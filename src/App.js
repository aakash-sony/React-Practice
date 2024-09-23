import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Register from "./components/Register";
import Login from "./components/Login";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider, linkWithPopup } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBrmtzcw-BzhLN1RoZuQQ2e9My_-Pxym1M",
  authDomain: "authentication-641b8.firebaseapp.com",
  projectId: "authentication-641b8",
  storageBucket: "authentication-641b8.appspot.com",
  messagingSenderId: "324933964706",
  appId: "1:324933964706:web:296e6a88098a6a77e658fb",
  measurementId: "G-QB7L18C0WW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);


export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      message: "",
      type: 1
    };
  }

  pageSwitchHandler = (event) => {
    this.setState({ page: !this.state.page, message: null })
    event.preventDefault();
  };

  googleHandler = () => {
    var provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider).then((response) => {
      this.setState({ message: "Successfully registered via google..", type: 1 })
    }).catch((error) => {
      console.log(error)
    })
  }

  facebookHandler = () => {
    var provider = new FacebookAuthProvider();
    if (auth.currentUser) {
      linkWithPopup(auth.currentUser, provider)
        .then((response) => {
          this.setState({ message: "Successfully Registered via facebook..", type: 1 });
        })
        .catch((error) => {
          if (error.code === "auth/account-exists-with-different-credential") {
            this.setState({ message: "An account already exists with this email.", type: 0 });
          }
        });
    } else
      signInWithPopup(auth, provider).then((response) => {
        this.setState({ message: "Successfully registered via facebook..", type: 1 })
      }).catch((error) => {
        if (error.code === "auth/user-cancelled")
          this.setState({ message: "Registration cancelled..", type: 0 })
      })
  }

  registrationHandler = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;
    if (password !== confirmPassword) {
      this.setState({ message: "Password does not match", type: 0 })
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;

        // Store user data in the database
        set(ref(database, 'users/' + user.uid), {
          email: email,
          uid: user.uid,
        });
        sendEmailVerification(user) // Use the user object here
          .then(() => {
            this.setState({ message: "Registered Successfully. Verification email sent.", type: 1 }, () => {
              event.target.email.value = "";
              event.target.password.value = "";
              event.target.confirmPassword.value = "";
            });
          });
      })
      .catch((error) => {
        if (error.code === 'auth/weak-password') {
          this.setState({ message: "Password should be at least 6 characters", type: 0 });
        } else if (error.code === 'auth/email-already-in-use') {
          this.setState({ message: "Email already registered..", type: 0 });
        } else {
          this.setState({ message: error.message, type: 0 });
        }
      });
  }

  loginHandler = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    signInWithEmailAndPassword(auth, email, password).then((data) => {
      if (data.user.emailVerified === true) {
        this.setState({ message: "Login Successful...", type: 1 }, () => {
          event.target.email.value = ""
          event.target.password.value = ""
        });
      } else {
        this.setState({ message: "Email is not verified yet. Please check you email..", type: 0 }, () => { })
      }

    }).catch((error) => {
      if (error.code === "auth/invalid-credential")
        this.setState({ message: "Invalid credential details..Try again", type: 0 });
    })
  }

  render() {
    return <div>{
      this.state.page ?
        <Register
          message={this.state.message}
          type={this.state.type}
          switch={this.pageSwitchHandler}
          register={this.registrationHandler}
          google={this.googleHandler}
          facebook={this.facebookHandler}
        /> :
        <Login
          message={this.state.message}
          type={this.state.type}
          switch={this.pageSwitchHandler}
          login={this.loginHandler} />}</div>;
  }
}

export default App;
