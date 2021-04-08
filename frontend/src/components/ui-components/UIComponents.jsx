import { React, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import MailIcon from '@material-ui/icons/Mail';


import { Badge, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import useStyles from '../forms/styles';


export default function TransitionAlert(props) {
  const [open, setOpen] = useState(true)
  const classes = useStyles()
  return (
    <div className={classes.alertRoot}>
      <Collapse in={open}>
        <Alert
          severity={props.severity}
          title={props.title}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}

            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {props.message}
        </Alert>
      </Collapse>

    </div>
  );
}

export function GenericSelectField(props) {
  const classes = useStyles()

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel>{props.inputLabel}</InputLabel>
      <Select value={props.property} onChange={(e) => props.setter(e.target.value)}>
        {props.list.map((item, index) => (
          <MenuItem
            key={index}
            value={item}
          >
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export function SelectField(props) {
  const classes = useStyles()

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel>{props.inputLabel}</InputLabel>
      <Select value={props.prop} onChange={(e) => props.setter(e.target.value)}>
        {props.list.map((item, index) => (
          <MenuItem
            key={index}
            value={item.id}
          >
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};


export const genericTextField = (property, type, setter, label) => {
  return (
    <TextField
      variant="outlined"
      margin="normal"
      required
      value={property}
      fullWidth
      type={type}
      onChange={(e) => setter(e.target.value)}
      label={label}
      autoFocus
    />
  )
};

export const badge = (content) => <Badge badgeContent={content} color="primary" >
  <MailIcon />
</Badge>