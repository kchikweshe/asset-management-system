import {React} from 'react';
import MailIcon from '@material-ui/icons/Mail';


import {Badge} from '@material-ui/core';


export const badge = (content) => <Badge badgeContent={content} color="primary" >
  <MailIcon />
</Badge>