import React, { useState, useEffect } from 'react';

const API_BASE_URL = 'https://zenithscs.com.au/api';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/check-auth.php`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const result = await response.json();
      
      if (result.success && result.authenticated) {
        setIsAuthenticated(true);
        setUser(result.user);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await fetch(`${API_BASE_URL}/login.php`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setIsAuthenticated(true);
        setUser(result.user);
        setEmail('');
        setPassword('');
      } else {
        setError(result.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Unable to connect to server. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE_URL}/logout.php`, {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
    
    setIsAuthenticated(false);
    setUser(null);
    setEmail('');
    setPassword('');
  };

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <div style={{ textAlign: 'center', color: 'white' }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '4px solid rgba(255,255,255,0.3)',
            borderTop: '4px solid white',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          <p style={{ fontSize: '18px', fontWeight: '500' }}>Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          padding: '48px',
          borderRadius: '20px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          width: '100%',
          maxWidth: '420px',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px auto',
              boxShadow: '0 10px 25px rgba(102, 126, 234, 0.3)'
            }}>
              <svg width="40" height="40" fill="white" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <h1 style={{ 
              color: '#1a202c', 
              fontSize: '32px', 
              marginBottom: '8px',
              fontWeight: '800',
              letterSpacing: '-0.025em'
            }}>
              Admin Panel
            </h1>
            <p style={{ 
              color: '#4a5568', 
              fontSize: '16px',
              margin: '0',
              fontWeight: '500'
            }}>
              Sign in to access your dashboard
            </p>
          </div>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <label style={{ 
                display: 'block', 
                color: '#2d3748', 
                fontSize: '14px', 
                marginBottom: '8px',
                fontWeight: '600'
              }}>
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  style={{
                    width: '100%',
                    padding: '16px 20px 16px 50px',
                    background: '#f7fafc',
                    border: '2px solid #e2e8f0',
                    borderRadius: '12px',
                    color: '#1a202c',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#667eea';
                    e.target.style.background = '#ffffff';
                    e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e2e8f0';
                    e.target.style.background = '#f7fafc';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <svg style={{
                  position: 'absolute',
                  left: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '20px',
                  height: '20px',
                  color: '#a0aec0'
                }} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                  <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                </svg>
              </div>
            </div>

            <div>
              <label style={{ 
                display: 'block', 
                color: '#2d3748', 
                fontSize: '14px', 
                marginBottom: '8px',
                fontWeight: '600'
              }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  style={{
                    width: '100%',
                    padding: '16px 50px 16px 50px',
                    background: '#f7fafc',
                    border: '2px solid #e2e8f0',
                    borderRadius: '12px',
                    color: '#1a202c',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#667eea';
                    e.target.style.background = '#ffffff';
                    e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e2e8f0';
                    e.target.style.background = '#f7fafc';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <svg style={{
                  position: 'absolute',
                  left: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '20px',
                  height: '20px',
                  color: '#a0aec0'
                }} fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
                </svg>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#a0aec0',
                    padding: '4px'
                  }}
                >
                  {showPassword ? (
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM22.676 12.553a11.249 11.249 0 01-2.631 4.31l-3.099-3.099a5.25 5.25 0 00-6.71-6.71L7.759 4.577a11.217 11.217 0 014.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113z"/>
                      <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0115.75 12zM12.53 15.713l-4.243-4.244a3.75 3.75 0 004.243 4.243z"/>
                      <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 00-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 016.75 12z"/>
                    </svg>
                  ) : (
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                      <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div style={{
                color: '#e53e3e',
                fontSize: '14px',
                textAlign: 'center',
                backgroundColor: '#fed7d7',
                border: '1px solid #feb2b2',
                borderRadius: '8px',
                padding: '12px',
                fontWeight: '500'
              }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{ 
                background: loading ? '#a0aec0' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                padding: '16px 24px',
                border: 'none',
                borderRadius: '12px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '16px',
                fontWeight: '700',
                width: '100%',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px'
              }}
              onMouseOver={(e) => {
                if (!loading) {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.5)';
                }
              }}
              onMouseOut={(e) => {
                if (!loading) {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
                }
              }}
            >
              {loading ? (
                <>
                  <div style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderTop: '2px solid white',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite'
                  }}></div>
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div style={{
            textAlign: 'center',
            marginTop: '32px',
            padding: '20px',
            background: 'linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%)',
            borderRadius: '12px',
            border: '1px solid #e2e8f0'
          }}>
            <p style={{
              color: '#4a5568',
              fontSize: '14px',
              margin: '0 0 8px 0',
              fontWeight: '600'
            }}>
              Demo Credentials
            </p>
            <p style={{
              color: '#2d3748',
              fontSize: '13px',
              margin: '0',
              fontFamily: 'Monaco, "Roboto Mono", monospace'
            }}>
              <strong>Email:</strong> admin@gmail.com<br/>
              <strong>Password:</strong> admin123
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    }}>
      {/* Top Navigation */}
      <nav style={{
        backgroundColor: 'white',
        borderBottom: '1px solid #e2e8f0',
        padding: '0 32px',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '72px',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <h1 style={{
                color: '#1a202c',
                fontSize: '24px',
                fontWeight: '800',
                margin: 0,
                letterSpacing: '-0.025em'
              }}>
                Zenith Admin
              </h1>
            </div>

            <div style={{
              display: 'flex',
              gap: '8px',
              background: '#f7fafc',
              padding: '4px',
              borderRadius: '12px'
            }}>
              {[
                { id: 'overview', label: 'Overview', icon: '📊' },
                { id: 'analytics', label: 'Analytics', icon: '📈' },
                { id: 'projects', label: 'Projects', icon: '📁' },
                { id: 'tasks', label: 'Tasks', icon: '✓' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 16px',
                    backgroundColor: activeTab === item.id ? 'white' : 'transparent',
                    border: 'none',
                    borderRadius: '8px',
                    color: activeTab === item.id ? '#1a202c' : '#4a5568',
                    fontSize: '14px',
                    fontWeight: activeTab === item.id ? '600' : '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: activeTab === item.id ? '0 2px 4px rgba(0,0,0,0.1)' : 'none'
                  }}
                >
                  <span style={{ fontSize: '16px' }}>{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}>
            <button style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '8px',
              color: '#4a5568'
            }}>
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.243.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z" clipRule="evenodd" />
              </svg>
            </button>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                backgroundColor: '#667eea',
                color: 'white',
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
                fontWeight: '700'
              }}>
                A
              </div>
              <button
                onClick={handleLogout}
                style={{
                  color: '#4a5568',
                  fontSize: '14px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ padding: '32px', maxWidth: '1400px', margin: '0 auto' }}>
        <DashboardContent activeTab={activeTab} />
      </main>
    </div>
  );
}

function DashboardContent({ activeTab }) {
  const content = {
    overview: <OverviewDashboard />,
    analytics: <AnalyticsDashboard />,
    projects: <ProjectsDashboard />,
    tasks: <TasksDashboard />
  };

  return content[activeTab] || <OverviewDashboard />;
}

function OverviewDashboard() {
  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ 
          color: '#1a202c', 
          fontSize: '28px', 
          marginBottom: '8px', 
          fontWeight: '800' 
        }}>
          Good morning, Admin! 👋
        </h2>
        <p style={{ 
          color: '#4a5568', 
          fontSize: '16px', 
          margin: 0 
        }}>
          Here's what's happening with your projects today.
        </p>
      </div>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px',
        marginBottom: '32px'
      }}>
        <MetricCard 
          title="Total Revenue" 
          value="$45,231.89" 
          change="+20.1%" 
          isPositive={true}
          icon="💰"
          color="#10b981"
        />
        <MetricCard 
          title="Active Users" 
          value="2,350" 
          change="+180.1%" 
          isPositive={true}
          icon="👥"
          color="#3b82f6"
        />
        <MetricCard 
          title="Sales" 
          value="+12,234" 
          change="+19%" 
          isPositive={true}
          icon="📈"
          color="#8b5cf6"
        />
        <MetricCard 
          title="Orders" 
          value="573" 
          change="+201" 
          isPositive={true}
          icon="📦"
          color="#f59e0b"
        />
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '24px'
      }}>
        <ChartCard />
        <RecentActivityCard />
      </div>
    </div>
  );
}

