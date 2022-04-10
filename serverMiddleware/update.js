const { Client } = require("@notionhq/client");
const notion = new Client({auth: process.env.NOTION_TOKEN});

module.exports = (req, res) => {
  
  const url = require('url')
  req.query = url.parse(req.url, true).query
  
  const pageId = req.query.pageId;
  const text = req.query.text;

  (async () => {
    const response = await notion.pages.update({
      page_id: pageId,
      properties: {
        Name: {
          title: [
            {
              text: {
                content: text
              }
            }
          ]
        },
      }
    });
    console.log(response);
  })();
  
};