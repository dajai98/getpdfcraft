"use client";
import { useCallback, useEffect, useRef } from "react";

// Own a collection of preview/download URLs until reset, retirement or unmount.
export function useObjectUrls() {
  const urls = useRef(new Set());
  const active = useRef(true);
  const retire = useCallback(url => {
    if (urls.current.delete(url)) URL.revokeObjectURL(url);
  }, []);
  const clear = useCallback(() => {
    urls.current.forEach(url => URL.revokeObjectURL(url));
    urls.current.clear();
  }, []);
  const create = useCallback(blob => {
    if (!active.current) return null;
    const url = URL.createObjectURL(blob);
    urls.current.add(url);
    return url;
  }, []);
  useEffect(() => {
    active.current = true;
    return () => { active.current = false; clear(); };
  }, [clear]);
  return { create, retire, clear };
}
