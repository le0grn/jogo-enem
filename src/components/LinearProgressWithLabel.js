import { Box, Typography, LinearProgress } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';

const normalise = (value, length) => value * 100 / length;

const BorderLinearProgress = withStyles((theme) => ({
    root: {
      height: 10,
      borderRadius: 5,
    },
    colorPrimary: {
      backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
      borderRadius: 5,
      backgroundColor: '#1a90ff',
    },
  }))(LinearProgress);

function LinearProgressWithLabel(props) {
    return (
        <Box width="100%" display="flex" alignItems="center" justifyContent="center">
            <Box minWidth="60%" mr={1}>
                <BorderLinearProgress variant="determinate" value={normalise(props.value, props.length)} />
            </Box>
            <Box minWidth={35}>
                <Typography variant="body2" color="textSecondary">{`
                    ${props.value}/${props.length}
                `}</Typography>
            </Box>
        </Box>
    )
}

export default LinearProgressWithLabel
