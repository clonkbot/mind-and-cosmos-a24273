import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface SunsetPrediction {
  time: string;
  quality: 'spectacular' | 'beautiful' | 'good' | 'moderate';
  description: string;
  colors: string[];
  confidence: number;
}

export function GrokSunset() {
  const [location, setLocation] = useState('San Francisco, CA');
  const [prediction, setPrediction] = useState<SunsetPrediction | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState<string>('');

  const generatePrediction = () => {
    setIsLoading(true);

    setTimeout(() => {
      const now = new Date();
      const sunsetHour = 17 + Math.floor(Math.random() * 3);
      const sunsetMinute = Math.floor(Math.random() * 60);
      const sunsetTime = new Date(now);
      sunsetTime.setHours(sunsetHour, sunsetMinute, 0);

      if (sunsetTime < now) {
        sunsetTime.setDate(sunsetTime.getDate() + 1);
      }

      const qualities: SunsetPrediction['quality'][] = ['spectacular', 'beautiful', 'good', 'moderate'];
      const quality = qualities[Math.floor(Math.random() * qualities.length)];

      const descriptions: Record<SunsetPrediction['quality'], string[]> = {
        spectacular: [
          "High-altitude cirrus clouds will act as nature's canvas, painting vibrant oranges, pinks, and purples across the sky. Expect a breathtaking display.",
          "Perfect atmospheric conditions detected. Particulate matter at optimal levels for light scattering. This will be one for the memory books.",
        ],
        beautiful: [
          "Scattered clouds at medium altitude will create a lovely gradient effect. Warm golden tones will dominate the horizon.",
          "Clear atmosphere with just enough moisture for excellent color saturation. A peaceful, warm sunset awaits.",
        ],
        good: [
          "Partial cloud cover may intermittently obscure the sun, but breaks in the clouds will reveal pleasant warm colors.",
          "Decent conditions overall. The sunset will be enjoyable, with soft orange and pink hues.",
        ],
        moderate: [
          "Heavy cloud cover expected. Occasional gaps may allow glimpses of muted sunset colors.",
          "Atmospheric haze may diffuse the colors. A subtle, softer sunset is predicted.",
        ],
      };

      const colorPalettes: Record<SunsetPrediction['quality'], string[][]> = {
        spectacular: [
          ['#FF6B35', '#FF4081', '#9C27B0', '#3F51B5', '#1A237E'],
          ['#FFD54F', '#FF8A65', '#E91E63', '#7B1FA2', '#311B92'],
        ],
        beautiful: [
          ['#FFB74D', '#FF8A65', '#F06292', '#BA68C8', '#5C6BC0'],
          ['#FFCA28', '#FFA726', '#EF5350', '#AB47BC', '#5E35B1'],
        ],
        good: [
          ['#FFE082', '#FFCC80', '#FF8A65', '#CE93D8', '#9FA8DA'],
          ['#FFF176', '#FFD54F', '#FF8A65', '#F48FB1', '#B39DDB'],
        ],
        moderate: [
          ['#FFECB3', '#FFE0B2', '#FFCCBC', '#E1BEE7', '#C5CAE9'],
          ['#FFF9C4', '#FFECB3', '#FFE0B2', '#F8BBD9', '#D1C4E9'],
        ],
      };

      const descList = descriptions[quality];
      const colorList = colorPalettes[quality];

      setPrediction({
        time: sunsetTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quality,
        description: descList[Math.floor(Math.random() * descList.length)],
        colors: colorList[Math.floor(Math.random() * colorList.length)],
        confidence: Math.floor(Math.random() * 15) + 80,
      });

      setIsLoading(false);
    }, 1500 + Math.random() * 1000);
  };

  useEffect(() => {
    generatePrediction();
  }, []);

  useEffect(() => {
    if (!prediction) return;

    const updateCountdown = () => {
      const now = new Date();
      const sunsetToday = new Date(now);
      const timeParts = prediction.time.match(/(\d+):(\d+)\s*(AM|PM)?/i);
      if (!timeParts) return;

      let hours = parseInt(timeParts[1]);
      const minutes = parseInt(timeParts[2]);
      const period = timeParts[3]?.toUpperCase();

      if (period === 'PM' && hours !== 12) hours += 12;
      if (period === 'AM' && hours === 12) hours = 0;

      sunsetToday.setHours(hours, minutes, 0);

      if (sunsetToday < now) {
        sunsetToday.setDate(sunsetToday.getDate() + 1);
      }

      const diff = sunsetToday.getTime() - now.getTime();
      const hoursRemaining = Math.floor(diff / (1000 * 60 * 60));
      const minutesRemaining = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secondsRemaining = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdown(`${hoursRemaining}h ${minutesRemaining}m ${secondsRemaining}s`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [prediction]);

  const qualityColors: Record<SunsetPrediction['quality'], string> = {
    spectacular: 'text-cyan-300',
    beautiful: 'text-cyan-400',
    good: 'text-cyan-500',
    moderate: 'text-cyan-600',
  };

  const qualityBadgeColors: Record<SunsetPrediction['quality'], string> = {
    spectacular: 'bg-gradient-to-r from-cyan-400 to-teal-400 text-gray-900',
    beautiful: 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white',
    good: 'bg-cyan-600/30 text-cyan-300 border border-cyan-500/30',
    moderate: 'bg-cyan-700/20 text-cyan-400 border border-cyan-600/30',
  };

  return (
    <div className="h-full flex flex-col p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-4 md:mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-cyan-400 to-teal-600 flex items-center justify-center">
            <span className="text-lg md:text-xl font-display font-bold text-white">G</span>
          </div>
          <div>
            <h2 className="font-display text-lg md:text-xl text-cyan-200">Grok Sunset Predictor</h2>
            <p className="text-xs md:text-sm text-white/40">Celestial forecasting powered by AI</p>
          </div>
        </div>
      </div>

      {/* Location Input */}
      <div className="mb-6">
        <label className="block text-xs md:text-sm text-white/50 mb-2">Your Location</label>
        <div className="flex gap-2 md:gap-3">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="flex-1 bg-white/5 border border-cyan-500/20 rounded-xl px-4 py-3 text-sm md:text-base text-white placeholder-white/30 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
            placeholder="Enter your city..."
          />
          <button
            onClick={generatePrediction}
            disabled={isLoading}
            className="px-4 md:px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-medium text-sm md:text-base hover:scale-105 active:scale-95 transition-transform disabled:opacity-50"
          >
            {isLoading ? 'Predicting...' : 'Predict'}
          </button>
        </div>
      </div>

      {/* Prediction Card */}
      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-12 h-12 md:w-16 md:h-16 border-4 border-cyan-500/20 border-t-cyan-400 rounded-full"
          />
        </div>
      ) : prediction ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex-1 flex flex-col"
        >
          {/* Main Stats */}
          <div className="grid grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6">
            <div className="bg-white/5 border border-cyan-500/20 rounded-xl p-3 md:p-5">
              <p className="text-xs md:text-sm text-white/40 mb-1">Sunset Time</p>
              <p className="text-2xl md:text-3xl font-display text-cyan-200">{prediction.time}</p>
            </div>
            <div className="bg-white/5 border border-cyan-500/20 rounded-xl p-3 md:p-5">
              <p className="text-xs md:text-sm text-white/40 mb-1">Countdown</p>
              <p className="text-xl md:text-2xl font-mono text-cyan-300">{countdown}</p>
            </div>
          </div>

          {/* Quality Badge */}
          <div className="mb-4 md:mb-6">
            <div className="flex items-center gap-3 flex-wrap">
              <span className={`px-3 md:px-4 py-1 md:py-2 rounded-full text-xs md:text-sm font-semibold uppercase tracking-wider ${qualityBadgeColors[prediction.quality]}`}>
                {prediction.quality}
              </span>
              <span className="text-xs md:text-sm text-white/40">
                {prediction.confidence}% confidence
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white/5 border border-cyan-500/20 rounded-xl p-4 md:p-5 mb-4 md:mb-6">
            <p className="text-sm md:text-base text-white/70 leading-relaxed">{prediction.description}</p>
          </div>

          {/* Color Palette */}
          <div>
            <p className="text-xs md:text-sm text-white/40 mb-3">Expected Color Palette</p>
            <div className="flex gap-2 h-12 md:h-16 rounded-xl overflow-hidden">
              {prediction.colors.map((color, index) => (
                <motion.div
                  key={color}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex-1 origin-bottom"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <div className="flex gap-2 mt-2">
              {prediction.colors.map((color) => (
                <div key={color} className="flex-1 text-center">
                  <p className="text-[10px] md:text-xs text-white/30 font-mono">{color}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Sun */}
          <div className="mt-auto pt-6 flex justify-center">
            <motion.div
              animate={{
                y: [0, -10, 0],
                boxShadow: [
                  '0 0 60px rgba(34, 211, 238, 0.4)',
                  '0 0 100px rgba(34, 211, 238, 0.6)',
                  '0 0 60px rgba(34, 211, 238, 0.4)',
                ],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-amber-300 via-orange-400 to-rose-500"
            />
          </div>
        </motion.div>
      ) : null}

      <p className="text-[10px] md:text-xs text-white/20 mt-4 text-center">
        Grok API simulated for demonstration purposes
      </p>
    </div>
  );
}
