import React, { useState } from "react";
import {
  Button,
  TextField,
  Grid,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import { useContext } from "react";
import { SocketContext } from "../../../context";

const Assignment = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
      />
    </svg>
  );
};

const Phone = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
      />
    </svg>
  );
};

const PhoneDisabled = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
      />
    </svg>
  );
};

/* 
root: {
    display: 'flex',
    flexDirection: 'column',
  },
  gridContainer: {
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  container: {
    width: '600px',
    margin: '35px 0',
    padding: 0,
    [theme.breakpoints.down('xs')]: {
      width: '80%',
    },
  },
  margin: {
    marginTop: 20,
  },
  padding: {
    padding: 20,
  },
  paper: {
    padding: '10px 20px',
    border: '2px solid black',
  },
*/

function Options({ children }: React.ReactNode | any) {
  const { me, callAccepted, callEnded, name, changeName, leaveCall, callUser } =
    useContext(SocketContext);

  const [idToCall, setIdToCall] = useState("");

  const copy = (name: string) => {
    return window.navigator.clipboard.writeText(name);
  };

  return (
    <Container>
      <Paper
        sx={{ padding: "10px 20px", border: "2px solid black" }}
        elevation={10}
      >
        <form className="flex flex-row" noValidate autoComplete="off">
          <Grid
            container
            sx={{ width: "600px", margin: "35px 0", padding: "0" }}
          >
            <Grid item xs={12} md={6} sx={{}}>
              <Typography gutterBottom variant="h6">
                Account Info
                <TextField
                  label="name"
                  value={name}
                  variant="filled"
                  onChange={(e) => changeName(e)}
                  fullWidth
                  sx={{ marginBottom: 1 }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={(e) => {
                    e.preventDefault();
                    copy(me);
                  }}
                >
                  {Assignment()}
                  <span className="ml-4"></span>Copy Me
                </Button>
              </Typography>
            </Grid>

            <Grid item xs={12} md={6} sx={{}}>
              <Typography gutterBottom variant="h6">
                Make A Call
                <TextField
                  label="id"
                  value={idToCall}
                  variant="filled"
                  onChange={(e) => setIdToCall(e.target.value)}
                  fullWidth
                  sx={{ marginBottom: 1 }}
                />
                {callAccepted && !callEnded ? (
                  <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    onClick={leaveCall}
                  >
                    {PhoneDisabled()}
                    <span className="ml-4"></span>Hang Up
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => callUser(idToCall)}
                  >
                    {Phone()}
                    <span className="ml-4"></span>Call
                  </Button>
                )}
              </Typography>
            </Grid>
          </Grid>
        </form>
        {children}
      </Paper>
    </Container>
  );
}

export default Options;
