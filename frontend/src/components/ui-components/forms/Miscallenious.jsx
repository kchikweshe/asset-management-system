
import Button from "@material-ui/core/Button";
import CustomTextField from "../../ui-components/CustomTextField.jsx";
import PropTypes from 'prop-types'
import useStyles from "../../forms/styles.js";
import SelectField from "../SelectField.js";


function MiscalleniousForm(props) {

    const classes = useStyles()
    return (<form onSubmit={props.save} className={"mb-0 space-y-6"}>
        <div></div>
        <CustomTextField
            placeholder={'national-id'}
            label={"National ID"}
            value={props.nationalIdentifierNumber}
            setter={props.setNationalIdentifierNumber}
        />

        <SelectField
            list={props.departments}
            inputLabel={"Department"}
            value={props.department}
            setter={props.handleDepartmentChange}
        />


        <SelectField
            list={props.customRoles}
            inputLabel={"Role"}
            value={props.role}
            setter={props.setRole}
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

    </form>)
}




// Specifies the default values for props:
MiscalleniousForm.defaultProps = {
    type: 'text'
};
MiscalleniousForm.propTypes = {

    nationalIdentifierNumber: PropTypes.string.isRequired,
    setNationalIdentifierNumber: PropTypes.func.isRequired,
    departments: PropTypes.string.isRequired,
    department: PropTypes.string.isRequired,
    handleDepartmentChange: PropTypes.func.isRequired,
    customRoles: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    setRole: PropTypes.func.isRequired,
    save: PropTypes.func.isRequired,
}

export default MiscalleniousForm