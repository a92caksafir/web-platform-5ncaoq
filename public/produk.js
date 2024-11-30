function generateTableProduk(db) {
    text = "<table class='table table-bordered table-striped'>";
    text += "<tr><th>Nama</th><th>Stok</th><th>Harga</th><th>Update</th></tr></thead>";
    text += "<tbody id='myTable'>";
    for (x in db) {
        text += "<tr>";
        if (db[x].update == mdToday || db[x].transaksi == mdToday) text += "<td style='color:blue' onclick=tableProdukOnClick('" + db[x].id + "')>" + db[x].nama + "</td>";
        else text += "<td onclick=tableProdukOnClick('" + db[x].id + "')>" + db[x].nama + "</td>";
        text += "<td onclick=tableProdukOnClick('" + db[x].id + "')>" + db[x].stok + "</td>";
        text += "<td onclick=tableProdukOnClick('" + db[x].id + "')>" + db[x].harga + "</td>";
        text += "<td onclick=tableProdukOnClick('" + db[x].id + "')>" + db[x].update + "</td>";
        text += "</tr>";
    }
    text += "</tbody>"
    text += "</table>"
    meTableProduk.innerHTML = text;
}

function tableProdukPOnClick(lid) {
    meFormSearch.style.display = "none";
    meFormTransaksi.style.display = "none";

    meFormEdit.style.display = "block";

    meBtnTambah.disabled = false;
    meBtnUbah.disabled = true;
    meBtnBatal.disabled = true;

    meHiddenId.value = "";
    meInputNama.value = "";
    meInputLokasi.value = "";
    meInputHarga.value = "";
    meInputJumlah.value = "0";
    meInputTotal.value = "";

    for (var i in mProdukDb) {
        if (mProdukDb[i]["id"] == lid) {
            meHiddenId.value = mProdukDb[i]["id"];
            meInputNama.value = mProdukDb[i]["nama"];
            meInputLokasi.value = mProdukDb[i]["lokasi"];
            meInputHarga.value = mProdukDb[i]["harga"];
            mBeli = mProdukDb[i]["beli"];
            mHarga = mProdukDb[i]["harga"];
            mHet = mProdukDb[i]["het"];
            mStok = mProdukDb[i]["stok"];
            mUpdatestok = mProdukDb[i]["updatestok"];
            mUpdate = mProdukDb[i]["update"];
            mLokasi = mProdukDb[i]["lokasi"];
            if (mUpdate == mdToday || mProdukDb[i]["transaksi"] == mdToday) meInputNama.style.color = 'blue';
            else meInputNama.style.backgroundColor = meInputHarga.style.backgroundColor;
        }
    }
}

function produkOnClick() {
    if (meFormSearch.style.display === "none") {
        meFormSearch.style.display = "block";
        meFormEdit.style.display = "none";
        meFormTransaksi.style.display = "none";
    } else {
        meFormSearch.style.display = "none";
    }
}

function btnSimpanpOnClick() {
    let id = meHiddenId.value;
    let updatestok = mdToday;
    let update = mdToday;
    let refdbproduk = firebase.database().ref('/produk');
    if (id.length > 0) {
        // update
        if (meInputBelip.value == mBeli && meInputHarga.value == mHarga && meInputHet.value == mHet) {
            update = meInputUpdate.value;
        } else {
            // update riwayat
            if (typeof mBeli === "undefined") mBeli = 0;
            if (typeof mHarga === "undefined") mHarga = 0;
            if (typeof mHet === "undefined") mHet = 0;
            let refdbupdate = firebase.database().ref('/update/' + id);
            let updateday = mdyyyy + mdmm + mddd;
            refdbupdate.update({
                [updateday]: {
                    updateday: updateday,
                    beli: mBeli,
                    harga: mHarga,
                    het: mHet,
                    update: mdToday,
                    user: firebase.auth().currentUser.email
                }
            });
        }
        if (meInputStok.value == mStok) {
            updatestok = meInputUpdatestok.value;
        }
        // update data
        refdbproduk.update({
            [id + "/nama"]: meInputNama.value.toUpperCase()
            , [id + "/stok"]: meInputStok.value
            , [id + "/updatestok"]: updatestok
            , [id + "/beli"]: meInputBeli.value
            , [id + "/harga"]: meInputHarga.value
            , [id + "/het"]: meInputHet.value
            , [id + "/update"]: update
            , [id + "/lokasi"]: meInputLokasi.value
            , [id + "/user"]: firebase.auth().currentUser.email
        });
    } else {
        // tambah
        let id = meInputNama.value.split(' ').join('').toLowerCase();
        refdbproduk.update({
            [id]: {
                id: id,
                nama: meInputNama.value.toUpperCase(),
                stok: meInputStok.value,
                updatestok: mdToday,
                beli: meInputBeli.value,
                harga: meInputHarga.value,
                het: meInputHet.value,
                update: mdToday,
                lokasi: meInputLokasi.value,
                user: firebase.auth().currentUser.email
            }
        });
    }
    meFormSearch.style.display = "block";
    meFormEdit.style.display = "none";
    meTableRiwayatp.style.display = "none";
}

