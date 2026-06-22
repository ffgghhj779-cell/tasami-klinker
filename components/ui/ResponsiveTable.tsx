"use client";

import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface ResponsiveTableProps {
  headers: string[];
  rows: string[][];
  highlightColumn?: number;
  monoColumns?: number[];
  className?: string;
}

export function ResponsiveTable({
  headers,
  rows,
  highlightColumn,
  monoColumns = [],
  className,
}: ResponsiveTableProps) {
  return (
    <div className={cn('premium-table-wrapper', className)}>
      <div className="hidden md:block overflow-x-auto">
        <table className="premium-table w-full">
          <thead>
            <tr>
              {headers.map((header, i) => (
                <th key={i} scope="col">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIdx) => (
              <tr key={rowIdx}>
                {row.map((cell, colIdx) => (
                  <td
                    key={colIdx}
                    className={cn(
                      colIdx === 0 && 'font-bold text-text-main',
                      monoColumns.includes(colIdx) && 'font-mono tracking-wide',
                      colIdx === highlightColumn && 'priority-cell'
                    )}
                  >
                    {colIdx === highlightColumn ? (
                      <span className="priority-badge">{cell}</span>
                    ) : (
                      cell
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden flex flex-col gap-4 p-3 sm:p-5">
        {rows.map((row, rowIdx) => (
          <motion.div
            key={rowIdx}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: 0.35, delay: rowIdx * 0.04, ease: [0.22, 1, 0.36, 1] as const }}
            className="premium-table-card"
          >
            <div className="premium-table-card-title">{row[0]}</div>
            <dl className="premium-table-card-grid">
              {headers.slice(1).map((header, colIdx) => {
                const cellIdx = colIdx + 1;
                const cell = row[cellIdx];
                return (
                  <div key={colIdx} className="premium-table-card-row">
                    <dt>{header}</dt>
                    <dd className={cn(
                      monoColumns.includes(cellIdx) && 'font-mono',
                      cellIdx === highlightColumn && 'priority-badge inline-flex'
                    )}>
                      {cell}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
