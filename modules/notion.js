require('dotenv').config(); // load your api key and db id
const { Client } = require('@notionhq/client'); // import notion-js library

const notion = new Client({ auth: process.env.NOTION_API_KEY }); // create notion client
const databaseId = process.env.NOTION_API_DATABASE; // set db id

exports.getDatabase = async function () { // get db data
  const response = await notion.databases.query({ database_id: databaseId });

  const res = response.results.map((row) =>{
     return {
         title: row.properties.title.title[0].plain_text,
         detail: row.properties.detail.rich_text[0].plain_text
     };
   });
  return res;
};

exports.addDatabase = async function(req) { // add db data
  const response = await notion.pages.create({
    "parent":{
      "type": "database_id",
      "database_id": databaseId,
    },
    "properties": {
      "detail": {
        "rich_text": [
          {
            "text": { "content": req.body.detail}
          }
        ]
      },
      "title": {
        "title": [
          {
            "text": { "content": req.body.title}
          }
        ]
      }
    }
  });
  if(response.object === 'page'){
    response.status = 200;
  }
  return response.status;
}