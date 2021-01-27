<script>
  import { createEventDispatcher } from "svelte";
  export let match;
  export let index;
  export let couponRow;

  const dispatch = createEventDispatcher();

  const homeTeam = match.participants[0].name;
  const awayTeam = match.participants[1].name;

  function handleEditCoupon(value) {
    dispatch("editCoupon", {
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
      on:click={() => handleEditCoupon("1")}
    >
      <p>1</p>
    </button>
    <button
      class:selected={couponRow?.includes("X")}
      on:click={() => handleEditCoupon("X")}
    >
      <p>X</p>
    </button>
    <button
      class:selected={couponRow?.includes("2")}
      on:click={() => handleEditCoupon("2")}
    >
      <p>2</p>
    </button>
  </td>
</tr>

<style>
  p {
    margin: 0px;
  }
  .tip {
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: #f6f6f6;
  }

  .selected {
    background-color: #00cc00;
  }
</style>
