
import PropTypes from 'prop-types'


const DateField = ({ datatestid, value, setter }) => {

    return (
        <div class="mt-1">
            <label for={"date-of-birth"}
                class=" block text-sm font-medium text-gray-500 py-3" >
                Date of Birth
    </label>
            <div>
                <input
                    datatestid={datatestid}
                    type="date"
                    value={value}
                    onChange={(e) => {
                        setter(e.target.value);
                    }}
                    defaultValue="2021-05-24"
                    className={" border py-2 px-3 "}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </div>
        </div>


    )
};

DateField.propTypes = {
    datatestid: PropTypes.string,

    value: PropTypes.object.isRequired,
    setter: PropTypes.func.isRequired
}

export default DateField;