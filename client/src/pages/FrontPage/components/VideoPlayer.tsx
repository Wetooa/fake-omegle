import { Grid, Typography, Paper } from "@mui/material";
import { useSocketContext } from "../../../context";

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
  return (
    <div>
      VideoPlayer
      <div className="w-[550px] xs:w-[300px]"> video </div>
      <div className="justify-center xs:flex xs:flex-row"> gridContainer </div>
      <div className="p-[10px] border-2 border-black m-[10px]"> paper </div>
    </div>
  );
}
export default VideoPlayer;
