import 'regenerator-runtime/runtime'

import { initContract, login, logout } from './utils'

import getConfig  from './config'
import { async } from 'fast-glob'
const {networkId}=getConfig(process.env.NODE_ENV || 'development')

// Variable global para almacenar usuario near de el proyecto
let usuarioNearFondeo

// const submitButton = documento.querySelector('form button')

 document.querySelector('form').onsubmit = async (event) => {
     event.preventDefault()
  
     // get elements from the form using their id attribute
     const { fieldset, greeting } = event.target.elements
  
     // disable the form while the value gets updated on-chain
     fieldset.disabled = true

     try{

         await window.contract.setGreeting({

             message: greeting.value
         })
     } catch(e){
         alert(
             'Algo salió mal :( ' +
             '¿Quizás necesites salir y volver a entrar?' +
             'Verifica la consola de tu navegador para mas información.'
         )
         throw e
     } finally{

         fieldset.disabled=false
     }

     
     submitButton.disabled=true


     await fetchGreeting()

     
     document.querySelector('[data-behavior=notification]').style.display='block'


     
     setTimeout(() => {
         document.querySelector('[data-behavior=notification]').style.display='none'
     }, 11000)
 }

 document.querySelector('input#greeting').oninput = (event) => {
    if (event.target.value !== usuarioNearFondeo) {
      submitButton.disabled = false
    } else {
      submitButton.disabled = true
    }
  }

document.querySelector('#sign-in-button').onclick = login
document.querySelector('#sign-out-button').onclick = logout
document.querySelector('#crear-button').onclick = setPrograma()


// Mostrar el contenedor con el flujo para la sesión iniciada
function signedOutFlow(){
    document.querySelector("#signed-out-flow").style.display = 'block'
}

// Mostrando el contenedor con el flujo para iniciar sesión en una cuenta específica
function signedInFlow() {
    document.querySelector('#signed-in-flow').style.display = 'block'
  
    document.querySelectorAll('[data-behavior=account-id]').forEach(el => {
      el.innerText = window.accountId
    })


    const accountLink = document.querySelector('[data-behavior=notification] a:nth-of-type(1)')
    accountLink.href = accountLink.href + window.accountId
  accountLink.innerText = '@' + window.accountId
  const contractLink = document.querySelector('[data-behavior=notification] a:nth-of-type(2)')
  contractLink.href = contractLink.href + window.contract.contractId
  contractLink.innerText = '@' + window.contract.contractId

  // update with selected networkId
  accountLink.href = accountLink.href.replace('testnet', networkId)
  contractLink.href = contractLink.href.replace('testnet', networkId)

  fetchGreeting()
}

async function setPrograma(){
    await contract.setPrograma({})
    
}



// update global currentGreeting variable; update DOM with it
async function fetchGreeting() {
    usuarioNearFondeo = await contract.getGreeting({ accountId: window.accountId })
    document.querySelectorAll('[data-behavior=greeting]').forEach(el => {
      // set divs, spans, etc
      el.innerText = usuarioNearFondeo
  
      // set input elements
      el.value = usuarioNearFondeo
    })
  }

  // `nearInitPromise` gets called on page load
window.nearInitPromise = initContract()
.then(() => {
  if (window.walletConnection.isSignedIn()) signedInFlow()
  else signedOutFlow()
})
.catch(console.error)