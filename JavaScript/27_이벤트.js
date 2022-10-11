/* event type
    약 200가지가 있다. 걍 안적겠다. 조심할 몇개만 적겠다.
    - mouseenter 는 버블링되지 않는다.
        - mouseover 는 버블링된다.
    - mouseleave 는 버블링되지 않는다.
        - mouseout 은 버블링된다.
    
    - keydown
        - 문자, 숫자, 특수문자, enter 는 연속적으로 발생한다.
        - 그 외에는 1번만 발생한다.
    - keypress는 문자키를 눌렀을 때 연속적으로 발생한다.
        - 문자, 숫자, 특수문자, enter 외에는 발생하지 않는다.
        - deprecated 되었으므로 사용하지 마라.
    - keyup : 한번만 발생

    - focus : 버블링되지 않는다.
        - focusin : 버블링된다.
    - blur : 포커스를 잃었을 때. 버블링되지 않는다.
        - focusout : 버블링된다.

    submit, reset : form관련. reset은 최근 사용하지 않는다.

    



*/
