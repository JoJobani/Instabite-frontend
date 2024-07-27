import { useState } from "react"
import { useNavigate } from "react-router"
import { testerLogin } from "../store/actions/user.actions.js"
import { LoginForm } from "../cmps/LoginForm.jsx"
import { SignupForm } from "../cmps/SignupForm.jsx"
import LoginVisual from "../assets/img/loginVisual.png"
import InstaClone from "../assets/img/InstaClone.png"

export function LoginSignup() {
    const navigate = useNavigate()
    const [isSignup, setIsSignup] = useState(false)

    function onTesterLogin() {
        testerLogin()
        navigate('/')
    }

    return (
        <div className="login-signup">
            <section className="login-container">
                <div className="img-display">
                    <img src={LoginVisual} />
                </div>
                <div className="form-container">
                    <div className="input-container">
                        <img src={InstaClone} />
                        {!isSignup && <LoginForm />}
                        {isSignup && <SignupForm />}
                        <button className="tester-btn" onClick={onTesterLogin}>
                            <p>tester login</p>
                        </button>
                    </div>
                    <div className="auth-switcher">
                        {!isSignup &&
                            <p>Don't have an account? <span onClick={() => setIsSignup(!isSignup)}>Sign up</span></p>
                        }
                        {isSignup &&
                            <p>Have an account? <span onClick={() => setIsSignup(!isSignup)}>Log in</span></p>
                        }
                    </div>
                </div>
            </section>
            <footer>
                <p>© Jonathan Menashe for Coding Academy 2024</p>
            </footer>
        </div>
    )
}