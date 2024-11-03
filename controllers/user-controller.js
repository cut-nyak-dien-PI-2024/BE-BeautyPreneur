const User = require("../models/User");
const bcrypt = require("bcrypt")

module.exports = {
    getAllUsers: async(req, res) => {
        const data = await User.find({});

        if(data?.length <= 0){
           return res.status(200).json({
              message: "Tidak ada data user"
            }); 
        }

       return res.status(200).json({
          message: "Data berhasil ditemukan",
          data,
        });
    },
    getUserById:async(req, res) => {
        try{
          const {id} = req.params;
          const getDataById = await User.findById(id).exec();

          if(!getDataById){
            return res.status(404).json({
              message: "Data tidak ditemukan",
            });
          }

        return res.status(200).json({
            message: "1 Data berhasil ditemukan",
            data: getDataById,
          });

        }catch(err){
           return res.status(500).json({
              message:"Terjadi kesalahan",
              error:err.message
            })
        }
    },
    addUser: async(req, res) => {
        try{
        const data = req.body;

        const isUserThere = await User.findOne({email: data.email}).exec();
        if(isUserThere !== null){
            return res.status(400).json({message: "email sudah terdaftar"})
        }

        const newUser = new User(data);

        if(newUser?.password && newUser?.password?.length > 6) {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(newUser.password, salt);
            newUser.password = hash;
        }        

        await newUser.save();

        return res.status(201).json({
          message: "data berhasil ditambahkan",
        });

        }catch(err){
          return res.status(500).json({ err });
        }
    },
    editUserById : async (req, res) => {
        try{
            const data = req.body;
            const {id} = req.params;

            data.updatedAt = Date.now();
            const updatedData = await User.findByIdAndUpdate(id, data, {new:true});

            if(!updatedData){
                return res.status(404).json({
                  message:"data tidak ditemukan"
                })
            }

            return res.status(200).json({
                message:"data berhasil diubah",
                data:updatedData
            })

        }catch(err){
            return res.status(500).json({
                message:"terjadi kesalahan",
                error:err.message
            })
        }
    },
    deleteUserById: async(req, res) => {
        try{
          const {id} = req.params;
          const deletedData = await User.findByIdAndDelete(id);

          if(!deletedData){
            return res.status(404).json({
                message:"data tidak ditemukan"
            })
          }

         return res.status(200).json({
            message:"data berhasil dihapus"
          })

        }catch(err){
           return res.status(500).json({
                message:"terjadi kesalahan",
                error:err.message
            })
        }
    },
    deleteAllUser: async(req, res) => {
        await User.deleteMany({});

       return res.status(200).json({
            message:"semua data user telah dihapus"
        })
    }
 }