function btnHapusOnClick() {
    if (confirm("Hapus " + document.getElementById("nama").value + " ?")) {
        let id = document.getElementById("id").value;
        let refdbproduk = firebase.database().ref('/produk');
        refdbproduk.child(id).remove();

        if (confirm("Hapus riwayat harga ?")) {
            let lRefDbUpdate = firebase.database().ref('/update/');
            lRefDbUpdate.child(id).remove();
        }

        document.getElementById("formSearch").style.display = "block";
        document.getElementById("formEdit").style.display = "none";
    }
}

function btnRiwayatOnClick() {
    firebase.database().ref('/update/' + txtId.value).once('value', (snapshot) => {
        $riwayat = snapshot.val();
        $riwayatarr = Object.entries($riwayat);
        $riwayatarrReversed = $riwayatarr.reverse();
        let text = "";
        text += "<tr><th>Expired</th><th>Beli</th><th>Jual</th><th>Het</th><th>Del</th></tr></thead>";
        text += "<tbody id='mytableRiwayat'>";
        $riwayatarrReversed.forEach(function (arrayItem) {
            text += "<tr>";
            text += "<td>" + arrayItem[1].update + "</td>";
            text += "<td>" + arrayItem[1].beli + "</td>";
            text += "<td>" + arrayItem[1].harga + "</td>";
            text += "<td>" + arrayItem[1].het + "</td>";
            text += "<td><button type='button' class='btn btn-default' onclick='btnHapusRiwayatOnClick(this," + arrayItem[1].updateday + ")' value='Delete'><span class='glyphicon glyphicon-trash'></span></button></td>";
            text += "</tr>";
        });
        text += "</tbody>";
        document.getElementById("tableRiwayat").style.display = "block";
        document.getElementById("tableRiwayat").innerHTML = text;
    });
}

function btnHapusRiwayatOnClick(lBtn, lUpdateDay) {
    let lRowIndex = lBtn.parentNode.parentNode.rowIndex;
    let lTableRiwayat = document.getElementById("tableRiwayat");
    let lUpdate = lTableRiwayat.rows[lRowIndex].cells[0].innerHTML;
    // confirm(r);
    if (confirm("Hapus riwayat tgl " + lUpdate + " ?")) {
        let lRefDbUpdate = firebase.database().ref('/update/' + txtId.value);
        lRefDbUpdate.child(lUpdateDay).remove();
        btnRiwayatOnClick();
    }
}

function btnTambahpOnClick() {
    meHiddenId.value = "";
    meInputNama.value = meInputSearch.value;
    meInputStok.value = "";
    meInputUpdatestokp.value = "";
    meInputBeli.value = "";
    meInputHarga.value = "";
    meInputHet.value = "";
    meInputUpdate.value = "";
    meInputLokasi.value = "";
    meFormSearch.style.display = "none";
    meFormEdit.style.display = "block";
    meBtnHapus.disabled = true;
    meBtnRiwayat.disabled = true;
    meBtnKopi.disabled = true;
}

function initProduk() {
    meFormSearch.style.display = "block";
}