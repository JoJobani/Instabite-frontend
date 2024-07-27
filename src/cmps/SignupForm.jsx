import { useState } from "react"
import { useNavigate } from "react-router"
import { signup } from "../store/actions/user.actions.js"
import { userService } from "../services/user"

export function SignupForm() {
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState(userService.getEmptyUser())

    function handleChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials({ ...credentials, [field]: value })
    }

    async function onSignup(ev) {
        ev.preventDefault()
        await signup(credentials)
        navigate('/')
    }

    return (
        <form onSubmit={onSignup}>
            <input
                type="text"
                name="fullname"
                value={credentials.fullname}
                placeholder="Full Name"
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="username"
                value={credentials.username}
                placeholder="Username"
                onChange={handleChange}
                required
            />
            <input
                type="password"
                name="password"
                value={credentials.password}
                placeholder="Password"
                onChange={handleChange}
                required
            />
            <button>
                <p>Sign up</p>
            </button>
        </form>
    )
}