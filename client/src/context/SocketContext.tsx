import React, {
  createContext,
  useState,
  useRef,
  useEffect,
  ChangeEvent,
} from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";

interface InitialStateProps {
  call: any;
  callAccepted: boolean;
  myVideo: any;
  userVideo: any;
  stream: any;
  name: string;
  callEnded: boolean;
  me: string;
}

const initialState: InitialStateProps = {
  call: {},
  callAccepted: false,
  myVideo: null,
  userVideo: null,
  stream: null,
  name: "",
  callEnded: false,
  me: "",
};

const SocketContext = createContext({
  ...initialState,
  answerCall: () => {},
  leaveCall: () => {},
  callUser: (id: any) => {},
  changeName: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {},
});

// const socket = io('http://localhost:5000');
const socket = io("https://warm-wildwood-81069.herokuapp.com");

interface ContextProviderProps {
  children: React.ReactNode;
}

const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(initialState.callAccepted);
  const [callEnded, setCallEnded] = useState(initialState.callEnded);
  const [stream, setStream] = useState(initialState.stream);
  const [name, setName] = useState(initialState.name);
  const [call, setCall] = useState(initialState.call);
  const [me, setMe] = useState(initialState.me);

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

    socket.on("me", (id) => setMe(id));

    socket.on("callUser", ({ from, name: callerName, signal }) => {
      setCall({ isRecievedCall: true, from, name: callerName, signal });
    });
  }, []);

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: call.from });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (id: any) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name,
      });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);

    connectionRef.current.destroy();

    window.location.reload();
  };

  const changeName = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setName(e.target.value);
  };

  return (
    <SocketContext.Provider
      value={{
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        name,
        changeName,
        callEnded,
        me,
        callUser,
        leaveCall,
        answerCall,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
