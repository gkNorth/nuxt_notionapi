<template>
  <div>
    <ul class="list-group w-50 m-auto p-3">
      <li v-for="item in results"
          :key="item.id"
          :id="item.id"
          class="list-group-item d-flex align-items-center justify-content-between">
        <p contenteditable class="mb-0 d-block w-100">{{item.properties.Name.title[0].text.content}}</p>
        <button @click="updateItem" class="btn btn-info flex-shrink-0 ml-auto mr-1">更新</button>
        <button @click="deleteItem" class="btn btn-link text-secondary">x</button>
      </li>
      <li class="list-group-item d-flex align-items-center justify-content-between">
        <p contenteditable class="mb-0 d-block w-100"></p>
        <button @click="postItem" class="btn btn-primary">+</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { Client } from '@notionhq/client';
const notion = new Client({auth: process.env.NOTION_TOKEN});

export default {
  async asyncData() {
    const myPage = await notion.databases.query({
      database_id: process.env.DATABASE_ID,
    })
    return myPage
  },
  methods: {
    postItem(e) {
      const li = e.target.parentNode;
      const text = li.querySelector('p').innerText;
      
      this.$axios.post(`${location.origin}/server-middleware-post?text=${text}`)
        .then(res=>{
          this.results = res.data.results;
          li.querySelector('p').innerText = '';
        });
    },
    updateItem(e) {
      const li = e.target.parentNode;
      const pageId = li.id;
      const text = li.querySelector('p').innerText;

      this.$axios.post(`${location.origin}/server-middleware-update?pageId=${pageId}&text=${text}`);
    },
    deleteItem(e) {
      const li = e.target.parentNode;
      const pageId = li.id;

      this.$axios.delete(`${location.origin}/server-middleware-delete?pageId=${pageId}`)
        .then(res => this.results = res.data.results);
    }
  }
}
</script>