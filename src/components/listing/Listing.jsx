import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ClientHttp from './../../ClientHttp';
import './listing.css'

class Listing extends Component{
    constructor(props){
        super(props);

        this.state = {
            data: this.props.dataTable
        }
        
        this.getAllDataCard();
                
    }

    
    async getAllDataCard(){
        let dataTable = await new ClientHttp().getAllMagicCard();
        this.setState({
            data: dataTable.data
        })
    
    }

    async removeCard(id){
        try{
            await new ClientHttp().deleteCard(id);
            alert(`Card ${id} removido com sucesso`);
            this.getAllDataCard();
        }catch(err){
            alert(`Erro ao remover card: ${id}`);
        }
        
    }

    populateTable(){
        if (this.state.data.length){
            return this.state.data.map(data => {
                return  <TableRow key={data.id}>
                            <TableCell align="center">
                                <Button variant="contained" color="secondary" onClick={() => this.removeCard(data.id)} size="small" startIcon={<DeleteIcon />}>Apagar</Button>
                            </TableCell>
                            <TableCell align="center">{data.name}</TableCell>
                            <TableCell align="center">{data.rarity}</TableCell>
                        </TableRow>
            })
        }
    }

    UNSAFE_componentWillReceiveProps(newProps){
        if (newProps.dataTable.length){
            this.setState({data: newProps.dataTable})
        }
    }

    render(){
        return ( 
            <Fragment>
                <div className='positionTable'>
                    <TableContainer component={Paper} >
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Ação</TableCell>
                                    <TableCell align="center">Card Name</TableCell>
                                    <TableCell align="center">Rarity</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                { this.populateTable() }
                               
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </Fragment>
        );
    }
}

export default Listing;