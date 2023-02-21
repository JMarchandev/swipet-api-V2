const { getDatabase } = require('./mongo');
const { ObjectId } = require('mongodb');

const collectionName = 'ads';

async function getAds() {
    const database = await getDatabase();
    return await database.collection(collectionName).find({}).toArray();
}

async function getAdById(id) {
    const database = await getDatabase();
    const ad = await database.collection(collectionName).findOne({ _id: new ObjectId(id) });
    return ad
}

async function insertAd(ad) {
    const database = await getDatabase();
    const { insertedId } = await database.collection(collectionName).insertOne(ad);
    const newAd = await getAdById(insertedId)
    return newAd;
}

async function updateAd(id, newAdProperties) {
    const database = await getDatabase();
    const currentAd = await getAdById(id)

    await database.collection(collectionName).findOneAndUpdate(
        { _id: new ObjectId(id) },
        {
            $set: {
                ...currentAd,
                ...newAdProperties,
            },
        },
    );
    const updatedAd = getAdById(id)
    return updatedAd
}

async function deleteAd(id) {
    const database = await getDatabase();
    await database.collection(collectionName).deleteOne({
        _id: new ObjectId(id),
    });
}

module.exports = {
    deleteAd,
    insertAd,
    updateAd,
    getAds,
    getAdById
};