<script>
  import { createEventDispatcher } from "svelte";
  export let match;
  export let index;
  export let couponRow;

  const dispatch = createEventDispatcher();

  const homeTeam = match.home_long;
  const awayTeam = match.away_long;

  function handleUpdateCouponRow(value) {
    dispatch("updateCouponRow", {
      index: index,
      value: value,
    });
  }
</script>

<tr>
  <td>
    <p>{index + 1}</p>
  </td>
  <td>
    <p><strong>{homeTeam}</strong></p>
  </td>
  <td>
    <p><strong>{awayTeam}</strong></p>
  </td>
  <td class="tip">
    <button
      class:selected={couponRow?.includes("1")}
      on:click={() => handleUpdateCouponRow("1")}
    >
      <p>1</p>
    </button>
    <button
      class:selected={couponRow?.includes("X")}
      on:click={() => handleUpdateCouponRow("X")}
    >
      <p>X</p>
    </button>
    <button
      class:selected={couponRow?.includes("2")}
      on:click={() => handleUpdateCouponRow("2")}
    >
      <p>2</p>
    </button>
  </td>
</tr>

<style>
  button {
    margin: 0px 10px;
    padding-top: 0px;
    padding-bottom: 0px;
    cursor: pointer;
  }
  .tip {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .selected {
    background-color: #00cc00;
  }

  p {
    margin: 0px;
  }
</style>
