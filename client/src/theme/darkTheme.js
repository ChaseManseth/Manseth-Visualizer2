import { createMuiTheme } from '@material-ui/core/styles';
import lightGreen from "@material-ui/core/colors/lightGreen";

const theme = createMuiTheme({
    palette: {
        primary: {
            light: lightGreen[300],
            main: lightGreen[500],
            dark: lightGreen[700]
        },
        type: 'dark'
    }
});

export default theme;