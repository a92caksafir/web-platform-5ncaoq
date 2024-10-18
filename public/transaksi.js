function generateTableTransaksi(db) {
    let lGrandTotal = 0;

    text = "<table class='table table-bordered table-striped'>";
    text += "<tr><th>Nama</th><th>Harga</th><th>Jml</th><th>Total</th></tr></thead>";
    text += "<tbody id='myTable'>";
    for (x in db) {
        text += "<tr>";
        if (db[x].update == mdToday || db[x].transaksi == mdToday) text += "<td style='color:blue' onclick=tableTransaksiOnClick('" + db[x].id + "')>" + db[x].nama + "</td>";
        else text += "<td onclick=tableTransaksiOnClick('" + db[x].id + "')>" + db[x].update + "</td>";
        text += "<td style='text-align: right' onclick=tableTransaksiOnClick('" + db[x].id + "')>" + db[x].harga + "</td>";
        text += "<td style='text-align: right' onclick=tableTransaksiOnClick('" + db[x].id + "')>" + db[x].jumlah + "</td>";
        text += "<td style='text-align: right' onclick=tableTransaksiOnClick('" + db[x].id + "')>" + db[x].total + "</td>";
        text += "</tr>";
        let lTotal = db[x].total.split('.').join('');
        lGrandTotal = lGrandTotal + parseInt(lTotal);
    }
    text += "<tr><td colspan='2'>Grand Total</td><td colspan='2'><input  class=form-control style='text-align: right' id=inputGrandTotal readonly='true'></td></tr>";
    text += "<tr><td colspan='2'>Bayar</td><td colspan='2'><input class=form-control style='text-align: right' id=inputBayar></td></tr>";
    text += "<tr><td colspan='2' onclick='kembalianOnClick()'>Kembalian</td><td colspan='2'><input class=form-control style='text-align: right' id=inputKembalian readonly='true' onclick='kembalianOnClick()'></td></tr>";
    text += "</tbody>"
    text += "</table>"
    meTableTransaksi.innerHTML = text;

    meInputGrandTotal = document.getElementById("inputGrandTotal");
    meInputBayar = document.getElementById("inputBayar");
    meInputKembalian = document.getElementById("inputKembalian");

    meInputBayar.addEventListener('keyup', function (e) {
        meInputBayar.value = formatRupiah(this.value);
    });

    meInputGrandTotal.value = formatRupiah(lGrandTotal.toString());
}

function switchTransaksi() {
    switch (moTransaksiLubang) {
        case 5:
            moTransaksi5 = moTransaksi;
            break;
        case 4:
            moTransaksi4 = moTransaksi;
            break;
        case 3:
            moTransaksi3 = moTransaksi;
            break;
        case 2:
            moTransaksi2 = moTransaksi;
            break;
        case 1:
            moTransaksi1 = moTransaksi;
            break;
    }
}

function tableTransaksiOnClick(lid) {
    meFormEdit.style.display = "block";
    meFormSearch.style.display = "none";
    meFormTransaksi.style.display = "none";
    meBtnTambah.disabled = true;
    meBtnUbah.disabled = false;
    meBtnBatal.disabled = false;
    meHiddenId.value = "";
    meInputNama.value = "";
    meInputLokasi.value = "";
    meInputHarga.value = "";
    meInputJumlah.value = "";
    meInputTotal.value = "";
    for (var i in moTransaksi) {
        if (moTransaksi[i]["id"] == lid) {
            meHiddenId.value = moTransaksi[i]["id"];
            meInputNama.value = moTransaksi[i]["nama"];
            meInputLokasi.value = moTransaksi[i]["lokasi"];
            meInputHarga.value = moTransaksi[i]["harga"];
            meInputJumlah.value = moTransaksi[i]["jumlah"];
            meInputTotal.value = moTransaksi[i]["total"];
        }
    }
}

