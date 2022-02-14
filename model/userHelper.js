const db = require('../config/connections')
const collection = require('../config/collections'); 
const { ObjectId } = require('mongodb');
module.exports={

submitUrl:(wordCount,url,backLinks)=>{
    return new Promise(async(resolve,reject)=>{
         await db.get().collection(collection.HISTORY).insertOne({
            wordCount:wordCount,
            url: url,
            backLinks:backLinks,
            favorites: false 
        }).then((response)=>{
            if(response){
                resolve()
            }else{
                reject()
            } 
        })
    })
},

getHistory: ()=>{
    return new Promise(async(resolve,reject)=>{
        let history = await db.get().collection(collection.HISTORY).find().sort({_id:-1}).toArray();
        if(history){
            resolve(history);
        }else{
            reject();
        }
    })
},

removeFavorites: (domainId)=>{
    return new Promise(async(resolve,reject)=>{
        db.get().collection(collection.HISTORY).updateOne({_id:ObjectId(domainId)},{$set:{favorites:false}}).then((response)=>{
            resolve(response);
        }).catch((error)=>{
            reject(error);
        })
    })
},
addFavorites: (domainId)=>{
    return new Promise(async(resolve,reject)=>{
        db.get().collection(collection.HISTORY).updateOne({_id:ObjectId(domainId)},{$set:{favorites:true}}).then((response)=>{
           resolve(response);
        }).catch((error)=>{
            reject(error);
        })
    })
},
deleteRecord:(domainId)=>{
    return new Promise(async(resolve,reject)=>{
        db.get().collection(collection.HISTORY).deleteOne({_id:ObjectId(domainId)}).then((response)=>{
           resolve(response);
        }).catch((error)=>{
            reject(error);
        })
    })
}
}
