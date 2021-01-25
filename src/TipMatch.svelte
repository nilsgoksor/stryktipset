<script>
  export let match;
  export let index;
  export let couponRow;

  import { createEventDispatcher } from "svelte";
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
    <p>{homeTeam}</p>
  </td>
  <td />
  <td />
  <td>
    <p>{awayTeam}</p>
  </td>
  <td class="tip">
    <button
      class:selected={couponRow?.includes("1")}
      on:click={() => handleEditCoupon("1")}>1</button
    >
    <button
      class:selected={couponRow?.includes("X")}
      on:click={() => handleEditCoupon("X")}>X</button
    >
    <button
      class:selected={couponRow?.includes("2")}
      on:click={() => handleEditCoupon("2")}>2
    </button>
  </td>
</tr>

<style>
  td {
    padding: 0px 10px;
  }

  p {
    font-size: 1em;
    font-weight: 200;
  }

  .tip {
    background-color: #f6f6f6;
  }
  .selected {
    background-color: #00cc00;
  }
</style>
