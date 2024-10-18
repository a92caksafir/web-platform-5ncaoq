document.addEventListener('DOMContentLoaded', function () {
    try {
        let app = firebase.app();
        let features = [
            'auth',
            'database',
        ].filter(feature => typeof app[feature] === 'function');
    } catch (e) {
        console.error(e);
    }
});

function toggleSignIn() {
    if (!firebase.auth().currentUser) {
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/plus.login');
        firebase.auth().signInWithRedirect(provider);
    } else {
        firebase.auth().signOut();
    }
    document.getElementById('btnLogin').disabled = true;
}

function initMyFirebase() {
    firebase.auth().getRedirectResult().then(function (result) {
        if (result.credential) {
            var token = result.credential.accessToken;
        } else {

        }
        var user = result.user;
    }).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        if (errorCode === 'auth/account-exists-with-different-credential') {
            alert('You have already signed up with a different auth provider for that email.');
        } else {
            console.error(error);
        }
    });

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            var displayName = user.displayName;
            document.getElementById('btnLogin').textContent = 'Sign out ' + user.email;
            document.getElementById('containerMain').style.display = "block"

            // changed
            firebase.database().ref('/produk').on('child_changed', (snapshot) => {
                $changedPost = snapshot.val();
                for (let i in mProdukDb) {
                    if (mProdukDb[i]["id"] == $changedPost.id) {
                        mProdukDb[i]["beli"] = $changedPost.beli;
                        mProdukDb[i]["harga"] = $changedPost.harga;
                        mProdukDb[i]["lokasi"] = $changedPost.lokasi;
                        mProdukDb[i]["nama"] = $changedPost.nama;
                        mProdukDb[i]["stok"] = $changedPost.stok;
                        mProdukDb[i]["transaksi"] = $changedPost.transaksi;
                        mProdukDb[i]["update"] = $changedPost.update;
                        mProdukDb[i]["updatestok"] = $changedPost.updatestok;
                    }
                }
                generateTableProduk(mProdukDb);
            });

            // child_added
            firebase.database().ref('/produk').on('child_added', (snapshot) => {
                mProdukDb = Object.assign(mProdukDb, {
                    [snapshot.val().id]: {
                        "beli": snapshot.val().beli,
                        "harga": snapshot.val().harga,
                        "id": snapshot.val().id,
                        "lokasi": snapshot.val().lokasi,
                        "nama": snapshot.val().nama,
                        "stok": snapshot.val().stok,
                        "transaksi": snapshot.val().transaksi,
                        "update": snapshot.val().update,
                        "updatestok": snapshot.val().updatestok
                    }
                });
                generateTableProduk(mProdukDb);
            });

            // child_removed
            firebase.database().ref('/produk').on('child_removed', (snapshot) => {
                for (var i in mProdukDb) {
                    if (mProdukDb[i]["id"] == snapshot.val().id) {
                        delete mProdukDb[i];
                    }
                }
                generateTableProduk(mProdukDb);
            });
        } else {
            // User is signed out.
            document.getElementById('btnLogin').textContent = 'Sign in with Google';
            document.getElementById('containerMain').style.display = "none"
        }
        document.getElementById('btnLogin').disabled = false;
    });

    document.getElementById('btnLogin').addEventListener('click', toggleSignIn, false);
}