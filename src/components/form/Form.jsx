import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import SaveIcon from '@material-ui/icons/Save';
import FindIcon from '@material-ui/icons/FindInPageSharp';
import ClientHttp from './../../ClientHttp';
import Listing from './../listing/Listing';
import './form.css';

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cardName: '',
      dataTable: []
    }

    this.onChange = this.onChange.bind(this);
    this.getMagicCard = this.getMagicCard.bind(this);
    this.registerMagicCard = this.registerMagicCard.bind(this);
  }

  async getMagicCard() {
    try {
      let result = await new ClientHttp().getMagicCard(this.state.cardName);
      this.setState({ dataTable: result.data });
    } catch (err) {
      alert("Nenhuma carta encontrada");
    }
  }

  async registerMagicCard() {
    if (!this.state.cardName) {
      alert("Nome da carta é obrigatório");
      return;
    }

    try {
      await new ClientHttp().saveMagicCard(this.state.cardName);
      let result = await new ClientHttp().getAllMagicCard();
      this.setState({ dataTable: result.data });
      alert(`Card ${this.state.cardName} gravado com sucesso!`);
    } catch (err) {
      alert(`Erro ao gravar card ${this.state.cardName}: ${err}`)
    }
  }

  onChange(event) {
    this.setState({ cardName: event.target.value });
  }

  render() {
    return (
      <Fragment>
        <CssBaseline />
        <Container maxWidth="sm">
          <div className='positionTextBox'>
            <TextField id="magicCardName" label="Name Magic Card" fullWidth variant="outlined" onChange={this.onChange} required />
          </div>
          <div className='positionButtons'>
            <Box component="span" m={11}>
              <Button variant="contained" color="primary" size="large" startIcon={<SaveIcon />} onClick={this.registerMagicCard}>Gravar</Button>
            </Box>
            <Box component="span" m={1}>
              <Button variant="contained" color="primary" size="large" startIcon={<FindIcon />} onClick={this.getMagicCard}>Buscar</Button>
            </Box>
          </div>
        </Container>
        <Listing dataTable={this.state.dataTable} />
      </Fragment>
    );
  }
}

export default Form;