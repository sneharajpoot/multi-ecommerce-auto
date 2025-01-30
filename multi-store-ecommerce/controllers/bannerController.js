const { Banners } = require('../models');

const { uploadToS3, deleteFromS3 } = require('../utils/s3Utils');
const fs = require('fs');
const path = require('path');

// POST /api/banners
exports.createBanner = async (req, res) => {
  try {
    const { title, description, link_url, start_date, end_date } = req.body;

    const file = req.file;
    let imageUrl;

    if (process.env.USE_S3 === 'true') {
      const s3Result = await uploadToS3(file);
      imageUrl = s3Result.Location;
    } else {
      const extraChars = '_extra';
      const ext = path.extname(file.originalname);
      const baseName = path.basename(file.originalname, ext);
      const newFileName = `${baseName}${extraChars}${ext}`;
      const localPath = path.join(__dirname, '../uploads/banner', newFileName);
      fs.renameSync(file.path, localPath);
      // imageUrl = `/uploads/${newFileName}`;
      imageUrl = `/${newFileName}`;
    }


    const newBanner = await Banners.create({
      title,
      description,
      image_url: imageUrl ,
      link_url,
      start_date,
      end_date,
      is_active: true,
    });

    res.status(201).json({ success: true, data: newBanner });
  } catch (error) {
    console.error("Error creating banner:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// GET /api/banners
exports.getBanners = async (req, res) => {
  try {
    const now = new Date();

    const banners = await Banners.findAll({
      where: {
        is_active: true, // Only get active banners
      },
    });

    res.status(200).json({ success: true, data: banners });
  } catch (error) {
    console.error("Error fetching banners:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// PUT /api/banners/:id
exports.updateBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description,image_url, link_url, start_date, end_date, is_active } = req.body;

    const banner = await Banners.findByPk(id);
    if (!banner) {
      return res.status(404).json({ success: false, message: "Banner not found" });
    }

    let imageUrl = banner.image_url; // Use the old image URL by default

    if (req.file) {
      if (process.env.USE_S3 === 'true') {
        const s3Result = await uploadToS3(req.file);
        imageUrl = s3Result.Location;
      } else {
        const extraChars = '_extra';
        const ext = path.extname(req.file.originalname);
        const baseName = path.basename(req.file.originalname, ext);
        const newFileName = `${baseName}${extraChars}${ext}`;
        const localPath = path.join(__dirname, '../uploads/banner', newFileName);
        fs.renameSync(req.file.path, localPath);
        imageUrl = `/${newFileName}`;
      }
    }

    let uData = {
      title,
      description,
      image_url: imageUrl || image_url,
      link_url,
      start_date,
      end_date,
      is_active,
    }

    await banner.update(uData);

    res.status(200).json({ success: true, message: 'Banner image updated successfully', data: banner });
  } catch (error) {
    console.error("Error updating banner:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// DELETE /api/banners/:id
exports.deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;

    const banner = await Banners.findByPk(id);
    if (!banner) {
      return res.status(404).json({ success: false, message: "Banner not found" });
    }

    await Banners.destroy();

    res.status(200).json({ success: true, message: "Banner deleted successfully" });
  } catch (error) {
    console.error("Error deleting banner:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
