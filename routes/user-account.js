const express = require('express')
const userAccountsRoutes = express.Router();
const fs = require('fs');

const dataPath = './details/user-accounts.json'

const saveAccountData = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync(dataPath, stringifyData)
}

const getAccountData = () => {
    const jsonData = fs.readFileSync(dataPath)
    return JSON.parse(jsonData)
}

userAccountsRoutes.post('/useraccount/addaccount', (req, res) => {

    var existAccounts = getAccountData()
    const newAccountId = Math.floor(1000 + Math.random() * 9000);

    existAccounts[newAccountId] = req.body

    console.log(existAccounts);
    saveAccountData(existAccounts);
    res.send({ success: true, msg: 'account added successfully' })

});
//read
userAccountsRoutes.get('/useraccount/list', (req, res) => {
    const userAccounts = getAccountData()
    res.send(userAccounts)
});

//update
userAccountsRoutes.put('/useraccount/:id', (req, res) => {
    var existAccounts = getAccountData()
    fs.readFile(dataPath, 'utf8', (err, data) => {
        const accountId = req.params['id'];
        existAccounts[accountId] = req.body;
        saveAccountData(existAccounts);
        res.send(`account with id ${accountId} has been updated`)
    }, true);
});

//delete
userAccountsRoutes.delete('/useraccount/delete/:id', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
        var existAccounts = getAccountData()
        const userId = req.params['id'];
        delete existAccounts[userId];
        saveAccountData(existAccounts);
        res.send(`account with id ${userId} has been deleted`)
    }, true);
})


module.exports = userAccountsRoutes