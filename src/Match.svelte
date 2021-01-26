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

  const dispatch = createEventDispatcher();

  afterUpdate(() => {
    const userCorrect = coupon.includes(currentResult);
    let information = "";
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
        information = information.concat(
          `${homeTeam} score ${goalsNeededFor1}`
        );
      }
      if (goalsNeededForX === fewestGoalsNeeded && couponHasX) {
        if (information.length > 0) {
          information = information.concat(" or ");
        }
        information = information.concat(
          `${
            homeScore > awayScore ? `${awayTeam}` : `${homeTeam}`
          } score ${goalsNeededForX}`
        );
      }
      if (goalsNeededFor2 === fewestGoalsNeeded && couponHas2) {
        if (information.length > 0) {
          information = information.concat(" or ");
        }
        information = information.concat(
          `${awayTeam} score ${goalsNeededFor2}`
        );
      }
    }
    dispatch("editResult", {
      index: index,
      correct: coupon.includes(currentResult),
      information: information,
    });
  });
</script>

<tr>
  <td>
    <p>{index + 1}</p>
  </td>
  <td>
    <p>{homeTeam}</p>
  </td>
  <td>
    <p>{homeScore}</p>
  </td>
  <td>
    <p>{awayScore}</p>
  </td>
  <td>
    <p>{awayTeam}</p>
  </td>
  <td class="tip">
    <p>{currentResult}</p>
  </td>
  <td class="tip" class:correct={coupon.includes(currentResult)}>
    <p>
      {couponHas1 ? "1" : ""}
      {couponHasX ? "X" : ""}
      {couponHas2 ? "2" : ""}
    </p>
  </td>
</tr>

<style>
  p {
    font-size: 1em;
    font-weight: 200;
  }

  .tip {
    background-color: #f6f6f6;
  }
  .correct {
    background-color: #00cc00;
  }
</style>
