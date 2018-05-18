import { URL } from './AppConsts';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function getDataServer(params) {

  const options = 
  {
    ipbase: document.getElementById('frmIPBase').value,
    instancia: document.getElementById('frmInstanciaBase').value,
    alias: document.getElementById('frmAliasBase').value,
    tabela: params.tabela,
    filtro: params.filtro,
    ordem: params.ordem
  };

  let dados = [];
  
  let obj = params.this;

  obj.setState({loading: "spokes"});

  fetch(URL, {
    body: JSON.stringify(options), 
    cache: 'no-cache', 
    credentials: 'same-origin', 
    headers: {
      'content-type': 'application/json'
    },
    method: 'POST', 
    mode: 'cors', 
    redirect: 'follow', 
    referrer: 'no-referrer', 
  })
  .then(response => response.json())
  .then(function(data) {

    obj.setState({loading: "blank"});

    if (data.code === "ETIMEOUT") {
      showMessageError("Falha na conexão: " + data.message);
      return;
    }

    if (data.length === 0 || data.length === undefined) {
      showMessageWarning("Não há registros para a consulta da tabela: " + params.tabela)
    } else {
      dados.push(data);
    }

    if (params.adicionarObjeto){
      if (dados.length === 0 || dados === undefined){
        dados.push([params.adicionarObjeto])  
      } else {
        dados[0].splice(0, 0, params.adicionarObjeto);
      }
    }
    
    params.callback(dados[0]);
  });
}

var showMessageSuccess = function(msg){
  toast.success(msg, {
    position: toast.POSITION.TOP_CENTER,
    className: 'black-background',
    bodyClassName: "grow-font-size",
    progressClassName: 'fancy-progress-bar' 
  });
} 

var showMessageError = function(msg){
  toast.error(msg, {
    position: toast.POSITION.TOP_CENTER,
    className: 'black-background',
    bodyClassName: "grow-font-size",
    progressClassName: 'fancy-progress-bar' 
  });
} 

var showMessageWarning = function(msg){
  toast.warning(msg, {
    position: toast.POSITION.TOP_CENTER,
    className: 'black-background',
    bodyClassName: "grow-font-size",
    progressClassName: 'fancy-progress-bar' 
  });
} 

export { getDataServer, showMessageSuccess, showMessageError, showMessageWarning };