<script>
  import db from "../firebase";
  import { afterUpdate } from "svelte";
  import EditMatch from "./EditMatch.svelte";
  import { createEventDispatcher } from "svelte";
  import FaEraser from "svelte-icons/fa/FaEraser.svelte";
  import FaRegCheckCircle from "svelte-icons/fa/FaRegCheckCircle.svelte";

  const dispatch = createEventDispatcher();

  export let matchData;
  export let coupon;
  export let currentTipper;

  let tippers = [];
  const normalGuards = 20;
  let guards = 13;

  afterUpdate(() => {
    guards = coupon.reduce((acc, element) => acc + element.length, 0);
  });

  async function getUsers() {
    db.collection("participants")
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data().names)[0];
        tippers = data;
      });
  }

  function handleUpdateCouponRow(event) {
    const value = event.detail.value;
    const index = event.detail.index;

    if (coupon[index]?.includes(value)) {
      coupon[index] = coupon[index].replace(value, "");
    } else {
      coupon[index] = `${coupon[index]}${value}`;
    }
    db.collection("tips").doc("coupon").set({
      author: currentTipper,
      coupon: coupon,
    });
  }

  function handleUpdatetipper() {
    db.collection("tips").doc("coupon").set({
      author: currentTipper,
      coupon: coupon,
    });
  }

  function handleResetCoupon() {
    const resetCoupon = ["", "", "", "", "", "", "", "", "", "", "", "", ""];
    coupon.forEach((e, index) => (coupon[index] = ""));
    db.collection("tips").doc("coupon").set({
      author: currentTipper,
      coupon: resetCoupon,
    });
  }

  function toggleModifyTip() {
    dispatch("handleUpdateCouponRow");
  }

  getUsers();
</script>

<div class="icon-container">
  {#if guards > 0}
    <div class="icon" on:click={handleResetCoupon}>
      <FaEraser />
    </div>
  {/if}
  <div class="icon" on:click={toggleModifyTip}>
    <FaRegCheckCircle />
  </div>
</div>
<div class="guards-div">
  {#if guards > normalGuards}
    <p>Fler garderingar än vi brukar ha</p>
  {:else if guards < normalGuards}
    <p>Färre garderingar än vi brukar ha</p>
  {/if}
</div>
<table>
  <tr>
    <th>
      <h2 />
    </th>
    <th>
      <h2>Hemma</h2>
    </th>
    <th>
      <h2>Borta</h2>
    </th>
    <th>
      <select
        bind:value={currentTipper}
        on:blur={handleUpdatetipper}
        class="tipper-select"
      >
        {#each tippers as tipper}
          <option value={tipper}>
            {tipper}
          </option>
        {/each}
      </select>
    </th>
  </tr>
  {#each matchData as match, index}
    <EditMatch
      {match}
      couponRow={coupon[index]}
      {index}
      on:updateCouponRow={handleUpdateCouponRow}
    />
  {/each}
</table>

<style>
  .tipper-select {
    margin: auto;
    font-size: 1em;
    font-weight: 100;
    min-width: 125px;
  }
  .guards-div {
    color: #ff3e00;
  }

  .icon {
    width: 24px;
    height: 24px;
    cursor: pointer;
    margin: 12px;
  }

  .icon-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
