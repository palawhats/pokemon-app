"use client";
import { use, useState, useEffect } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Avatar,
  Chip,
  LinearProgress,
  Button,
  Box,
  Skeleton,
} from "@mui/material";

interface PokemonDetail {
  name: string;
  sprites: {
    front_default: string;
    other: { "official-artwork": { front_default: string } };
  };
  types: { type: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
  cries: { latest: string };
  species: { url: string };
}

export default function PokemonDetailPage({
  params,
}: {
  params: Promise<{ pokemonname: string }>;
}) {
  const { pokemonname } = use(params);
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [evolutionChain, setEvolutionChain] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  // [แก้ Hydration Error] เพิ่ม State เช็คสถานะการโหลดของเบราว์เซอร์
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonname}`)
      .then((res) => res.json())
      .then((data: PokemonDetail) => {
        setPokemon(data);
        return fetch(data.species.url);
      })
      .then((res) => res.json())
      .then((speciesData) => {
        return fetch(speciesData.evolution_chain.url);
      })
      .then((res) => res.json())
      .then((evoData) => {
        const chain: string[] = [];
        let currentEvo = evoData.chain;

        while (currentEvo) {
          chain.push(currentEvo.species.name);
          currentEvo = currentEvo.evolves_to[0];
        }
        setEvolutionChain(chain);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching detail:", err);
        setLoading(false);
      });
  }, [pokemonname]);

  const playCry = () => {
    if (pokemon?.cries?.latest) {
      const audio = new Audio(pokemon.cries.latest);
      audio.play().catch((e) => console.log("Audio blocked by browser", e));
    }
  };

  // [แก้ Hydration Error] ถ้ายังอยู่บน Server ห้ามเพิ่งเรนเดอร์แท็กใดๆ ของ MUI เด็ดขาด
  if (!isMounted) {
    return null;
  }

  // ==========================================
  // 1. สถานะกำลังโหลด : แสดง SKELETON
  // ==========================================
  if (loading) {
    return (
      <Container sx={{ py: 4 }}>
        <Skeleton variant="rectangular" width={90} height={36} sx={{ mb: 3, borderRadius: 1 }} />
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Card sx={{ p: 3, textAlign: "center" }}>
              <Skeleton variant="circular" width={250} height={250} sx={{ mx: "auto" }} />
              <Skeleton variant="text" width="50%" height={50} sx={{ mx: "auto", mt: 2 }} />
              <Skeleton variant="rectangular" width={180} height={36} sx={{ mx: "auto", mt: 2, borderRadius: 1 }} />
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 7 }}>
            <Card sx={{ p: 3, height: "100%" }}>
              <Skeleton variant="text" width={80} height={30} sx={{ mb: 1 }} />
              <Box sx={{ display: "flex", gap: 1, mb: 4 }}>
                <Skeleton variant="rounded" width={65} height={32} />
                <Skeleton variant="rounded" width={65} height={32} />
              </Box>
              <Skeleton variant="text" width={120} height={30} sx={{ mb: 2 }} />
              {Array.from(new Array(6)).map((_, i) => (
                <Box key={i} sx={{ mb: 2 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Skeleton variant="text" width="20%" />
                    <Skeleton variant="text" width="10%" />
                  </Box>
                  <Skeleton variant="rounded" height={8} />
                </Box>
              ))}
            </Card>
          </Grid>
        </Grid>
      </Container>
    );
  }

  // ==========================================
  // 2. สถานะหาชื่อโปเกมอนไม่เจอ
  // ==========================================
  if (!pokemon) {
    return (
      <Container sx={{ py: 4, textAlign: "center" }}>
        <Typography variant="h5">ไม่พบข้อมูลโปเกมอนตัวนี้</Typography>
      </Container>
    );
  }

  // ==========================================
  // 3. โหลดเสร็จสมบูรณ์ : แสดงข้อมูลจริง
  // ==========================================
  return (
    <Container sx={{ py: 4 }}>
      <Button variant="outlined" href="/" sx={{ mb: 3 }}>ย้อนกลับ</Button>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 5 }}>
          <Card sx={{ textAlign: "center", p: 3, boxShadow: 3 }}>
            <Avatar
              alt={pokemon.name}
              src={pokemon.sprites.other["official-artwork"].front_default || pokemon.sprites.front_default}
              sx={{ width: 250, height: 250, mx: "auto", bgcolor: "#fcfcfc" }}
            />
            <Typography variant="h4" sx={{ textTransform: "capitalize", mt: 2, fontWeight: "bold" }}>
              {pokemon.name}
            </Typography>
            {pokemon.cries?.latest && (
              <Button
                variant="contained"
                color="secondary"
                onClick={playCry}
                sx={{ mt: 2 }}
              >
                🔊 ฟังเสียงร้องของโปเกมอน
              </Button>
            )}
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 7 }}>
          <Card sx={{ p: 3, boxShadow: 3, height: "100%" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>ประเภท</Typography>
              <Box sx={{ mb: 3 }}>
                {pokemon.types.map((t) => (
                  <Chip
                    key={t.type.name}
                    label={t.type.name}
                    color="primary"
                    sx={{ mr: 1, textTransform: "capitalize", fontWeight: "bold" }}
                  />
                ))}
              </Box>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>ค่าสถานะพื้นฐาน</Typography>
              {pokemon.stats.map((s) => (
                <Box key={s.stat.name} sx={{ mb: 1.5 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", textTransform: "capitalize" }}>
                    <Typography variant="body2">{s.stat.name}</Typography>
                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>{s.base_stat}</Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={Math.min((s.base_stat / 255) * 100, 100)}
                    sx={{ height: 8, borderRadius: 5 }}
                  />
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Card sx={{ p: 3, boxShadow: 3, mt: 1 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>สายวิวัฒนาการ (Evolution Chain)</Typography>
            <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 2, mt: 2 }}>
              {evolutionChain.map((name, index) => (
                <Box key={name} sx={{ display: "flex", alignItems: "center" }}>
                  <Button
                    variant={name === pokemon.name ? "contained" : "outlined"}
                    color={name === pokemon.name ? "primary" : "inherit"}
                    href={`/pokemon/${name}`}
                    sx={{ textTransform: "capitalize", px: 3 }}
                  >
                    {name}
                  </Button>
                  {index < evolutionChain.length - 1 && (
                    <Typography component="span" sx={{ ml: 2, color: "text.secondary", fontWeight: "bold" }}>
                      &rarr;
                    </Typography>
                  )}
                </Box>
              ))}
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}