<template>
  <div class="get-started" @click="$router.push('/add')">

    <h2>Welcome to ERC20 Watcher</h2>

    <p class="plus">click the <span>+</span> button</p>
    <p>to start watching accounts for ERC20 tokens transactions</p>

  </div>
</template>

<style lang="scss" scoped>
.get-started {
  text-align: center;
  border: 2px dashed #ffffffc7;
  border-radius: 6px;
  margin: 0 10px;
  padding: 20px;
  opacity: .5;
  cursor: pointer;
  &:hover {
    opacity: .8;
  }
}
h2 {
  font-size: 20px;
}
p {
  &.plus {
    span {
      display: inline-block;
      width: 18px;
      height: 18px;
      line-height: 18px;
      text-decoration: none;
      margin-left: 5px;
      margin-right: 5px;
      font-size: 18px;
      color: #2c3e50;
      border-radius: 2px;
      background: #ffffffc7;
    }

  }
}
</style>

