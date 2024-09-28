import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Register from "./components/Register";
import Login from "./components/Login";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider, TwitterAuthProvider, fetchSignInMethodsForEmail, GithubAuthProvider } from "firebase/auth";
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

  handleProvider = (providerName, providerInstance) => {
    signInWithPopup(auth, providerInstance)
      .then((result) => {
        this.setState({ message: `Successfully logged in via ${providerName}.`, type: 1 });
        console.log(result)
      })
      .catch((error) => {
        if (error.code === "auth/account-exists-with-different-credential") {
          this.setState({ message: "An account already exists with this email..", type: 0 });
        } else {
          this.setState({ message: "Something went wrong.", type: 0 });
        }
      });
  };

  googleHandler = () => {
    var provider = new GoogleAuthProvider()
    this.handleProvider('Google', provider);
  }

  twitterHandler = () => {
    const provider = new TwitterAuthProvider();
    this.handleProvider('Twitter', provider);
  };


  facebookHandler = () => {
    var provider = new FacebookAuthProvider();
    this.handleProvider('Facebook', provider);
  }

  gitHubHandler = () => {
    var provider = new GithubAuthProvider();
    this.handleProvider('Github', provider);
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

    fetchSignInMethodsForEmail(auth, email).then((methods) => {
      if (methods.length > 0) {
        this.setState({ message: "Email is already registered with another provider.", type: 0 });
        return;
      }
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;

          set(ref(database, 'users/' + user.uid), { email, uid: user.uid });

          sendEmailVerification(user).then(() => {
            this.setState({
              message: "Registered successfully. Verification email sent.",
              type: 1
            }, () => {
              event.target.email.value = "";
              event.target.password.value = "";
              event.target.confirmPassword.value = "";
            });
          });
        })
        .catch((error) => {
          if (error.code === 'auth/weak-password') {
            this.setState({ message: "Password should be at least 6 characters.", type: 0 });
          } else if (error.code === 'auth/email-already-in-use') {
            this.setState({ message: "Email already registered.", type: 0 });
          } else {
            this.setState({ message: error.message, type: 0 });
          }
        });
    });
  };

  loginHandler = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((data) => {
        if (data.user.emailVerified) {
          this.setState({ message: "Login successful.", type: 1 });
        } else {
          this.setState({ message: "Please verify your email.", type: 0 }, () => {
            event.target.email.value = "";
            event.target.password.value = "";
          });
        }
      })
      .catch(() => this.setState({ message: "Invalid credentials. Try again.", type: 0 }));
  };

  render() {
    return <div>
      {
        this.state.page ?
          <Register
            message={this.state.message}
            type={this.state.type}
            switch={this.pageSwitchHandler}
            register={this.registrationHandler}
            google={this.googleHandler}
            facebook={this.facebookHandler}
            twitter={this.twitterHandler}
            gitHub={this.gitHubHandler}
          /> :
          <Login
            message={this.state.message}
            type={this.state.type}
            switch={this.pageSwitchHandler}
            login={this.loginHandler}
            google={this.googleHandler}
            facebook={this.facebookHandler}
            twitter={this.twitterHandler}
            gitHub={this.gitHubHandler}
          />
      }
    </div>;
  }
}

export default App;
export { auth, app };

