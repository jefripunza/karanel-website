/**
 *
 * @param {[]} array_awal
 * @param {function(row,resolve)} onPrebuild
 */
function createPromise(array_awal, onPrebuild) {
    return new Promise((onResult, onError) => {
        let array_save = [];
        Promise.all(
            array_awal.map((rows) => {
                let promise = new Promise((resolve, reject) => {
                    // and want to push it to an array
                    onPrebuild(
                        rows,
                        (res) => {
                            resolve(res);
                        },
                        (rej) => {
                            reject(rej);
                        },
                    );
                });
                return promise
                    .then((result) => {
                        array_save.push(result); // ok
                    })
                    .catch((error) => {
                        onError(error);
                    });
            }),
        ).then(() => {
            // result
            onResult(array_save);
        });
    });
}

module.exports = {
    createPromise,
};
