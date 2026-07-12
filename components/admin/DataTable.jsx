import React from "react";













export default function DataTable({ columns, data, keyExtractor }) {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl shadow-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-warm border-b border-outline-variant">
              {columns.map((col, idx) =>
              <th
                key={idx}
                className={`py-4 px-6 font-mono text-[11px] uppercase tracking-wider text-outline ${col.className || ""}`}>
                
                  {col.header}
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ?
            <tr>
                <td colSpan={columns.length} className="py-8 px-6 text-center text-on-surface-variant">
                  No records found.
                </td>
              </tr> :

            data.map((row, rowIndex) =>
            <tr
              key={keyExtractor(row)}
              className={`transition-colors hover:bg-surface-warm/50 ${
              rowIndex !== data.length - 1 ? "border-b border-outline-variant/50" : ""}`
              }>
              
                  {columns.map((col, colIndex) =>
              <td
                key={colIndex}
                className={`py-4 px-6 text-sm text-on-surface ${col.className || ""}`}>
                
                      {typeof col.accessor === "function" ?
                col.accessor(row) :
                row[col.accessor]}
                    </td>
              )}
                </tr>
            )
            }
          </tbody>
        </table>
      </div>
    </div>);

}