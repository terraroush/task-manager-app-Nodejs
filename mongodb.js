// CRUD create read update destroy

const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }

    const db = client.db(databaseName)

    db.collection('users').deleteOne({
        name: "Janey"
    }).then(result => {
        result.result.n > 0 ?
            console.log('Successfully deleted your document!', result) :
            console.log("There was nothing to delete.")
    }).catch(error => {
        console.log(error)

    })
})