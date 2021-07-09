
import React from 'react';
import { useState } from 'react';
import { Paper, Box, Button, Container, Grid } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Typography } from '@material-ui/core';
import Grafico from './components/Grafico';
import LinearProgressWithLabel from './components/LinearProgressWithLabel';

import AvisoErro from './components/AvisoErro';

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [questionIterator, setQuestionIterator] = useState(0);
  const [tentativas, setTentativas] = useState(0);
  const [acertos, setAcertos] = useState(0);
  const [erros, setErros] = useState(0);
  const [avisoErro, setAvisoErro] = useState(false);

  const estrangeira = estrangeiraValue => {
    setIsLoaded(false);
    setError(null);

    fetch(`https://9edp0q.deta.dev/questions/enem/?estrangeira=${estrangeiraValue}`)
    .then(response => response.json())
    .then((result) => {
      setIsLoaded(true);
      setQuestions(result);
    },
    (error)=> {
      setIsLoaded(true);
      setError(error);
      alert(error)
    });
  };

  const verificaAlternativa = isCorrect => {
    if(isCorrect){
      setQuestionIterator(questionIterator+1);
      if(tentativas===0){
        setAcertos(acertos+1);
      }
      setTentativas(0);
    }else{
      setAvisoErro(true);
      if(tentativas===0){
        setErros(erros+1)
      }
      setTentativas(tentativas+1)
    }
  }

  const handleCloseAvisoErro = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAvisoErro(false);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container className="App">
        {!isLoaded && !error ? (
          <Box p={10} height="85%" display="flex" justifyContent="center" alignItems="center">
            Carregando
          </Box>
        ) : error?(
          <Box p={10} height="85%" display="flex" justifyContent="center" alignItems="center">
            Erro na conexão com a API
          </Box>
        ) : !questions.length?(
          <Box p={10} height="85%" display="flex" justifyContent="center" alignItems="center">
            <Paper>
              <Box p={2} display="flex" flexDirection="column" alignContent="center">
                <Box p={4}>
                  <Typography align="center" variant="h5">
                    Gerador de quiz ENEM
                  </Typography>
                </Box>
                <Box p={2}>
                  <Typography align="center" variant="h6">
                    Escolha uma das opções de língua estrangeira
                  </Typography>
                </Box>
                <Box p={3} display="flex" justifyContent="space-evenly"> 
                  <Button onClick={() => estrangeira("ingles")} variant="contained" color="primary">
                    Inglês
                  </Button>
                  <Button onClick={() => estrangeira("espanhol")} variant="contained" color="primary">
                    Espanhol
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Box>
        ) : typeof questions[questionIterator] !== 'undefined'?(
          <Box p={1} height="85%" display="flex" flexDirection="column" justifyContent="space-evenly" alignItems="center">
            <Grid container spacing={2}
            justifyContent="center"
            alignItems="center">
              <Grid item xs={12}>
                <Typography align="justify">
                  (ENEM - {questions[questionIterator].ano}) - {questions[questionIterator].titulo}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography align="justify">
                  {questions[questionIterator].texto}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography align="right">
                  {questions[questionIterator].fonte}
                </Typography>
              </Grid>
              <Grid item xs={12} >
                <Typography align="justify">
                  {questions[questionIterator].enunciado}
                </Typography>
              </Grid>
              {questions[questionIterator].alternativas.map((alternativa) =>
                <Grid item xs={12}>
                  <Button onClick={() => verificaAlternativa(alternativa.isCorrect)} variant="contained" color="primary">
                    {alternativa.texto}
                  </Button>
                </Grid>
              )}
              <LinearProgressWithLabel value={questionIterator} length={questions.length}/>
            </Grid>
            <AvisoErro open={avisoErro} handleClose={handleCloseAvisoErro}/>
          </Box>
        ) : (
          <Box className="grafico" height="500px">
            <Grafico acertos={acertos} erros={erros}/>
          </Box>
        )}
      </Container>
    </React.Fragment>
  );
}

export default App;
