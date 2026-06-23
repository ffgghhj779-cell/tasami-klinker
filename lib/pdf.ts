import type { jsPDF } from 'jspdf';
import { content, Language } from './content';

export type PdfDocumentType =
  | 'market-report'
  | 'chemical-analysis'
  | 'certificates'
  | 'technical-file'
  | 'rfq';

export interface RfqFormData {
  company: string;
  countryPort: string;
  quantity: string;
  email: string;
  phone: string;
  notes?: string;
  referenceId?: string;
}

const PRIMARY = { r: 242, g: 124, b: 35 };
const DARK = { r: 34, g: 38, b: 43 };
const MUTED = { r: 90, g: 94, b: 99 };

function drawBrandHeader(doc: jsPDF, subtitle: string) {
  doc.setFillColor(PRIMARY.r, PRIMARY.g, PRIMARY.b);
  doc.rect(0, 0, 210, 32, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('TASAMI INDUSTRIAL', 14, 14);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text(subtitle, 14, 22);

  doc.setFontSize(8);
  doc.text('info@tasami-industrial.com  |  Jeddah, Kingdom of Saudi Arabia', 14, 28);
}

function drawFooter(doc: jsPDF, page: number, total: number) {
  doc.setDrawColor(229, 231, 235);
  doc.line(14, 282, 196, 282);
  doc.setTextColor(MUTED.r, MUTED.g, MUTED.b);
  doc.setFontSize(8);
  doc.text(
    `TASAMI INDUSTRIAL — Confidential Technical Document — Page ${page} of ${total}`,
    105,
    288,
    { align: 'center' }
  );
}

function addWrappedText(
  doc: jsPDF,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight = 6
): number {
  const lines = doc.splitTextToSize(text, maxWidth);
  doc.text(lines, x, y);
  return y + lines.length * lineHeight;
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const STORAGE_URLS: Partial<Record<PdfDocumentType, string | undefined>> = {
  'market-report': process.env.NEXT_PUBLIC_PDF_MARKET_REPORT,
  'chemical-analysis': process.env.NEXT_PUBLIC_PDF_CHEMICAL_ANALYSIS,
  certificates: process.env.NEXT_PUBLIC_PDF_CERTIFICATES,
  'technical-file': process.env.NEXT_PUBLIC_PDF_TECHNICAL_FILE,
};

async function getJsPDF() {
  const { jsPDF } = await import('jspdf');
  return jsPDF;
}

async function tryDownloadStoredPdf(type: PdfDocumentType): Promise<boolean> {
  const url = STORAGE_URLS[type];
  if (!url) return false;

  try {
    const res = await fetch(url);
    if (!res.ok) return false;
    const blob = await res.blob();
    const filename = url.split('/').pop()?.split('?')[0] || `tasami-${type}.pdf`;
    const objectUrl = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = objectUrl;
    anchor.download = filename;
    anchor.click();
    URL.revokeObjectURL(objectUrl);
    return true;
  } catch {
    return false;
  }
}

export async function generatePdf(
  type: PdfDocumentType,
  lang: Language,
  rfqData?: RfqFormData
): Promise<void> {
  await delay(300);

  if (type !== 'rfq') {
    const stored = await tryDownloadStoredPdf(type);
    if (stored) return;
  }

  const jsPDF = await getJsPDF();

  switch (type) {
    case 'market-report':
      return generateMarketReport(lang, jsPDF);
    case 'chemical-analysis':
      return generateChemicalAnalysis(lang, jsPDF);
    case 'certificates':
      return generateCertificates(lang, jsPDF);
    case 'technical-file':
      return generateTechnicalFile(lang, jsPDF);
    case 'rfq':
      if (!rfqData) throw new Error('RFQ data is required');
      return generateRfqPdf(rfqData, lang, jsPDF);
    default:
      throw new Error(`Unknown PDF type: ${type}`);
  }
}

function generateMarketReport(lang: Language, JsPDF: typeof import('jspdf').jsPDF) {
  const t = content.marketStatus;
  const doc = new JsPDF();
  const isAr = lang === 'ar';

  drawBrandHeader(
    doc,
    isAr ? 'تقرير الطلب السوقي 2026' : 'Market Demand Report 2026'
  );

  let y = 44;
  doc.setTextColor(DARK.r, DARK.g, DARK.b);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text(t.title[lang], 14, y);

  y += 10;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(MUTED.r, MUTED.g, MUTED.b);
  doc.text(
    isAr ? 'المصدر: التقارير الاقتصادية المعتمدة' : 'Source: Authorized Economic Reports',
    14,
    y
  );

  y += 12;
  doc.setFillColor(248, 249, 250);
  doc.setDrawColor(229, 231, 235);
  doc.roundedRect(14, y - 5, 182, 10, 1, 1, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(DARK.r, DARK.g, DARK.b);
  const headers = t.tableHeaders[lang];
  const colX = [16, 52, 118, 148];
  headers.forEach((h, i) => doc.text(h, colX[i], y + 2));

  y += 12;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);

  t.tableData[lang].forEach((row) => {
    if (y > 265) {
      drawFooter(doc, 1, 2);
      doc.addPage();
      y = 20;
    }
    doc.text(row[0], colX[0], y);
    doc.text(row[1], colX[1], y);
    doc.text(row[2], colX[2], y);
    y = addWrappedText(doc, row[3], colX[3], 48, 5);
    y += 4;
  });

  y += 8;
  doc.setFontSize(8);
  doc.setTextColor(MUTED.r, MUTED.g, MUTED.b);
  doc.text(
    isAr
      ? 'هذا مستند تقني أولي. للحصول على التقرير الكامل المعتمد، تواصل مع فريق المبيعات.'
      : 'This is a preliminary technical document. Contact our sales team for the full certified report.',
    14,
    y,
    { maxWidth: 182 }
  );

  drawFooter(doc, 1, 1);
  doc.save('Tasami_Market_Report_2026.pdf');
}

function generateChemicalAnalysis(lang: Language, JsPDF: typeof import('jspdf').jsPDF) {
  const t = content.product;
  const doc = new JsPDF();
  const isAr = lang === 'ar';

  drawBrandHeader(
    doc,
    isAr ? 'تقرير التحليل الكيميائي' : 'Chemical Analysis Report'
  );

  let y = 44;
  doc.setTextColor(DARK.r, DARK.g, DARK.b);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text(isAr ? 'المواصفات الفنية — كلنكر سعودي' : 'Technical Specifications — Saudi Clinker', 14, y);

  y += 10;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(22, 101, 52);
  y = addWrappedText(doc, t.status[lang].replace('✅ ', ''), 14, y, 182);

  y += 8;
  doc.setFillColor(248, 249, 250);
  doc.roundedRect(14, y - 5, 182, 10, 1, 1, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(DARK.r, DARK.g, DARK.b);
  const headers = t.tableHeaders[lang];
  const colX = [16, 58, 108, 148];
  headers.forEach((h, i) => doc.text(h, colX[i], y + 2));

  y += 12;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(DARK.r, DARK.g, DARK.b);

  t.tableData.forEach((row) => {
    row.forEach((cell, i) => doc.text(cell, colX[i], y));
    y += 8;
  });

  y += 10;
  doc.setFont('helvetica', 'bold');
  doc.text(t.quality.title[lang], 14, y);
  y += 7;
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(MUTED.r, MUTED.g, MUTED.b);
  y = addWrappedText(doc, t.quality.text[lang], 14, y, 182);

  drawFooter(doc, 1, 1);
  doc.save('Tasami_Chemical_Analysis_Report.pdf');
}

function generateCertificates(lang: Language, JsPDF: typeof import('jspdf').jsPDF) {
  const t = content.product;
  const doc = new JsPDF();
  const isAr = lang === 'ar';

  drawBrandHeader(
    doc,
    isAr ? 'الشهادات والاعتمادات' : 'Certifications & Accreditations'
  );

  let y = 44;
  doc.setTextColor(DARK.r, DARK.g, DARK.b);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text(t.quality.title[lang], 14, y);

  y += 12;
  const certs = [
    { name: 'ISO 9001:2015', desc: isAr ? 'نظام إدارة الجودة' : 'Quality Management System' },
    { name: 'ISO 14001:2015', desc: isAr ? 'نظام الإدارة البيئية' : 'Environmental Management System' },
    { name: 'SGS Laboratory Report', desc: isAr ? 'تقرير مختبر معتمد لكل شحنة' : 'Certified lab report per shipment' },
    { name: 'Saudi Made Mark', desc: isAr ? 'علامة صنع في السعودية' : 'Saudi Made Mark certification' },
    { name: 'Certificate of Origin', desc: isAr ? 'شهادة منشأ سعودية' : 'Saudi Certificate of Origin' },
  ];

  certs.forEach((cert) => {
    doc.setFillColor(248, 249, 250);
    doc.setDrawColor(229, 231, 235);
    doc.roundedRect(14, y - 4, 182, 18, 2, 2, 'FD');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(DARK.r, DARK.g, DARK.b);
    doc.text(cert.name, 18, y + 4);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(MUTED.r, MUTED.g, MUTED.b);
    doc.text(cert.desc, 18, y + 11);
    y += 24;
  });

  y += 6;
  doc.setFontSize(8);
  doc.text(
    isAr
      ? 'جميع الشهادات الأصلية متوفرة عند الطلب. تواصل معنا للحصول على النسخ المعتمدة.'
      : 'Original certificates available upon request. Contact us for certified copies.',
    14,
    y,
    { maxWidth: 182 }
  );

  drawFooter(doc, 1, 1);
  doc.save('Tasami_Certificates.pdf');
}

function generateTechnicalFile(lang: Language, JsPDF: typeof import('jspdf').jsPDF) {
  const doc = new JsPDF();
  const isAr = lang === 'ar';

  drawBrandHeader(
    doc,
    isAr ? 'الملف الفني الكامل' : 'Full Technical File'
  );

  let y = 44;
  doc.setTextColor(DARK.r, DARK.g, DARK.b);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text(isAr ? 'ملف فني — كلنكر سعودي عالي الجودة' : 'Technical File — Premium Saudi Clinker', 14, y);

  y += 12;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(MUTED.r, MUTED.g, MUTED.b);

  const sections = isAr
    ? [
        '1. المواصفات الفنية الكاملة (ASTM C150 / EN 197-1)',
        '2. تقرير التحليل الكيميائي (SGS)',
        '3. شهادات الجودة والاعتماد (ISO 9001, ISO 14001)',
        '4. شهادة المنشأ وعلامة صنع في السعودية',
        '5. جداول اللوجستيات والتسليم للأسواق المستهدفة',
        '6. شروط الدفع والتوريد (LC at sight)',
      ]
    : [
        '1. Full Technical Specifications (ASTM C150 / EN 197-1)',
        '2. Chemical Analysis Report (SGS)',
        '3. Quality & Accreditation Certificates (ISO 9001, ISO 14001)',
        '4. Certificate of Origin & Saudi Made Mark',
        '5. Logistics & Delivery Schedules for Target Markets',
        '6. Payment & Supply Terms (LC at sight)',
      ];

  sections.forEach((line) => {
    y = addWrappedText(doc, line, 14, y, 182);
    y += 4;
  });

  y += 8;
  doc.setFillColor(PRIMARY.r, PRIMARY.g, PRIMARY.b);
  doc.roundedRect(14, y, 182, 14, 2, 2, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text(
    isAr ? 'لطلب الملف الفني الكامل المعتمد: info@tasami-industrial.com' : 'Request certified full file: info@tasami-industrial.com',
    105,
    y + 9,
    { align: 'center' }
  );

  drawFooter(doc, 1, 1);
  doc.save('Tasami_Technical_File.pdf');
}

function generateRfqPdf(data: RfqFormData, lang: Language, JsPDF: typeof import('jspdf').jsPDF) {
  const isAr = lang === 'ar';
  const doc = new JsPDF();
  const refId = data.referenceId ?? `RFQ-${Date.now()}`;
  const generatedAt = new Date().toLocaleString(lang === 'ar' ? 'ar-SA' : 'en-US', {
    dateStyle: 'long',
    timeStyle: 'short',
  });

  drawBrandHeader(doc, isAr ? 'طلب عرض سعر' : 'Request For Quote');

  let y = 42;

  // Reference strip
  doc.setFillColor(248, 249, 250);
  doc.setDrawColor(229, 231, 235);
  doc.roundedRect(14, y, 182, 22, 2, 2, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(MUTED.r, MUTED.g, MUTED.b);
  doc.text(isAr ? 'رقم المرجع' : 'REFERENCE NO.', 18, y + 8);
  doc.setFontSize(12);
  doc.setTextColor(DARK.r, DARK.g, DARK.b);
  doc.text(refId, 18, y + 16);

  // Status badge
  doc.setFillColor(34, 197, 94);
  doc.roundedRect(148, y + 5, 42, 12, 2, 2, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.text(isAr ? 'مستلم' : 'RECEIVED', 169, y + 13, { align: 'center' });

  y += 32;
  doc.setTextColor(DARK.r, DARK.g, DARK.b);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text(isAr ? 'طلب عرض سعر — تسامي الصناعية' : 'Quote Request — TASAMI INDUSTRIAL', 14, y);

  y += 6;
  doc.setDrawColor(PRIMARY.r, PRIMARY.g, PRIMARY.b);
  doc.setLineWidth(0.8);
  doc.line(14, y + 4, 60, y + 4);

  y += 16;

  const fields: [string, string][] = [
    [content.contact.fields.company[lang], data.company],
    [content.contact.fields.countryPort[lang], data.countryPort],
    [content.contact.fields.quantity[lang], data.quantity],
    [content.contact.fields.email[lang], data.email],
    [content.contact.fields.phone[lang], data.phone],
    [content.contact.fields.notes[lang], data.notes || (isAr ? 'لا يوجد' : 'N/A')],
  ];

  // Two-column field boxes (3 rows x 2 cols, notes full width)
  const colWidth = 88;
  const rowHeight = 26;
  let col = 0;
  let rowY = y;

  fields.forEach(([label, value], idx) => {
    const isFullWidth = idx === fields.length - 1;
    const x = isFullWidth ? 14 : col === 0 ? 14 : 108;
    const width = isFullWidth ? 182 : colWidth;
    const boxH = isFullWidth ? 32 : rowHeight;

    doc.setFillColor(252, 252, 253);
    doc.setDrawColor(229, 231, 235);
    doc.roundedRect(x, rowY, width, boxH, 2, 2, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(MUTED.r, MUTED.g, MUTED.b);
    doc.text(label.toUpperCase(), x + 4, rowY + 7);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(DARK.r, DARK.g, DARK.b);
    const valueLines = doc.splitTextToSize(value, width - 8);
    doc.text(valueLines.slice(0, isFullWidth ? 3 : 2), x + 4, rowY + 14);

    if (isFullWidth) {
      rowY += boxH + 6;
    } else if (col === 1) {
      rowY += rowHeight + 6;
      col = 0;
    } else {
      col = 1;
    }
  });

  y = rowY + 8;

  // Info box
  doc.setFillColor(255, 247, 237);
  doc.setDrawColor(PRIMARY.r, PRIMARY.g, PRIMARY.b);
  doc.roundedRect(14, y, 182, 28, 2, 2, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(DARK.r, DARK.g, DARK.b);
  doc.text(isAr ? 'الخطوات التالية' : 'Next Steps', 18, y + 9);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(MUTED.r, MUTED.g, MUTED.b);
  const nextSteps = isAr
    ? 'سيتواصل فريق المبيعات خلال 24–48 ساعة عمل. يرجى الاحتفاظ برقم المرجع للمتابعة.'
    : 'Our sales team will contact you within 24–48 business hours. Please keep your reference number for follow-up.';
  doc.text(doc.splitTextToSize(nextSteps, 170), 18, y + 16);

  y += 36;
  doc.setFontSize(8);
  doc.setTextColor(MUTED.r, MUTED.g, MUTED.b);
  doc.text(`${isAr ? 'تاريخ الإنشاء' : 'Generated on'}: ${generatedAt}`, 14, y);
  doc.text('info@tasami-industrial.com  |  +966 54 838 7323', 14, y + 5);

  drawFooter(doc, 1, 1);
  doc.save(`Tasami_RFQ_${refId}.pdf`);
}
