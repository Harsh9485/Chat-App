import React, { Component, useState } from "react";
import {
  Avatar,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { CameraAlt } from "@mui/icons-material";
import { VisuallyHiddenInput } from "../components/style/VisuallyHidden";
import { InputValidation } from "../utils/validators";
import { useStrongPassword } from "6pp";

interface textValidationProps {
  error: boolean;
  message: string;
}

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [userName, setuserName] = useState("");
  const [password, setpassword] = useState("");
  const [textValidation, setTextValidation] = useState<textValidationProps>();

  const buttonHandler = async () => {
    const { error, massage } = await InputValidation(password);
    setTextValidation({ error, massage });
  };

  return (
    <Container
      component={"main"}
      maxWidth="md"
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {isLogin ? (
          <>
            <Typography variant="h5">Login</Typography>
            <form>
              <TextField
                required
                fullWidth
                label="Username"
                margin="normal"
                variant="outlined"
                value={userName}
                onChange={(v) => setuserName(v.target.value)}
              />
              <TextField
                required
                fullWidth
                label="Password"
                type="password"
                margin="normal"
                variant="outlined"
                error={textValidation?.error}
                helperText={textValidation?.massage}
                value={password}
                onChange={(v) => setpassword(v.target.value)}
              />
              <Button
                variant="contained"
                sx={{ marginTop: "1rem" }}
                color="primary"
                type="button"
                fullWidth
                onClick={buttonHandler}
              >
                Login
              </Button>
              <Typography variant="h6" textAlign={"center"} m={"1rem"}>
                OR
              </Typography>
              <Button
                fullWidth
                onClick={() => {
                  setIsLogin(!isLogin);
                  setpassword("");
                  setuserName("");
                }}
              >
                Sign Up
              </Button>
            </form>
          </>
        ) : (
          <>
            <Typography variant="h5">Sign Up</Typography>
            <form
              style={{
                width: "100%",
              }}
            >
              <Stack position={"relative"} width={"10rem"} margin={"auto"}>
                <Avatar
                  sx={{
                    width: "10rem",
                    height: "10rem",
                    objectFit: "contain",
                  }}
                />
                <IconButton
                  sx={{
                    position: "absolute",
                    bottom: "0",
                    right: "0",
                    bgcolor: "rgba(255, 255, 255,0.5)",
                    ":hover": {
                      bgcolor: "rgba(255, 255, 255,0.7)",
                    },
                  }}
                  component="label"
                >
                  <>
                    <CameraAlt />
                    <VisuallyHiddenInput type="file" />
                  </>
                </IconButton>
              </Stack>
              <TextField
                required
                fullWidth
                label="Username"
                margin="normal"
                variant="outlined"
                value={userName}
                onChange={(v) => setuserName(v.target.value)}
              />
              <TextField
                required
                fullWidth
                label="Password"
                type="password"
                margin="normal"
                variant="outlined"
                error={false}
                helperText=""
                value={password}
                onChange={(v) => setpassword(v.target.value)}
              />
              <Button
                variant="contained"
                sx={{ marginTop: "1rem" }}
                color="primary"
                type="submit"
                fullWidth
              >
                Sign UP
              </Button>
              <Typography variant="h6" textAlign={"center"} m={"1rem"}>
                OR
              </Typography>
              <Button
                fullWidth
                onClick={() => {
                  setIsLogin(!isLogin);
                  setpassword("");
                  setuserName("");
                }}
              >
                Login
              </Button>
            </form>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default Login;
