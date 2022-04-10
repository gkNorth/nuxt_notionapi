<template>
  <ul class="list-group w-50 m-auto p-3">
    <li v-for="item in results"
        :key="item.id"
        :id="item.id"
        class="list-group-item d-flex align-items-center justify-content-between">
      <p contenteditable class="mb-0">{{item.properties.Name.title[0].text.content}}</p>
      <button @click="update" class="btn btn-info flex-shrink-0">更新</button>
    </li>
  </ul>
</template>

<script>
const { Client } = require("@notionhq/client");
const notion = new Client({auth: process.env.NOTION_TOKEN});

export default {
  async asyncData() {
    const myPage = await notion.databases.query({
      database_id: process.env.DATABASE_ID,
    })
    return myPage
  },
  methods: {
    update(e) {
      const li = e.target.parentNode;
      const pageId = li.id;
      const text = li.querySelector('p').innerText;

      this.$axios.get(`${location.origin}/server-middleware-update?pageId=${pageId}&text=${text}`);
    }
  }
}
</script>