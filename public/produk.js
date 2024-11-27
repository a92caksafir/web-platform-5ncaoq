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
    let id = meHiddenIdp.value;
    let updatestok = mdToday;
    let update = mdToday;
    let refdbproduk = firebase.database().ref('/produk');
    if (id.length > 0) {
        // update
        if (meInputBelip.value == mBeli && meInputHargap.value == mHarga && meInputHetp.value == mHet) {
            update = meInputUpdatep.value;
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
        if (meInputStokp.value == mStok) {
            updatestok = meInputUpdatestokp.value;
        }
        // update data
        refdbproduk.update({
            [id + "/nama"]: meInputNamap.value.toUpperCase()
            , [id + "/stok"]: meInputStokp.value
            , [id + "/updatestok"]: updatestok
            , [id + "/beli"]: meInputBelip.value
            , [id + "/harga"]: meInputHargap.value
            , [id + "/het"]: meInputHetp.value
            , [id + "/update"]: update
            , [id + "/lokasi"]: meInputLokasip.value
            , [id + "/user"]: firebase.auth().currentUser.email
        });
    } else {
        // tambah
        let id = meInputNamap.value.split(' ').join('').toLowerCase();
        refdbproduk.update({
            [id]: {
                id: id,
                nama: meInputNamap.value.toUpperCase(),
                stok: meInputStokp.value,
                updatestok: mdToday,
                beli: meInputBelip.value,
                harga: meInputHargap.value,
                het: meInputHetp.value,
                update: mdToday,
                lokasi: meInputLokasip.value,
                user: firebase.auth().currentUser.email
            }
        });
    }
    meFormSearch.style.display = "block";
    meFormEdit.style.display = "none";
    meFormEditp.style.display = "none";
    meTableRiwayatp.style.display = "none";
}

function btnTambahpOnClick() {
    meHiddenIdp.value = "";
    meInputNamap.value = meInputSearch.value;
    meInputStokp.value = "";
    meInputUpdatestokp.value = "";
    meInputBelip.value = "";
    meInputHargap.value = "";
    meInputHetp.value = "";
    meInputUpdatep.value = "";
    meInputLokasip.value = "";
    meFormSearch.style.display = "none";
    meFormEditp.style.display = "block";
    meBtnHapusp.disabled = true;
    meBtnRiwayatp.disabled = true;
    meBtnKopip.disabled = true;
}

function btnClearInputSearchOnClick() {
    meInputSearch.value = "";
    meInputSearch.focus();
    var $rows = $('#tableProduk tr');
    $rows.show();
}

function initProduk() {
    meFormSearch.style.display = "block";
}