const express = require("express");
const router = express.Router();
const modelKategori = require("../model/model_kategori.js");

router.get("/", async function (req, res, next) {
  try {
    let rows = await modelKategori.getAll();
    res.render("kategori/index", {
      data: rows,
    });
  } catch (error) {
    req.flash("error", error.message || "Terjadi kesalahan pada server");
    res.redirect("/kategori");
  }
});

router.get("/create", function (req, res, next) {
  res.render("kategori/create", {
    nama_kategori: "",
  });
});

router.post("/store", async function (req, res, next) {
  try {
    let { nama_kategori } = req.body;
    let data = {
      nama_kategori: nama_kategori,
    };
    await modelKategori.store(data);
    req.flash("success", "Berhasil menyimpan data");
    res.redirect("/kategori");
  } catch (error) {
    req.flash("error", error.message || "Terjadi kesalahan pada server");
    res.redirect("/kategori");
  }
});

router.get("/edit/:id", async function (req, res, next) {
  try {
    let id = req.params.id;
    let rows = await modelKategori.getById(id);
    res.render("kategori/edit", {
      id: rows[0].id_kategori,
      nama_kategori: rows[0].nama_kategori,
    });
  } catch (error) {
    req.flash("error", error.message || "Terjadi kesalahan pada server");
    res.redirect("/kategori");
  }
});

router.post("/update/:id", async function (req, res, next) {
  try {
    let id = req.params.id;
    let { nama_kategori } = req.body;
    let data = {
      nama_kategori: nama_kategori,
    };
    await modelKategori.update(id, data);
    req.flash("success", "Berhasil memperbarui data");
    res.redirect("/kategori");
  } catch (error) {
    req.flash("error", error.message || "Terjadi kesalahan pada server");
    res.redirect("/kategori");
  }
});

router.get("/delete/:id", async function (req, res) {
  try {
    let id = req.params.id;
    await modelKategori.delete(id);
    req.flash("success", "Berhasil menghapus data");
  } catch (error) {
    req.flash("error", error.message || "Terjadi kesalahan pada server");
  }
  res.redirect("/kategori");
});

module.exports = router;
