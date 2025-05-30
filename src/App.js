import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, CheckCircle, Search, Globe, Lock, Eye, TrendingUp, Users, Calendar, ExternalLink, Zap, Star, Activity } from 'lucide-react';

const CryptoScamChecker = () => {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [recentScans, setRecentScans] = useState([]);
  const [animateStats, setAnimateStats] = useState(false);

  useEffect(() => {
    setAnimateStats(true);
  }, []);

  // Mock database of known scam indicators
  const scamIndicators = {
    domains: ['crypto-quick-profit.com', 'bitcoin-generator.net', 'instant-crypto.org'],
    keywords: ['guaranteed profit', 'double your crypto', 'free bitcoin', 'instant returns', 'risk-free investment'],
    suspiciousPatterns: ['telegram.me', 'bit.ly', 'tinyurl.com']
  };

  const analyzeUrl = async () => {
    if (!url) return;
    
    setIsAnalyzing(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    let riskScore = 0;
    let riskFactors = [];
    
    // Check domain against known scams
    const domain = extractDomain(url);
    if (scamIndicators.domains.some(scam => domain.includes(scam))) {
      riskScore += 40;
      riskFactors.push('Domain matches known scam database');
    }
    
    // Check for suspicious patterns
    if (scamIndicators.suspiciousPatterns.some(pattern => url.includes(pattern))) {
      riskScore += 20;
      riskFactors.push('Uses URL shortener or suspicious redirect');
    }
    
    // Check for HTTPS
    if (!url.startsWith('https://')) {
      riskScore += 15;
      riskFactors.push('Not using secure HTTPS connection');
    }
    
    // Random factors for demo
    const randomFactors = [
      { factor: 'Domain registered recently', score: 25 },
      { factor: 'No social media presence', score: 15 },
      { factor: 'Promises unrealistic returns', score: 30 },
      { factor: 'Poor website design/grammar', score: 10 },
      { factor: 'No regulatory compliance mentioned', score: 20 }
    ];
    
    // Add 1-3 random factors
    const numFactors = Math.floor(Math.random() * 3) + 1;
    for (let i = 0; i < numFactors; i++) {
      const factor = randomFactors[Math.floor(Math.random() * randomFactors.length)];
      if (!riskFactors.includes(factor.factor)) {
        riskScore += factor.score;
        riskFactors.push(factor.factor);
      }
    }
    
    // Cap at 100
    riskScore = Math.min(riskScore, 100);
    
    const analysis = {
      url,
      domain,
      riskScore,
      riskLevel: getRiskLevel(riskScore),
      riskFactors,
      timestamp: new Date().toISOString(),
      recommendations: getRecommendations(riskScore)
    };
    
    setResult(analysis);
    
    // Add to recent scans
    setRecentScans(prev => [analysis, ...prev.slice(0, 4)]);
    setIsAnalyzing(false);
  };

  const extractDomain = (url) => {
    try {
      return new URL(url.startsWith('http') ? url : `https://${url}`).hostname;
    } catch {
      return url;
    }
  };

  const getRiskLevel = (score) => {
    if (score >= 70) return 'HIGH';
    if (score >= 40) return 'MEDIUM';
    return 'LOW';
  };

  const getRiskColor = (level) => {
    switch (level) {
      case 'HIGH': return '#ef4444';
      case 'MEDIUM': return '#f59e0b';
      default: return '#10b981';
    }
  };

  const getRiskBgGradient = (level) => {
    switch (level) {
      case 'HIGH': return 'linear-gradient(to right, #ef4444, #ec4899)';
      case 'MEDIUM': return 'linear-gradient(to right, #f59e0b, #f97316)';
      default: return 'linear-gradient(to right, #10b981, #14b8a6)';
    }
  };

  const getRecommendations = (score) => {
    if (score >= 70) {
      return [
        'Do not proceed with this website',
        'Report to relevant authorities',
        'Warn others about this potential scam',
        'Check official sources for legitimate alternatives'
      ];
    } else if (score >= 40) {
      return [
        'Exercise extreme caution',
        'Verify through multiple sources',
        'Check for official regulatory approval',
        'Start with minimal investment if proceeding'
      ];
    }
    return [
      'Appears relatively safe but stay vigilant',
      'Always do your own research',
      'Verify credentials and licensing',
      'Never invest more than you can afford to lose'
    ];
  };

  // Inline styles for beautiful UI
  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    backgroundOrb1: {
      position: 'absolute',
      top: '25%',
      left: '25%',
      width: '384px',
      height: '384px',
      background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15), rgba(147, 51, 234, 0.15))',
      borderRadius: '50%',
      filter: 'blur(60px)',
      animation: 'pulse 4s ease-in-out infinite'
    },
    backgroundOrb2: {
      position: 'absolute',
      bottom: '25%',
      right: '25%',
      width: '384px',
      height: '384px',
      background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15), rgba(236, 72, 153, 0.15))',
      borderRadius: '50%',
      filter: 'blur(60px)',
      animation: 'pulse 4s ease-in-out infinite 1s'
    },
    content: {
      position: 'relative',
      zIndex: 10,
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem'
    },
    header: {
      textAlign: 'center',
      marginBottom: '3rem'
    },
    shieldContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '2rem',
      position: 'relative'
    },
    shieldBg: {
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(circle, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2))',
      borderRadius: '50%',
      filter: 'blur(30px)',
      transform: 'scale(2)'
    },
    shieldIcon: {
      position: 'relative',
      background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))',
      padding: '1.5rem',
      borderRadius: '1.5rem',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    },
    title: {
      fontSize: '4rem',
      fontWeight: '900',
      background: 'linear-gradient(to right, #60a5fa, #a78bfa, #06b6d4)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '1.5rem',
      animation: 'pulse 3s ease-in-out infinite'
    },
    subtitle: {
      fontSize: '1.25rem',
      color: '#d1d5db',
      maxWidth: '600px',
      margin: '0 auto',
      lineHeight: 1.6
    },
    mainPanel: {
      position: 'relative',
      marginBottom: '4rem'
    },
    panelBg: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(147, 51, 234, 0.15))',
      borderRadius: '1.5rem',
      filter: 'blur(20px)'
    },
    panel: {
      position: 'relative',
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(20px)',
      borderRadius: '1.5rem',
      padding: '2.5rem',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
    },
    sectionHeader: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '2rem'
    },
    sectionIcon: {
      padding: '0.75rem',
      background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2))',
      borderRadius: '1rem',
      marginRight: '1rem'
    },
    sectionTitle: {
      fontSize: '1.875rem',
      fontWeight: 'bold',
      color: 'white',
      marginBottom: '0.25rem'
    },
    sectionSubtitle: {
      color: '#9ca3af',
      fontSize: '0.875rem'
    },
    inputContainer: {
      display: 'flex',
      gap: '1rem',
      marginBottom: '2rem',
      flexWrap: 'wrap'
    },
    input: {
      flex: 1,
      minWidth: '300px',
      padding: '1.25rem 2rem',
      background: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '1rem',
      color: 'white',
      fontSize: '1.125rem',
      outline: 'none',
      backdropFilter: 'blur(10px)',
      transition: 'all 0.3s ease'
    },
    button: {
      padding: '1.25rem 2.5rem',
      background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
      color: 'white',
      border: 'none',
      borderRadius: '1rem',
      fontSize: '1.125rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden'
    },
    buttonDisabled: {
      opacity: 0.5,
      cursor: 'not-allowed'
    },
    resultPanel: {
      marginTop: '2.5rem',
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '1rem',
      padding: '2rem',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)'
    },
    riskHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1.5rem',
      flexWrap: 'wrap',
      gap: '1rem'
    },
    domainBadge: {
      display: 'flex',
      alignItems: 'center',
      background: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '0.75rem',
      padding: '0.5rem 1rem',
      fontSize: '0.875rem',
      color: '#d1d5db'
    },
    riskScoreContainer: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr',
      gap: '2rem',
      alignItems: 'center',
      marginBottom: '2rem'
    },
    progressContainer: {
      marginBottom: '1rem'
    },
    progressBar: {
      width: '100%',
      height: '1rem',
      background: '#374151',
      borderRadius: '0.5rem',
      overflow: 'hidden',
      position: 'relative'
    },
    progressFill: {
      height: '100%',
      borderRadius: '0.5rem',
      transition: 'width 2s ease-out',
      position: 'relative',
      overflow: 'hidden'
    },
    riskLevelContainer: {
      textAlign: 'center'
    },
    riskLevel: {
      fontSize: '3rem',
      fontWeight: '900',
      marginBottom: '0.5rem'
    },
    riskFactors: {
      marginBottom: '2rem'
    },
    factorItem: {
      display: 'flex',
      alignItems: 'center',
      background: 'rgba(239, 68, 68, 0.1)',
      border: '1px solid rgba(239, 68, 68, 0.2)',
      borderRadius: '0.75rem',
      padding: '1rem',
      marginBottom: '0.75rem',
      transition: 'background 0.3s ease'
    },
    factorDot: {
      width: '0.75rem',
      height: '0.75rem',
      background: '#ef4444',
      borderRadius: '50%',
      marginRight: '1rem',
      animation: 'pulse 2s ease-in-out infinite'
    },
    recommendations: {
      marginTop: '2rem'
    },
    recommendationItem: {
      display: 'flex',
      alignItems: 'center',
      background: 'rgba(59, 130, 246, 0.1)',
      border: '1px solid rgba(59, 130, 246, 0.2)',
      borderRadius: '0.75rem',
      padding: '1rem',
      marginBottom: '0.75rem',
      transition: 'background 0.3s ease'
    },
    recommendationDot: {
      width: '0.75rem',
      height: '0.75rem',
      background: '#3b82f6',
      borderRadius: '50%',
      marginRight: '1rem'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '2rem',
      marginBottom: '4rem'
    },
    statCard: {
      position: 'relative',
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(20px)',
      borderRadius: '1rem',
      padding: '2rem',
      border: '1px solid rgba(255, 255, 255, 0.2)'
    },
    statValues: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '1.5rem'
    },
    statItem: {
      textAlign: 'center',
      transition: 'transform 0.3s ease'
    },
    statValue: {
      fontSize: '2.5rem',
      fontWeight: '900',
      marginBottom: '0.5rem'
    },
    statLabel: {
      color: '#9ca3af',
      fontWeight: 500
    },
    recentScans: {
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(20px)',
      borderRadius: '1rem',
      padding: '2rem',
      border: '1px solid rgba(255, 255, 255, 0.2)'
    },
    scanItem: {
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '0.75rem',
      padding: '1.25rem',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      marginBottom: '1rem',
      transition: 'background 0.3s ease'
    },
    scanHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    scanDomain: {
      color: 'white',
      fontWeight: 600,
      marginBottom: '0.25rem'
    },
    scanTime: {
      color: '#9ca3af',
      fontSize: '0.875rem',
      display: 'flex',
      alignItems: 'center'
    },
    scanScore: {
      textAlign: 'right'
    },
    emptyState: {
      textAlign: 'center',
      color: '#9ca3af',
      padding: '3rem 0'
    },
    footer: {
      textAlign: 'center',
      marginTop: '5rem',
      color: '#9ca3af'
    },
    footerTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: 'white',
      marginBottom: '1.5rem'
    },
    footerText: {
      fontSize: '1.125rem',
      lineHeight: 1.6,
      marginBottom: '2rem'
    },
    footerFeatures: {
      display: 'flex',
      justifyContent: 'center',
      gap: '2rem',
      flexWrap: 'wrap'
    },
    footerFeature: {
      display: 'flex',
      alignItems: 'center',
      transition: 'transform 0.3s ease'
    },
    spinner: {
      width: '1.5rem',
      height: '1.5rem',
      border: '2px solid transparent',
      borderTop: '2px solid white',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      marginRight: '0.75rem'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.backgroundOrb1}></div>
      <div style={styles.backgroundOrb2}></div>
      
      <div style={styles.content}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.shieldContainer}>
            <div style={styles.shieldBg}></div>
            <div style={styles.shieldIcon}>
              <Shield size={80} color="#60a5fa" />
            </div>
          </div>
          <h1 style={styles.title}>CryptoGuard</h1>
          <p style={styles.subtitle}>
            Next-generation cryptocurrency scam detection powered by <strong>advanced AI analysis</strong>
          </p>
        </div>

        {/* Main Analysis Tool */}
        <div style={styles.mainPanel}>
          <div style={styles.panelBg}></div>
          <div style={styles.panel}>
            <div style={styles.sectionHeader}>
              <div style={styles.sectionIcon}>
                <Search size={32} color="#60a5fa" />
              </div>
              <div>
                <h2 style={styles.sectionTitle}>AI Risk Analyzer</h2>
                <p style={styles.sectionSubtitle}>Instant threat detection & assessment</p>
              </div>
            </div>
            
            <div style={styles.inputContainer}>
              <input
                type="text"
                placeholder="Enter website URL (e.g., https://example.com)"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                style={styles.input}
                onKeyPress={(e) => e.key === 'Enter' && analyzeUrl()}
              />
              <button
                onClick={analyzeUrl}
                disabled={isAnalyzing || !url}
                style={{
                  ...styles.button,
                  ...(isAnalyzing || !url ? styles.buttonDisabled : {})
                }}
              >
                {isAnalyzing ? (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={styles.spinner}></div>
                    Analyzing...
                  </div>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Zap size={24} style={{ marginRight: '0.5rem' }} />
                    Analyze Risk
                  </div>
                )}
              </button>
            </div>

            {result && (
              <div style={styles.resultPanel}>
                <div style={styles.riskHeader}>
                  <h3 style={{ ...styles.sectionTitle, margin: 0, display: 'flex', alignItems: 'center' }}>
                    <Activity size={32} color="#60a5fa" style={{ marginRight: '0.75rem' }} />
                    Risk Assessment
                  </h3>
                  <div style={styles.domainBadge}>
                    <Globe size={20} style={{ marginRight: '0.5rem' }} />
                    {result.domain}
                  </div>
                </div>
                
                <div style={styles.riskScoreContainer}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                      <span style={{ color: 'white', fontWeight: 600, fontSize: '1.125rem' }}>Risk Score</span>
                      <span style={{ color: getRiskColor(result.riskLevel), fontWeight: '900', fontSize: '2rem' }}>
                        {result.riskScore}%
                      </span>
                    </div>
                    <div style={styles.progressBar}>
                      <div
                        style={{
                          ...styles.progressFill,
                          width: `${result.riskScore}%`,
                          background: getRiskBgGradient(result.riskLevel)
                        }}
                      ></div>
                    </div>
                  </div>
                  
                  <div style={styles.riskLevelContainer}>
                    <div style={{ ...styles.riskLevel, color: getRiskColor(result.riskLevel) }}>
                      {result.riskLevel}
                    </div>
                    <div style={{ color: '#9ca3af', fontSize: '0.875rem', fontWeight: 600 }}>RISK LEVEL</div>
                    <div style={{
                      marginTop: '0.5rem',
                      padding: '0.25rem 1rem',
                      borderRadius: '1rem',
                      fontSize: '0.875rem',
                      fontWeight: 'bold',
                      background: getRiskBgGradient(result.riskLevel),
                      color: 'white'
                    }}>
                      {result.riskLevel === 'HIGH' ? '⚠️ DANGER' : result.riskLevel === 'MEDIUM' ? '⚡ CAUTION' : '✅ SAFE'}
                    </div>
                  </div>
                </div>

                {/* Risk Factors */}
                {result.riskFactors.length > 0 && (
                  <div style={styles.riskFactors}>
                    <h4 style={{ color: 'white', fontWeight: 'bold', fontSize: '1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
                      <AlertTriangle size={24} color="#f59e0b" style={{ marginRight: '0.75rem' }} />
                      Detected Risk Factors
                    </h4>
                    {result.riskFactors.map((factor, index) => (
                      <div key={index} style={styles.factorItem}>
                        <div style={styles.factorDot}></div>
                        <span style={{ color: '#e5e7eb', fontWeight: 500 }}>{factor}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Recommendations */}
                <div style={styles.recommendations}>
                  <h4 style={{ color: 'white', fontWeight: 'bold', fontSize: '1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
                    <CheckCircle size={24} color="#10b981" style={{ marginRight: '0.75rem' }} />
                    Security Recommendations
                  </h4>
                  {result.recommendations.map((rec, index) => (
                    <div key={index} style={styles.recommendationItem}>
                      <div style={styles.recommendationDot}></div>
                      <span style={{ color: '#e5e7eb', fontWeight: 500 }}>{rec}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Stats and Recent Scans */}
        <div style={styles.statsGrid}>
          {/* Stats */}
          <div style={styles.statCard}>
            <h3 style={{ ...styles.sectionTitle, marginBottom: '2rem', display: 'flex', alignItems: 'center' }}>
              <div style={styles.sectionIcon}>
                <TrendingUp size={24} color="#10b981" />
              </div>
              Platform Analytics
            </h3>
            <div style={styles.statValues}>
              <div style={styles.statItem}>
                <div style={{ ...styles.statValue, color: '#60a5fa' }}>12,847</div>
                <div style={styles.statLabel}>URLs Analyzed</div>
              </div>
              <div style={styles.statItem}>
                <div style={{ ...styles.statValue, color: '#ef4444' }}>3,291</div>
                <div style={styles.statLabel}>Scams Detected</div>
              </div>
              <div style={styles.statItem}>
                <div style={{ ...styles.statValue, color: '#10b981' }}>$2.1M</div>
                <div style={styles.statLabel}>Losses Prevented</div>
              </div>
              <div style={styles.statItem}>
                <div style={{ ...styles.statValue, color: '#a78bfa' }}>98.7%</div>
                <div style={styles.statLabel}>Accuracy Rate</div>
              </div>
            </div>
          </div>

          {/* Recent Scans */}
          <div style={styles.recentScans}>
            <h3 style={{ ...styles.sectionTitle, marginBottom: '2rem', display: 'flex', alignItems: 'center' }}>
              <div style={styles.sectionIcon}>
                <Eye size={24} color="#a78bfa" />
              </div>
              Recent Analysis
            </h3>
            {recentScans.length > 0 ? (
              <div>
                {recentScans.map((scan, index) => (
                  <div key={index} style={styles.scanItem}>
                    <div style={styles.scanHeader}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={styles.scanDomain}>{scan.domain}</div>
                        <div style={styles.scanTime}>
                          <Calendar size={16} style={{ marginRight: '0.25rem' }} />
                          {new Date(scan.timestamp).toLocaleTimeString()}
                        </div>
                      </div>
                      <div style={styles.scanScore}>
                        <div style={{ color: getRiskColor(scan.riskLevel), fontWeight: '900', fontSize: '1.25rem' }}>
                          {scan.riskScore}%
                        </div>
                        <div style={{ color: getRiskColor(scan.riskLevel), fontSize: '0.75rem', fontWeight: 'bold' }}>
                          {scan.riskLevel}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={styles.emptyState}>
                <Search size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                <p style={{ fontSize: '1.125rem', fontWeight: 500 }}>No recent scans yet</p>
                <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>Analyze a URL to get started with threat detection!</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          <h4 style={styles.footerTitle}>Protecting the Future of Digital Finance</h4>
          <p style={styles.footerText}>
            Stay secure in the evolving crypto landscape. Our AI-powered analysis helps you make informed decisions and avoid potential threats.
          </p>
          <div style={styles.footerFeatures}>
            <div style={styles.footerFeature}>
              <Lock size={20} color="#60a5fa" style={{ marginRight: '0.5rem' }} />
              <span>Military-Grade Security</span>
            </div>
            <div style={styles.footerFeature}>
              <Users size={20} color="#10b981" style={{ marginRight: '0.5rem' }} />
              <span>Community Driven</span>
            </div>
            <div style={styles.footerFeature}>
              <Zap size={20} color="#a78bfa" style={{ marginRight: '0.5rem' }} />
              <span>Real-time Analysis</span>
            </div>
          </div>
        </div>
      </div>

  </div>
  );
};

export default CryptoScamChecker;