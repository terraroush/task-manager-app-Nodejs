// CRUD create read update destroy

const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }

    const db = client.db(databaseName)

    db.collection('tasks').updateMany({
        completed: true
    }, {
            $set: {
                completed: false
            }
        }).then(result => {
            if (result.result.nModified > 0) {
                console.log("I think it worked!", result)
            } else {
                console.log("It didn't work!")

            }
        }).catch((error) => {
            console.log(error)
        })
})