import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface Pokemon {
  name: string;
  url: string;
  id: number;
  image: string;
}

interface PokemonResponse {
  results: {
    name: string;
    url: string;
  }[];
}

export default function PokemonList() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPokemon();
  }, []);

  const fetchPokemon = async () => {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=20"
      );
      const data: PokemonResponse = await response.json();

      const pokemonWithDetails = data.results.map((poke, index) => {
        const id = index + 1;
        return {
          ...poke,
          id,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
        };
      });

      setPokemon(pokemonWithDetails);
    } catch (error) {
      console.error("Error fetching Pokemon:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderPokemon = ({ item }: { item: Pokemon }) => (
    <View style={styles.pokemonItem} testID={`pokemon-${item.name}`}>
      <Image source={{ uri: item.image }} style={styles.pokemonImage} />
      <Text style={styles.pokemonName}>{item.name}</Text>
      <Text style={styles.pokemonId}>#{item.id}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0066cc" />
        <Text>Loading Pokemon...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokemon List</Text>
      <FlatList
        data={pokemon}
        renderItem={renderPokemon}
        keyExtractor={(item) => item.name}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#333",
  },
  listContainer: {
    paddingHorizontal: 10,
  },
  pokemonItem: {
    backgroundColor: "white",
    margin: 5,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    flex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  pokemonImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  pokemonName: {
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "capitalize",
    color: "#333",
  },
  pokemonId: {
    fontSize: 12,
    color: "#666",
    marginTop: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
