import React from 'react'

export default function Details(props) {
    return (
        <div className='container-fluid'>
            <div className='col-md-4 m-auto'>
                <div className='mt-2'>
                    <div className='card text-left'>
                        <div className='card-body'>
                            <form onSubmit={props.submit}>
                                <div className='form-group mt-1'>
                                    <label htmlFor="name">
                                        {" "}
                                        <b>1.</b> Name
                                    </label>
                                    <input type="text" name='name' className='form-control mt-1' placeholder='Enter your name..' autoComplete='off' required />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor="" className="mt-2">
                                        {" "}
                                        <b>2.</b> Email
                                    </label>
                                    <input type="email" name='email' className='form-control mt-1' placeholder='Enter your email..' autoComplete='off' required />
                                </div>
                                <div>
                                    <button type="submit" className='btn btn-primary mt-3' >Next</button>
                                </div>
                            </form>

                            <center className='mt-1'>
                                <span className="badge text-bg-primary mx-1">1</span>
                                <span className="badge text-bg-secondary mx-1">2</span>
                            </center>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
