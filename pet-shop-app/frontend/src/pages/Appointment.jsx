import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const Appointment = () => {
  const [packages, setPackages] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [formData, setFormData] = useState({
    petName: '',
    packageId: '',
    notes: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // 生成一天的时间 slots，从9:00到18:00，每小时一个slot
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 18; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  // 获取套餐列表
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        // 使用相对路径，便于部署
        const response = await axios.get('/api/packages');
        setPackages(response.data);
      } catch (error) {
        console.error('获取套餐列表失败:', error);
        // 降级使用模拟数据
        const mockPackages = [
          { id: 1, name: '基础洗护', price: 88.00, duration: 60 },
          { id: 2, name: '深度洗护', price: 128.00, duration: 90 },
          { id: 3, name: '豪华洗护', price: 168.00, duration: 120 }
        ];
        setPackages(mockPackages);
      }
    };

    fetchPackages();
  }, []);

  // 获取当天的预约列表
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const today = new Date().toISOString().split('T')[0];
        // 使用相对路径，便于部署
        const response = await axios.get(`/api/appointments/date/${today}`);
        setAppointments(response.data);
      } catch (error) {
        console.error('获取预约列表失败:', error);
        // 降级使用模拟数据
        const mockAppointments = [
          {
            id: 1,
            package_id: 1,
            pet_name: '小白',
            start_time: new Date(new Date().setHours(10, 0, 0, 0)),
            end_time: new Date(new Date().setHours(11, 0, 0, 0))
          },
          {
            id: 2,
            package_id: 2,
            pet_name: '小黑',
            start_time: new Date(new Date().setHours(14, 0, 0, 0)),
            end_time: new Date(new Date().setHours(15, 30, 0, 0))
          }
        ];
        setAppointments(mockAppointments);
      }
    };

    fetchAppointments();
  }, []);

  // 检查时间是否被占用
  const isTimeOccupied = (time) => {
    const [hour] = time.split(':').map(Number);
    const checkTime = new Date(new Date().setHours(hour, 0, 0, 0));
    
    return appointments.some(appointment => {
      const startTime = new Date(appointment.start_time);
      const endTime = new Date(appointment.end_time);
      return checkTime >= startTime && checkTime < endTime;
    });
  };

  // 处理时间选择
  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setError('');
    setSuccess('');
  };

  // 处理表单输入变化
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 处理套餐选择变化
  const handlePackageChange = (e) => {
    const packageId = e.target.value;
    setFormData(prev => ({
      ...prev,
      packageId
    }));
  };

  // 处理表单提交
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedTime || !formData.petName || !formData.packageId) {
      setError('请选择时间、填写宠物昵称并选择套餐');
      return;
    }

    // 计算开始时间和结束时间
    const [hour] = selectedTime.split(':').map(Number);
    const startTime = new Date(new Date().setHours(hour, 0, 0, 0));
    
    // 获取选择的套餐
    const selectedPackage = packages.find(pkg => pkg.id === parseInt(formData.packageId));
    if (!selectedPackage) {
      setError('请选择有效的套餐');
      return;
    }

    // 计算结束时间
    const endTime = new Date(startTime.getTime() + selectedPackage.duration * 60000);

    // 检查时间冲突
    const hasConflict = appointments.some(appointment => {
      const apptStartTime = new Date(appointment.start_time);
      const apptEndTime = new Date(appointment.end_time);
      return startTime < apptEndTime && endTime > apptStartTime;
    });

    if (hasConflict) {
      setError('时间冲突，该时间段已被占用');
      return;
    }

    try {
      // 调用后端API创建预约
      const response = await axios.post('/api/appointments', {
        package_id: formData.packageId,
        pet_name: formData.petName,
        start_time: startTime,
        end_time: endTime,
        notes: formData.notes
      });
      
      setSuccess('预约成功！');
      setFormData({ petName: '', packageId: '', notes: '' });
      setSelectedTime(null);
      
      // 更新本地预约列表
      const newAppointment = response.data;
      setAppointments(prev => [...prev, newAppointment]);
    } catch (error) {
      console.error('预约失败:', error);
      setError('预约失败，请稍后重试');
    }
  };

  return (
    <div>
      <Navbar />
      
      <section className="appointment-page" style={{
        padding: '80px 0',
        backgroundColor: '#f9f5f0'
      }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '60px' }}>预约服务</h2>
          
          {/* 时间轴组件 */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: 'var(--border-radius)',
            boxShadow: 'var(--box-shadow)',
            padding: '40px',
            marginBottom: '40px'
          }}>
            <h3>选择时间</h3>
            <div style={{
              display: 'flex',
              gap: '10px',
              overflowX: 'auto',
              padding: '20px 0',
              marginTop: '20px'
            }}>
              {timeSlots.map(time => (
                <div
                  key={time}
                  onClick={() => handleTimeSelect(time)}
                  style={{
                    padding: '15px 20px',
                    borderRadius: 'var(--border-radius)',
                    border: `2px solid ${selectedTime === time ? '#ff8c42' : '#e0e0e0'}`,
                    backgroundColor: isTimeOccupied(time) ? '#ffe6e6' : selectedTime === time ? '#fff3e6' : 'white',
                    cursor: isTimeOccupied(time) ? 'not-allowed' : 'pointer',
                    minWidth: '100px',
                    textAlign: 'center',
                    transition: 'var(--transition)',
                    position: 'relative'
                  }}
                >
                  {time}
                  {isTimeOccupied(time) && (
                    <span style={{
                      position: 'absolute',
                      top: '-10px',
                      right: '-10px',
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      backgroundColor: '#ff6b6b',
                      color: 'white',
                      fontSize: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      ✕
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 预约表单 */}
          {selectedTime && (
            <div style={{
              backgroundColor: 'white',
              borderRadius: 'var(--border-radius)',
              boxShadow: 'var(--box-shadow)',
              padding: '40px'
            }}>
              <h3>填写预约信息</h3>
              
              {error && (
                <div style={{
                  color: 'red',
                  marginBottom: '20px',
                  padding: '10px',
                  backgroundColor: '#ffe6e6',
                  borderRadius: 'var(--border-radius)'
                }}>
                  {error}
                </div>
              )}
              
              {success && (
                <div style={{
                  color: 'green',
                  marginBottom: '20px',
                  padding: '10px',
                  backgroundColor: '#e6ffe6',
                  borderRadius: 'var(--border-radius)'
                }}>
                  {success}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                    宠物昵称
                  </label>
                  <input
                    type="text"
                    name="petName"
                    value={formData.petName}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #e0e0e0',
                      borderRadius: 'var(--border-radius)',
                      fontSize: '16px'
                    }}
                    placeholder="请输入宠物昵称"
                  />
                </div>
                
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                    选择套餐
                  </label>
                  <select
                    name="packageId"
                    value={formData.packageId}
                    onChange={handlePackageChange}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #e0e0e0',
                      borderRadius: 'var(--border-radius)',
                      fontSize: '16px'
                    }}
                  >
                    <option value="">请选择套餐</option>
                    {packages.map(pkg => (
                      <option key={pkg.id} value={pkg.id}>
                        {pkg.name} - ¥{pkg.price} ({pkg.duration}分钟)
                      </option>
                    ))}
                  </select>
                </div>
                
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                    备注
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #e0e0e0',
                      borderRadius: 'var(--border-radius)',
                      fontSize: '16px',
                      minHeight: '100px'
                    }}
                    placeholder="请输入备注信息（可选）"
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '15px', fontSize: '16px' }}
                >
                  确认预约
                </button>
              </form>
            </div>
          )}
        </div>
      </section>

      {/* 页脚 */}
      <footer style={{
        backgroundColor: '#333',
        color: 'white',
        padding: '40px 0',
        textAlign: 'center',
        marginTop: '80px'
      }}>
        <div className="container">
          <p>&copy; 2026 萌宠之家 版权所有</p>
        </div>
      </footer>
    </div>
  );
};

export default Appointment;