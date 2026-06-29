"use client";
import { useState, useEffect } from "react";
import {
  Typography,
  Container,
  Card,
  CardContent,
  Avatar,
  Grid,
  CardActionArea,
  Pagination,
  Box,
  Skeleton, // [เพิ่ม] Import Skeleton
} from "@mui/material";

interface PokemonResponse {
  count: number;
  results: { name: string; url: string }[];
}

export default function Home() {
  const [pokemonData, setPokemonData] = useState<PokemonResponse | null>(null);
  const [page, setPage] = useState<number>(1);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  
  // [สำคัญ] เพิ่ม State นี้เพื่อคอยเปิด/ปิด Skeleton ตอนกดเปลี่ยนหน้า
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const ITEMS_PER_PAGE = 20;
  const offset = (page - 1) * ITEMS_PER_PAGE;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setIsLoading(true); // เริ่มโหลดหน้าใหม่ -> เปิด Skeleton

    fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${ITEMS_PER_PAGE}&offset=${offset}`)
      .then((response) => response.json())
      .then((data) => {
        setPokemonData(data);
        setIsLoading(false); // ได้ข้อมูลแล้ว -> ปิด Skeleton
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsLoading(false);
      });
  }, [page, offset]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isMounted) return null;

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', mb: 4 }}>
        Pokemon
      </Typography>

      <Grid container spacing={2}>
        {/* --- เงื่อนไขที่ 1: กำลังโหลดให้แสดง Skeleton 20 ใบ --- */}
        {isLoading ? (
          Array.from(new Array(ITEMS_PER_PAGE)).map((_, index) => (
            <Grid size={{ xs: 12, sm: 3 }} key={index}>
              <Card sx={{ my: 1, p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Skeleton variant="circular" width={80} height={80} sx={{ mb: 1 }} />
                <Skeleton variant="text" width="60%" height={32} />
              </Card>
            </Grid>
          ))
        ) : (
          /* --- เงื่อนไขที่ 2: โหลดเสร็จแล้ว แสดงการ์ดของจริง --- */
          pokemonData?.results.map((pokemon) => {
            const pokemonId = pokemon.url.split("/")[6];
            return (
              <Grid size={{ xs: 12, sm: 3 }} key={pokemon.name}>
                <Card sx={{ my: 1, boxShadow: 3, '&:hover': { transform: 'scale(1.03)', transition: '0.2s' } }}>
                  <CardActionArea href={`/pokemon/${pokemon.name}`}>
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <Avatar
                        alt={pokemon.name}
                        sx={{ width: 80, height: 80, mb: 1, bgcolor: '#f5f5f5' }}
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
                      />
                      <Typography variant="h6" sx={{ textTransform: 'capitalize', fontWeight: 'medium' }}>
                        {pokemon.name}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })
        )}
      </Grid>

      {pokemonData && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <Pagination
            count={Math.ceil(pokemonData.count / ITEMS_PER_PAGE)}
            page={page}
            onChange={handlePageChange}
            color="primary"
            size="large"
          />
        </Box>
      )}
    </Container>
  );
}