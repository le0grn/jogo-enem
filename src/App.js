
import React from 'react';
import { useState, useEffect } from 'react';
import { Paper, Box, Button, ButtonGroup, Container } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Typography } from '@material-ui/core';

const ENEMAPI_URL = "https://127.0.0.1:8000/questions/";

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [questionIterator, setQuestionIterator] = useState(0);
  const [tentativas, setTentativas] = useState(0);
  const [acertos, setAcertos] = useState(0);
  const [erros, setErros] = useState(0);

  const estrangeira = estrangeiraValue => {
    setIsLoaded(false);
    setError(null);

    fetch(`/questions/enem/?estrangeira=ingles`)
    .then(response => response.json())
    .then((result) => {
      setIsLoaded(true);
      setQuestions(result);
    },
    (error)=> {
      setIsLoaded(true);
      setError(error);
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
      alert("Não é bem isso... Pesquise o conteúdo e volte aqui com a resposta correta!")
      if(tentativas===0){
        setErros(erros+1)
      }
      setTentativas(tentativas+1)
    }
  }

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
            <Typography>
              (ENEM-{questions[questionIterator].ano})
            </Typography>
            <Typography>
              {questions[questionIterator].titulo}
            </Typography>
            <Typography>
              {questions[questionIterator].texto}
            </Typography>
            <Typography>
              {questions[questionIterator].fonte}
            </Typography>
            <Typography>
              {questions[questionIterator].enunciado}
            </Typography>
            {questions[questionIterator].alternativas.map((alternativa) =>
              <Button onClick={() => verificaAlternativa(alternativa.isCorrect)} variant="contained" color="primary">
                {alternativa.texto}
              </Button>
            )}
          </Box>
        ) : (
          <Box>
            Fim
          </Box>
        )}
      </Container>
    </React.Fragment>
  );
}

export default App;
