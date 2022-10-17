import { useContext } from "react";
import { SocketContext } from "../../../context";
import { Button } from "@mui/material";

function Notifications() {
  const { answerCall, call, callAccepted } = useContext(SocketContext);
  return (
    <>
      {call.isRecievedCall && !callAccepted && (
        <div className="flex justify-center">
          <h1>{call.name} is calling!</h1>
          <Button variant="contained" color="primary" onClick={answerCall}>
            Answer Call
          </Button>
        </div>
      )}
    </>
  );
}
export default Notifications;
