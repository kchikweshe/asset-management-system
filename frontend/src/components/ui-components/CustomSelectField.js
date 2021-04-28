import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import PropTypes from 'prop-types'


const CustomSelectField = ({ list, inputLabel, value, setter }) => {
   
    return <div className={"mt-1mb-2"}>
        <label
            className=" block text-sm font-medium
             text-gray-500" >
            {inputLabel}
        </label>
        <select
            required
            value={value}
            onChange={(e) => { setter(e.target.value) }}
            className={"w-full border py-2  focus:ring-2 focus:ring-blue-400 bg-white px-3"}>
            {list.map((item, index) => (
                <option
                    key={index}
                    value={item}
                >
                    {item}
                </option>
            ))}
        </select>

    </div>

}

CustomSelectField.propTypes = {
    datatestid: PropTypes.string.isRequired,
    list: PropTypes.array.isRequired,
    inputLabel: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    setter: PropTypes.func.isRequired
}

export default CustomSelectField;