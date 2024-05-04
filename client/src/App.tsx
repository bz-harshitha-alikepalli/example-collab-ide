
import './App.css'
import { io } from 'socket.io-client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const socket = io();
import IDEHome from './routes/IDEHome';
import IDEeditor from './routes/IDEeditor';
import SocketWrapper from './routes/SocketWrapper';


const router = createBrowserRouter([
  {
      path: "/",
      element: <IDEHome />,
  },
  {
    path: "/room/:roomId",
    element: <SocketWrapper><IDEeditor socket={socket}/></SocketWrapper>
},
 
]);

function App() {
  return <RouterProvider router={router} />
}

export default App
