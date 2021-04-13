import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import { useState } from 'react';
import useStyles from '../forms/styles';
import PropTypes from 'prop-types'
import Snackbar from '@material-ui/core/Snackbar';



const TransitionAlert = ({ severity, title, message, datatestid }) => {
    const [isOpen, setIsOpen] = useState(true)
    const classes = useStyles()
    // return (
    //     <div className={classes.alertRoot}  >
    //         <Collapse in={open} >
    //             <Alert
    //                 data-testid={datatestid}
    //                 severity={severity}
    //                 title={title}
    //                 action={
    //                     <IconButton
    //                         aria-label="close"
    //                         color="inherit"
    //                         size="small"
    //                         onClick={() => {
    //                             setOpen(false);
    //                         }}
    //                     >
    //                         <CloseIcon fontSize="inherit" />
    //                     </IconButton>
    //                 }
    //             >
    //                 {message}
    //             </Alert>
    //         </Collapse>
    //     </div>
    // );
    const [state, setState] = useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });

    const { vertical, horizontal, open } = state;
    const handleClose = () => {
        setState({ ...state, open: false });
    };

    return (
        <div>

            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                onClose={handleClose}
                message="I love snacks"
                key={vertical + horizontal}
            >
                       <Alert
                    data-testid={datatestid}
                    severity={severity}
                    title={title}
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setIsOpen(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                >
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
}


//Specifies the default values for props:
// TransitionAlert.defaultProps = {
//     severity: 'info'
// };
// TransitionAlert.propTypes = {

//     severity: PropTypes.string.isRequired,
//     message: PropTypes.string.isRequired,
//     title: PropTypes.string.isRequired,
// }

export default TransitionAlert