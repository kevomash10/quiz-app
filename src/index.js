import React, {
    Component
} from "react";
import "./assets/style.css";
import ReactDOM from "react-dom";
import quizService from "./quizService";
import QuestionBox from "./components/QuestionBox"
import Result from "./components/Result";

class QuizeApp extends Component {

    state = {
        questionBank: [],
        score: 0,
        responses: 0
    };

    //function to update state
    getQuestions = () => {
        quizService().then(question => {
            this.setState({
                questionBank: question
            });
        });
    };

    computeAnswer = (answer, correctAnswer) => {
        if (answer === correctAnswer) {
            this.setState({
                score: this.state.score + 1
            });
        }
        this.setState({
            responses: this.state.responses < 5 ? this.state.responses + 1 : 5
        });
    }

    playAgain = () => {
        this.getQuestions();
        this.setState({
            score: 0,
            responses: 0
        });
    }
    //we need to run this function when our component loads
    componentDidMount() {
        this.getQuestions();
    }

    render() {
            return ( <
                div className = "container" >
                <
                div className = "title" > QUIZapp < /div> {
                    this.state.questionBank.length > 0 && this.state.responses < 5 && this.state.questionBank.map(({
                        question,
                        answers,
                        correct,
                        questionId
                    }) => ( <
                        QuestionBox question = {
                            question
                        }
                        options = {
                            answers
                        }
                        key = {
                            questionId
                        }
                        selected = {
                            answer => this.computeAnswer(answer, correct)
                        }
                        />
                    ))
                } {
                    this.state.responses === 5 ? ( < Result score = {
                            this.state.score
                        }
                        playAgain = {
                            this.playAgain
                        }
                        />) : null} <
                        /div>
                    );

                }

            }
            ReactDOM.render( < QuizeApp / > , document.getElementById("root"));