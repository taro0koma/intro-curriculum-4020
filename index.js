'use strict';

function getA() {
    return new Promise((resolve) => {
        setTimeout(() => { resolve(11); }, 1000);
    });
}

function getB() {
    return new Promise((resolve) => {
        setTimeout(() => { resolve(13); }, 1000);
    });
}

function getC() {
    return new Promise((resolve) => {
        setTimeout(() => { resolve(17); }, 1000);
    });
}

// TODO ここに getA, getB, getC で得られる結果をかけあわせた結果 2431 を標準出力するコードを記述する
// ただし Promise チェイン(then関数の結果に対するthen関数の呼び出し)を一度は用いて実装をすること
getA()
    .then(a => {
        return getB().then(b => {
            return a * b;
        });
    })
    .then(result => {
        getC().then(c => {
            console.log(result * c);
        });
    });

// async/await 構文を使うと、スッキリ書くことができます。
getA().then(async a => {
    const b = await getB();
    const c = await getC();
    console.log(a * b * c);
});

// Promise.all 関数を使うと並列的に書けます。
// 同時処理のため３倍速で実行できます。
Promise.all([getA(), getB(), getC()]).then(results => {
    console.log(results[0] * results[1] * results[2]);
});