import { Grid } from "@material-ui/core";
import React, { Component, useState, useEffect } from "react";
import ServiceAPI from "../Service.js";
import useStyles from "../styles.js";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import VerticalLinearStepper from "./Stepper.jsx";


export default function Registration() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    
    const [token, setToken] = useState(""); // A token authentication key
    const classes = useStyles();
    const register = (e) => {
        e.preventDefault();

        const employee = {
            password1: password,
            password2: password2,
            username: username,

        };

        ServiceAPI
            .createEmployee(employee)
            .then((response) => {
                console.info(response.data["key"]);
                setToken(response.data["key"]);
                let token = response.data["key"]
                alert(`User is created with ${token}`);


                ServiceAPI
                    .getAll("roles", token)
                    .then((response) => console.info(response.data));
            })
            .catch((error) => alert(error));
    };

    const genericTextField = (prop, setter, type) => (
        <TextField
            variant="outlined"
            margin="normal"
            required
            type="text"
            fullWidth
            type={type}
            // id={prop}
            onChange={(e) => setter(e.target.value)}
            label={prop}
            // name={prop}
            autoFocus
        />
    );

    return (
        <Grid container component="main" className={classes.root}>
            <Grid item>
                <Grid xs={12} item component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Registration
            </Typography>
                        <form onSubmit={register} className={classes.form}>
                            {genericTextField("Username", setUsername)}
                            {genericTextField("Password", setPassword, "password")}
                            {genericTextField("Confirm Password", setPassword2, "password")}

                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Create Account
              </Button>
                            <Grid container>
                                <Grid item md>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                  </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="#" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Box mt={5}></Box>
                        </form>
                    </div>
                </Grid>
            </Grid>
        </Grid>
    );
}
