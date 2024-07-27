import { useState } from "react"
import { useNavigate } from "react-router"
import { login } from "../store/actions/user.actions.js"

export function LoginForm() {
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState({ username: '', password: '' })

    function handleChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials({ ...credentials, [field]: value })
    }

    async function onLogin(ev) {
        ev.preventDefault()
        await login(credentials)
        navigate('/')
    }

    return (
        <form onSubmit={onLogin}>
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
                <p>Log in</p>
            </button>
        </form>
    )
}