function MetricCard({ title, value, change, isPositive, icon, color }) {
  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '16px',
      padding: '24px',
      border: '1px solid #e2e8f0',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
        <div>
          <p style={{ 
            color: '#6b7280', 
            fontSize: '14px', 
            fontWeight: '600', 
            margin: '0 0 8px 0',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            {title}
          </p>
          <h3 style={{ 
            color: '#1a202c', 
            fontSize: '32px', 
            fontWeight: '800', 
            margin: 0 
          }}>
            {value}
          </h3>
        </div>
        <div style={{
          backgroundColor: `${color}20`,
          color: color,
          padding: '12px',
          borderRadius: '12px',
          fontSize: '24px'
        }}>
          {icon}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <span style={{
          color: isPositive ? '#10b981' : '#ef4444',
          fontSize: '14px',
          fontWeight: '600'
        }}>
          {change}
        </span>
        <span style={{ color: '#6b7280', fontSize: '14px' }}>
          from last month
        </span>
      </div>
    </div>
  );
}

function ChartCard() {
  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '16px',
      padding: '24px',
      border: '1px solid #e2e8f0',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
    }}>
      <h3 style={{
        color: '#1a202c',
        fontSize: '20px',
        fontWeight: '700',
        marginBottom: '24px'
      }}>
        Revenue Overview
      </h3>
      <div style={{
        height: '300px',
        background: 'linear-gradient(135deg, #667eea20 0%, #764ba220 100%)',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#4a5568',
        fontSize: '16px',
        fontWeight: '500'
      }}>
        📊 Chart visualization would go here
      </div>
    </div>
  );
}

