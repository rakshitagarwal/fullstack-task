import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
    overrides: {
      MuiTable: {
        root: {
          border: "1px solid rgba(224, 224, 224, 1)",
        },
      },
      MuiTableCell: {
        root: {
          borderRight: "1px solid rgba(224, 224, 224, 1)",
          padding: "6px 16px",
        },
        head: {
          fontSize: "0.875rem",
          fontWeight: "bold",
          color: "rgba(0, 0, 0, 0.87)",
          backgroundColor: "rgba(255, 255, 255, 1)",
          borderBottom: "1px solid rgba(224, 224, 224, 1)",
        },
        body: {
          fontSize: "0.875rem",
          color: "rgba(0, 0, 0, 0.87)",
          borderBottom: "1px solid rgba(224, 224, 224, 1)",
        },
      },
      MuiTableRow: {
        root: {
          height: "32px",
          "&:nth-of-type(odd)": {
            backgroundColor: "rgba(245, 245, 245, 1)", // Alternate row color
          },
        },
      },
    },
  });


  export default theme;