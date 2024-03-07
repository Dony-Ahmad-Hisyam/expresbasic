const express = require("express");
const router = express.Router();
const ModelKeahlian = require("../model/model_keahlian.js");
const ModelMahasiswa = require("../model/model_mahasiswa.js");

router.get("/", async function (req, res, next) {
  try {
    let rows = await ModelKeahlian.getAll();
    res.render("keahlian/index", {
      data: rows,
    });
  } catch (error) {
    req.flash("error", error.message || "Terjadi kesalahan pada server");
    res.redirect("/keahlian");
  }
});

router.get("/create", async function (req, res, next) {
  try {
    let mahasiswaData = await ModelMahasiswa.getAll();
    res.render("keahlian/create", {
      mahasiswa: mahasiswaData,
    });
  } catch (error) {
    req.flash("error", error.message || "Terjadi kesalahan pada server");
    res.redirect("/keahlian");
  }
});

router.post("/store", async function (req, res, next) {
  try {
    let { nama_keahlian, tingkat_keahlian, id_mahasiswa } = req.body;
    let data = {
      nama_keahlian: nama_keahlian,
      tingkat_keahlian: tingkat_keahlian,
      id_mahasiswa: id_mahasiswa,
    };
    await ModelKeahlian.store(data);
    req.flash("success", "Berhasil menyimpan data");
  } catch (error) {
    req.flash("error", error.message || "Terjadi kesalahan pada server");
  }
  res.redirect("/keahlian");
});

router.get("/edit/:id", async function (req, res, next) {
  try {
    let mahasiswaData = await ModelMahasiswa.getAll();
    let id = req.params.id;
    let rows = await ModelKeahlian.getById(id);
    res.render("keahlian/edit", {
      mahasiswa: mahasiswaData,
      id: rows[0].id_keahlian,
      nama_keahlian: rows[0].nama_keahlian,
      tingkat_keahlian: rows[0].tingkat_keahlian,
      id_mahasiswa: rows[0].id_mahasiswa,
    });
  } catch (error) {
    req.flash("error", error.message || "Terjadi kesalahan pada server");
    res.redirect("/keahlian");
  }
});

router.post("/update/:id", async function (req, res, next) {
  try {
    let id = req.params.id;
    let { nama_keahlian, tingkat_keahlian, id_mahasiswa } = req.body;
    let data = {
      nama_keahlian: nama_keahlian,
      tingkat_keahlian: tingkat_keahlian,
      id_mahasiswa: id_mahasiswa,
    };
    await ModelKeahlian.update(id, data);
    req.flash("success", "Berhasil memperbarui data");
  } catch (error) {
    req.flash("error", error.message || "Terjadi kesalahan pada server");
  }
  res.redirect("/keahlian");
});

router.get("/delete/:id", async function (req, res) {
  try {
    let id = req.params.id;
    await ModelKeahlian.delete(id);
    req.flash("success", "Berhasil menghapus data");
  } catch (error) {
    req.flash("error", error.message || "Terjadi kesalahan pada server");
  }
  res.redirect("/keahlian");
});

module.exports = router;
