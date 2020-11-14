const firebase = require("./firebase_config");

module.exports ={
    _getData:function(callback) {
        firebase.firestore().collection("Quiz").doc().get().data()
    }
}