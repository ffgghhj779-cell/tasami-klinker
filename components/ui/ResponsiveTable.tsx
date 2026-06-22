"use client";

import { cn } from '@/lib/utils';

interface ResponsiveTableProps {
  headers: string[];
  rows: string[][];
  /** Column index to highlight (e.g. priority column) */
  highlightColumn?: number;
  /** Use monospace styling for these column indices */
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
      {/* Desktop table */}
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

      {/* Mobile cards */}
      <div className="md:hidden flex flex-col gap-3 p-4">
        {rows.map((row, rowIdx) => (
          <div key={rowIdx} className="premium-table-card">
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
          </div>
        ))}
      </div>
    </div>
  );
}
