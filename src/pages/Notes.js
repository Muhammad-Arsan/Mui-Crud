import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Grid } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import NoteCard from "../components/NoteCard";

export default function Notes() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    loadnotes();
  }, []);
  const loadnotes = async () => {
    try {
      const res = await axios.get("http://localhost:8000/notes");
      setNotes(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      <Grid container>
        {notes.map((note) => (
          <Grid key={note.id} xs={12} md={6} lg={4} spacing={5}>
            <NoteCard note={note} loadnotes={() => loadnotes()} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
