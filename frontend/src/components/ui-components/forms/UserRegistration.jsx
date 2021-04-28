import {
    Box,
    Checkbox,
    FormControlLabel,
    Grid,
    Link,

} from "@material-ui/core";
import Button from "@material-ui/core/Button";

import React from "react";

import CustomTextField from "../../ui-components/CustomTextField.jsx";
import CustomSelectField from "../../ui-components/CustomSelectField.js";

import PropTypes from 'prop-types'
import useStyles from "../../forms/styles.js";
import Logo from "../Logo.jsx";

function UserForm(props) {

    const classes = useStyles()

    return <div>

        <form onSubmit={props.register} className={"mb-0 space-y-6 "}>
            <div className={"md:grid grid-cols-3 sm:grid-cols-3 gap-4"}>
                <CustomSelectField
                    placeholder={"title"}
                    type={'text'}
                    list={["Mr.", "Mrs.", "Ms.", "Dr.", "Prof.", "Eng."]}
                    inputLabel={"Title"}
                    value={props.title}
                    setter={props.setTitle}
                />

                <CustomTextField
                    placeholder={'first-name'}
                    label={"First Name"}
                    type={'text'}
                    value={props.firstName}
                    setter={props.setFirstName}

                />


                <CustomTextField
                    placeholder={"last-name"}
                    label={"Last Name"}
                    setter={props.setLastName}
                    value={props.lastName} type={'text'}
                />

            </div>
            <div class="grid grid-cols-2 gap-4">
                <CustomSelectField
                    placeholder={"gender"}
                    list={["Male", "Female", "Unknown", "Non-binary", "Other"]}
                    inputLabel={"Gender"}
                    value={props.gender}
                    setter={props.setGender}
                />

                <CustomTextField
                    placeholder={"date-of-birth"}
                    label={"Date of Birth"}
                    setter={props.setdateOfBirth}
                    value={props.dateOfBirth}
                    type={"date"}
                />

            </div>

            <CustomTextField
                placeholder={"email"}
                label={"E-mail"}
                setter={props.setEmail}
                value={props.email}
                type={"email"}
            />
            <div class=" grid grid-cols-3 gap-4">
                <CustomTextField
                    placeholder={"username"}
                    label={"Username"} type={'text'}
                    setter={props.setUsername}
                    value={props.username}

                />

                <CustomTextField
                    placeholder={"password-1"}
                    label={"Password"}
                    setter={props.setPassword}
                    value={props.password}
                    type={"password"}
                />

                <CustomTextField
                    placeholder={"password-2"}
                    label={"Confirm Password"}
                    setter={props.setPassword2}
                    value={props.password2}
                    type={"password"}
                />
            </div>

            <FormControlLabel
                control={<Checkbox value="remember" color="primary"/>}
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
                    <Link
                        href="#"
                        variant="body2">
                        {"Don't have an account? Sign Up"}
                    </Link>
                </Grid>
            </Grid>
            <Box mt={5}></Box>
        </form>
    </div>


}


// Specifies the default values for props:
UserForm.defaultProps = {
    type: 'text'
};
UserForm.propTypes = {
    title: PropTypes.string.isRequired,
    setTitle: PropTypes.func.isRequired,
    firstName: PropTypes.string.isRequired,
    setFirstName: PropTypes.func.isRequired,
    lastName: PropTypes.string.isRequired,
    setLastName: PropTypes.func.isRequired,
    gender: PropTypes.string.isRequired,
    setGender: PropTypes.func.isRequired,
    dateOfBirth: PropTypes.string.isRequired,
    setdateOfBirth: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
    setEmail: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    setUsername: PropTypes.func.isRequired,
    password: PropTypes.string.isRequired,
    setPassword: PropTypes.func.isRequired,
    password2: PropTypes.string.isRequired,
    setPassword2: PropTypes.func.isRequired,

    register: PropTypes.func.isRequired
}

export default UserForm