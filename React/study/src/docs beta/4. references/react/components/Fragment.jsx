/* Fragment 는 재랜더링에 영향을 주지 않는다.
    key 사용 시 <> 대신 <Fragment> 를 사용해야 한다.
*/

// text 요소들을 묶을 때도 사용할 수 있다.
<>
  From
  <DatePicker date={start} />
  to
  <DatePicker date={end} />
</>;
