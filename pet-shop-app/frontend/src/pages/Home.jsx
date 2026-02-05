import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Home = () => {
  // 模拟用户评价数据
  const reviews = [
    {
      id: 1,
      name: '李女士',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=friendly%20woman%20portrait%20avatar&image_size=square',
      content: '服务非常专业，宠物洗护后焕然一新，店内环境也很干净整洁，强烈推荐！',
      rating: 5
    },
    {
      id: 2,
      name: '张先生',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=friendly%20man%20portrait%20avatar&image_size=square',
      content: '预约流程很方便，工作人员对宠物很有耐心，我的狗狗很喜欢这里的服务。',
      rating: 4
    },
    {
      id: 3,
      name: '王女士',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=friendly%20young%20woman%20portrait%20avatar&image_size=square',
      content: '价格合理，服务质量高，我的猫咪在这里洗护后变得很温顺，下次还会再来。',
      rating: 5
    }
  ];

  return (
    <div>
      <Navbar />
      
      {/* 区块1：Banner大图+动画文字 */}
      <section className="banner" style={{
        position: 'relative',
        height: '600px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <img 
          src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20pet%20grooming%20salon%20with%20professional%20groomer%20and%20happy%20dog%2C%20warm%20lighting%2C%20cozy%20atmosphere&image_size=landscape_16_9" 
          alt="宠物洗护" 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 1
          }}
        />
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          zIndex: 2
        }}></div>
        <div style={{
          position: 'relative',
          zIndex: 3,
          textAlign: 'center',
          color: 'white'
        }}>
          <h1 style={{
            fontSize: '3.5rem',
            marginBottom: '20px',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
          }}>萌宠之家</h1>
          <p style={{
            fontSize: '1.5rem',
            marginBottom: '30px',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
          }}>给您的宠物最专业的呵护</p>
          <Link 
            to="/appointment" 
            className="btn btn-primary" 
            style={{
              fontSize: '1.2rem',
              padding: '15px 30px'
            }}
          >
            立即预约
          </Link>
        </div>
      </section>

      {/* 区块2：快速入口 */}
      <section className="quick-entry" style={{
        padding: '80px 0',
        backgroundColor: 'white',
        textAlign: 'center'
      }}>
        <div className="container">
          <h2>快速服务</h2>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '40px'
          }}>
            <Link 
              to="/appointment" 
              className="btn btn-primary" 
              style={{
                fontSize: '1.5rem',
                padding: '20px 40px',
                borderRadius: '50px'
              }}
            >
              预约洗护
            </Link>
          </div>
        </div>
      </section>

      {/* 区块3：用户口碑 */}
      <section className="reviews" style={{
        padding: '80px 0',
        backgroundColor: '#f9f5f0'
      }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '60px' }}>用户口碑</h2>
          <div style={{
            display: 'flex',
            gap: '30px',
            overflowX: 'auto',
            paddingBottom: '20px'
          }}>
            {reviews.map(review => (
              <div 
                key={review.id} 
                className="card" 
                style={{
                  minWidth: '300px',
                  flex: '1'
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '20px'
                }}>
                  <img 
                    src={review.avatar} 
                    alt={review.name} 
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      marginRight: '15px'
                    }}
                  />
                  <h4>{review.name}</h4>
                </div>
                <div style={{ marginBottom: '15px' }}>
                  {[...Array(5)].map((_, index) => (
                    <span 
                      key={index} 
                      style={{
                        color: index < review.rating ? '#ffc107' : '#e0e0e0',
                        fontSize: '18px'
                      }}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p>{review.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 区块4：联系我们 */}
      <section className="contact" id="contact" style={{
        padding: '80px 0',
        backgroundColor: 'white'
      }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '60px' }}>联系我们</h2>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '40px',
            justifyContent: 'center'
          }}>
            <div style={{ flex: '1', minWidth: '300px' }}>
              <img 
                src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=pet%20shop%20exterior%20with%20map%20style%2C%20cozy%20neighborhood%2C%20warm%20lighting&image_size=landscape_16_9" 
                alt="店铺位置" 
                style={{
                  width: '100%',
                  borderRadius: 'var(--border-radius)',
                  boxShadow: 'var(--box-shadow)'
                }}
              />
            </div>
            <div style={{ 
              flex: '1', 
              minWidth: '300px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              <h3>联系方式</h3>
              <p style={{ fontSize: '18px', marginBottom: '20px' }}>
                <strong>电话：</strong> 138-8888-8888
              </p>
              <p style={{ fontSize: '18px', marginBottom: '20px' }}>
                <strong>地址：</strong> 北京市朝阳区宠物大街123号
              </p>
              <p style={{ fontSize: '18px', marginBottom: '20px' }}>
                <strong>营业时间：</strong> 周一至周日 9:00-20:00
              </p>
              <Link to="/appointment" className="btn btn-primary">
                预约服务
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer style={{
        backgroundColor: '#333',
        color: 'white',
        padding: '40px 0',
        textAlign: 'center'
      }}>
        <div className="container">
          <p>&copy; 2026 萌宠之家 版权所有</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;