function transaksiOnClick() {
    if (meFormTransaksi.style.display === "none") {
        meFormSearch.style.display = "none";
        meFormEdit.style.display = "none";
        meFormEditp.style.display = "none";
        meFormTransaksi.style.display = "block";
    }
}

function hitungHarga() {
    let lHarga = meInputHarga.value.split('.').join('');
    let lTotal = lHarga * meInputJumlah.value;
    meInputTotal.value = formatRupiah(lTotal.toString());
}

function radiol5OnClick() {
    if (chkPindah.checked) {
        alert("pindah dari lubang " + moTransaksiLubang + " ke 5 ?");
        meChkPindah.checked = false;
        // -----
        moTransaksiNow = moTransaksi;
        moTransaksi = moTransaksi5;
        switchTransaksi();
        moTransaksi = moTransaksiNow;
        // -----
    } else {
        switchTransaksi();
        moTransaksi = moTransaksi5;
        generateTableTransaksi(moTransaksi);
    }
    moTransaksiLubang = 5;
}

function radiol4OnClick() {
    if (chkPindah.checked) {
        alert("pindah dari lubang " + moTransaksiLubang + " ke 4 ?");
        meChkPindah.checked = false;
        // -----
        moTransaksiNow = moTransaksi;
        moTransaksi = moTransaksi4;
        switchTransaksi();
        moTransaksi = moTransaksiNow;
        // -----
    } else {
        switchTransaksi();
        moTransaksi = moTransaksi4;
        generateTableTransaksi(moTransaksi);
    }
    moTransaksiLubang = 4;
}

function radiol3OnClick() {
    if (chkPindah.checked) {
        alert("pindah dari lubang " + moTransaksiLubang + " ke 3 ?");
        meChkPindah.checked = false;
        // -----
        moTransaksiNow = moTransaksi;
        moTransaksi = moTransaksi3;
        switchTransaksi();
        moTransaksi = moTransaksiNow;
        // -----
    } else {
        switchTransaksi();
        moTransaksi = moTransaksi3;
        generateTableTransaksi(moTransaksi);
    }
    moTransaksiLubang = 3;
}

function radiol2OnClick() {
    if (chkPindah.checked) {
        alert("pindah dari lubang " + moTransaksiLubang + " ke 2 ?");
        meChkPindah.checked = false;
        // -----
        moTransaksiNow = moTransaksi;
        moTransaksi = moTransaksi2;
        switchTransaksi();
        moTransaksi = moTransaksiNow;
        // -----
    } else {
        switchTransaksi();
        moTransaksi = moTransaksi2;
        generateTableTransaksi(moTransaksi);
    }
    moTransaksiLubang = 2;
}

function radiol1OnClick() {
    if (chkPindah.checked) {
        alert("pindah dari lubang " + moTransaksiLubang + " ke 1 ?");
        meChkPindah.checked = false;
        // -----
        moTransaksiNow = moTransaksi;
        moTransaksi = moTransaksi1;
        switchTransaksi();
        moTransaksi = moTransaksiNow;
        // -----
    } else {
        switchTransaksi();
        moTransaksi = moTransaksi1;
        generateTableTransaksi(moTransaksi);
    }
    moTransaksiLubang = 1;
}

function btnKembaliOnClick() {
    meHiddenId.value = "";
    meInputNama.value = "";
    meInputLokasi.value = "";
    meInputHarga.value = "";
    meInputJumlah.value = "";
    meInputTotal.value = "";
    meFormEdit.style.display = "none";
    meFormEditp.style.display = "none";
    if (meFormSearch.style.display === "none") {
        meFormSearch.style.display = "block";
    } else {
        meFormTransaksi.style.display = "block";
    }
}

function kembalianOnClick() {
    let lGrandTotal = meInputGrandTotal.value.split('.').join('');
    let lBayar = meInputBayar.value.split('.').join('');
    meInputKembalian.value = formatRupiah((lBayar - lGrandTotal).toString());
}

function btnCancelTransOnClick() {
    if (confirm("Batalkan transaksi ?")) {
        moTransaksi = {};
        generateTableTransaksi(moTransaksi);
    }
}

