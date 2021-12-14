import {
    Sequelize
} from 'sequelize'

export const conn = new Sequelize('toughts', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    user: 'root',
    password: '1234'
})

try {
    conn.authenticate()
    console.log('Conectamos com sucesso!')
} catch (e) {
    console.error('Não foi possivel conectar ao banco de dados', e)
}