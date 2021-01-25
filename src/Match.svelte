<script>
  export let match;
  export let coupon;
  export let index;

  const homeTeam = match.participants[0].name;
  const awayTeam = match.participants[1].name;
  const homeScore = match.result[0].home;
  const awayScore = match.result[0].away;
  const result =
    homeScore > awayScore ? "1" : homeScore < awayScore ? "2" : "X";

  const homeWin = coupon.includes("1");
  const draw = coupon.includes("X");
  const awayWin = coupon.includes("2");
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
    <p>{result}</p>
  </td>
  <td class="tip" class:correct={coupon.includes(result)}>
    <p>
      {homeWin ? "1" : ""}
      {draw ? "X" : ""}
      {awayWin ? "2" : ""}
    </p>
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
  .correct {
    background-color: #00cc00;
  }
</style>
