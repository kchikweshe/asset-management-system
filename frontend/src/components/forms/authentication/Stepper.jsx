// Stepper form for Registration

import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Step from "@material-ui/core/Step";
import StepContent from "@material-ui/core/StepContent";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { render } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import ServiceAPI from "../Service.js";
import useStyles from "../styles.js";
import Homepage from "../../home.jsx";
import TransitionAlert from "../../ui-components/TransitionalAlert.js";
import CustomTextField from "../../ui-components/CustomTextField.jsx";
import CustomSelectField from "../../ui-components/CustomSelectField.js";

import SelectField from "../../ui-components/SelectField.js";
import DateField from "../../ui-components/DateField.js";
import UserForm from "../../ui-components/forms/UserRegistration.jsx";
import AddressForm from "../../ui-components/forms/AddressForm.jsx";
import MiscalleniousForm from "../../ui-components/forms/Miscallenious.jsx";
import Logo from "../../ui-components/Logo.jsx";



export const VerticalLinearStepper = (
    { handleUserRegistration,
        handleAddressCreation,
        handleEmployeeCreate }) => {
    const [title, setTitle] = useState("Mr.");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState("");
    const [nationalIdentifierNumber, setNationalIdentifierNumber] = useState("");
    const [dateOfBirth, setdateOfBirth] = useState("");
    const [gender, setGender] = useState("Male");
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

    const classes = useStyles();
    console.info(username)

    useEffect(() => {
        userData ?
            ServiceAPI.getAll("departments", userData.key)
                .then((res) => {
                    setDepartments(res.data);

                })
                .catch((error) => {
                    console.error(error)
                }) :
            render(<TransitionAlert severity={"info"}
                title="Loading" message={"Waiting for departments........"} />
            )
    }

        , [userData])


    useEffect(() => {
        departments.length > 0 ?
            setActiveStep(1) :
            setActiveStep(0)
    }

        , [departments])



    useEffect(() => {
        setUsername(firstName.charAt(0).toLowerCase().concat(lastName.toLowerCase()))
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
        // ServiceAPI.createEmployee(employee)
        //     .then((response) => {
        //         render(<TransitionAlert datatestid={'toast'} severity={"success"}
        //             title={"Congratulations"} message={`Proceed to the next steps.`} />
        //         )
        //         setUserData(response.data);
        //     })
        //     .catch((error) => {

        //         render(<TransitionAlert severity={"error"}
        //             title={"User Account Error"} message={`User creation failed ${error}.`} />
        //         );
        //     });
        handleUserRegistration(() => {
            ServiceAPI.createEmployee(employee)
                .then((response) => {
                    render(<TransitionAlert datatestid={'toast'} severity={"success"}
                        title={"Congratulations"} message={`Proceed to the next steps.`} />
                    )
                    setUserData(response.data);
                })
                .catch((error) => {

                    render(<TransitionAlert severity={"error"}
                        title={"User Account Error"} message={`User creation failed ${error}.`} />
                    );
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
                .catch((error) => render(
                    <TransitionAlert
                        placeholder={'error-alert'}
                        severity={"error"}
                        title={"Address Creation Error"}
                        message={error} />
                )

                );
        }
    };


    const createEmployee = data => {
        let token = userData.key;

        handleEmployeeCreate(() => {
            ServiceAPI.registerEmployee(data, token)
                .then((resp) => {
                    render(<Homepage employeeId={resp.data['id']} token={token} />)
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



    function getSteps() {
        return ["Basic Details", "Employee Address", "Final Details"];
    }
    function getStepContent(step) {
        switch (step) {
            case 0:
                return (
                    <div class="mt-2 sm:mx-auto sm: w-3/6 sm:max-w-3/5" >
                        <div class="bg-white py-4 px-10 shadow rounded-lg sm:px-10 ">
                            <Logo />
                            <UserForm
                                title={title}
                                setTitle={setTitle}
                                firstName={firstName}
                                setFirstName={setFirstName}
                                lastName={lastName}
                                setLastName={setLastName}
                                gender={gender}
                                setGender={setGender}
                                dateOfBirth={dateOfBirth}
                                setdateOfBirth={setdateOfBirth}
                                email={email}
                                setEmail={setEmail}
                                username={username}
                                setUsername={setUsername}
                                password={password}
                                setPassword={setPassword}
                                password2={password2}
                                setPassword2={setPassword2}
                                register={register}
                            />
                        </div>
                    </div>

                );
            case 1:
                return (
                    <div class="mt-8 sm:mx-auto sm: w-3/6 sm:max-w-full" >
                        <div class="bg-white py-8 px-10 shadow rounded-lg sm:px-10 ">
                            <Logo />
                            <AddressForm street={street} suburb={suburb}
                                province={province}
                                city={city}
                                setStreet={setStreet}
                                setCity={setCity}
                                setProvince={setProvince}
                                setSuburb={setSuburb}
                                handleSubmit={handleSubmit}
                            />
                        </div>
                    </div>

                );
            case 2:
                return (
                    <div class="mt-8 sm:mx-auto sm: w-3/6 sm:max-w-full" >
                        <div class="bg-white py-8 px-10 shadow rounded-lg sm:px-10 ">
                            <Logo />
                            <MiscalleniousForm
                                setNationalIdentifierNumber={setNationalIdentifierNumber}
                                nationalIdentifierNumber={nationalIdentifierNumber}
                                register={register}
                                handleDepartmentChange={handleDepartmentChange}
                                departments={departments}
                                department={department}
                                customRoles={customRoles}
                                role={role}
                                setRole={setRole}
                                save={createEmployee}
                            />
                        </div>
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


    return (
        <div className={classes.root}>
            <Stepper placeholder="stepper" activeStep={activeStep} orientation={"vertical"} >
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                        <StepContent class={"h-3/6"}>
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
