function chooseBestSum(t, k, ls) {
  var i, j, sum, bestSum = 0;
  for (i = 0; i < ls.length - k + 1; i++) {
    sum = 0;
    for (j = 0; j < k; j++) {
      sum += ls[i + j];
    }
    if (sum > bestSum && sum <= t) {
      bestSum = sum;
    }
  }
  return bestSum;
}