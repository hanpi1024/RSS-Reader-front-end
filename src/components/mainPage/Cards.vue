<template>
    <el-card style="width: 500px;max-height: 380px;border-radius: 20px" shadow="hover" @click="sendCardLink">
      <template #header>{{title}}</template>
      <div class="card-content">
        <img :src="imageSrc" style="width: 280px" alt="error" />
        <div class="text-container">
          <span style=" font-size: 30px; white-space: pre-line ;align-self: flex-start"  class="line-text">{{comments}}</span>
        </div>

      </div>
    </el-card>

</template>

<script setup>

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  comments: {
    type: String,
    required: true,
  },
  imageSrc: {
    type: String,
    required: true,
  },
  cardLink: {
    type: String,
    required: true,
  }
});

//新打开一个页面需要写一个showView出来！！！！
const sendCardLink = () => {
  console.log(props.cardLink)
  fetch('http://localhost:5000/test', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ action: 'cardLink', Link: props.cardLink })
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {

      } else {
      }
    })
};

</script>

<style scoped>.card-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text-container {
  flex: 1;
  padding-right: 10px;
  padding-left: 10px;
}
.line-text {
  background: linear-gradient(to right, #ec695c, #61c454 )no-repeat right bottom;
  background-size: 0 2px;
  transition: background-size 1300ms;
}
.line-text:hover {
  background-position-x: left;
  background-size: 100% 2px;
}
</style>