function btnNewOnClick() {
    if (confirm("Transaksi selesai ?")) {
        let refdbproduk = firebase.database().ref('/produk');
        for (x in moTransaksi) {
            refdbproduk.update({
                [moTransaksi[x].id + "/transaksi"]: mdToday
            });
        }
        moTransaksi = {};
        generateTableTransaksi(moTransaksi);
    }
}

function btnTambahOnClick() {
    moTransaksi = Object.assign(moTransaksi, {
        [meHiddenId.value]: {
            "id": meHiddenId.value,
            "nama": meInputNama.value,
            "lokasi": meInputLokasi.value,
            "harga": meInputHarga.value,
            "jumlah": meInputJumlah.value,
            "total": meInputTotal.value,
        }
    });
    generateTableTransaksi(moTransaksi);
    meFormEdit.style.display = "none";
    meFormSearch.style.display = "none";
    meFormTransaksi.style.display = "block";
}

function btnUbahOnClick() {
    btnTambahOnClick();
}

function btnBatalOnClick() {
    delete moTransaksi[meHiddenId.value];
    generateTableTransaksi(moTransaksi);
    meFormEdit.style.display = "none";
    meFormSearch.style.display = "none";
    meFormTransaksi.style.display = "block";
}

function btnSimpanOnClick() {
    let refdbproduk = firebase.database().ref('/produk');
    if (meHiddenId.value.length > 0) {
        if (meInputHarga.value.length > 0) {
            if (meInputHarga.value != mHarga) {
                // update riwayat
                if (typeof mBeli === "undefined") mBeli = 0;
                if (typeof mHarga === "undefined") mHarga = 0;
                if (typeof mHet === "undefined") mHet = 0;
                let refdbupdate = firebase.database().ref('/update/' + meHiddenId.value);
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
            // update harga
            refdbproduk.update({
                [meHiddenId.value + "/harga"]: meInputHarga.value
                , [meHiddenId.value + "/nama"]: meInputNama.value
                , [meHiddenId.value + "/lokasi"]: meInputLokasi.value
                , [meHiddenId.value + "/update"]: mdToday
                , [meHiddenId.value + "/user"]: firebase.auth().currentUser.email
            });
        }
        if (meInputLokasi.value.length > 0 && meInputLokasi.value != mLokasi) {
            // update lokasi
            refdbproduk.update({
                [meHiddenId.value + "/lokasi"]: meInputLokasi.value
                , [meHiddenId.value + "/update"]: mdToday
                , [meHiddenId.value + "/user"]: firebase.auth().currentUser.email
            });
        }
    }
    alert("perubahan telah tersimpan");
}

function btnIncrementClick() {
    let liNum = parseInt(meInputJumlah.value);
    liNum = isNaN(liNum) ? 0 : liNum;
    liNum++;
    meInputJumlah.value = liNum;
    hitungHarga();
}

function btnDecrementClick() {
    let liNum = parseInt(meInputJumlah.value);
    liNum = isNaN(liNum) ? 0 : liNum;
    liNum--;
    meInputJumlah.value = liNum;
    hitungHarga();
}

function noProdukOnClick() {
    if (meDivKode.style.display === "none") {
        meDivKode.style.display = "block";
    } else {
        meDivKode.style.display = "none";
    }
}

function btnKopiOnClick() {
    meHiddenIdp.value = "";
    meInputNamap.value = meInputNama.value
    meInputStokp.value = "";
    meInputUpdatestokp.value = "";
    meInputBelip.value = "";
    meInputHargap.value = meInputHarga.value;
    meInputHetp.value = "";
    meInputUpdatep.value = "";
    meInputLokasip.value = meInputLokasi.value;
    meFormEdit.style.display = "none";
    meFormEditp.style.display = "block";
    meBtnHapusp.disabled = true;
    meBtnRiwayatp.disabled = true;
    meBtnKopip.disabled = true;
} 