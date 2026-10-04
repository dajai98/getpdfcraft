"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { loadPdf, pdfInputError } from "@/lib/pdfInput";

export function usePdfInput(invalidateResult) {
  const [file, setFile] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const request = useRef(0);
  const resetFile = useCallback(() => {
    request.current += 1;
    invalidateResult();
    setFile(null); setPageCount(0); setError(""); setLoading(false);
  }, [invalidateResult]);
  const loadFile = useCallback(async files => {
    resetFile();
    const token = request.current;
    if (!files[0]) return null;
    setLoading(true);
    try {
      const doc = await loadPdf(files[0]);
      if (token !== request.current) return null;
      const count = doc.getPageCount();
      setFile(files[0]); setPageCount(count);
      return count;
    } catch (e) {
      if (token === request.current) setError(pdfInputError(e));
      return null;
    } finally {
      if (token === request.current) setLoading(false);
    }
  }, [resetFile]);
  useEffect(() => () => { request.current += 1; }, []);
  return { file, pageCount, loading, error, setError, loadFile, resetFile };
}
