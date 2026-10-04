"use client";
import { useCallback, useEffect, useRef, useState } from "react";

// A generation token also rejects work that finishes after an input change.
export function useGeneratedResult() {
  const [downloadUrl, setUrl] = useState(null);
  const currentUrl = useRef(null);
  const generation = useRef(0);
  const release = useCallback(() => {
    if (currentUrl.current) URL.revokeObjectURL(currentUrl.current);
    currentUrl.current = null;
  }, []);
  const invalidateResult = useCallback(() => {
    generation.current += 1;
    release();
    setUrl(null);
  }, [release]);
  const beginResult = useCallback(() => {
    invalidateResult();
    return generation.current;
  }, [invalidateResult]);
  const isCurrentResult = useCallback(token => token === generation.current, []);
  const setDownloadUrl = useCallback((url, token) => {
    if (token !== generation.current) {
      URL.revokeObjectURL(url);
      return;
    }
    release();
    currentUrl.current = url;
    setUrl(url);
  }, [release]);
  useEffect(() => () => {
    generation.current += 1;
    release();
  }, [release]);
  return { downloadUrl, setDownloadUrl, beginResult, invalidateResult, isCurrentResult };
}

export function useResultInput(initialValue, invalidateResult) {
  const [value, setValue] = useState(initialValue);
  const update = useCallback(next => {
    invalidateResult();
    setValue(next);
  }, [invalidateResult]);
  return [value, update];
}
