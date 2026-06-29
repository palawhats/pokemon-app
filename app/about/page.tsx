"use client";
import Image from "next/image";
import {
  Container,
  Typography,
  Card,
  Grid,
  Button,
  Box,
  Divider,
  Chip,
  IconButton,
} from "@mui/material";

export default function AboutPage() {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Card
        sx={{
          p: { xs: 3, md: 6 },
          borderRadius: 4,
          boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
          bgcolor: "white",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 8,
            bgcolor: "#d32f2f",
          }}
        />

        <Grid container spacing={5} sx={{ alignItems: "center" }}>
          
          <Grid size={{ xs: 12, md: 4 }} sx={{ textAlign: "center" }}>
            <Box
              sx={{
                position: "relative",
                width: 170,
                height: 170,
                mx: "auto",
                borderRadius: "50%",
                p: 0.8,
                border: "3px dashed #d32f2f",
              }}
            >
              <Image
                src="/cat.jpg"
                width={160}
                height={160}
                alt="Palawhat Suttama"
                priority
                style={{
                  borderRadius: "50%",
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                }}
              />
            </Box>
            
            <Chip
              label="CS @ KKU"
              size="small"
              sx={{ mt: 2, bgcolor: "#fee2e2", color: "#991b1b", fontWeight: "bold" }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 8 }}>
            <Typography variant="h3" sx={{ fontWeight: 900, color: "#0f172a", letterSpacing: -0.5 }}>
              Palawhat Suttama
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "#d32f2f", fontWeight: "bold", mb: 2 }}>
              Student — Khon Kaen University
            </Typography>

            <Typography variant="body1" sx={{ color: "#475569", lineHeight: 1.8, mb: 3 }}>
              Hi — I&apos;m a student studying at Khon Kaen University. I enjoy building web UIs and learning modern frameworks.
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap", mb: 4 }}>
              <Button
                variant="contained"
                href="mailto:kham@example.com"
                sx={{
                  bgcolor: "#0f172a",
                  color: "white",
                  px: 3.5,
                  py: 1,
                  borderRadius: 2.5,
                  fontWeight: "bold",
                  textTransform: "none",
                  "&:hover": { bgcolor: "#334155" },
                }}
              >
                ✉️ Contact Me
              </Button>

              <Box sx={{ display: "flex", gap: 0.5 }}>
                
                <IconButton
                  href="https://github.com/palawhats/pokemon-app.git"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ border: "1px solid #e2e8f0", color: "#0f172a" }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.867 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.238-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.607.069-.607 1.004.071 1.532 1.032 1.532 1.032.892 1.529 2.341 1.087 2.91.832.091-.647.35-1.087.636-1.337-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.253-.447-1.27.098-2.646 0 0 .84-.269 2.75 1.025A9.563 9.563 0 0112 6.844c.85.004 1.705.115 2.504.338 1.909-1.294 2.748-1.025 2.748-1.025.546 1.376.202 2.393.099 2.646.64.698 1.03 1.591 1.03 2.682 0 3.842-2.338 4.687-4.566 4.935.359.31.678.923.678 1.861 0 1.343-.012 2.426-.012 2.756 0 .268.18.58.688.482C19.135 20.165 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                </IconButton>

                <IconButton
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ border: "1px solid #e2e8f0", color: "#0a66c2" }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4V24h-4V8zM8.5 8h3.84v2.16h.05c.53-1 1.82-2.16 3.74-2.16C20.7 8 24 10.68 24 15.12V24h-4v-7.08c0-1.69-.03-3.86-2.35-3.86-2.36 0-2.72 1.84-2.72 3.74V24h-4V8z" />
                  </svg>
                </IconButton>
              </Box>
            </Box>

            <Divider sx={{ mb: 3 }} />
            <Grid container spacing={2}>
              {[
                { label: "Student ID", val: "673450473-2" },
                { label: "University", val: "Khon Kaen Univ." },
                { label: "Major", val: "Computer Science" },
                { 
                  label: "Social", 
                  val: "GitHub Profile", 
                  isLink: true, 
                  url: "https://github.com/palawhats/pokemon-app.git"
                },
              ].map((item, idx) => (
                <Grid size={{ xs: 6 }} key={idx}>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      bgcolor: "#f8fafc",
                      border: "1px solid #f1f5f9",
                    }}
                  >
                    <Typography variant="caption" sx={{ color: "#64748b", fontWeight: "bold", display: "block" }}>
                      {item.label}
                    </Typography>
                    {item.isLink ? (
                      <Typography
                        component="a"
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ fontWeight: "bold", color: "#d32f2f", textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
                      >
                        {item.val} ↗
                      </Typography>
                    ) : (
                      <Typography variant="body2" sx={{ fontWeight: "bold", color: "#1e293b", mt: 0.2 }}>
                        {item.val}
                      </Typography>
                    )}
                  </Box>
                </Grid>
              ))}
            </Grid>

          </Grid>
        </Grid>
      </Card>

      <Typography variant="body2" sx={{ textAlign: "center", mt: 5, color: "#94a3b8" }}>
        Made with ❤️ — Built with Next.js & Material UI
      </Typography>
    </Container>
  );
}