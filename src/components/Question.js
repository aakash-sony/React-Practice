import React from 'react'

export default function Question(props) {
    return (
        <div>
            <div className='container-fluid'>
                <div className='col-md-4 m-auto'>
                    <div className='mt-3'>
                        <div className='card text-left'>
                            <div className='card-body'>
                                <form onSubmit={props.submit}>
                                    <div className='form-group mt-1'>
                                        <label htmlFor=' '>
                                            {" "}
                                            <b>3.</b> What are you currently doing?
                                        </label>
                                        <br />
                                        <div className='mt-2'>
                                            <input type="radio" id="teacher" name="q1" value="Teaching" autoComplete='off' className='mx-1' />
                                            <label htmlFor='teacher' className='mx-1'>
                                                Teaching
                                            </label>
                                            <input type="radio" id="programmer" name="q1" value="Programming" autoComplete='off' className='mx-1' />
                                            <label htmlFor='programmer' className='mx-1'>
                                                Programming
                                            </label>
                                            <input type="radio" id="student" name="q1" value="Study" autoComplete='off' className='mx-1' />
                                            <label htmlFor='student' className='mx-1'>
                                                Study
                                            </label>
                                            <input type="radio" id="dancing" name="q1" value="Dancing" autoComplete='off' className='mx-1' />
                                            <label htmlFor='other' className='mx-1'>
                                                Dancing
                                            </label><br />
                                        </div>
                                        <input type="text" className="form-control mt-2 " id="input-box" name="other" placeholder="Type here if not listed.." />
                                        <label htmlFor=' ' className='mt-3'>
                                            {" "}
                                            <b>4.</b> Please rate our course
                                        </label>
                                        <br />
                                        <div className='mt-2'>
                                            <input type="radio" id="poor" name="q2" value="Poor" autoComplete='off' className='mx-1' />
                                            <label htmlFor='poor' className='mx-1'>
                                                Poor
                                            </label>
                                            <input type="radio" id="good" name="q2" value="Good" autoComplete='off' className='mx-1' />
                                            <label htmlFor='good' className='mx-1'>
                                                Good
                                            </label>
                                            <input type="radio" id="excellent" name="q2" value="Excellent" autoComplete='off' className='mx-1' />
                                            <label htmlFor='excellent' className='mx-1'>
                                                Excellent
                                            </label>
                                        </div>
                                        <div className='mt-2'>
                                            <label htmlFor=' ' className='mt-2'>
                                                {" "}
                                                <b>5.</b>Write your review here
                                            </label>
                                            <br />
                                            <textarea className="form-control mt-1" name="q3" id="review" rows="3" placeholder='Type here..'></textarea>
                                        </div>
                                        <div>
                                            <button type="submit" className='btn btn-primary mt-3'>Save</button>
                                        </div>
                                    </div>
                                </form>
                                <center className='mt-1'>
                                    <span className="badge text-bg-secondary mx-1">1</span>
                                    <span className="badge text-bg-primary mx-1">2</span>
                                </center>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
