import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const MyHeader = withStyles({
  // Header in center
  root: {
    fontFamily: "Roboto",
    fontSize: "24px",
    display: "flex",
    justifyContent: "center",
    marginBottom: "10px"
  }
})(Typography);

const MyTitle = withStyles({
  // Title (smaller than header)
  root: {
    fontFamily: "Roboto",
    fontSize: "18px",
    display: "flex",
    justifyContent: "flex-start"
    // marginBottom: "10px"
  }
})(Typography);

export { MyHeader, MyTitle };
