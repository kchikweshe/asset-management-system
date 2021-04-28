import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import PropTypes from 'prop-types'
import useStyles from "../forms/styles";


export function SelectField({list, inputLabel, value, setter}) {
    const classes = useStyles();

    return <FormControl variant="outlined" className={"w-full"}>
        <label className=" block text-sm font-medium text-gray-500">{inputLabel}</label>

        <Select className={" border py-1  focus:ring-2 focus:ring-blue-400 bg-white px-3"} value={value}
                onChange={(e) => setter(e.target.value)}>
            {list.map((item, index) => (
                <MenuItem key={index} value={item}>
                    {item.name}
                </MenuItem>
            ))}
        </Select>
    </FormControl>

}

export function RoleSelectField({list, inputLabel, value, setter}) {
    const classes = useStyles();

    return <FormControl variant="outlined" className={"w-full"}>
        <label className=" block text-sm font-medium text-gray-500">{inputLabel}</label>

        <Select className={"border py-1  focus:ring-2 focus:ring-blue-400 bg-white px-3"}
                value={value} onChange={(e) => setter(e.target.value)}>
            {list.map((item, index) => (
                <MenuItem key={index} value={item.id}>
                    {item.name}
                </MenuItem>
            ))}
        </Select>
    </FormControl>
}

SelectField.propTypes = {
    datatestid: PropTypes.string.isRequired,
    list: PropTypes.array.isRequired,
    inputLabel: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
    setter: PropTypes.func.isRequired
}

export default SelectField;