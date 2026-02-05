import Appointment from '../models/Appointment.js';

class AppointmentController {
  // 获取所有预约
  static async getAll(req, res) {
    try {
      const appointments = await Appointment.getAll();
      res.status(200).json(appointments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // 根据ID获取预约
  static async getById(req, res) {
    try {
      const { id } = req.params;
      const appointment = await Appointment.getById(id);
      if (!appointment) {
        res.status(404).json({ error: '预约不存在' });
        return;
      }
      res.status(200).json(appointment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // 根据日期获取预约
  static async getByDate(req, res) {
    try {
      const { date } = req.params;
      const appointments = await Appointment.getByDate(date);
      res.status(200).json(appointments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // 创建预约
  static async create(req, res) {
    try {
      const { package_id, pet_name, start_time, end_time, notes } = req.body;
      if (!package_id || !pet_name || !start_time || !end_time) {
        res.status(400).json({ error: '缺少必要参数' });
        return;
      }
      // 转换时间格式，确保不带时区
      const startTime = new Date(start_time);
      const endTime = new Date(end_time);
      const newAppointment = await Appointment.create(package_id, pet_name, startTime, endTime, notes);
      res.status(201).json(newAppointment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // 更新预约
  static async update(req, res) {
    try {
      const { id } = req.params;
      const { package_id, pet_name, start_time, end_time, notes } = req.body;
      if (!package_id || !pet_name || !start_time || !end_time) {
        res.status(400).json({ error: '缺少必要参数' });
        return;
      }
      // 转换时间格式，确保不带时区
      const startTime = new Date(start_time);
      const endTime = new Date(end_time);
      const updatedAppointment = await Appointment.update(id, package_id, pet_name, startTime, endTime, notes);
      if (!updatedAppointment) {
        res.status(404).json({ error: '预约不存在' });
        return;
      }
      res.status(200).json(updatedAppointment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // 删除预约
  static async delete(req, res) {
    try {
      const { id } = req.params;
      const deletedAppointment = await Appointment.delete(id);
      if (!deletedAppointment) {
        res.status(404).json({ error: '预约不存在' });
        return;
      }
      res.status(200).json({ message: '预约删除成功' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default AppointmentController;