import { Client } from '@notionhq/client';
import url from 'url';
const notion = new Client({auth: process.env.NOTION_TOKEN});

module.exports = (req, res) => {
  req.query = url.parse(req.url, true).query;  
  const pageId = req.query.pageId;

  (async () => {
    const response = await notion.pages.update({
      page_id: pageId,
      archived: true
    });
    let myPage = await notion.databases.query({
      database_id: process.env.DATABASE_ID,
    })
    res.end(JSON.stringify(myPage), 'utf8')
  })();
  
};