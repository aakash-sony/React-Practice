import React, { Component } from 'react'
import Details from './Details'
import Question from './Question'
import { v4 as uuidv4 } from 'uuid';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyBGtywWsDWWhdauRi2LpKByl7bJO2dyPOs",
    authDomain: "survey-9a5c9.firebaseapp.com",
    databaseURL: "https://survey-9a5c9-default-rtdb.firebaseio.com",
    projectId: "survey-9a5c9",
    storageBucket: "survey-9a5c9.appspot.com",
    messagingSenderId: "698637070456",
    appId: "1:698637070456:web:99aafd7ad617007d453d8d"
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

class Container extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: uuidv4(),
            name: null,
            email: null,
            questions: {
                q1: null,
                q2: null,
                q3: null,
                other: null
            },
            isSubmitted: false
        }
    }

    detailsSubmitHandler = (event) => {
        const name = event.target.name.value;
        const email = event.target.email.value;
        this.setState({ name, email })
        event.preventDefault();
    }

    questionsSubmitHandler = (event) => {
        event.preventDefault();
        const questions = {
            q1: event.target.q1.value,
            q2: event.target.q2.value,
            q3: event.target.q3.value,
            other: event.target.other.value
        },
            isSubmitted = true

        this.setState({ questions, isSubmitted }, () => {
            const surveyRef = ref(database, "survey/" + this.state.id);
            set(surveyRef, {
                name: this.state.name,
                email: this.state.email,
                questions: this.state.questions
            })
        });
    }
    render() {
        return (
            <>
                <div className='container-fluid'>
                    <div className='container card mt-2'>
                        <h1 className='text-center text-primary'>Student Survey</h1>
                    </div>
                </div>
                {
                    this.state.isSubmitted === true ? (
                        <div className='col-md-4 m-auto mt-3 p-3'>
                            <div className='card text-center'>
                                <h3>Thank you..Your data is saved.</h3>
                            </div>
                        </div>
                    ) : (
                        this.state.name === null && this.state.email === null ? <Details submit={this.detailsSubmitHandler} /> : <Question submit={this.questionsSubmitHandler} />)
                }
            </>
        )
    }
}

export default Container
