"use client";

import {
  Avatar,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import React, { useState } from "react";
import { useSocket } from "../context/SocketProvider";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function Page() {
  const [msg, setMsg] = useState("");
  const { sendMessage, messages } = useSocket();

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="h-screen w-screen bg-[#28292a] text-slate-300 flex flex-col justify-center items-center">
        <h1 className="text-5xl text-center font-bold">Home Page</h1>
        <div className="h-3/4 w-[70%] bg-[#1f1f1f]">
          {messages.map((msg, index) => {
            return (
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "#1f1f1f",
                }}
                key={index}
              >
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt={msg.name || "user"} src="" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={msg.name || "user"}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {msg}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </List>
            );
          })}
        </div>
        <div className="flex items-center">
          <TextField
            fullWidth
            label="message"
            id="message"
            className="mt-4 mr-2 flex-1 "
            color="info"
            inputMode="text"
            value={msg}
            onChange={(e) => {
              setMsg(e.target.value);
            }}
          />
          <Button
            variant="contained"
            color="info"
            className="bg-blue-600 p-2 mt-4"
            onClick={() => {
              setMsg("");
              sendMessage(msg);
            }}
          >
            Send
          </Button>
        </div>
      </div>
    </ThemeProvider>
  );
}
