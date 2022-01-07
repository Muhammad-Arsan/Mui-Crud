import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import Typography from "@material-ui/core/Typography";
import {
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  TextField,
} from "@material-ui/core";
import SendIcon from "@mui/icons-material/Send";
import AcUnitOutlinedIcon from "@mui/icons-material/AcUnitOutlined";
import { makeStyles } from "@material-ui/core";
import { Radio } from "@material-ui/core";
import { RadioGroup } from "@material-ui/core";
const useStyles = makeStyles({
  btn: {
    fontSize: 30,
    backgroundColor: "green",
    "&:hover": {
      Color: "secondary",
    },
  },
  btn2: {
    "&:hover": {
      backgroundColor: "purple",
    },
  },
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },
  text: {
    marginTop: 10,
  },
});

const FormField = () => {
  const history = useHistory();
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [category, setCategory] = useState("money");
  const handleChange = (e) => {
    e.preventDefault();
    setTitleError(false);
    setDetailsError(false);
    if (title == "") {
      setTitleError(true);
    }
    if (details == "") {
      setDetailsError(true);
    }
    if (title && details) {
      console.log(title, details, category);
      Axios.post("http://localhost:8000/notes", {
        title,
        details,
        category,
      });
      history.push("/");
    }
  };

  return (
    <div>
      <Container>
        <Typography className={classes.text}>Write a new Note</Typography>
        <form onSubmit={handleChange}>
          <TextField
            onChange={(e) => setTitle(e.target.value)}
            label="Title"
            variant="outlined"
            color="secondary"
            className={classes.field}
            fullWidth
            error={titleError}
          />
          <TextField
            onChange={(e) => setDetails(e.target.value)}
            label="Details..."
            variant="outlined"
            color="secondary"
            className={classes.field}
            multiline
            rows={3}
            fullWidth
            error={detailsError}
          />
          <FormControl className={classes.field}>
            <FormLabel>Categories:</FormLabel>
            <RadioGroup
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <FormControlLabel
                control={<Radio />}
                value="money"
                label="Money"
              />
              <FormControlLabel
                control={<Radio />}
                value="todos"
                label="Todos"
              />
              <FormControlLabel
                control={<Radio />}
                value="reminder"
                label="Reminder"
              />
              <FormControlLabel control={<Radio />} value="work" label="Work" />
            </RadioGroup>
          </FormControl>
          <br />
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            endIcon={<SendIcon />}
          >
            Send
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default FormField;
