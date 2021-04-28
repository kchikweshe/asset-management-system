import Button from "@material-ui/core/Button";
import CustomTextField from "../../ui-components/CustomTextField.jsx";
import PropTypes from 'prop-types'
import useStyles from "../../forms/styles.js";
import SelectField, {RoleSelectField} from "../SelectField";


const MiscellaneousForm = (props) => {

    const classes = useStyles()

    return (<form onSubmit={props.save} className={"mb-0 space-y-6"}>
        <CustomTextField
            placeholder={'national-id'}
            label={"National ID"}
            value={props.nationalIdentifierNumber}
            setter={props.setNationalIdentifierNumber}
        />
        <div className={"grid grid-cols-1 gap-4"}>
            <SelectField
                list={props.departments}
                inputLabel={"Department"}
                value={props.department}
                setter={props.handleDepartmentChange}

            />
            <RoleSelectField
                list={props.roles}
                inputLabel={"Role"}
                value={props.role}
                setter={props.setRole}
            />
        </div>

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
MiscellaneousForm.defaultProps = {
    type: 'text'
};
MiscellaneousForm.propTypes = {

    nationalIdentifierNumber: PropTypes.string.isRequired,
    setNationalIdentifierNumber: PropTypes.func.isRequired,
    departments: PropTypes.array.isRequired,
    department: PropTypes.array.isRequired,
    handleDepartmentChange: PropTypes.func.isRequired,
    roles: PropTypes.any.isRequired,
    role: PropTypes.number.isRequired,
    setRole: PropTypes.func.isRequired,
    save: PropTypes.func.isRequired,
}

export default MiscellaneousForm