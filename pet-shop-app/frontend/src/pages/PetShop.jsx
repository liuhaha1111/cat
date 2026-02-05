import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const PetShop = () => {
  // 硬编码宠物数据
  const pets = [
    {
      id: 1,
      name: '小白',
      type: '猫',
      breed: '布偶猫',
      gender: '公',
      age: 2,
      price: 3800,
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20ragdoll%20cat%20with%20blue%20eyes%2C%20fluffy%20white%20and%20brown%20fur%2C%20sitting%20on%20sofa&image_size=square'
    },
    {
      id: 2,
      name: '小黑',
      type: '猫',
      breed: '英短',
      gender: '母',
      age: 1,
      price: 2500,
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20british%20shorthair%20cat%2C%20black%20fur%2C%20round%20face%2C%20sitting%20on%20wooden%20floor&image_size=square'
    },
    {
      id: 3,
      name: '大黄',
      type: '狗',
      breed: '金毛',
      gender: '公',
      age: 3,
      price: 2000,
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20golden%20retriever%20dog%2C%20golden%20fur%2C%20smiling%2C%20standing%20outdoors&image_size=square'
    },
    {
      id: 4,
      name: '花花',
      type: '猫',
      breed: '美短',
      gender: '母',
      age: 1,
      price: 2200,
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20american%20shorthair%20cat%2C%20tabby%20pattern%2C%20sitting%20on%20window%20sill&image_size=square'
    },
    {
      id: 5,
      name: '豆豆',
      type: '狗',
      breed: '泰迪',
      gender: '公',
      age: 2,
      price: 1800,
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20toy%20poodle%20dog%2C%20brown%20curly%20fur%2C%20sitting%20on%20couch&image_size=square'
    },
    {
      id: 6,
      name: '咪咪',
      type: '猫',
      breed: '加菲猫',
      gender: '母',
      age: 1.5,
      price: 3200,
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20persian%20cat%2C%20orange%20fur%2C%20flat%20face%2C%20sitting%20on%20bed&image_size=square'
    }
  ];

  // 筛选状态
  const [filters, setFilters] = useState({
    breed: '',
    minPrice: '',
    maxPrice: ''
  });

  // 处理筛选条件变化
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 筛选宠物
  const filteredPets = pets.filter(pet => {
    // 按品种筛选
    if (filters.breed && pet.breed !== filters.breed) {
      return false;
    }
    // 按价格区间筛选
    if (filters.minPrice && pet.price < parseInt(filters.minPrice)) {
      return false;
    }
    if (filters.maxPrice && pet.price > parseInt(filters.maxPrice)) {
      return false;
    }
    return true;
  });

  // 获取所有品种
  const breeds = [...new Set(pets.map(pet => pet.breed))];

  return (
    <div>
      <Navbar />
      
      <section className="pet-shop" style={{
        padding: '80px 0',
        backgroundColor: '#f9f5f0'
      }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '60px' }}>宠物商场</h2>
          
          {/* 筛选组件 */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: 'var(--border-radius)',
            boxShadow: 'var(--box-shadow)',
            padding: '30px',
            marginBottom: '40px'
          }}>
            <h3>筛选条件</h3>
            <div style={{
              display: 'flex',
              gap: '20px',
              flexWrap: 'wrap',
              marginTop: '20px'
            }}>
              <div style={{ flex: '1', minWidth: '200px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                  品种
                </label>
                <select
                  name="breed"
                  value={filters.breed}
                  onChange={handleFilterChange}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #e0e0e0',
                    borderRadius: 'var(--border-radius)',
                    fontSize: '16px'
                  }}
                >
                  <option value="">全部品种</option>
                  {breeds.map(breed => (
                    <option key={breed} value={breed}>
                      {breed}
                    </option>
                  ))}
                </select>
              </div>
              
              <div style={{ flex: '1', minWidth: '200px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                  最低价格
                </label>
                <input
                  type="number"
                  name="minPrice"
                  value={filters.minPrice}
                  onChange={handleFilterChange}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #e0e0e0',
                    borderRadius: 'var(--border-radius)',
                    fontSize: '16px'
                  }}
                  placeholder="最低价格"
                />
              </div>
              
              <div style={{ flex: '1', minWidth: '200px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                  最高价格
                </label>
                <input
                  type="number"
                  name="maxPrice"
                  value={filters.maxPrice}
                  onChange={handleFilterChange}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #e0e0e0',
                    borderRadius: 'var(--border-radius)',
                    fontSize: '16px'
                  }}
                  placeholder="最高价格"
                />
              </div>
            </div>
          </div>
          
          {/* 宠物展示 */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '30px'
          }}>
            {filteredPets.map(pet => (
              <div 
                key={pet.id} 
                className="card"
                style={{
                  textAlign: 'center'
                }}
              >
                <img 
                  src={pet.image} 
                  alt={pet.name} 
                  style={{
                    width: '100%',
                    height: '250px',
                    objectFit: 'cover',
                    borderRadius: 'var(--border-radius)',
                    marginBottom: '20px'
                  }}
                />
                <h3>{pet.name}</h3>
                <p>品种：{pet.breed}</p>
                <p>性别：{pet.gender}</p>
                <p>年龄：{pet.age}岁</p>
                <p style={{ 
                  fontSize: '18px', 
                  fontWeight: '600',
                  color: '#ff8c42',
                  margin: '20px 0'
                }}>
                  ¥{pet.price}
                </p>
                <Link 
                  to="/#contact" 
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                >
                  联系我们
                </Link>
              </div>
            ))}
          </div>
          
          {filteredPets.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '60px 0',
              backgroundColor: 'white',
              borderRadius: 'var(--border-radius)',
              boxShadow: 'var(--box-shadow)',
              marginTop: '30px'
            }}>
              <p>没有找到符合条件的宠物</p>
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

export default PetShop;