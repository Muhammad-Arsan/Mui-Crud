import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { Avatar, IconButton, Typography } from "@material-ui/core";
import { DeleteOutline } from "@material-ui/icons";
import Axios from "axios";
import { makeStyles } from "@material-ui/core";
import { green, purple, red, yellow } from "@material-ui/core/colors";

const useStyles = makeStyles({
  avatar: {
    backgroundColor: (note) => {
      if (note.category === "money") {
        return yellow[700];
      }
      if (note.category === "todos") {
        return red[700];
      }
      if (note.category === "reminder") {
        return purple[700];
      }
      return green[500];
    },
    margin: 20,
  },
  card: {
    margin: 20,
  },
});
const NoteCard = ({ note, loadnotes }) => {
  const classes = useStyles(note);
  const handleDelete = async (id) => {
    await Axios.delete(`http://localhost:8000/notes/${id}`);
    loadnotes();
  };
  return (
    <div>
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              {note.category[0].toUpperCase()}
            </Avatar>
          }
          action={
            <IconButton onClick={() => handleDelete(note.id)}>
              <DeleteOutline />
            </IconButton>
          }
          title={note.title}
          subheader={note.category}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary">
            {note.details}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default NoteCard;
