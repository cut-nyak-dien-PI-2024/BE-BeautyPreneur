const MakeupBudget = require("../models/MakeupBudget");
const MakeupPackage = require("../models/MakeupPackage");

module.exports = {
  sendMakeupPackage: async (req, res) => {
    try {
      const allData = req.body;

      const result = await MakeupPackage.insertMany(allData);

      return res.status(201).json({
        message: "data paket makeup berhasil ditambahkan",
        data: result,
      });
    } catch (err) {
      return res.status(500).json({ err });
    }
  },
  getAllDataFromMakeupPackage: async (req, res) => {
    try {
      const allDataProduct = req.body.data;

      const getAllData = await Promise.all(
        allDataProduct.map(async (item) => {
          const data = await MakeupBudget.findById(item).exec();
          return data;
        })
      );

      return res.status(200).json(getAllData);
    } catch (err) {
      return res.status(500).json({ err });
    }
  },
  getAllMakeupPackage: async (req, res) => {
    try {
      const data = await MakeupPackage.find({});

      if (data?.length <= 0) {
        return res.status(200).json({
          message: "Tidak ada data list makeup",
        });
      }
      return res.status(200).json({
        message: "Data berhasil ditemukan",
        data,
      });
    } catch (err) {
      return res.status(500).json({
        message: "Terjadi kesalahan",
        error: err.message,
      });
    }
  },
  getDataMakeupPackageById: async (req, res) => {
    try {
      const { id } = req.params;
      const getDataById = await MakeupPackage.findById(id).exec();

      if (!getDataById) {
        return res.status(404).json({
          message: "Data tidak ditemukan",
        });
      }

      return res.status(200).json({
        message: "1 Data makeup berhasil ditemukan",
        data: getDataById,
      });
    } catch (err) {
      return res.status(500).json({
        message: "Terjadi kesalahan",
        error: err.message,
      });
    }
  },
  addDataMakeup: async (req, res) => {
    try {
      const data = req.body;

      const newDataMakeup = new MakeupPackage(data);

      await newDataMakeup.save();

      return res.status(201).json({
        message: "data berhasil ditambahkan",
      });
    } catch (err) {
      return res.status(500).json({ err });
    }
  },
  editDataMakeupById: async (req, res) => {
    try {
      const data = req.body;
      const { id } = req.params;

      data.updatedAt = Date.now();
      const updatedData = await MakeupPackage.findByIdAndUpdate(id, data, {
        new: true,
      });

      if (!updatedData) {
        return res.status(404).json({
          message: "data tidak ditemukan",
        });
      }

      return res.status(200).json({
        message: "data berhasil diubah",
        data: updatedData,
      });
    } catch (err) {
      return res.status(500).json({
        message: "terjadi kesalahan",
        error: err.message,
      });
    }
  },
  deleteDataMakeupById: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedData = await MakeupPackage.findByIdAndDelete(id);

      if (!deletedData) {
        return res.status(404).json({
          message: "data tidak ditemukan",
        });
      }

      return res.status(200).json({
        message: "data berhasil dihapus",
      });
    } catch (err) {
      return res.status(500).json({
        message: "terjadi kesalahan",
        error: err.message,
      });
    }
  },
  deleteAllDataMakeup: async (req, res) => {
    await MakeupPackage.deleteMany({});

    return res.status(200).json({
      message: "semua data makeup telah dihapus",
    });
  },
};
