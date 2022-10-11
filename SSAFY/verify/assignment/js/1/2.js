const nums = [1, 2, 3, 4];
// map : 요소 e를 콜백함수를 통해 다른 값으로 mapping 한다.
// filter : 콜백함수가 true를 반환하는 요소만 필터링한다.
// find : 콜백함수가 true를 반환하는 첫번째 요소를 반환한다.
// every : 모든요소가 콜백함수에서 true를 반환하면 true를 반환한다.
// some : 하나의 요소라도 콜백함수에서 true를 반환하면 true를 반환한다.
// reduce : 요소를 사용자편의로 처리 및 accumulator로 수집한다.
nums.map(e => e * e * e);