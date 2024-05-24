import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { HMSRoomProvider } from "@100mslive/react-sdk";

ReactDOM.createRoot(document.getElementById('root')!).render(
  
    <HMSRoomProvider><App/></HMSRoomProvider>
  
)
