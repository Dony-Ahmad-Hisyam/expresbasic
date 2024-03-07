const express = require("express");
const router = express.Router();
const ModelMahasiswa = require("../model/model_mahasiswa");

router.get("/", async function (req, res, next) {
  try {
    let rows = await ModelMahasiswa.getAll();
    res.render("mahasiswa/index", {
      data: rows,
    });
  } catch (error) {
    req.flash("error", error.message || "Terjadi kesalahan pada server");
    res.redirect("/mahasiswa");
  }
});

router.get("/create", function (req, res, next) {
  res.render("mahasiswa/create", {
    nrp: "",
    nama_depan: "",
    nama_belakang: "",
    jenis_kelamin: "",
    agama: "",
    umur: "",
    tinggi_badan: "",
    gol_darah: "",
    alamat: "",
    hobi: "",
    email: "",
    no_telpon: "",
  });
});

router.post("/store", async function (req, res, next) {
  try {
    const data = req.body;
    await ModelMahasiswa.store(data);
    req.flash("success", "Berhasil menyimpan data");
    res.redirect("/mahasiswa");
  } catch (error) {
    req.flash("error", error.message || "Terjadi kesalahan pada server");
    res.redirect("/mahasiswa");
  }
});

router.get("/edit/:id", async function (req, res, next) {
  try {
    let id = req.params.id;
    let rows = await ModelMahasiswa.getById(id);
    res.render("mahasiswa/edit", {
      id: rows[0].id_mahasiswa,
      nrp: rows[0].nrp,
      nama_depan: rows[0].nama_depan,
      nama_belakang: rows[0].nama_belakang,
      jenis_kelamin: rows[0].jenis_kelamin,
      agama: rows[0].agama,
      umur: rows[0].umur,
      tinggi_badan: rows[0].tinggi_badan,
      gol_darah: rows[0].gol_darah,
      alamat: rows[0].alamat,
      hobi: rows[0].hobi,
      email: rows[0].email,
      no_telpon: rows[0].no_telpon,
    });
  } catch (error) {
    req.flash("error", error.message || "Terjadi kesalahan pada server");
    res.redirect("/mahasiswa");
  }
});

router.post("/update/:id", async function (req, res, next) {
  try {
    let id = req.params.id;
    let {
      nrp,
      nama_depan,
      nama_belakang,
      jenis_kelamin,
      agama,
      umur,
      tinggi_badan,
      gol_darah,
      alamat,
      hobi,
      email,
      no_telpon,
    } = req.body;
    let mahasiswa = await ModelMahasiswa.getById(id);
    if (!mahasiswa || !mahasiswa[0]) {
      throw new Error("Data mahasiswa tidak ditemukan");
    }
    let dataToUpdate = {};
    if (nrp) dataToUpdate.nrp = nrp;
    if (nama_depan) dataToUpdate.nama_depan = nama_depan;
    if (nama_belakang) dataToUpdate.nama_belakang = nama_belakang;
    if (jenis_kelamin) dataToUpdate.jenis_kelamin = jenis_kelamin;
    if (agama) dataToUpdate.agama = agama;
    if (umur) dataToUpdate.umur = umur;
    if (tinggi_badan) dataToUpdate.tinggi_badan = tinggi_badan;
    if (gol_darah) dataToUpdate.gol_darah = gol_darah;
    if (alamat) dataToUpdate.alamat = alamat;
    if (hobi) dataToUpdate.hobi = hobi;
    if (email) dataToUpdate.email = email;
    if (no_telpon) dataToUpdate.no_telpon = no_telpon;  
    if (Object.keys(dataToUpdate).length > 0) {
      await ModelMahasiswa.update(id, dataToUpdate);
      req.flash("success", "Berhasil memperbarui data");
    } else {
      req.flash("info", "Tidak ada data yang diubah");
    }
  } catch (error) {
    req.flash("error", error.message || "Terjadi kesalahan pada server");
  }
  res.redirect("/mahasiswa");
});

router.get("/delete/:id", async function (req, res) {
  try {
    let id = req.params.id;
    await ModelMahasiswa.delete(id);
    req.flash("success", "Berhasil menghapus data");
  } catch (error) {
    req.flash("error", error.message || "Terjadi kesalahan pada server");
  }
  res.redirect("/mahasiswa");
});

module.exports = router;
