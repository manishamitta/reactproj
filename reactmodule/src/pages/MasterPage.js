import React, { useEffect, useState } from "react";
import { Container, Box, Button} from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { getTableData, getTableCount } from "api";
import { useNavigate, state } from "react-router-dom";

const columns = [
  { field: "complainno", headerName: "complainno", width: 250 },
  { field: "cpono", headerName: "cpono", flex: 1 },
  { field: "cvencode", headerName: "cvencode", flex: 1 },
];

const PAGE_SIZE = 15;

export default function MasterPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Number of rows which exist on the service
  const [rowCount, setRowCount] = useState(0);
  const navigate = useNavigate();

  const loadData = async (isFirstLoad, skip = 0) => {
    try {
      setItems([]);
      setLoading(true);

      if (isFirstLoad) {
        const count = await getTableCount();
        setRowCount(count);
      }

      const _items = await getTableData({
        $top: PAGE_SIZE,
        $skip: skip
      });

      // Set items with s_id as the unique id
      const itemsWithIds = _items.map((item) => {
        return {
          ...item,
          id: item.complainno // Use s_id as the id
        };
      });

      setItems(itemsWithIds);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChanged = ({ page }) => {
    loadData(false, page * PAGE_SIZE);
  };

  const handleRowClick = (params) => {
    console.log('Row clicked:', params.row); // Debug log
    const navString = `/object/${params.id}`; // Use params.id
    navigate(navString, { state: { row: params.row } }); // Navigate with the row data
  };
  const handleCreateClick = () => {
    navigate('/create'); // Adjust the path as needed
  };

  useEffect(() => {
    // when component mounted
    loadData(true);
  }, []);

  return (
    <Container disableGutters>
       <Box display="flex" justifyContent="space-between" alignItems="center" py={2}>
        <h2>Master Page</h2>
        <Button variant="contained" color="primary" onClick={handleCreateClick}>
          Create
        </Button>
      </Box>
      <Box height="80vh" py={5}>
        <DataGrid
          loading={loading}
          rows={items}
          columns={columns}
          pageSize={PAGE_SIZE}
          paginationMode="server"
          rowCount={rowCount}
          onPageChange={handlePageChanged}
          onRowClick={handleRowClick}
        />
      </Box>
    </Container>
  );
}
