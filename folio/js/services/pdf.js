/* ==========================================================================
   FOLIO OFFICE - PDF EXPORT SERVICE
   ========================================================================== */

export async function exportDocumentToPDF(elementId, filename = 'document.pdf') {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error('PDF export target element not found:', elementId);
    return false;
  }

  // Check if html2pdf is available
  if (window.html2pdf) {
    const opt = {
      margin:       [0.4, 0.4, 0.4, 0.4],
      filename:     filename,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true, letterRendering: true },
      jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    try {
      await window.html2pdf().set(opt).from(element).save();
      return true;
    } catch (err) {
      console.warn('html2pdf failed, falling back to window.print()', err);
    }
  }

  // Fallback: trigger native browser print preview
  window.print();
  return true;
}
