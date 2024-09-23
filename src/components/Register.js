import React from 'react'

export default function Register(props) {
    let msgClass = ["text-center"];
    if (props.type) {
        msgClass.push("text-success");
    }
    else {
        msgClass.push("text-danger");
    }
    return (
        <div className="container d-flex main">
            <div className="form-container text-center">
                <h3>Create Account</h3>
                <p>Get started with your free account</p>
                <p className={msgClass.join(" ")}>{props.message}</p>
                <button className="btn-google  my-2 w-100" onClick={props.google}>Signup via Google</button>
                <button className="btn-facebook  my-2 w-100" onClick={props.facebook}>Signup via Facebook</button>

                <p className="my-2">------------------OR--------------------</p>

                <form onSubmit={props.register} method="post">
                    <div className="mb-3">
                        <input type="email" className="form-control" placeholder="Email address" name="email" required />
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control" placeholder="Create password" name="password" required />
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control" placeholder="Confirm password" name="confirmPassword" required />
                    </div>

                    <button type="submit" className="btn btn-primary w-100">Create Account</button>
                </form>

                <p className="mt-3">Have an account? <a href="#" onClick={props.switch}>Log In</a></p>
            </div>
        </div>
    )
}
