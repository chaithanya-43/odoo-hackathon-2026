function DataTable({ columns = [], data = [], loading = false }) {
  if (loading) {
    return <div className="table-message">Loading...</div>;
  }

  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.label}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length || 1} className="empty-table">
                No records found
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr key={row.id ?? row.product_id ?? row.receipt_id ?? row.delivery_id ?? row.transfer_id ?? row.adjustment_id ?? index}>
                {columns.map((column) => (
                  <td key={column.key}>
                    {column.render
                      ? column.render(row)
                      : row[column.key] ?? "-"}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
