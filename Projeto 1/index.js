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
        } else if (action === 'Depositar dinheiro') {
            deposit()
        } else if (action === 'Consultar saldo') {

        } else if (action === 'Sacar dinheiro') {

        } else if (action === 'Sair') {
            console.log(chalk.bgYellow.black('Obrigado por usar o Accounts!'))
            process.exit()
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

//Adicionar dinheiro na conta $$$

function deposit() {
    inquirer.prompt([{
            name: 'accountName',
            message: 'Qual o nome da conta?'
        }]).then((answer) => {
            const accountName = answer['accountName']
            if (!checkAccount(accountName)) {
                return deposit()
            }

            inquirer.prompt([{
                name: 'amount',
                message: 'Quanto você deseja depositar?'
            }]).then((answer) => {
                const amount = answer['amount']
                addAmount(accountName, amount)
                operation()
            }).catch(e => (console.error(e)))
        })
        .catch(e => (console.error(e)))
}

function checkAccount(accountName) {
    if (!fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(chalk.bgRed.black('Essa conta não existe, tente novamente!'))
        return false
    }

    return true

}

function addAmount(accountName, amount) {
    const accountData = getAccount(accountName)

    if (!amount) {
        console.log(chalk.bgRed.black('Erro, tente novamente!'))
        return deposit()
    }
    accountData.balance = parseFloat(amount) + parseFloat(accountData.balance)
    fs.writeFileSync(`accounts/${accountName}.json`, JSON.stringify(accountData), function (e) {
        console.error(e);
    })
    console.log(chalk.yellow(`Foi depositado o valor de R$${amount} em sua conta!`))
    operation()
}

function getAccount(accountName) {
    const accountJson = fs.readFileSync(`accounts/${accountName}.json`, {
        encoding: 'utf8',
        flag: 'r'
    })

    return JSON.parse(accountJson);
}