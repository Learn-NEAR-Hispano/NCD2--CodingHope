# 1. ¿Que es SeedingHope?

_SeedingHope es un smartcontract desarrollado bajo el protocolo de Near, su finalidad u objetivo es que las personas que emprendan un programa social para ayudar a la comunidad, puedan solicitar donaciones para llevarlos a cabo y cumplir con sus objetivos._

**SeedingHope permite:**

1.	Crear un programa social
2.	Dar de baja un programa social
3.	Consultar los programas sociales que están dados de alta en la aplicación
4.	Recibir donaciones para programas sociales.


## 2. Instalación Local

_Para poder instalar y correr SeedingHope de manera local (en tu equipo) es necesario que cumplas con una serie de pre-requisitos y pasos que deberás de llevar a cabo en estricto orden._

### 3. Pre-Requisitos

1. Asegúrese de haber instalado [Node.js] ≥ 12 ((recomendamos usar [nvm])
2.	Asegúrese de haber instalado yarn: 
```
npm install -g yarn
```
3.	Instalar dependencias:
```
 yarn install
 ```
4.	Crear un testnet near account 
5.	Instalar el NEAR CLI globally: 
```
yarn install --global near-cli
```

### 4. Clonar SeedingHope en tu equipo

1.	Ingresar al repositorio depositado en GitHub:
2.	Dar clic en **Fork** para que se cree una copia en tu cuenta de GitHub
3.	Dar clic en **Code** y copiar la ruta del repositorio https://
4.	Ir a la terminal de Ubuntu y escribir el siguiente comando que permitirá clonar SeedingHope:
```
git clone ruta del repositorio
```
Ejemplo: 
```
git clone https://github.com/usuariogit/SeedingHope-E9.git
```
5.	Una vez clonado desde la terminal ingresar a la carpeta de proyecto con el comando:
```
cd SeedingHope
```
6.	Loguearse con el usuario testnet indicando los siguientes comandos en la terminal de Ubuntu:
```
near login
```
7.	Se abrirá el navegador solicitando ingreses tu cuenta para loguearte y una vez hecho esto regresas a la terminal donde marcará como exitoso el procedimiento.


### 5. Correr el SmartContract de SeedingHope

1.	Ya dentro de la carpeta del proyecto y siguiendo en la terminal, instalar la dependencia de [Node.js]:
```
npm install
```
2.	Generar el código y compilación del smartcontract de manera local:
```
yarn build && near dev-deploy
```
Con estos pasos realizados anteriormente ya podrás ejecutar en tu equipo el SmartContract de SeedingHope.


## Pruebas unitarias
-------------------------------------

**1. Dar de Alta un Programa Social**

Los usuarios interesados en recibir donaciones para su proyecto social, tendrán que registrar el programa e indicar el monto deseado a recaudar. Para dar de alta un Programa Social desde la línea de comandos de Ubuntu:
```
near call username.testnet nuevoProyecto '{"nombre":"nombre","descripcion":"descripcion ","cantidadMeta":monto}' --account-id username.testnet
```
**2. Dar de Baja un Programa Social**

Los programas sociales que ya hayan alcanzado la meta o que su objetivo no fue cumplido podrán ser dados de baja de la siguiente manera, desde la terminal de ubuntu:
```
near call username.testnet borrarProyecto '{"id": id}' --account-id username.testnet
```
**3. Consultar un Programa Social**

Generar una lista de programas sociales desde la terminal de Ubuntu que previamente fueron dados de alta:
```
near view usename.testnet mostrarProyectos --account-id usarname.testnet
```
**4. Donación a un Programa social**

Consiste en que los donadores aporten Nears para apoyar al programa social y este pueda llegar a su meta y que el programa social pueda ser llevado a cabo:
```
near call username.testnet fondearProyecto '{"id": id, "cantidad": cantidad}' --account-id username.testnet
```
<!-- [near-cli] is a command line interface (CLI) for interacting with the NEAR blockchain. It was installed to the local `node_modules` folder when you ran `yarn install`, but for best ergonomics you may want to install it globally:

    yarn install --global near-cli

Or, if you'd rather use the locally-installed version, you can prefix all `near` commands with `npx`

Ensure that it's installed with `near --version` (or `npx near --version`)


Step 1: Create an account for the contract -->
<!-- ------------------------------------------

Each account on NEAR can have at most one contract deployed to it. If you've already created an account such as `your-name.testnet`, you can deploy your contract to `CodingHope.your-name.testnet`. Assuming you've already created an account on [NEAR Wallet], here's how to create `CodingHope.your-name.testnet`:

1. Authorize NEAR CLI, following the commands it gives you:

      near login

2. Create a subaccount (replace `YOUR-NAME` below with your actual account name):

      near create-account CodingHope.YOUR-NAME.testnet --masterAccount YOUR-NAME.testnet


Step 2: set contract name in code
---------------------------------

Modify the line in `src/config.js` that sets the account name of the contract. Set it to the account id you used above.

    const CONTRACT_NAME = process.env.CONTRACT_NAME || 'CodingHope.YOUR-NAME.testnet'


Step 3: deploy!
---------------

One command:

    yarn deploy

As you can see in `package.json`, this does two things:

1. builds & deploys smart contract to NEAR TestNet
2. builds & deploys frontend code to GitHub using [gh-pages]. This will only work if the project already has a repository set up on GitHub. Feel free to modify the `deploy` script in `package.json` to deploy elsewhere.


Troubleshooting
===============

On Windows, if you're seeing an error containing `EPERM` it may be related to spaces in your path. Please see [this issue](https://github.com/zkat/npx/issues/209) for more details.


  [create-near-app]: https://github.com/near/create-near-app
  [Node.js]: https://nodejs.org/en/download/package-manager/
  [jest]: https://jestjs.io/
  [NEAR accounts]: https://docs.near.org/docs/concepts/account
  [NEAR Wallet]: https://wallet.testnet.near.org/
  [near-cli]: https://github.com/near/near-cli
  [gh-pages]: https://github.com/tschaub/gh-pages -->
