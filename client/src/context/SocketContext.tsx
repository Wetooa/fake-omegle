import React, { useContext, useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer/index";

interface ContextProviderProps {
  children: React.ReactNode;
}
interface InitialStateProps {
  stream: any;
  me: any;
  call: any;
  callAccepted: boolean;
  callEnded: boolean;
  name: string;
  myVideo: any;
  userVideo: any;
}

const initalState: InitialStateProps = {
  stream: null,
  me: null,
  call: {},
  callAccepted: false,
  callEnded: false,
  name: "",
  myVideo: null,
  userVideo: null,
};

const SocketContext = React.createContext({
  ...initalState,
  answerCall: (): void => {},
  callUser: (id: any): void => {},
  leaveCall: (): void => {},
});
const socket = io("http://localhost:5000");

const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
  const [stream, setStream]: any = useState(initalState.stream);
  const [me, setMe]: any = useState(initalState.me);
  const [call, setCall]: any = useState(initalState.call);
  const [callAccepted, setCallAccepted] = useState(initalState.callAccepted);
  const [callEnded, setCallEnded] = useState(initalState.callEnded);
  const [name, setName] = useState(initalState.name);

  const myVideo: any = useRef();
  const userVideo: any = useRef();
  const connectionRef: any = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        myVideo.current.srcObject = currentStream;
      });

    socket.on("me", (id) => {
      setMe(id);
    });

    socket.on("calluser", ({ from, name: callerName, signal }: any) => {
      console.log(from, callerName, signal);
      setCall({ isRecieved: true, from, name: callerName, signal });
    });
  }, []);

  const answerCall = (): void => {
    setCallAccepted(true);
    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("answercall", { signal: data, to: call.from });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (id: any): void => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("calluser", {
        userToCall: id,
        signalData: data,
        from: me,
        name,
      });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.on("callaccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = (): void => {
    setCallEnded(true);
    connectionRef.current.destroy();
    window.location.reload();
  };

  return (
    <SocketContext.Provider
      value={{
        me,
        call,
        stream,
        callAccepted,
        callEnded,
        name,
        myVideo,
        userVideo,
        answerCall,
        callUser,
        leaveCall,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export { ContextProvider, SocketContext };
