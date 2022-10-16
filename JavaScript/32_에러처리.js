try {
    // Error 객체에는 message와 stack 프로퍼티가 있다.
    const error = new Error('에러메시지'); // Error 말고도 SyntaxError 등 다양한 Error 생성자를 자동완성 가능하다.
    
    throw error;
    throw 1; // Error 객체가 아니면 wrapping 되겠지?
} catch (e) {
    
} finally {

}
// error 발생하면 call stack 타고 전파되는건 이미 알고있을것이다...