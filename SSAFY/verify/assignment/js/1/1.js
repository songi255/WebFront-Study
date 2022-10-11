// 1번
const nums = [1,2,3,4,5,6,7,8]

/* for (const i = 0; i < nums.length; i++) {
  console.log()
}*/
for (let i = 0; i < nums.length; i++) {
    console.log()
  }

// for (const i = 0; i < nums.length; i++) {
//                                     ^
// 반복자 i를 const로 설정해서 변경이 불가능한데 i++로 i를 증가시키려고 하기 때문에 오류가 남.
// let 으로 수정하면 정상동작

// TypeError: Assignment to constant variable.

// 2번
/*for (num in nums) {
  console.log(num, typeof num)
}*/
for (num of nums) {
    console.log(num, typeof num)
}
// in은 원소의 포함여부를 검사하는 연산자이므로, of를 사용해야 정상적으로 요소를 순회함.
// 정정합니다... in은 객체 내부의 프로퍼티를 가져오는 연산자이다... 물론 해당 속성이 없다면
// undefined를 반환할 것이기에 false가 나와 포함여부 검사로도 사용할 수 있겠지만.. 본질은 프로퍼티를 가져온다.

// 0 string
// 1 string
// 2 string
// 3 string
// 4 string
// 5 string
// 6 string
// 7 string
