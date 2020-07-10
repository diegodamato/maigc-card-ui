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
}

export default ClientHttp;