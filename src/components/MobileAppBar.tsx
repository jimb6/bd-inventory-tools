'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { platformUtils } from '@/lib/platform';
import { 
  MoreVertical, 
  RefreshCw, 
  Settings, 
  Info
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface MobileAppBarProps {
  onRefresh?: () => void;
}

export const MobileAppBar = ({ onRefresh }: MobileAppBarProps) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);

  // Check if we should show the app bar
  useEffect(() => {
    const checkShouldShow = () => {
      // Always show on native platforms
      if (platformUtils.isNative()) {
        setShouldShow(true);
        return;
      }
      
      // Show on mobile web browsers
      if (platformUtils.isMobile()) {
        setShouldShow(true);
        return;
      }
      
      // Show on small screens (tablet and below)
      if (typeof window !== 'undefined') {
        setShouldShow(window.innerWidth <= 768);
      }
    };

    checkShouldShow();
    
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', checkShouldShow);
      return () => window.removeEventListener('resize', checkShouldShow);
    }
  }, []);

  if (!shouldShow) {
    return null;
  }

  const handleRefresh = async () => {
    if (onRefresh) {
      setIsRefreshing(true);
      try {
        await onRefresh();
      } finally {
        setTimeout(() => setIsRefreshing(false), 1000);
      }
    }
  };

  const handleSettings = () => {
    alert('Settings coming soon...');
  };

  const handleAbout = () => {
    alert('BD & Associates Inventory Manager v1.0\n\nBuilt for professional inventory management');
  };

  return (
    <div className="sticky top-0 z-50 bg-[#1e3a5f] text-white shadow-lg border-b border-[#142d47]">
      {/* Status bar spacer for Android */}
      {platformUtils.isAndroid() && (
        <div className="h-6 bg-[#142d47]" />
      )}
      
      <div className="flex items-center justify-between px-4 py-3">
        {/* App Title */}
        <div className="flex-1">
          <h1 className="text-lg font-bold leading-tight">BD & Associates Inventory</h1>
          <p className="text-xs text-blue-100 leading-tight">Inventory Manager</p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Refresh Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="text-white hover:bg-blue-700/20 p-2"
          >
            <RefreshCw 
              className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} 
            />
          </Button>

          {/* Menu Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-blue-700/20 p-2"
              >
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={handleRefresh}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh Data
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSettings}>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleAbout}>
                <Info className="mr-2 h-4 w-4" />
                About
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Platform indicator */}
      <div className="px-4 pb-2">
        <div className="text-xs text-blue-200 flex items-center gap-2">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            Platform: {platformUtils.getPlatform()}
          </div>
          {platformUtils.isCameraAvailable() && (
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              Camera Ready
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
