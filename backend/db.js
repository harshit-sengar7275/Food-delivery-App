const mongoose = require('mongoose');

const dbUrl = "mongodb+srv://harshitsengar2461:Harshit%401234@cluster0.hvxow.mongodb.net/foodData?retryWrites=true&w=majority";

const mongo = async () => {

    try {
        await mongoose.connect(dbUrl);
        console.log("Connected to MongoDB successfully!");

        // Fetch data from the 'sample' collection
        const fetchData = await mongoose.connection.db.collection("sample").find({}).toArray();
        // console.log("Data from the database:", fetchData);
        const typeData = await mongoose.connection.db.collection("type").find({}).toArray();

        global.sample = fetchData;
        global.type = typeData;

        // console.log("Data fetched successfully:", global.sample);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Exit with failure code if there's an error
    }
};

module.exports = mongo;

// const mongo = async () => {

//     try {
//         await mongoose.connect(dbUrl);
//         console.log("Connected to MongoDB successfully!");

//         // Fetch data from the 'sample' collection
//         const fetchData = await mongoose.connection.db.collection("sample").find({}).toArray(async function(err, data){
//             const type =  await mongoose.connection.db.collection("type");
//             type.find({}).toArray(function (err, typeData){
//                if(err) console.log(err);
//                   else{
//                          global.sample = data;
//                          global.type = typeData;
//                        }
//             })
//         });
//         // console.log("Data from the database:", fetchData);

//         global.sample = fetchData;

//         // console.log("Data fetched successfully:", global.sample);
//     } catch (error) {
//         console.error("Error connecting to MongoDB:", error);
//         process.exit(1); // Exit with failure code if there's an error
//     }
// };