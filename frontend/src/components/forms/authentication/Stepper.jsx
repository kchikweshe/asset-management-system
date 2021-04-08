// Stepper form for Registration

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
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Step from "@material-ui/core/Step";
import StepContent from "@material-ui/core/StepContent";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Alert } from "@material-ui/lab";
import { render } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import ServiceAPI from "../Service.js";
import useStyles from "../styles.js";
import Homepage from "../../home.jsx";


export const VerticalLinearStepper = ({ handleUserRegistration, handleAddressCreation, handleEmployeeCreate }) => {
    const [title, setTitle] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState("");


    const [nationalIdentifierNumber, setNationalIdentifierNumber] = useState("");
    const [dateOfBirth, setdateOfBirth] = useState("");
    const [gender, setGender] = useState("M");
    const [department, setDepartment] = useState("");
    const [role, setRole] = useState();

    const [address, setAddress] = useState();
    const [roles, setRoles] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [customRoles, setCustomRoles] = useState([]);

    const [suburb, setSuburb] = useState("");
    const [city, setCity] = useState("");
    const [province, setProvince] = useState("");
    const [street, setStreet] = useState("");
    const [password2, setPassword2] = useState("");
    const [userData, setUserData] = useState([]);
    const [activeStep, setActiveStep] = useState(0);
    const [open, setOpen] = useState(true);

    const classes = useStyles();
    var genderOptions = ["Male", "Female", "Unknown", "Non-binary", "Other"];
    var titleOptions = ["Mr.", "Mrs.", "Ms.", "Dr.", "Prof.", "Eng."];
    console.info(username)
    function TransitionAlert(severity, title, message) {

        return (
            <div className={classes.alertRoot}>
                <Collapse in={open}>
                    <Alert
                        severity={severity}
                        title={title}

                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setOpen(false);
                                }}

                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                    >
                        {message}
                    </Alert>
                </Collapse>

            </div>
        );
    }
    useEffect(() => {
        userData ?
            ServiceAPI.getAll("departments", userData.key)
                .then((res) => {
                    setDepartments(res.data);

                })
                .catch((error) => {
                    console.error(error)
                }) :
            render(TransitionAlert("info", "Loading", "Waiting for departments........"))
    }

        , [userData])


    useEffect(() => {
        departments.length > 0 ?
            setActiveStep(1) :
            setActiveStep(0)
    }

        , [departments])



    useEffect(() => {
        setUsername(firstName.charAt(0).toLowerCase().concat(lastName))
    }, [firstName, lastName])

    const register = e => {
        e.preventDefault();

        const employee = {
            password1: password,
            password2: password2,
            username: username,
            first_name: firstName,
            last_name: lastName,
            email: email,
        };
        handleUserRegistration(() => {
            ServiceAPI.createEmployee(employee)
                .then((response) => {
                    setUserData(response.data);

                })
                .catch((error) => {
                    render(TransitionAlert("error", "User Account Error", `User creation failed ${error}.`));
                });
        })

    };



    const handleDepartmentChange = e => {
        let dept = e;
        console.info("dept " + dept.toString())
        setDepartment(dept);
        let roles = dept.roles;
        console.info("dept roles" + roles)
        setCustomRoles(roles);
    };

    const createAddress = data => {
        handleAddressCreation = () => {
            let token = userData.key;
            ServiceAPI.createAddress(data, token)
                .then((resp) => {
                    setAddress(resp.data["id"]);
                })
                .catch((error) => render(TransitionAlert("error", "Address", error)));
        }
    };

    const genericTextField = (label,value, setter, datatestid, type) => (
        <TextField
            data-testid={datatestid}
            variant="outlined"
            margin="normal"
            size={'small'}
            required
            fullWidth
            type={type}
            value={value}
            onChange={(e) => setter(e.target.value)}
            label={label}
            placeholder={datatestid}
            autoFocus
        />
    );
    const createEmployee = data => {
        let token = userData.key;

        handleEmployeeCreate(() => {
            ServiceAPI.registerEmployee(data, token)
                .then((resp) => {
                    return (<Homepage employeeId={resp.data['id']} token={token} user={resp.data['user']} />)
                }).then(
                    () => {
                        let message = "You have successfuly registered as an employee";
                        render(TransitionAlert("success", "Success", message));
                    }
                )
                .catch((error) => {
                    render(TransitionAlert("error", "Error", ` ${Array.of(error)}`));
                });
        })

    };


    const handleSubmit = e => {
        e.preventDefault();
        let address_json = {
            street: street,
            suburb: suburb,
            city: city,
            province: province,
        };

        createAddress(address_json);
        let user = userData.user;
        let employee = {
            user: user,
            address: address,
            title: title,
            gender: gender,
            date_of_birth: dateOfBirth,
            national_identifier_number: nationalIdentifierNumber,
            role: role,
        };

        createEmployee(employee);
    };

    console.info("Role :", role)

    const genericSelectField = (list, inputLabel, prop, setter) => {
        return (
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel>{inputLabel}</InputLabel>
                <Select value={prop} onChange={(e) => setter(e.target.value)}>
                    {list.map((item, index) => (
                        <MenuItem
                            key={index}
                            value={list === departments || list === roles ? item.name : item}
                        >
                            {list === departments || list === roles ? item.name : item}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        );
    };

    const rolesByDepartmentField = list => {
        return (
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel>Role</InputLabel>
                <Select value={role} onChange={(e) => setRole(e.target.value)}>
                    {list.map((item, index) => (
                        <MenuItem key={index} value={item.id}>
                            {item.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        );
    };
    const deptField = list => (
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel>Department</InputLabel>
            <Select
                value={department}
                onChange={(e) => handleDepartmentChange(e.target.value)}
            >
                {list.map((item, index) => (
                    <MenuItem key={index} value={item}>
                        {item.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );

    function getSteps() {
        return ["Basic Details", "Employee Address"];
    }
    function getStepContent(step) {
        switch (step) {
            case 0:
                return (
                    <Grid
                        container
                        className={classes.root}
                    >
                        <Grid item xs={12} className={classes.grid}>

                            <Grid container justify={"center"} >
                                <Grid sm={12} md={6} item component={Paper} elevation={4} square className={classes.gridItem}>
                                    <div className={classes.paper}>
                                        <Avatar className={classes.avatar}>
                                            <LockOutlinedIcon />
                                        </Avatar>
                                        <Typography component="h1" variant="h5">
                                            Basic Details
                                    </Typography>
                                        <form onSubmit={register} className={classes.form}>

                                            <Grid container justify={"center"} spacing={2}>
                                                <Grid item sm={4} >
                                                    {genericSelectField(titleOptions, "Title", title, setTitle)}
                                                </Grid>
                                                <Grid item sm={4}>

                                                    {genericTextField(
                                                        "FirstName",
                                                        firstName,
                                                        setFirstName,
                                                        "first-name",
                                                        "text",
                                                    )}
                                                </Grid>
                                                <Grid item sm={4}>

                                                    {genericTextField(
                                                        "LastName",
                                                        lastName,
                                                        setLastName,
                                                        "last-name",
                                                        "text",

                                                    )}
                                                </Grid>
                                            </Grid>

                                            {genericTextField("E-mail", email,setEmail, "email", "email")}
                                            {genericTextField(
                                                "Username",
                                                username,
                                                setUsername,
                                                "username",
                                                "text",
                                            )}
                                            {genericTextField(
                                                "Password",
                                                password,

                                                setPassword,
                                                "password1",
                                                "password"
                                            )}
                                            {genericTextField(
                                                "Confirm Password",
                                                password2,
                                                setPassword2,
                                                "password2",
                                                "password"
                                            )}

                                            <FormControlLabel
                                                control={<Checkbox value="remember" color="primary" />}
                                                label="Remember me"
                                            />
                                            <Button
                                                name="register"
                                                data-testid={'register'}
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
                    </Grid>
                );
            case 1:
                return (
                    <div className="container">
                        <form onSubmit={handleSubmit} className={classes.form}>
                            <Grid container justify="center" spacing={3} >

                                <Grid item xs={12}>
                                    <Avatar className={classes.avatar}>
                                        <LockOutlinedIcon />
                                    </Avatar>
                                    <Typography component="h1" variant="h5">Address</Typography>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={4}>
                                        {genericSelectField(genderOptions, "Gender", gender, setGender)}
                                        {dateField}
                                    </Grid>

                                    <Grid xs={4} item elevation={3} square>

                                        {genericTextField(
                                            "National Identification Number",
                                            setNationalIdentifierNumber
                                        )}
                                    </Grid>
                                </Grid>
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
                                    {deptField(departments)}
                                </Grid>

                                <Grid xs={6} item elevation={3} square>
                                    {rolesByDepartmentField(customRoles)}
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Finish Account Creation
                </Button>
                            </Grid>
                        </form>
                    </div>
                );

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
            <Stepper data-testid="stepper" activeStep={activeStep} orientation="vertical">
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
