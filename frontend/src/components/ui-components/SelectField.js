
import PropTypes from 'prop-types'

const SelectField = ({ list, inputLabel, value, setter }) => {
    
    return <div className={"mt-1mb-2"}>
        <label for={inputLabel}
            class=" 
        block text-sm font-medium
         text-gray-500" >
            {inputLabel}
        </label>
        <select 
            className={"w-full border py-2  focus:ring-2 focus:ring-blue-400 bg-white px-3"}>
            {list.map((item, index) => (
                <option
                    key={index}
                    value={item.id}
                >
                    {item.name}
                </option>
            ))}
        </select>

    </div>
};

SelectField.propTypes = {
    list: PropTypes.array.isRequired,
    inputLabel: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    setter: PropTypes.func.isRequired
}

export default SelectField