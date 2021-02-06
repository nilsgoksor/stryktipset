<script>
  import { afterUpdate } from "svelte";
  import { createEventDispatcher } from "svelte";

  export let match;
  export let coupon;
  export let index;

  const homeTeam = match.home_long;
  const awayTeam = match.away_long;
  const homeScore = match.home_score;
  const awayScore = match.away_score;
  const currentResult =
    homeScore > awayScore ? "1" : homeScore < awayScore ? "2" : "X";
  const couponHas1 = coupon?.includes("1");
  const couponHasX = coupon?.includes("X");
  const couponHas2 = coupon?.includes("2");

  const kickoff = match.event_start.format.replace("Idag ", "");
  const matchStarted = match.match_started;
  const matchFinished = match.match_finished;

  const dispatch = createEventDispatcher();

  afterUpdate(() => {
    const userCorrect = coupon?.includes(currentResult);
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
      correct: coupon?.includes(currentResult),
      requirement: requirement,
      matchStarted: matchStarted,
      matchFinished: matchFinished,
      data: coupon,
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
  {#if matchStarted}
    <td>
      <p>{`${homeScore} - ${awayScore}${matchFinished ? " (FT)" : ""}`}</p>
    </td>
  {:else}
    <td>{kickoff}</td>
  {/if}
  <td>
    <p><strong>{awayTeam}</strong></p>
  </td>
  <td class="tip">
    <p>{currentResult}</p>
  </td>
  <td
    class="tip"
    class:failed={matchFinished && !coupon?.includes(currentResult)}
    class:correct={coupon?.includes(currentResult)}
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
  }
  .correct {
    background-color: #00cc00;
  }
  .failed {
    background-color: #ff3e00;
    color: #fff;
  }

  p {
    margin: 0px;
  }
</style>
