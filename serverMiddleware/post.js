import { Client } from '@notionhq/client';
import url from 'url';
const notion = new Client({auth: process.env.NOTION_TOKEN});

module.exports = (req, res) => {
  req.query = url.parse(req.url, true).query;
  const text = req.query.text;
  
  (async () => {
    const response = await notion.pages.create({
      parent: {
        database_id: process.env.DATABASE_ID,
      },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: text,
              },
            },
          ],
        }
      }
    });
    let myPage = await notion.databases.query({
      database_id: process.env.DATABASE_ID,
    })
    res.end(JSON.stringify(myPage), 'utf8')
  })();
  
};