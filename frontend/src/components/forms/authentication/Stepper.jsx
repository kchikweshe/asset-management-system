// Stepper form for Registration

import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ServiceAPI from "../Service.js";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import {
    Avatar,
    Box,
    Checkbox,
    FormControl,
    FormControlLabel,
    Grid,
    InputLabel,
    Link,
    MenuItem,
    Select,
    TextField,
} from "@material-ui/core";
import useStyles from "../styles.js";

export default function VerticalLinearStepper() {
    const [id, setId] = useState("");
    const [firstName, setFirstName] = useState("");
    const [title, setTitle] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [nationalidentifier_number, setNationalIdentifierNumber] = useState("");
    const [dateOfBirth, setdateOfBirth] = useState("");
    const [gender, setGender] = useState("M");
    const [department, setDepartment] = useState("");
    const [role, setRole] = useState("");
    const [user, setUser] = useState(null)
    const [roles, setRoles] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [customRoles, setCustomRoles] = useState([]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [suburb, setSuburb] = useState("");
    const [city, setCity] = useState("");
    const [province, setProvince] = useState("");
    const [street, setStreet] = useState("");
    const [user,setUser]=useState(0)
    const [password2, setPassword2] = useState("");
    const classes = useStyles();

    const register = (e) => {
        e.preventDefault();

        const employee = {
            password1: password,
            password2: password2,
            username: username,
            first_name: firstName,
            last_name: lastName,
            email: email
        };

        ServiceAPI.createEmployee(employee)
            .then((response) => {
                let token = response.data["key"];

                alert(`User is created with ${token}`);
                setActiveStep(1)
                ServiceAPI.getAll("departments", token).then((response) => {

                    setDepartments(response.data)

                }

                )
            })
            .catch((error) => alert(error));
    };

    const handleDepartmentChange = (e) => {
        console.info("e :", e)
        let dept = e
        let roles = dept.roles
        setCustomRoles(roles)

        console.info("Result :", roles)
        // populate roles by department

    }
    const genericTextField = (prop, setter, type) => (
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type={type}
            onChange={(e) => setter(e.target.value)}
            label={prop}
            autoFocus
        />
    );

    var genderOptions = ["Male", "Female", "Unknown", "Non-binary", "Other"];
    var titleOptions = ["Mr.", "Mrs.", "Ms.", "Dr.", "Prof.", "Eng."];

    const [activeStep, setActiveStep] = React.useState(0);

    const genericSelectField = (list, inputLabel, prop, setter) => {
        console.info(list)

        return (
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel>{inputLabel}</InputLabel>
                <Select value={prop} onChange={(e) => setter(e.target.value)}>
                    {list.map((item, index) => (
                        <MenuItem key={index} value={(list === departments || list === roles) ? item.name : item}>
                            {(list === departments || list === roles) ? item.name : item}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        );

    }

    const rolesByDepartmentField = (list) => {

        return (
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel>Role</InputLabel>
                <Select value={role} onChange={(e) => setRole(e.target.value)}>
                    {list.map((item, index) => (
                        <MenuItem key={index} value={item}>
                            {item}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        );

    }
    const deptField = (list) =>
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel>Department</InputLabel>
            <Select value={department} onChange={(e) => handleDepartmentChange(e.target.value)}>
                {list.map((item, index) => (
                    <MenuItem key={index} value={item}>
                        { item.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>



    function getSteps() {
        return ["Basic Details", "Employee Address", "Create User Account"];
    }
    function getStepContent(step) {
        switch (step) {
            case 0:
                return (
                    <Grid container justify="center" component="main" className={classes.root}>
                        <Grid item>
                            <Grid md={6} item component={Paper} elevation={4} square>
                                <div className={classes.paper}>
                                    <Avatar className={classes.avatar}>
                                        <LockOutlinedIcon />
                                    </Avatar>
                                    <Typography component="h1" variant="h5">
                                        Basic Details
                                  </Typography>
                                    <form onSubmit={register} className={classes.form}>
                                        {genericSelectField(titleOptions, "Title", title, setTitle)}

                                        {genericTextField("First Name", setFirstName, "text")}
                                        {genericTextField("Last Name", setLastName, "text")}

                                        {genericTextField("E-mail", setEmail, "email")}
                                        {genericTextField("Username", setUsername)}
                                        {genericTextField("Password", setPassword, "password")}
                                        {genericTextField(
                                            "Confirm Password",
                                            setPassword2,
                                            "password"
                                        )}

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
            case 1:
                return (
                    <div className="container">
                        <form>
                            <Grid container justify="center" spacing={3}>
                                <Avatar className={classes.avatar}>
                                    <LockOutlinedIcon />
                                </Avatar>
                                <Typography component="h1" variant="h5">
                                    Address
                                  </Typography>
                                {genericSelectField(
                                    genderOptions,
                                    "Gender",
                                    gender,
                                    setGender
                                )}
                                <Grid xs={6} item elevation={3} square>
                                    {genericTextField("Street", setStreet)}
                                </Grid>
                                <Grid xs={6} item elevation={3} square>
                                    {genericTextField("Suburb", setSuburb)}
                                </Grid>
                                <Grid xs={6} item elevation={3} square>
                                    {genericTextField("Province", setProvince)}
                                </Grid>
                                <Grid xs={6} item elevation={3} square>
                                    {genericTextField("City", setCity)}
                                </Grid>

                                <Grid xs={6} item elevation={3} square>

                                </Grid>
                                <Grid xs={6} item elevation={3} square>
                                    {dateField}
                                </Grid>
                                <Grid xs={6} item elevation={3} square>
                                    {" "}
                                    {genericTextField(
                                        "National Identification Number",
                                        setNationalIdentifierNumber
                                    )}
                                </Grid>
                                <Grid xs={6} item elevation={3} square>
                                    {deptField(departments)}
                                </Grid>

                                <Grid xs={6} item elevation={3} square>
                                    {rolesByDepartmentField(customRoles)}
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                );
            case 2:
                return `Try out different ad text to see what brings in the most customers,
                  and learn how to enhance your ads using features like ad extensions.
                  If you run into any problems with your ads, find out how to tell if
                  they're running and how to resolve approval issues.`;
            default:
                return "Unknown step";
        }
    }

    const steps = getSteps();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const dateField = (
        <TextField
            id="date"
            label="Date of Birth"
            type="date"
            value={dateOfBirth}
            onChange={(e) => {
                setdateOfBirth(e.target.value);
            }}
            defaultValue="2021-05-24"
            className={classes.textField}
            InputLabelProps={{
                shrink: true,
            }}
        />
    );

    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                        <StepContent>
                            <Typography>{getStepContent(index)}</Typography>
                            <div className={classes.actionsContainer}>
                                <div>
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        className={classes.button}
                                    >
                                        Back
                  </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleNext}
                                        className={classes.button}
                                    >
                                        {activeStep === steps.length - 1 ? "Finish" : "Next"}
                                    </Button>
                                </div>
                            </div>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {activeStep === steps.length && (
                <Paper square elevation={0} className={classes.resetContainer}>
                    <Typography>All steps completed - you&apos;re finished</Typography>
                    <Button onClick={handleReset} className={classes.button}>
                        Reset
          </Button>
                </Paper>
            )}
        </div>
    );
}
