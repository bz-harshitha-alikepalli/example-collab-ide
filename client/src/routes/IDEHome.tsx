import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { v4 as uuidv4, validate } from 'uuid';
import { Toaster, toast } from 'react-hot-toast';
import './IDEHome.css'

export default function IDEHome() {
    const navigate = useNavigate()
    const [roomId, setRoomId] = useState(() => "")
    const [username, setUsername] = useState(() => "")

    function handleRoomSubmit(e:any) {
        e.preventDefault()
        if (!validate(roomId)) {
            toast.error("Incorrect room ID")
            return
        }
        username && navigate(`/room/${roomId}`, { state: { username } })
    }

    function createRoomId(_e:any) {
        try {
            setRoomId(uuidv4())
            toast.success("Room created")
        } catch (exp) {
            console.error(exp)
        }
    }

    return (
        <div className="joinBoxWrapper">
            <form className="joinBox" onSubmit={handleRoomSubmit}>
                <h2 className="joinBoxText">Collaborative IDE</h2>
                <p>Paste your invite code down below</p>

                <div className="joinBoxInputWrapper">
                    <input
                        className="joinBoxInput"
                        id="roomIdInput"
                        type="text"
                        placeholder="Enter room ID"
                        required
                        onChange={(e) => { setRoomId(e.target.value) }}
                        value={roomId}
                        autoSave="off"
                        autoComplete="off"
                    />
                    
                </div>

                <div className="joinBoxInputWrapper">
                    <input
                        className="joinBoxInput"
                        id="usernameInput"
                        type="text"
                        placeholder="Enter Guest Username"
                        required
                        value={username}
                        onChange={e => { setUsername(e.target.value) }}
                        autoSave="off"
                        autoComplete="off"
                    />
                    
                </div>

                <button className="joinBoxBtn" type="submit">Join</button>
                <p>Create your <span
                    style={{ textDecoration: "underline", cursor: "pointer" }}
                    onClick={createRoomId}
                >own room</span></p>
            </form>
            <Toaster />
        </div>
    )
}