import React from 'react'

export default function Login(props) {
    let msgClass = ["text-center"];
    if (props.type) {
        msgClass.push("text-success");
    }
    else {
        msgClass.push("text-danger");
    }
    return (
        <div className="container d-flex  main">
            <div className="form-container text-center">
                <h3>Login</h3>
                <p className={msgClass.join(" ")}>{props.message}</p>
                <button className="btn-twitter  my-2 w-100">Login via Twitter</button>
                <button className="btn-facebook  my-2 w-100">Login via Facebook</button>

                <p className="my-2">------------------OR--------------------</p>

                <form method="post" onSubmit={props.login}>
                    <div className="mb-3">
                        <input type="email" className="form-control" placeholder="Email address" required name="email" />
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control" placeholder="Create password" required name="password" />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                </form>

                <p className="mt-3">Don't have an account? <a href="#" onClick={props.switch}>Create</a></p>
            </div>
        </div>

    )
}
