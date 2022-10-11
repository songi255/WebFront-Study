for (let i = 0; i < 5; i++){
    const starCnt = i * 2 + 1;
    const blankCnt = 4 - i;
    let str = "";
    for (let j = 0; j < blankCnt; j++) str += ' ';
    for (let j = 0; j < starCnt; j++) str += '*';
    console.log(str);
}