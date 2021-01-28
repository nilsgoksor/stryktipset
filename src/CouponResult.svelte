<script>
  import { afterUpdate } from "svelte";

  export let result;

  const BAD_RESULT = 6;
  const GREEAT_RESULT = 10;

  afterUpdate(() => {
    const context = canvas.getContext("2d");
    const colors = [
      "#61E89E",
      "#FF8A80",
      "#F9ED86",
      "#FFB28E",
      "#95FFEF",
      "#D75A6C",
      "#79C4FC",
      "#DBDAD9",
      "#FF405F",
    ];
    const symbols = ["$", "¢", "¥", "€", "￡", "kr"];

    const objPack = [];
    const gravity = 0.01;

    function randomInt(min, max) {
      return Math.floor(min + Math.random() * (max - min + 1));
    }

    function objects(x, y) {
      this.x = x = randomInt(0, 500);
      this.y = y = -50;

      this.w = 50;
      this.h = 50;

      this.a = 1;

      this.fontSize = 42;
      this.fontWeight = "100";
      this.size = 20;

      this.vx = randomInt(-1, 1);
      this.vy = randomInt(-1, 1);
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.symbols = symbols[Math.floor(Math.random() * symbols.length)];
    }

    objects.prototype.draw = function () {
      context.globalAlpha = this.a;
      context.save();
      context.font = "100 " + this.fontSize + "px bt_mono";
      context.fillText(this.symbols, this.x, this.y);
      context.restore();
      context.fillStyle = this.color;
      this.x += this.vx;
      this.y += this.vy;
      this.vy += gravity;
      this.vx *= 0.99;
      this.vy *= 0.99;
      this.size -= 0.05;

      this.a > 0 ? (this.a -= 0.003) : (this.a = 0);
    };

    function update() {
      context.clearRect(0, 0, 500, 250);
      context.globalCompositeOperation = "destination-over";

      if (objPack.length < 250) objPack.push(new objects(500, 250));

      for (var i = 0; i < objPack.length; i++) {
        objPack[i].draw();

        if (objPack[i].size < 0.1) {
          objPack.splice(0, 1);
        }
      }

      requestAnimationFrame(update);
    }

    update();
  });
</script>

<div class="coupon-res">
  <div class="info-wrapper">
    <h1
      class="score"
      class:bad={result.filter((r) => r.correct).length < BAD_RESULT}
      class:great={result.filter((r) => r.correct).length > GREEAT_RESULT}
    >
      {result.filter((r) => r.correct).length}
    </h1>
    <div class="req-events">
      {#if result.filter((r) => r.correct).length >= BAD_RESULT}
        {#each result.filter((r) => r.requirement.length > 0 && !r.matchFinished) as resultData}
          <div>
            <p>{resultData.requirement}</p>
          </div>
        {/each}
      {:else}
        <p>May the force be with you</p>
      {/if}
    </div>
  </div>
  <p>
    {#if result.find((r) => r.matchFinished)}
      {#if result.find((r) => !r.matchFinished)}
        {`Hoppet om tröja  ${
          result.filter((res) => !res.matchFinished || res.correct).length || 0
        } lever!`}
      {:else}
        {`Grattis till tröja ${
          result.filter((res) => !res.matchFinished || res.correct).length || 0
        }!`}
      {/if}
    {/if}
  </p>
  <canvas
    id="canvas"
    class="money-rain"
    class:show={result.filter((r) => r.correct).length > GREEAT_RESULT}
  />
  {#if result.filter((r) => r.correct).length > GREEAT_RESULT}
    <a
      target="_blank"
      rel="noopener noreferrer"
      href="https://spela.svenskaspel.se/stryktipset/1_4674"
      class="great"
    >
      {`Det luktar vinst! Tryck här för att se hur mycket :)`}
    </a>
  {/if}
</div>

<style>
  .coupon-res {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .info-wrapper {
    display: flex;
    justify-content: center;
  }
  .req-events {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin-left: 25px;
  }
  .score {
    color: #00cc00;
    text-transform: uppercase;
    font-size: 10em;
    font-weight: 100;
    margin: 0px;
  }
  .bad {
    color: #ff3e00;
  }
  .great {
    color: #ffd700;
    z-index: 20;
  }
  p {
    margin: 5px;
    text-align: left;
  }
  .money-rain {
    width: 100%;
    max-width: 800px;
    position: absolute;
    top: 0px;
    display: none;
  }
  @media screen and (max-width: 780px) {
    .money-rain {
      max-width: 100%;
      height: 400px;
    }
  }

  .show {
    display: block;
  }
</style>
