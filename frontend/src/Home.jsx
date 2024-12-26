import { useState } from 'react';
import { Search, Filter, Plus, Download, Upload, Moon, Sun } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);
  const [isDark, setIsDark] = useState(false);

  const theme = {
    background: isDark ? '#111827' : '#F0F2F5',
    mainBg: isDark ? '#1F2937' : '#FFFFFF',
    text: isDark ? '#F9FAFB' : '#111827',
    subtext: isDark ? '#D1D5DB' : '#4B5563',
    cardBg: isDark ? '#374151' : '#FFFFFF',
    cardHoverBg: isDark ? '#4B5563' : '#F8FAFC',
    cardBorder: isDark ? '#4B5563' : '#E5E7EB',
    inputBg: isDark ? '#374151' : '#FFFFFF',
    inputBorder: isDark ? '#4B5563' : '#D1D5DB',
    inputText: isDark ? '#F9FAFB' : '#111827',
    inputPlaceholder: isDark ? '#9CA3AF' : '#6B7280',
    primary: isDark ? '#3B82F6' : '#2563EB',
    primaryHover: isDark ? '#60A5FA' : '#1D4ED8',
    statsCardBg: isDark ? '#374151' : '#FFFFFF',
    statsCardHoverBg: isDark ? '#4B5563' : '#F8FAFC',
    gradient: isDark 
      ? 'linear-gradient(135deg, #60A5FA, #93C5FD)'
      : 'linear-gradient(135deg, #1E40AF, #3B82F6)',
  };

  const transitions = {
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  };

  const animations = {
    fadeIn: {
      animation: '0.5s ease-out 0s 1 normal forwards running fadeIn',
    },
    pulse: {
      animation: '2s cubic-bezier(0.4, 0, 0.6, 1) infinite pulse',
    },
  };

  const keyframesStyle = document.createElement('style');
  keyframesStyle.textContent = `
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.8;
      }
    }
  `;
  if (typeof document !== 'undefined') {
    document.head.appendChild(keyframesStyle);
  }

  const getButtonStyles = (index, isActionButton = false) => ({
    backgroundColor: isActionButton ? theme.primary : theme.cardBg,
    border: `2px solid ${isActionButton ? 'transparent' : theme.cardBorder}`,
    color: isActionButton ? 'white' : theme.text,
    height: '44px',
    width: isActionButton ? 'auto' : '44px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: isActionButton ? '0 20px' : '0',
    borderRadius: '8px',
    cursor: 'pointer',
    transform: hoveredButton === index ? 'translateY(-2px)' : 'translateY(0)',
    boxShadow: hoveredButton === index
      ? isDark
        ? '0 4px 12px rgba(0, 0, 0, 0.3)'
        : '0 4px 12px rgba(0, 0, 0, 0.1)'
      : 'none',
    ...transitions,
  });

  const statsData = [
    { 
      title: 'Total Employees', 
      value: '0',
      style: {
        title: {
          fontSize: '18px',
          letterSpacing: '0.5px',
          // textTransform: 'uppercase',
          fontWeight: '500',
          color: theme.subtext,
          marginBottom: '0px',
          ...transitions,
        },
        value: {
          fontSize: '32px',
          fontWeight: '700',
          color: theme.text,
          marginBottom: '4px',
          ...transitions,
        }
      }
    },
    { 
      title: 'Departments', 
      value: '0',
      style: {
        title: {
          fontSize: '18px',
          letterSpacing: '0.5px',
          // textTransform: 'uppercase',
          fontWeight: '500',
          color: theme.subtext,
          marginBottom: '0px',
          ...transitions,
        },
        value: {
          fontSize: '32px',
          fontWeight: '700',
          color: theme.text,
          marginBottom: '4px',
          ...transitions,
        }
      }
    },
    { 
      title: 'Hierarchy Levels', 
      value: '0',
      style: {
        title: {
          fontSize: '18px',
          letterSpacing: '0.5px',
          // textTransform: 'uppercase',
          fontWeight: '500',
          color: theme.subtext,
          marginBottom: '0px',
          ...transitions,
        },
        value: {
          fontSize: '32px',
          fontWeight: '700',
          color: theme.text,
          marginBottom: '4px',
          ...transitions,
        }
      }
    }
  ];

  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: theme.background,
      padding: '20px',
      color: theme.text,
      ...transitions,
    }}>
      {/* Theme Toggle */}
      <div style={{ 
        position: 'absolute',
        top: '20px',
        right: '20px',
      }}>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsDark(!isDark)}
          onMouseEnter={() => setHoveredButton('theme')}
          onMouseLeave={() => setHoveredButton(null)}
          style={{
            ...getButtonStyles('theme'),
            borderRadius: '50%',
          }}
        >
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
      </div>

      <div style={{ 
        maxWidth: '1200px',
        margin: '0 auto',
        marginTop: '40px',
      }}>
        {/* Header */}
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '32px',
          ...animations.fadeIn,
        }}>
          <h1 style={{ 
            color: theme.text,
            fontSize: '44px',
            marginTop: '10px',
            fontWeight: '600',
            marginBottom: '8px',
            transform: 'translateY(0)',
            opacity: 1,
            ...transitions,
          }}>Organization Chart</h1>
          <p style={{ 
            color: theme.subtext,
            fontSize: '20px',
            transform: 'translateY(0)',
            marginBottom: '54px',
            opacity: 0.9,
            ...transitions,
          }}>View and manage your organization structure</p>
        </div>

        {/* Controls */}
        <div style={{ 
          display: 'flex',
          gap: '16px',
          marginBottom: '24px',
          flexWrap: 'wrap',
        }}>
          <div style={{ flex: 1, minWidth: '300px', position: 'relative' }}>
            <Search style={{ 
              position: 'absolute',
              left: '12px',
              top: '12px',
              color: theme.inputPlaceholder,
              width: '20px',
              height: '20px',
              ...transitions,
            }} />
            <Input
              type="text"
              placeholder="      Search employees or departments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="hover:scale-[1.01] focus:scale-[1.01]"
              style={{
                backgroundColor: theme.inputBg,
                border: `2px solid ${theme.inputBorder}`,
                color: theme.inputText,
                paddingLeft: '40px',
                height: '44px',
                width: '100%',
                borderRadius: '20px',
                ...transitions,
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            {[
              { icon: Filter, label: 'Filter' },
              { icon: Upload, label: 'Upload' },
              { icon: Download, label: 'Download' }
            ].map((btn, index) => (
              <Button
                key={index}
                variant="outline"
                size="icon"
                onMouseEnter={() => setHoveredButton(index)}
                onMouseLeave={() => setHoveredButton(null)}
                style={getButtonStyles(index)}
              >
                <btn.icon className="h-4 w-4" />
              </Button>
            ))}
            <Button
              onMouseEnter={() => setHoveredButton('action')}
              onMouseLeave={() => setHoveredButton(null)}
              style={getButtonStyles('action', true)}
            >
              <Plus className="h-4 w-4" />
              Add Data
            </Button>
          </div>
        </div>

        {/* Main Chart Area */}
        <Card style={{ 
          backgroundColor: theme.mainBg,
          border: `1px solid ${theme.cardBorder}`,
          borderRadius: '12px',
          marginBottom: '24px',
          boxShadow: isDark 
            ? '0 4px 6px -1px rgba(0, 0, 0, 0.3)' 
            : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          ...transitions,
        }}>
          <CardContent style={{ 
            padding: '24px',
            minHeight: '600px',
            display: 'flex',
            alignItems: 'center',
            fontWeight: '500',
            justifyContent: 'center',
            color: theme.subtext,
            ...animations.pulse,
          }}>
            Organizational Chart will be rendered here
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
        }}>
          {statsData.map((stat, index) => (
            <Card
              key={index}
              style={{
                backgroundColor: hoveredCard === index ? theme.statsCardHoverBg : theme.statsCardBg,
                border: `1px solid ${theme.cardBorder}`,
                borderRadius: '12px',
                overflow: 'hidden',
                cursor: 'pointer',
                boxShadow: hoveredCard === index
                  ? isDark 
                    ? '0 12px 24px rgba(0, 0, 0, 0.4)'
                    : '0 12px 24px rgba(0, 0, 0, 0.1)'
                  : 'none',
                transform: hoveredCard === index ? 'translateY(-4px)' : 'translateY(0)',
                ...transitions,
              }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <CardContent style={{ 
                padding: '24px',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                minHeight: '140px',
              }}>
                <p style={stat.style.value}>{stat.value}</p>
                <h3 style={stat.style.title}>{stat.title}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;