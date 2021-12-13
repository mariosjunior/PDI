import inquirer from 'inquirer'
import chalk from 'chalk'
import fs from 'fs'
operation();

function operation() {
    inquirer.prompt([{
        type: 'list',
        name: 'action',
        message: 'O que você deseja fazer?',
        choices: ['Criar conta', 'Consultar saldo', 'Depositar dinheiro', 'Sacar dinheiro', 'Sair']
    }]).then((answer) => {
        const action = answer['action']
        if (action === 'Criar conta') {
            createAccount();
        }
    }).catch(e => console.error(e))
}

//Criar conta
function createAccount() {
    console.log(chalk.bgYellow.black('Obrigado por escolher meu banco!'))
    console.log(chalk.yellow('Defina as opções da sua conta a seguir:'))
    buildAccount();
}

function buildAccount() {
    inquirer.prompt([{
        name: 'accountName',
        message: 'Digite um nome para sua conta:'
    }]).then((answer) => {
        const accountName = answer['accountName']
        console.info(accountName)
        if (!fs.existsSync('accounts')) {
            fs.mkdirSync('accounts')
        }

        if (fs.existsSync(`accounts/${accountName}.json`)) {
            console.log(chalk.bgRed.black('Esta conta já existe, escolha outro nome!'))
            buildAccount()
            return
        }

        fs.writeFileSync(`accounts/${accountName}.json`, '{"balance": 0}',
            function (e) {
                console.error(e)
            }
        )
        console.log(chalk.yellow('Parabéns, sua conta foi criada com sucesso!'))
        operation()
    }).catch(e => console.error(e))
}

//