import { Capacitor } from '@capacitor/core';

export const platformUtils = {
  /**
   * Check if the app is running on a native mobile platform
   */
  isNative: (): boolean => {
    return Capacitor.isNativePlatform();
  },

  /**
   * Check if the app is running on web
   */
  isWeb: (): boolean => {
    return Capacitor.getPlatform() === 'web';
  },

  /**
   * Get the current platform
   */
  getPlatform: (): string => {
    return Capacitor.getPlatform();
  },

  /**
   * Check if the app is running on Android
   */
  isAndroid: (): boolean => {
    return Capacitor.getPlatform() === 'android';
  },

  /**
   * Check if the app is running on iOS
   */
  isIOS: (): boolean => {
    return Capacitor.getPlatform() === 'ios';
  },

  /**
   * Check if the app is running on a mobile device (native or web mobile)
   */
  isMobile: (): boolean => {
    if (platformUtils.isNative()) {
      return true;
    }
    
    // Check for mobile web browsers
    if (typeof window !== 'undefined') {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    }
    
    return false;
  },

  /**
   * Check if camera is available
   */
  isCameraAvailable: (): boolean => {
    if (typeof window === 'undefined') return false;
    
    return !!(
      navigator.mediaDevices && 
      navigator.mediaDevices.getUserMedia
    );
  }
};
