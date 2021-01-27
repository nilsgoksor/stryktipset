<script>
  import { afterUpdate } from "svelte";
  import { createEventDispatcher } from "svelte";

  export let match;
  export let coupon;
  export let index;

  const homeTeam = match.participants[0].name;
  const awayTeam = match.participants[1].name;
  const homeScore = parseInt(match.result[0].home);
  const awayScore = parseInt(match.result[0].away);
  const currentResult =
    homeScore > awayScore ? "1" : homeScore < awayScore ? "2" : "X";
  const couponHas1 = coupon.includes("1");
  const couponHasX = coupon.includes("X");
  const couponHas2 = coupon.includes("2");

  const kickoff = new Date(match.matchStart);
  const matchStarted = kickoff - Date.now() < 0;
  const matchFinished = match.status === "Avslutad";

  const dispatch = createEventDispatcher();

  afterUpdate(() => {
    const userCorrect = coupon.includes(currentResult);
    let requirement = "";
    if (!userCorrect) {
      const goalsNeededFor1 =
        homeScore > awayScore ? 0 : 1 + awayScore - homeScore;
      const goalsNeededForX = Math.abs(awayScore - homeScore);
      const goalsNeededFor2 =
        awayScore > homeScore ? 0 : 1 + homeScore - awayScore;
      const MAX_VALUE = 9999;
      const fewestGoalsNeeded = Math.min(
        goalsNeededFor1 > 0 && couponHas1 ? goalsNeededFor1 : MAX_VALUE,
        goalsNeededForX > 0 && couponHasX ? goalsNeededForX : MAX_VALUE,
        goalsNeededFor2 > 0 && couponHas2 ? goalsNeededFor2 : MAX_VALUE
      );

      if (goalsNeededFor1 === fewestGoalsNeeded && couponHas1) {
        requirement = requirement.concat(
          `${homeTeam} score ${goalsNeededFor1}`
        );
      }
      if (goalsNeededForX === fewestGoalsNeeded && couponHasX) {
        if (requirement.length > 0) {
          requirement = requirement.concat(" or ");
        }
        requirement = requirement.concat(
          `${
            homeScore > awayScore ? `${awayTeam}` : `${homeTeam}`
          } score ${goalsNeededForX}`
        );
      }
      if (goalsNeededFor2 === fewestGoalsNeeded && couponHas2) {
        if (requirement.length > 0) {
          requirement = requirement.concat(" or ");
        }
        requirement = requirement.concat(
          `${awayTeam} score ${goalsNeededFor2}`
        );
      }
    }
    dispatch("editResult", {
      index: index,
      correct: coupon.includes(currentResult),
      requirement: requirement,
      matchStarted: matchStarted,
      matchFinished: matchFinished,
    });
  });
</script>

<tr>
  <td>
    <p>{index + 1}</p>
  </td>
  <td>
    <p><strong>{homeTeam}</strong></p>
  </td>
  {#if matchStarted || matchFinished}
    <td>
      <p>{homeScore}</p>
    </td>
    <td>
      <p>{awayScore}</p>
    </td>
  {:else}
    <td>{kickoff.getHours()}</td>
    <td>{`${kickoff.getMinutes() < 10 ? "0" : ""}${kickoff.getMinutes()}`}</td>
  {/if}
  <td>
    <p><strong>{awayTeam}</strong></p>
  </td>
  <td
    class="tip"
    class:correct={matchFinished && coupon.includes(currentResult)}
    class:failed={matchFinished && !coupon.includes(currentResult)}
  >
    <p>{currentResult}</p>
  </td>
  <td
    class="tip"
    class:failed={matchFinished && !coupon.includes(currentResult)}
    class:correct={coupon.includes(currentResult)}
  >
    <p>
      {couponHas1 ? "1" : ""}
      {couponHasX ? "X" : ""}
      {couponHas2 ? "2" : ""}
    </p>
  </td>
</tr>

<style>
  .tip {
    background-color: #f6f6f6;
    margin: 0px;
  }
  .correct {
    background-color: #00cc00;
  }
  .failed {
    background-color: #ff3e00;
    color: #fff;
  }
</style>
