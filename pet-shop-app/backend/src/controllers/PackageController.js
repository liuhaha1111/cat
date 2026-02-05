import Package from '../models/Package.js';

class PackageController {
  // 获取所有套餐
  static async getAll(req, res) {
    try {
      const packages = await Package.getAll();
      res.status(200).json(packages);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // 根据ID获取套餐
  static async getById(req, res) {
    try {
      const { id } = req.params;
      const pkg = await Package.getById(id);
      if (!pkg) {
        res.status(404).json({ error: '套餐不存在' });
        return;
      }
      res.status(200).json(pkg);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // 创建套餐
  static async create(req, res) {
    try {
      const { name, price, duration } = req.body;
      if (!name || !price || !duration) {
        res.status(400).json({ error: '缺少必要参数' });
        return;
      }
      const newPackage = await Package.create(name, price, duration);
      res.status(201).json(newPackage);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // 更新套餐
  static async update(req, res) {
    try {
      const { id } = req.params;
      const { name, price, duration } = req.body;
      if (!name || !price || !duration) {
        res.status(400).json({ error: '缺少必要参数' });
        return;
      }
      const updatedPackage = await Package.update(id, name, price, duration);
      if (!updatedPackage) {
        res.status(404).json({ error: '套餐不存在' });
        return;
      }
      res.status(200).json(updatedPackage);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // 删除套餐
  static async delete(req, res) {
    try {
      const { id } = req.params;
      const deletedPackage = await Package.delete(id);
      if (!deletedPackage) {
        res.status(404).json({ error: '套餐不存在' });
        return;
      }
      res.status(200).json({ message: '套餐删除成功' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default PackageController;