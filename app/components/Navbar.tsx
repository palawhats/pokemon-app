"use client";
import { AppBar, Toolbar, Typography, Button, Box, Container } from "@mui/material";
import Link from "next/link";

export default function Navbar() {
  return (
    // ตกแต่งบาร์ด้วยสีแดงสไตล์พอกเก็ตบอล (#d32f2f) พร้อมเงาที่นุ่มนวล
    <AppBar position="sticky" sx={{ bgcolor: "#d32f2f", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          
          {/* โลโก้ด้านซ้าย กดแล้วกลับหน้าหลัก */}
          <Typography
            variant="h6"
            component={Link}
            href="/"
            sx={{
              color: "white",
              textDecoration: "none",
              fontWeight: "900",
              letterSpacing: 1,
              display: "flex",
              alignItems: "center",
              gap: 1
            }}
          >
            🔴 POKÉDEX
          </Typography>

          {/* เมนูด้านขวา */}
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              component={Link}
              href="/"
              sx={{ color: "white", fontWeight: "bold", '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}
            >
              หน้าหลัก
            </Button>
            <Button
              component={Link}
              href="/about"
              sx={{ color: "white", fontWeight: "bold", '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}
            >
              เกี่ยวกับโครงงาน
            </Button>
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
}