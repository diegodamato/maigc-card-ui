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
import LinearProgress from '@material-ui/core/LinearProgress'
import Snackbar from '@material-ui/core/Snackbar'
import './form.css';
import Alert from '@material-ui/lab/Alert';

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cardName: '',
      dataTable: [],
      isLoading: false,
      validations: {
        requiredName: false
      },
      errors: {
        find: false,
        save: false
      }
    }

    this.onChange = this.onChange.bind(this);
    this.getMagicCard = this.getMagicCard.bind(this);
    this.registerMagicCard = this.registerMagicCard.bind(this);
    this.cleanAlertMessage = this.cleanAlertMessage.bind(this);
  }

  async getMagicCard() {
    this.setState({validations: {requiredName: false}});
    try {
      let result = await new ClientHttp().getMagicCard(this.state.cardName);
      this.setState({ dataTable: result.data });
    } catch (err) {
      alert("Nenhuma carta encontrada");
    }
  }

  async registerMagicCard() {
    this.cleanAlertMessage();
    
    if (!this.state.cardName) {
      this.setState({validations: {requiredName: true}})
      return;
    }
    
    try {
      this.startLoading();
      await new ClientHttp().saveMagicCard(this.state.cardName);
      this.stopLoading();
      this.refreshTable()
      alert(`Card ${this.state.cardName} gravado com sucesso!`);
    } catch (err) {
      this.stopLoading();
      this.setState({errors: {save: true}})
    }
  }

  startLoading(){
    this.setState({isLoading: true});
  }

  stopLoading(){
    this.setState({isLoading: false});
  }

  showProgress(){
    if(this.state.isLoading){
      return <LinearProgress />
    }
  }

  showAlertMessage(open, message, type){
    return <Snackbar open={open} autoHideDuration={6000} onClose={this.cleanAlertMessage}>
             <Alert elevation={6} variant="filled" severity={type}>{message}</Alert>
           </Snackbar>
  }

  cleanAlertMessage(){
    this.setState({errors: {save: false}})
    this.setState({validations: {requiredName: false}})
  }

  async refreshTable(){
    let result = await new ClientHttp().getAllMagicCard();
    this.setState({ dataTable: result.data });
  }

  onChange(event) {
    this.setState({ cardName: event.target.value });
  }

  render() {
    return (
      <Fragment>
        { this.showProgress() }
        
        { this.showAlertMessage(this.state.validations.requiredName, "Nome é obrigatório", "error") }
        { this.showAlertMessage(this.state.errors.save, "Erro ao gravar card", "error") }
        
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