function RecentActivityCard() {
  const activities = [
    { action: 'User registration', time: '2 min ago', type: 'user' },
    { action: 'New order received', time: '5 min ago', type: 'order' },
    { action: 'Payment processed', time: '10 min ago', type: 'payment' },
    { action: 'Project completed', time: '15 min ago', type: 'project' },
    { action: 'Email campaign sent', time: '30 min ago', type: 'email' }
  ];

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '16px',
      padding: '24px',
      border: '1px solid #e2e8f0',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
    }}>
      <h3 style={{
        color: '#1a202c',
        fontSize: '20px',
        fontWeight: '700',
        marginBottom: '24px'
      }}>
        Recent Activity
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {activities.map((activity, index) => (
          <div key={index} style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 0',
            borderBottom: index < activities.length - 1 ? '1px solid #f1f5f9' : 'none'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '8px',
                height: '8px',
                backgroundColor: '#667eea',
                borderRadius: '50%'
              }} />
              <span style={{ color: '#1a202c', fontSize: '14px', fontWeight: '500' }}>
                {activity.action}
              </span>
            </div>
            <span style={{ color: '#6b7280', fontSize: '12px' }}>
              {activity.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AnalyticsDashboard() {
  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '16px',
      padding: '48px',
      textAlign: 'center',
      border: '1px solid #e2e8f0'
    }}>
      <h2 style={{ color: '#1a202c', fontSize: '24px', marginBottom: '8px', fontWeight: '700' }}>
        📈 Analytics Dashboard
      </h2>
      <p style={{ color: '#4a5568', fontSize: '16px', margin: 0 }}>
        Advanced analytics and reporting tools
      </p>
    </div>
  );
}

function ProjectsDashboard() {
  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '16px',
      padding: '48px',
      textAlign: 'center',
      border: '1px solid #e2e8f0'
    }}>
      <h2 style={{ color: '#1a202c', fontSize: '24px', marginBottom: '8px', fontWeight: '700' }}>
        📁 Projects Dashboard
      </h2>
      <p style={{ color: '#4a5568', fontSize: '16px', margin: 0 }}>
        Manage your projects and workflows
      </p>
    </div>
  );
}

function TasksDashboard() {
  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '16px',
      padding: '48px',
      textAlign: 'center',
      border: '1px solid #e2e8f0'
    }}>
      <h2 style={{ color: '#1a202c', fontSize: '24px', marginBottom: '8px', fontWeight: '700' }}>
        ✓ Tasks Dashboard
      </h2>
      <p style={{ color: '#4a5568', fontSize: '16px', margin: 0 }}>
        Track and manage your tasks
      </p>
    </div>
  );
}

export default App;