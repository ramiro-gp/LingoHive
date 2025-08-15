// /src/lib/utils.js
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function verificarAceleracionHardware() {
  if (typeof window === "undefined") {
    return false;
  }
  
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

    if (!gl) {
      return false;
    }

    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    
    if (debugInfo) {
      const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
      const softwareKeywords = /swiftshader|llvmpipe|software rasterizer/i;
      return !softwareKeywords.test(renderer);
    }
    
    return true;
    
  } catch (e) {
    return false;
  }
}