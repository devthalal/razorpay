import Vault from 'hashi-vault-js'

const vault = new Vault({
  //   https: true,
  baseUrl: 'http://127.0.0.1:8200/v1',
  rootPath: 'secret_vault',
  timeout: 5000,
  proxy: false,
})

export default vault
