import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

/**
 * Captures a DOM container as a high-resolution PDF document and triggers browser download.
 * Handles multi-page content pagination cleanly without squishing or cutting off content.
 * 
 * @param {HTMLElement} element - DOM element container to capture
 * @param {string} filename - Filename for downloaded PDF file
 * @returns {Promise<void>}
 */
export async function exportReportToPdf(element, filename = 'VITAARA_Report.pdf') {
  if (!element) {
    throw new Error('Target container element not found for PDF export.');
  }

  // 1. Capture element with html2canvas (scale: 2 for crisp resolution)
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: '#FFFFFF',
    ignoreElements: (el) => {
      // Exclude elements explicitly marked with data-html2canvas-ignore
      return el.hasAttribute('data-html2canvas-ignore');
    },
  });

  const imgData = canvas.toDataURL('image/png');

  // 2. Setup jsPDF A4 portrait page (210mm x 297mm)
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth(); // 210mm
  const pageHeight = pdf.internal.pageSize.getHeight(); // 297mm

  const margin = 10; // 10mm page margin
  const contentWidth = pageWidth - margin * 2; // 190mm
  const contentHeight = (canvas.height * contentWidth) / canvas.width; // converted height in mm

  let heightLeft = contentHeight;
  let position = margin;

  // Render Page 1
  pdf.addImage(imgData, 'PNG', margin, position, contentWidth, contentHeight);
  heightLeft -= (pageHeight - margin * 2);

  // Render additional pages if report height exceeds A4 single page
  while (heightLeft > 0) {
    position = margin - (contentHeight - heightLeft);
    pdf.addPage();
    pdf.addImage(imgData, 'PNG', margin, position, contentWidth, contentHeight);
    heightLeft -= (pageHeight - margin * 2);
  }

  // 3. Trigger client-side PDF download
  pdf.save(filename);
}
