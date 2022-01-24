<template>
  <div id="application">
    <aside id="navigation">
      <h1 class="application__title">BotEditor</h1>
      <router-link to="/"><div class="navigation__button">Home</div></router-link>
      <router-link to="/editor"><div class="navigation__button">Editor</div></router-link>
    </aside>
    <main id="main">
      <ul class="app-tools"></ul>
      <router-view/>
    </main>
  </div>
</template>

<style lang="scss">
@import "./index.css";
#application {
  height: auto;
  width: 100%;
  
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;

  display: flex;

  #navigation, #main {
    box-sizing: border-box;
    height: 100vh;
  }
  #navigation {
    width: 10%;

    background-color: #1e1e1e;
  }
  #main {
    width: 85%;
  }
}


.application__title {
  margin: 25px 0 25px 30px;

  color: white;
  font-size: 22px;
  cursor: default;
}
.navigation__button {
  padding: 8px 0 8px 30px;

  color: white;
  font-size: 18px;
  transition: .2s ease;

  &:hover {
    background-color: #3858e9;
  }
}
</style>
