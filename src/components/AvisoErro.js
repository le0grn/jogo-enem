import {Snackbar} from '@material-ui/core/';

function AvisoErro(props) {    

    return (
        <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={props.open}
        autoHideDuration={2000}
        onClose={props.handleClose}
        message="Você errou! Pesquise e retorne com a resposta correta."
        />
    )
}

export default AvisoErro
