import { React, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import MailIcon from '@material-ui/icons/Mail';


import { Badge, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import useStyles from '../forms/styles';



export const badge = (content) => <Badge badgeContent={content} color="primary" >
  <MailIcon />
</Badge>