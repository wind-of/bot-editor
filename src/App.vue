<template>
  <div id="application">
    <aside id="navigation">
      <router-link to="/"><h1 class="application__title">BotEditor</h1></router-link>
      <router-link to="/editor"><div class="navigation__button"><img src="./assets/sidebar/editor-icon.svg" alt="">Editor</div></router-link>
    </aside>
    <main id="main">
      <router-view/>
    </main>
  </div>
</template>


<script>
export default {
  name: "App"
}
</script>

<style lang="scss">
@import "./index.css";

#application {
  height: 100%;
  width: 100%;
  
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
  display: flex;
  user-select: none;

  #navigation, #main {
    box-sizing: border-box;
    height: 100vh;
  }
  #navigation {
    min-width: 10vw;
    background-color: #1e1e1e;
  }
  #main {
    width: 90vw;
  }
}

.application__title {
  display: inline-block;
  margin: 25px 0 25px 30px;

  color: white;
  font-size: 22px;
  cursor: pointer;
  transition: .2s ease;

  &:hover {
    color: #e1e1e1;
  }
}
.navigation__button {
  padding: 8px 0 8px 30px;

  color: white;
  font-size: 18px;
  transition: .2s ease;

  display: flex;
  align-items: center;

  &:hover {
    background-color: #3858e9;
  }

  img {
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }
}
</style>
