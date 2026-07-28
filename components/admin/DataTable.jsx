import React from "react";













export default function DataTable({ columns, data, keyExtractor }) {
  return (
    <div className="bg-white border border-lightgray rounded-2xl shadow-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#f7f7f7] border-b border-lightgray">
              {columns.map((col, idx) =>
              <th
                key={idx}
                className={`py-4 px-6 font-mono text-[11px] uppercase tracking-wider text-cloud ${col.className || ""}`}>
                
                  {col.header}
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ?
            <tr>
                <td colSpan={columns.length} className="py-8 px-6 text-center text-cloud">
                  No records found.
                </td>
              </tr> :

            data.map((row, rowIndex) =>
            <tr
              key={keyExtractor(row)}
              className={`transition-colors hover:bg-[#f7f7f7]/50 ${
              rowIndex !== data.length - 1 ? "border-b border-lightgray/50" : ""}`
              }>
              
                  {columns.map((col, colIndex) =>
              <td
                key={colIndex}
                className={`py-4 px-6 text-sm text-graphite ${col.className || ""}`}>
                
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