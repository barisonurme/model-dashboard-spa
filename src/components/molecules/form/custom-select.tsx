import { FormControl, InputLabel, MenuItem, Select, type SelectProps } from "@mui/material"


const CustomSelect = (props: SelectProps & { options: { label: string; value: string }[] }) => {
    return (
        <FormControl size="small" fullWidth>
            <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
            <Select size="small" {...props}>
                {props.options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default CustomSelect