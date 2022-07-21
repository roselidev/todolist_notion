require('dotenv').config(); // load your api key and db id
const { Client } = require('@notionhq/client'); // notion-js library
const util = require('util') // will unfold all [Object]s when consol.log results.

const notion = new Client({ auth: process.env.NOTION_API_KEY }); // create notion client
const databaseId = process.env.NOTION_API_DATABASE; // set db id

const getDatabase = async function () { // async get db data
  const response = await notion.databases.query({ database_id: databaseId }); // notion API call

  const res = response // TODO: change this, below is sample code.
  // const res = response.results.map((row) =>{
  //   return {
  //       title: row.properties.title.title[0].plain_text, // TODO: change this
  //       detail: row.properties.detail.rich_text[0].plain_text // TOOD: change this
  //   };
  // });

  console.log(util.inspect(res, false, null, true));

  return res;
};

getDatabase();