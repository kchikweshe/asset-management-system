import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import React from "react";
import CustomTextField from "../../ui-components/CustomTextField.jsx";
import PropTypes from 'prop-types'
import useStyles from "../../forms/styles.js";


function AddressForm({
    street,
    setStreet,
    suburb,
    setSuburb,
    province,
    setProvince,
    city,
    setCity,
    handleSubmit }) {
    const classes = useStyles()
    return <div className="container">
        <form onSubmit={handleSubmit} className={"mb-0 space-y-6"}>

            <Typography component="h1" variant="h5">Address</Typography>

            <div className={"grid grid-cols-1 gap-4"} >

                <CustomTextField
                    placeholder={'street'}
                    label={"Street"}
                    value={street}
                    setter={setStreet}
                />

                <CustomTextField
                    placeholder={'suburb'}
                    label={"Suburb"}
                    value={suburb}
                    setter={setSuburb}
                />
                <CustomTextField
                    placeholder={'city'}
                    label={"City"}
                    value={city}
                    setter={setCity}
                />
                <CustomTextField
                    placeholder={'province'}
                    label={"Province"}
                    value={province}
                    setter={setProvince}
                />

            </div>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                Save Address
                </Button>

        </form>
    </div>
}




// Specifies the default values for props:
AddressForm.defaultProps = {
    type: 'text'
};
AddressForm.propTypes = {
    street: PropTypes.string.isRequired,
    setStreet: PropTypes.func.isRequired,
    suburb: PropTypes.string.isRequired,
    setSuburb: PropTypes.func.isRequired,
    province: PropTypes.string.isRequired,
    setProvince: PropTypes.func.isRequired,
    city: PropTypes.string.isRequired,
    setCity: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
}

export default AddressForm;