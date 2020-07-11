import axios from 'axios';

class ClientHttp{
    
    getAllMagicCard(){
        return axios.get('http://localhost:3001/');
    }

    getMagicCard(id){
        return axios.get(`http://localhost:3001/${id}`);
    }

    saveMagicCard(cardName){
        return axios.post('http://localhost:3001/', {name: cardName});
    }

    deleteCard(id){
        console.log("ID " + id);
        return axios.delete(`http://localhost:3001/${id}`)
    }
}

export default ClientHttp;