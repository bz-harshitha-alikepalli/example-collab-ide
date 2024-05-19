import React, { useEffect, ReactNode } from "react";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { io, Socket } from "socket.io-client";


interface Props {
    children: ReactNode;
}

function addPropsToReactElement(element: React.ReactNode, props: any) {
    if (React.isValidElement(element)) {
        return React.cloneElement(element, props);
    }
    return element;
}

function addPropsToChildren(children: React.ReactNode, props: any) {
    if (!Array.isArray(children)) {
        return addPropsToReactElement(children, props);
    }
    return children.map((childElement: React.ReactNode) =>
        addPropsToReactElement(childElement, props)
    );
}

export default function SocketWrapper({ children }: Props) {
    const socket: Socket = io("http://localhost:5200");

    const location = useLocation();
    const navigate = useNavigate();
    const { roomId } = useParams();

    useEffect(() => {
        function kickStrangerOut() {
            navigate("/", { replace: true });
            toast.error("No username provided");
        }

        if (location.state && location.state.username) {
            socket.emit("when a user joins", { roomId, username: location.state.username });
        } else {
            kickStrangerOut();
        }
    }, [socket, location.state, roomId, navigate]);

    return location.state && location.state.username ? <div>{addPropsToChildren(children, { socket })}</div> : (
        <div className="room">
            <h2>No username provided. Please use the form to join a room.</h2>
        </div>
    );
}
