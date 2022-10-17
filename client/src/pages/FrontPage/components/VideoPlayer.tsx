import { Grid, Typography, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { SocketContext } from "../../../context";

// more styles to tailwind the fuck out woheee
/* 
  video: {
    width: '550px',
    [theme.breakpoints.down('xs')]: {
      width: '300px',
    },
  },
  gridContainer: {
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  paper: {
    padding: '10px',
    border: '2px solid black',
    margin: '10px',
*/

function VideoPlayer() {
  const { name, callAccepted, callEnded, stream, call, myVideo, userVideo } =
    useContext(SocketContext);

  console.log(myVideo, userVideo);

  return (
    <Grid container sx={{ justifyContent: "center" }}>
      {stream && (
        <Paper
          sx={{ padding: "10px", border: "2px solid black", margin: "10px" }}
        >
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              {name || "name"}
            </Typography>
            <video
              playsInline
              muted
              ref={myVideo}
              autoPlay
              className="w-[550px] xs:w=[300px] scale-x-[-1]"
            />
          </Grid>
        </Paper>
      )}

      {callAccepted && !callEnded && (
        <Paper
          sx={{ padding: "10px", border: "2px solid black", margin: "10px" }}
        >
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              {call.name || "caller name"}
            </Typography>
            <video
              playsInline
              ref={userVideo}
              autoPlay
              className="w-[550px] xs:w=[300px] scale-x[-1]"
            />
          </Grid>
        </Paper>
      )}
    </Grid>
  );
}
export default VideoPlayer;
