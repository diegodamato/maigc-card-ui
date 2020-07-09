import axios from 'axios';

class ClientHttp{
    
    getAllMagicCard(){
        return axios.get('http://localhost:3001/');
    }
}

export default ClientHttp;