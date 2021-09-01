<template>
<div>

  <div class="card" :style="{backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.9)),url('https://source.unsplash.com/random')`}">
    <div class="card-box">
    <div class="card-details">
      <h4 class="card-title">החצר של לירוי</h4>
      <h4 class="card-category">אוכל אסיאתי</h4>
      <p class="card-desc">
        אוכל אסיאתי מידו של המאסטר האסייתי לי-רוי סאן
      </p>
    </div>
    <div class="icons-box">
      <div class="icon-box">
        <i class="fas fa-user-tie icon"></i>
        <span class="icon-text">מינ' 10 אנשים</span>
      </div>
      <div class="icon-box">
        <i class="fas fa-shekel-sign icon"></i>
        <span class="icon-text">120 ש"ח לראש</span>
      </div>
    </div>
      <button class="card-btn">לפרטים נוספים</button>
    </div>
  </div>




</div>


</template>

<script>

export default {
  name: "YardCard",
  components: {

  },
  data() {
    return {
    stars: 4
    }
  },
}
</script>

<style scoped>

* {
  margin: 0;
  padding: 0;
}
.card {
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: flex-end;
  align-items: center;
  font-size: 3rem;
  box-shadow: rgba(3, 8, 20, 0.1) 0px 0.15rem 0.5rem, rgba(2, 8, 20, 0.1) 0px 0.075rem 0.175rem;
  width: 100%;
  height: 100%;

  border-radius: 40px;
  transition: all 500ms;
  overflow: hidden;

  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.icons-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 5px;
  align-self: end;
}



.icon {
  font-size: 20px;
  margin-right: 10px;

}

.icon-text {
  font-size: 18px;
  letter-spacing: 1px;
  margin-right: 10PX;
}

.card-details {
  display: flex;
  flex-direction: column;

}

.card-title {
  font-size: 35px;
  letter-spacing: 1px;
  color: #1D1D1D;
}

.card-category {
  font-size: 20px;
  text-align: center;
  color: grey;
}

.card-desc {
  font-size: 16px;
}

.card-box {
  opacity: 0;
  transform: translateY(200px);
  transition: .5s all;
  padding-bottom: 10px;
  overflow: hidden;
}

.card:hover > .card-box {
  opacity: 1;
  transform: translateY(0);
}

.card-btn {
  font-size: 20px;
  background-color: #C10015;
  color: white;
  border: none;
  padding: 10px 12px;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: rgba(3, 8, 20, 0.1) 0 0.15rem 0.5rem, rgba(2, 8, 20, 0.1) 0 0.075rem 0.175rem;

}
</style>
