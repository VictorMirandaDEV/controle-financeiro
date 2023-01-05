import axios from "axios";

const url = "http://localhost:3000" //local;
// const url = "http://3.135.200.237:3000" //homologation
// const celcoin = "https://d2dyzv3hfsxa0s.cloudfront.net" //production



const server = { // production
  celcoin: "https://d2dyzv3hfsxa0s.cloudfront.net",
  paynet: "https://3etf8ezp82.execute-api.sa-east-1.amazonaws.com/prod",
  paynet_cnpj: "10480314000192"
}
// const server = { // homologação
//   celcoin: url,
//   paynet: "https://mqzvn3zk5c.execute-api.sa-east-1.amazonaws.com/beta",
//   paynet_cnpj: "76600763000135"
// }

const api = axios.create({
  baseURL: server.celcoin,
});

export default api;

export const API = server.celcoin;
export const paynet = server.paynet;
export const paynet_cnpj = server.paynet_cnpj;

// export const paynet = "https://mqzvn3zk5c.execute-api.sa-east-1.amazonaws.com/beta";
// export const paynet = "https://3etf8ezp82.execute-api.sa-east-1.amazonaws.com/prod"; //production
