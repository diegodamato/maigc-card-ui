import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import SaveIcon from '@material-ui/icons/Save';
import FindIcon from '@material-ui/icons/FindInPageSharp';

class Form extends Component{
    constructor(props){
        super(props);

    }

    render(){
        return (
            <div>
              <CssBaseline />
              <Container maxWidth="sm">
                <TextField id="outlined-basic" label="Name Magic Card" fullWidth variant="outlined" required />
                <Box component="span" m={11}>
                  <Button variant="contained" color="primary" size="large" startIcon={<SaveIcon />}>Gravar</Button>
                </Box>
                <Box component="span" m={1}>
                  <Button variant="contained" color="primary" size="large" startIcon={<FindIcon />}>Buscar</Button>
                  </Box>
              </Container>
            </div>
          );
    }
}

export default Form;