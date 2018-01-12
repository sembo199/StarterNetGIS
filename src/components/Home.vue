<template lang="html">
  <div class="homepage">
    <div class="jumbo">
      <h1 id="homepage-title">StarterNet</h1>
      <h2 id="homepage-subtitle">Op zoek naar een thuis voor jou.</h2>
      <a class="btn btn-primary tool-btn" @click="toTool">Naar de tool</a>
    </div>
    <div class="info">
      <div class="info-left">
        <i class="fas fa-graduation-cap fa-5x"></i>
        <p class="info-text">Op zoek naar een gemeente met veel hoogopgeleiden? Door middel van deze tool kunt u op zoek naar de wijk die het beste bij u past.</p>
      </div>
      <div class="info-center">
        <i class="fas fa-euro-sign fa-5x"></i>
        <p class="info-text">Heeft u een specifieke koopprijs in gedachten? Zoek dan gemakkelijk welke gemeente u deze koopprijs kan bieden.</p>
      </div>
      <div class="info-right">
        <i class="fas fa-user-secret fa-5x"></i>
        <p class="info-text">Natuurlijk wilt iedereen in een zo veilig mogelijke buurt wonen. Daarom kunt u met behulp van StarterNet op zoek naar de gemeente met de laagste criminaliteitscijfers.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    toTool() {
      this.$router.push('tool')
    }
  }
}
</script>

<style lang="css">
  .homepage {
    margin:0;
    padding:0;
  }

  .jumbo {
    height: 60vh;
    background: linear-gradient(
      rgba(255, 255, 255, 0.7),
      rgba(255, 255, 255, 0.7)
    ),url('../../src/assets/img/homepage-bg-draw.png');
    background-size: 100%;
    background-position: 0 -160px;
  }

  #homepage-title {
    font-size: 90px;
    text-align: left;
    margin-left:20%;
    padding-top:10vh;
    margin-bottom: 10px;
  }

  #homepage-subtitle {
    font-size: 30px;
    text-align: left;
    margin-left:25%;
    color:#777;
  }

  .tool-btn {
    float:right;
    color: #ddd !important;
    background: #31708E;
    border: 0px;
    margin-right: 35%;
    margin-top: 100px;
    width:20vw;
    height: 60px;
    font-size: 30px;
    font-weight: lighter;
  }

  .tool-btn:hover {
    background: #8FC1E3;
    cursor: pointer;
  }

  .info {
    height: 40vh;
    background-color: #31708E;
    padding:0;
    margin:0;
    padding-top:20px;
    color:#ddd;
  }

  .info-left {
    margin-left:15%;
    margin-right:5%;
    width: 20%;
    padding:10px;
    float:left;
  }

  .info-center {
    width: 20%;
    padding:10px;
    margin:0;
    float:left;
  }

  .info-right {
    width: 20%;
    margin-left:5%;
    margin-right:15%;
    padding:10px;
    float:left;
  }

  .info-text {
    text-align: justify;
    margin-top:20px;
  }
</style>
