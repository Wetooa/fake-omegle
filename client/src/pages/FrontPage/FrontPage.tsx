import { Typography, AppBar } from "@mui/material";

import VideoPlayer from "./components/VideoPlayer";
import Options from "./components/Options";
import Notifications from "./components/Notifications";

/* 
    appBar: {
      borderRadius: 15,
      margin: "30px 100px",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      width: "600px",
      border: "2px solid black",
      // [theme.breakpoints.down("xs")]: {
      //   width: "90%",
      // },
    },
    image: {
      marginLeft: "15px",
    },
    wrapper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
    },
*/

function FrontPage() {
  return (
    <div className="flex flex-col items-center w-12/12">
      <div className="mx-[30px] my-[100px] flex flex-row justify-center items-center w-[600px] border-4 border-black rounded-lg bg-white xs:w-11/12">
        <Typography variant="h2" align="center">
          Fake Omegle
        </Typography>
      </div>

      {/* Video Player */}
      <VideoPlayer />

      {/* Options -> notifications */}
      <Options>
        <Notifications />
      </Options>
    </div>
  );
}
export default FrontPage;
