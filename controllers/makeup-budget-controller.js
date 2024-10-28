const MakeupBudget = require("../models/MakeupBudget");

module.exports = {
  sendAllData: async (req, res) => {
    try {
      const allData = req.body;

     const result = await MakeupBudget.insertMany(allData);

      return res.status(201).json({
        message: "data berhasil ditambahkan",
        data:result
      });
    } catch (err) {
      return res.status(500).json({ err });
    }
  },
  getAllData: async (req, res) => {
    const data = await MakeupBudget.find({});

    if (data?.length <= 0) {
      return res.status(200).json({
        message: "Tidak ada data list makeup",
      });
    }

    return res.status(200).json({
      message: "Data berhasil ditemukan",
      data,
    });
  },
  getDataById: async (req, res) => {
    try {
      const { id } = req.params;
      const getDataById = await MakeupBudget.findById(id).exec();

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
  addData: async (req, res) => {
    try {
      const data = req.body;

      const newDataMakeup = new MakeupBudget(data);

      await newDataMakeup.save();

      return res.status(201).json({
        message: "data berhasil ditambahkan",
      });
    } catch (err) {
      return res.status(500).json({ err });
    }
  },
  editDataById: async (req, res) => {
    try {
      const data = req.body;
      const { id } = req.params;

      data.updatedAt = Date.now();
      const updatedData = await MakeupBudget.findByIdAndUpdate(id, data, {
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
  deleteDataById: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedTodo = await MakeupBudget.findByIdAndDelete(id);

      if (!deletedTodo) {
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
  deleteAllData: async (req, res) => {
    await MakeupBudget.deleteMany({});

    return res.status(200).json({
      message: "semua data makeup telah dihapus",
    });
  },
};
