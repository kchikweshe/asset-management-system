import PropTypes from 'prop-types'

// Tailwind implementation of Textfield

const CustomTextField = ({placeholder, type, value, label, setter}) => {

    return <div>
        <label for={placeholder} class=" block text-sm font-medium text-gray-500">{label}</label>
        <div class="mt-1">
            <input
                id={placeholder}
                value={value}
                name={placeholder}
                required
                type={type}
                maxLength={placeholder === 'national-id' ? 13 : 250}
                onChange={e => setter(e.target.value)}
                class=" w-full py-2 px-2 border  border-gray-300
                 focus:ring-2 focus:ring-blue-600 
                  focus:outline-none"/>
        </div>
    </div>
}
// Specifies the default values for props:
CustomTextField.defaultProps = {
    type: 'text'
};
CustomTextField.propTypes = {
    placeholder: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
    setter: PropTypes.func.isRequired
}

export default CustomTextField